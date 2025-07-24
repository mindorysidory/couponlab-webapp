const CACHE_NAME = 'couponlab-v1.0.0'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/offline.html'
]

// 설치 이벤트
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ 캐시 오픈')
        return cache.addAll(urlsToCache)
      })
  )
})

// 페치 이벤트
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에서 찾으면 반환
        if (response) {
          return response
        }
        
        // 네트워크에서 가져오기
        return fetch(event.request).catch(() => {
          // 오프라인이고 HTML 요청이면 오프라인 페이지 반환
          if (event.request.destination === 'document') {
            return caches.match('/offline.html')
          }
        })
      })
  )
})

// 활성화 이벤트
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ 이전 캐시 삭제:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// 푸시 알림
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : '새로운 할인 쿠폰이 등록되었습니다!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '쿠폰 보기',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: '닫기',
        icon: '/icons/icon-96x96.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('🎫 쿠폰랩', options)
  )
})

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})