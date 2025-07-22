const CACHE_NAME = 'coupon-lab-v1.0.0';
const STATIC_CACHE_NAME = 'coupon-lab-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'coupon-lab-dynamic-v1.0.0';

// 캐시할 정적 파일들
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // CSS, JS 파일들 추가
  '/static/css/main.css',
  '/static/js/main.js',
  // 기본 페이지들
  '/offline.html'
];

// 캐시할 API 엔드포인트 패턴
const API_CACHE_PATTERNS = [
  /\/api\/coupons/,
  /\/api\/categories/,
  /\/api\/popular/
];

// 설치 이벤트 - 정적 파일 캐시
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// 활성화 이벤트 - 오래된 캐시 정리
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('coupon-lab-')) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch 이벤트 - 네트워크 요청 인터셉트
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // HTML 요청 처리
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // API 요청 처리
  if (isApiRequest(url)) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // 정적 파일 요청 처리
  event.respondWith(handleStaticRequest(request));
});

// HTML 네비게이션 요청 처리 (캐시 우선 전략)
async function handleNavigationRequest(request) {
  try {
    // 캐시에서 먼저 찾기
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // 백그라운드에서 업데이트
      updateCacheInBackground(request);
      return cachedResponse;
    }

    // 네트워크에서 가져오기
    const networkResponse = await fetch(request);
    
    // 캐시에 저장
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, serving offline page');
    return caches.match('/offline.html');
  }
}

// API 요청 처리 (네트워크 우선 전략)
async function handleApiRequest(request) {
  try {
    // 네트워크에서 먼저 시도
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // 캐시에 저장
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache for API request');
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // API 실패 시 기본 응답
    return new Response(
      JSON.stringify({ 
        error: '오프라인 상태입니다. 나중에 다시 시도해주세요.',
        offline: true 
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// 정적 파일 요청 처리 (캐시 우선 전략)
async function handleStaticRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Failed to fetch static resource:', request.url);
    throw error;
  }
}

// API 요청 판별
function isApiRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
}

// 백그라운드 캐시 업데이트
async function updateCacheInBackground(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
  } catch (error) {
    console.log('Background update failed for:', request.url);
  }
}

// 푸시 알림 수신
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || '새로운 할인 쿠폰이 등록되었습니다!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'view',
        title: '쿠폰 보기',
        icon: '/icons/view-action.png'
      },
      {
        action: 'dismiss',
        title: '닫기',
        icon: '/icons/dismiss-action.png'
      }
    ],
    requireInteraction: true,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '쿠폰랩', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view' || !event.action) {
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clients) => {
          // 이미 열린 창이 있는지 확인
          for (const client of clients) {
            if (client.url === urlToOpen && 'focus' in client) {
              return client.focus();
            }
          }
          
          // 새 창 열기
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// 백그라운드 동기화
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // 백그라운드에서 실행할 작업들
      syncOfflineData()
    );
  }
});

async function syncOfflineData() {
  // 오프라인 상태에서 저장된 데이터를 서버로 동기화
  console.log('Background sync triggered');
  
  try {
    // 예: 사용자가 오프라인에서 저장한 쿠폰들을 서버로 전송
    const offlineActions = await getOfflineActions();
    
    for (const action of offlineActions) {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action)
      });
    }
    
    // 동기화 완료 후 로컬 데이터 정리
    await clearOfflineActions();
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// 유틸리티 함수들
async function getOfflineActions() {
  // IndexedDB나 localStorage에서 오프라인 액션들 가져오기
  return [];
}

async function clearOfflineActions() {
  // 동기화된 액션들 정리
}
