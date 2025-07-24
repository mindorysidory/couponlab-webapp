// 쿠폰랩 PWA JavaScript

// PWA 관련 변수들
let deferredPrompt;
let swRegistration;

// 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    registerServiceWorker();
    setupInstallPrompt();
    setupOfflineHandling();
    setupPushNotifications();
    loadCoupons();
});

// 앱 초기화
function initializeApp() {
    console.log('🚀 쿠폰랩 PWA 초기화 중...');
    
    // 검색 기능 설정
    setupSearch();
    
    // 카테고리 필터 설정
    setupCategoryFilter();
    
    // 필터 태그 설정
    setupFilterTags();
    
    // 하단 네비게이션 설정
    setupBottomNavigation();
    
    // 제스처 지원 설정
    setupGestures();
}

// Service Worker 등록
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            swRegistration = await navigator.serviceWorker.register('/sw.js');
            console.log('✅ Service Worker 등록 성공:', swRegistration);
            
            // 업데이트 확인
            swRegistration.addEventListener('updatefound', () => {
                const newWorker = swRegistration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateAvailable();
                    }
                });
            });
            
        } catch (error) {
            console.error('❌ Service Worker 등록 실패:', error);
        }
    }
}

// PWA 설치 프롬프트 설정
function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallBanner();
    });

    // 설치 버튼 클릭 이벤트
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log('설치 선택:', outcome);
                deferredPrompt = null;
                hideInstallBanner();
            }
        });
    }

    // 배너 닫기 버튼
    const closeBanner = document.getElementById('closeBanner');
    if (closeBanner) {
        closeBanner.addEventListener('click', () => {
            hideInstallBanner();
            localStorage.setItem('installBannerDismissed', Date.now());
        });
    }

    // 앱 설치 완료 감지
    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA 설치 완료!');
        hideInstallBanner();
        showToast('🎉 쿠폰랩이 설치되었습니다!');
    });
}

// 설치 배너 표시/숨김
function showInstallBanner() {
    const dismissTime = localStorage.getItem('installBannerDismissed');
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    
    if (!dismissTime || parseInt(dismissTime) < oneDayAgo) {
        const banner = document.getElementById('installBanner');
        if (banner) {
            banner.classList.add('show');
        }
    }
}

function hideInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (banner) {
        banner.classList.remove('show');
    }
}

// 오프라인 처리 설정
function setupOfflineHandling() {
    window.addEventListener('online', () => {
        hideOfflineIndicator();
        showToast('🌐 온라인 상태로 복구되었습니다');
        syncOfflineData();
    });

    window.addEventListener('offline', () => {
        showOfflineIndicator();
        showToast('🔌 오프라인 상태입니다');
    });

    // 초기 상태 확인
    if (!navigator.onLine) {
        showOfflineIndicator();
    }
}

function showOfflineIndicator() {
    const indicator = document.getElementById('offlineIndicator');
    if (indicator) {
        indicator.classList.add('show');
    }
}

function hideOfflineIndicator() {
    const indicator = document.getElementById('offlineIndicator');
    if (indicator) {
        indicator.classList.remove('show');
    }
}

// 업데이트 표시/처리
function showUpdateAvailable() {
    const updateDiv = document.getElementById('updateAvailable');
    if (updateDiv) {
        updateDiv.classList.add('show');
    }
}

function updateApp() {
    if (swRegistration && swRegistration.waiting) {
        swRegistration.waiting.postMessage('SKIP_WAITING');
        window.location.reload();
    }
}

// 푸시 알림 설정
async function setupPushNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        // 알림 권한 요청
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted' && swRegistration) {
            try {
                // 푸시 구독 생성 (실제 VAPID 키 필요)
                console.log('✅ 푸시 알림 권한 획득');
            } catch (error) {
                console.error('❌ 푸시 알림 구독 실패:', error);
            }
        }
    }
}

// 검색 기능
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
}

function performSearch(query) {
    if (query.length > 0) {
        showLoading();
        // 검색 결과 필터링
        setTimeout(() => {
            const filteredCoupons = getCachedCoupons().filter(coupon => 
                coupon.title.toLowerCase().includes(query.toLowerCase()) ||
                coupon.brand.toLowerCase().includes(query.toLowerCase())
            );
            displayCoupons(filteredCoupons);
            hideLoading();
        }, 500);
    } else {
        loadCoupons();
    }
}

// 카테고리 필터
function setupCategoryFilter() {
    const categories = document.querySelectorAll('.category-item');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            // 활성 상태 변경
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
            
            // 카테고리 필터링
            const categoryType = category.dataset.category;
            filterCoupons(categoryType);
        });
    });
}

// 필터 태그
function setupFilterTags() {
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // 활성 상태 변경
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            
            // 정렬 적용
            const sortType = tag.dataset.filter;
            sortCoupons(sortType);
        });
    });
}

// 하단 네비게이션
function setupBottomNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 활성 상태 변경
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            // 햅틱 피드백
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
            
            // 페이지 이동 로직
            const href = item.getAttribute('href');
            navigateToPage(href);
        });
    });
}

// 제스처 지원
function setupGestures() {
    let startY = 0;
    let currentY = 0;
    let isRefreshing = false;

    const couponList = document.getElementById('couponList');
    if (!couponList) return;
    
    couponList.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    couponList.addEventListener('touchmove', (e) => {
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        
        // Pull to refresh
        if (diff > 100 && couponList.scrollTop === 0 && !isRefreshing) {
            isRefreshing = true;
            refreshCoupons();
        }
    });
}

// 쿠폰 데이터 로드
async function loadCoupons(searchQuery = '') {
    showLoading();
    
    try {
        // 실제 환경에서는 API 호출
        // const response = await fetch(`/api/coupons?q=${searchQuery}`);
        // const coupons = await response.json();
        
        // 현재는 더미 데이터 사용
        const coupons = getCachedCoupons();
        
        setTimeout(() => {
            displayCoupons(coupons);
            hideLoading();
        }, 800);
        
    } catch (error) {
        console.error('쿠폰 로드 실패:', error);
        
        // 오프라인 상태에서 캐시된 데이터 사용
        const cachedCoupons = getCachedCoupons();
        displayCoupons(cachedCoupons);
        
        if (!navigator.onLine) {
            showToast('🔌 오프라인 상태에서 저장된 데이터를 표시합니다');
        }
        
        hideLoading();
    }
}

// 쿠폰 표시
function displayCoupons(coupons) {
    const couponList = document.getElementById('couponList');
    if (!couponList) return;
    
    if (!coupons || coupons.length === 0) {
        couponList.innerHTML = `
            <div class="loading">
                <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                <div>검색 결과가 없습니다.</div>
            </div>
        `;
        return;
    }
    
    couponList.innerHTML = coupons.map((coupon, index) => `
        <div class="coupon-card" onclick="openCoupon('${coupon.id}')">
            <div class="coupon-header">
                <div class="coupon-rank">#${index + 1}</div>
                <div class="coupon-title">
                    <h3>${coupon.title}</h3>
                </div>
                <div class="coupon-discount">${coupon.discount}</div>
            </div>
            <div class="coupon-meta">
                <div class="coupon-stats">
                    <span>⭐ ${coupon.rating}</span>
                    <span>👥 ${coupon.users}</span>
                    <span>📅 ${coupon.timeLeft}</span>
                </div>
            </div>
            <div class="coupon-brand">${coupon.brand}</div>
            <div class="coupon-actions">
                <button class="btn btn-primary" onclick="useCoupon('${coupon.id}', event)">
                    쿠폰 사용
                </button>
                <button class="btn btn-secondary" onclick="saveCoupon('${coupon.id}', event)">
                    ❤️
                </button>
            </div>
        </div>
    `).join('');
}

// 쿠폰 데이터 (20개)
function getCachedCoupons() {
    return [
        {
            id: '1',
            title: '무신사 스토어',
            discount: '15% 할인',
            rating: '4.8',
            users: '12.3k',
            timeLeft: '~08:15',
            brand: 'MUSINSA15'
        },
        {
            id: '2',
            title: '배달의민족',
            discount: '3000원 할인',
            rating: '4.6',
            users: '11.3k',
            timeLeft: '~07:30',
            brand: 'BAEMIN3K'
        },
        {
            id: '3',
            title: '쿠팡 로켓배송',
            discount: '20% 할인',
            rating: '4.9',
            users: '10.9k',
            timeLeft: '~08:01',
            brand: 'ROCKET20'
        },
        {
            id: '4',
            title: 'ChatGPT Plus',
            discount: '30% 할인',
            rating: '4.7',
            users: '9.9k',
            timeLeft: '~08:20',
            brand: 'GPTPLUS30'
        },
        {
            id: '5',
            title: 'Figma Pro',
            discount: '25% 할인',
            rating: '4.8',
            users: '8.8k',
            timeLeft: '~09:15',
            brand: 'FIGMA25'
        },
        {
            id: '6',
            title: 'Canva Pro',
            discount: '40% 할인',
            rating: '4.6',
            users: '8.2k',
            timeLeft: '~08:30',
            brand: 'CANVA40'
        },
        {
            id: '7',
            title: '아고다 호텔예약',
            discount: '25% 할인',
            rating: '4.7',
            users: '7.9k',
            timeLeft: '~09:15',
            brand: 'AGODA25'
        },
        {
            id: '8',
            title: 'GitHub Copilot',
            discount: '50% 할인',
            rating: '4.9',
            users: '7.5k',
            timeLeft: '~08:10',
            brand: 'COPILOT50'
        },
        {
            id: '9',
            title: 'Notion Pro',
            discount: '35% 할인',
            rating: '4.5',
            users: '7.1k',
            timeLeft: '~09:01',
            brand: 'NOTION35'
        },
        {
            id: '10',
            title: '올리브영',
            discount: '10% 할인',
            rating: '4.5',
            users: '7.0k',
            timeLeft: '~07:25',
            brand: 'OLIVE10'
        },
        {
            id: '11',
            title: '스타벅스',
            discount: '5000원 할인',
            rating: '4.4',
            users: '6.8k',
            timeLeft: '~10:30',
            brand: 'STARBUCKS5K'
        },
        {
            id: '12',
            title: '지마켓',
            discount: '12% 할인',
            rating: '4.3',
            users: '6.5k',
            timeLeft: '~11:45',
            brand: 'GMARKET12'
        },
        {
            id: '13',
            title: '11번가',
            discount: '18% 할인',
            rating: '4.2',
            users: '6.2k',
            timeLeft: '~12:20',
            brand: '11ST18'
        },
        {
            id: '14',
            title: 'SSG닷컴',
            discount: '22% 할인',
            rating: '4.4',
            users: '5.9k',
            timeLeft: '~13:15',
            brand: 'SSG22'
        },
        {
            id: '15',
            title: '롯데온',
            discount: '16% 할인',
            rating: '4.1',
            users: '5.6k',
            timeLeft: '~14:00',
            brand: 'LOTTEON16'
        },
        {
            id: '16',
            title: '요기요',
            discount: '4000원 할인',
            rating: '4.3',
            users: '5.3k',
            timeLeft: '~15:30',
            brand: 'YOGIYO4K'
        },
        {
            id: '17',
            title: '네이버페이',
            discount: '2% 적립',
            rating: '4.5',
            users: '5.0k',
            timeLeft: '~16:45',
            brand: 'NAVERPAY2'
        },
        {
            id: '18',
            title: '카카오페이',
            discount: '3% 적립',
            rating: '4.6',
            users: '4.8k',
            timeLeft: '~17:20',
            brand: 'KAKAOPAY3'
        },
        {
            id: '19',
            title: '토스페이',
            discount: '5% 적립',
            rating: '4.7',
            users: '4.5k',
            timeLeft: '~18:10',
            brand: 'TOSSPAY5'
        },
        {
            id: '20',
            title: '페이코',
            discount: '7% 할인',
            rating: '4.2',
            users: '4.2k',
            timeLeft: '~19:00',
            brand: 'PAYCO7'
        }
    ];
}

// UI 상태 관리
function showLoading() {
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
        loadingState.style.display = 'block';
    }
}

function hideLoading() {
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
        loadingState.style.display = 'none';
    }
}

function showToast(message) {
    // 간단한 토스트 메시지
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
        border: 1px solid #333;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 쿠폰 관련 함수들
function openCoupon(couponId) {
    // 햅틱 피드백
    if ('vibrate' in navigator) {
        navigator.vibrate(100);
    }
    
    // 쿠폰 상세 정보 표시
    showToast(`쿠폰 ${couponId} 상세정보를 준비 중입니다.`);
}

function useCoupon(couponId, event) {
    event.stopPropagation();
    
    // 쿠폰 사용 로직
    showToast('🎉 쿠폰이 클립보드에 복사되었습니다!');
    
    // 쿠폰 코드 복사
    if (navigator.clipboard) {
        navigator.clipboard.writeText(`COUPON_${couponId}`);
    }
    
    // 햅틱 피드백
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
    }
}

function saveCoupon(couponId, event) {
    event.stopPropagation();
    
    // 쿠폰 저장 로직
    const savedCoupons = JSON.parse(localStorage.getItem('savedCoupons') || '[]');
    if (!savedCoupons.includes(couponId)) {
        savedCoupons.push(couponId);
        localStorage.setItem('savedCoupons', JSON.stringify(savedCoupons));
        showToast('💾 쿠폰이 저장되었습니다!');
    } else {
        showToast('📋 이미 저장된 쿠폰입니다.');
    }
}

// 페이지 네비게이션
function navigateToPage(path) {
    // SPA 라우팅 로직 (실제 구현시 라우터 라이브러리 사용)
    console.log('페이지 이동:', path);
    showToast(`${path} 페이지로 이동합니다.`);
}

// 필터링 및 정렬
function filterCoupons(category) {
    showLoading();
    setTimeout(() => {
        if (category === 'all') {
            displayCoupons(getCachedCoupons());
        } else {
            // 실제로는 카테고리별 필터링 로직 구현
            const filtered = getCachedCoupons().slice(0, 10);
            displayCoupons(filtered);
        }
        hideLoading();
    }, 300);
}

function sortCoupons(sortType) {
    showLoading();
    setTimeout(() => {
        let sorted = [...getCachedCoupons()];
        
        switch(sortType) {
            case 'latest':
                // 최신순 정렬 (실제로는 날짜 기준)
                sorted = sorted.reverse();
                break;
            case 'discount':
                // 할인율순 정렬 (실제로는 할인율 파싱해서 정렬)
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // 인기순 (기본)
                break;
        }
        
        displayCoupons(sorted);
        hideLoading();
    }, 300);
}

function refreshCoupons() {
    showToast('🔄 새로운 쿠폰을 불러오는 중...');
    loadCoupons();
}

// 오프라인 데이터 동기화
async function syncOfflineData() {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        try {
            const registration = await navigator.serviceWorker.ready;
            await registration.sync.register('background-sync');
            console.log('📤 백그라운드 동기화 등록');
        } catch (error) {
            console.error('동기화 등록 실패:', error);
        }
    }
}