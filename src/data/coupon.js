// 카테고리 정의
export const categories = [
  { id: 'all', name: '전체', icon: '🌟' },
  { id: 'fashion', name: '패션', icon: '👗' },
  { id: 'food', name: '음식', icon: '🍔' },
  { id: 'electronics', name: '전자제품', icon: '📱' },
  { id: 'travel', name: '여행', icon: '✈️' },
  { id: 'beauty', name: '뷰티', icon: '💄' },
  { id: 'home', name: '홈&리빙', icon: '🏠' },
  { id: 'ai', name: 'AI서비스', icon: '🤖' },
  { id: 'design', name: '디자인툴', icon: '🎨' },
  { id: 'dev', name: '개발툴', icon: '💻' },
  { id: 'education', name: '교육', icon: '📚' },
  { id: 'subscription', name: '구독서비스', icon: '📺' },
  { id: 'productivity', name: '생산성', icon: '⚡' },
  { id: 'cloud', name: '클라우드', icon: '☁️' }
]

// 쿠폰 데이터 (35개)
export const coupons = [
  // 패션 카테고리
  { id: 1, title: '무신사 스토어', category: 'fashion', discount: '15%', code: 'MUSINSA15', description: '브랜드 의류 최대 15% 할인', validUntil: '2025.08.15', popularity: 4.8, isNew: true, clicks: 12340, brand: '무신사', rank: 1 },
  { id: 25, title: '29CM', category: 'fashion', discount: '20%', code: '29CM20', description: '패션 브랜드 컬렉션', validUntil: '2025.08.28', popularity: 4.3, isNew: false, clicks: 4100, brand: '29CM', rank: 25 },
  { id: 26, title: 'SSF Shop', category: 'fashion', discount: '25%', code: 'SSF25', description: '명품 패션 브랜드', validUntil: '2025.09.05', popularity: 4.5, isNew: true, clicks: 3890, brand: 'SSF', rank: 26 },
  
  // 음식 카테고리
  { id: 2, title: '배달의민족', category: 'food', discount: '3000원', code: 'BAEMIN3K', description: '최소주문 15,000원 이상 시', validUntil: '2025.07.30', popularity: 4.6, isNew: false, clicks: 11250, brand: '배달의민족', rank: 2 },
  { id: 29, title: '쿠팡이츠', category: 'food', discount: '5000원', code: 'EATS5K', description: '첫 주문 특가', validUntil: '2025.08.18', popularity: 4.4, isNew: true, clicks: 3198, brand: '쿠팡이츠', rank: 29 },
  { id: 30, title: '스타벅스', category: 'food', discount: '20%', code: 'STARBUCKS20', description: '음료 전품목 할인', validUntil: '2025.08.25', popularity: 4.5, isNew: false, clicks: 2987, brand: '스타벅스', rank: 30 },
  
  // 전자제품 카테고리
  { id: 3, title: '쿠팡 로켓배송', category: 'electronics', discount: '20%', code: 'ROCKET20', description: '전자제품 로켓배송 20% 할인', validUntil: '2025.08.01', popularity: 4.9, isNew: true, clicks: 10890, brand: '쿠팡', rank: 3 },
  { id: 20, title: '11번가', category: 'electronics', discount: '15%', code: '11ST15', description: '전자제품 쿠폰 할인', validUntil: '2025.08.12', popularity: 4.0, isNew: false, clicks: 4765, brand: '11번가', rank: 20 },
  
  // AI 서비스 카테고리
  { id: 4, title: 'ChatGPT Plus', category: 'ai', discount: '30%', code: 'GPTPLUS30', description: 'AI 서비스 1년 구독 할인', validUntil: '2025.08.20', popularity: 4.7, isNew: true, clicks: 9876, brand: 'OpenAI', rank: 4 },
  { id: 17, title: 'Midjourney', category: 'ai', discount: '20%', code: 'MJ20', description: 'AI 이미지 생성 서비스', validUntil: '2025.08.10', popularity: 4.8, isNew: true, clicks: 5123, brand: 'Midjourney', rank: 17 },
  { id: 24, title: 'Claude Pro', category: 'ai', discount: '25%', code: 'CLAUDE25', description: 'AI 어시스턴트 프로 플랜', validUntil: '2025.08.18', popularity: 4.6, isNew: true, clicks: 4210, brand: 'Anthropic', rank: 24 },
  
  // 디자인 툴 카테고리
  { id: 5, title: 'Figma Pro', category: 'design', discount: '25%', code: 'FIGMA25', description: '디자인 툴 프로 플랜 할인', validUntil: '2025.09.15', popularity: 4.8, isNew: false, clicks: 8765, brand: 'Figma', rank: 5 },
  { id: 6, title: 'Canva Pro', category: 'design', discount: '40%', code: 'CANVA40', description: '디자인 템플릿 무제한 이용', validUntil: '2025.08.30', popularity: 4.6, isNew: false, clicks: 8234, brand: 'Canva', rank: 6 },
  { id: 12, title: 'Adobe Creative', category: 'design', discount: '30%', code: 'ADOBE30', description: '크리에이티브 클라우드 할인', validUntil: '2025.08.25', popularity: 4.7, isNew: false, clicks: 6234, brand: 'Adobe', rank: 12 },
  
  // 여행 카테고리
  { id: 7, title: '아고다 호텔예약', category: 'travel', discount: '25%', code: 'AGODA25', description: '해외호텔 최대 25% 할인', validUntil: '2025.09.15', popularity: 4.7, isNew: false, clicks: 7890, brand: '아고다', rank: 7 },
  { id: 33, title: '익스피디아', category: 'travel', discount: '35%', code: 'EXPEDIA35', description: '항공권 + 호텔 패키지', validUntil: '2025.09.20', popularity: 4.3, isNew: true, clicks: 2654, brand: '익스피디아', rank: 33 },
  
  // 개발 툴 카테고리
  { id: 8, title: 'GitHub Copilot', category: 'dev', discount: '50%', code: 'COPILOT50', description: 'AI 코딩 어시스턴트 할인', validUntil: '2025.08.10', popularity: 4.9, isNew: true, clicks: 7456, brand: 'GitHub', rank: 8 },
  { id: 23, title: 'Shopify', category: 'dev', discount: '3개월', code: 'SHOPIFY3M', description: '이커머스 플랫폼 무료', validUntil: '2025.09.15', popularity: 4.4, isNew: false, clicks: 4432, brand: 'Shopify', rank: 23 },
  
  // 생산성 도구 카테고리
  { id: 9, title: 'Notion Pro', category: 'productivity', discount: '35%', code: 'NOTION35', description: '팀 워크스페이스 할인', validUntil: '2025.09.01', popularity: 4.5, isNew: false, clicks: 7123, brand: 'Notion', rank: 9 },
  { id: 15, title: 'Slack Pro', category: 'productivity', discount: '25%', code: 'SLACK25', description: '팀 커뮤니케이션 툴 할인', validUntil: '2025.08.31', popularity: 4.4, isNew: false, clicks: 5432, brand: 'Slack', rank: 15 },
  { id: 19, title: 'Zoom Pro', category: 'productivity', discount: '30%', code: 'ZOOM30', description: '화상회의 프로 플랜', validUntil: '2025.08.25', popularity: 4.3, isNew: false, clicks: 4876, brand: 'Zoom', rank: 19 },
  
  // 뷰티 카테고리
  { id: 10, title: '올리브영', category: 'beauty', discount: '10%', code: 'OLIVE10', description: '뷰티 제품 추가 10% 할인', validUntil: '2025.07.25', popularity: 4.5, isNew: false, clicks: 6987, brand: '올리브영', rank: 10 },
  { id: 34, title: '세포라', category: 'beauty', discount: '30%', code: 'SEPHORA30', description: '프리미엄 화장품', validUntil: '2025.08.28', popularity: 4.6, isNew: true, clicks: 2543, brand: '세포라', rank: 34 },
  
  // 구독 서비스 카테고리
  { id: 11, title: 'Netflix', category: 'subscription', discount: '20%', code: 'NETFLIX20', description: '스트리밍 서비스 첫 달 할인', validUntil: '2025.08.15', popularity: 4.4, isNew: false, clicks: 6543, brand: 'Netflix', rank: 11 },
  { id: 16, title: 'Spotify Premium', category: 'subscription', discount: '3개월', code: 'SPOTIFY3M', description: '음악 스트리밍 3개월 무료', validUntil: '2025.08.15', popularity: 4.2, isNew: false, clicks: 5234, brand: 'Spotify', rank: 16 },
  
  // 교육 카테고리
  { id: 14, title: 'Coursera Plus', category: 'education', discount: '45%', code: 'COURSERA45', description: '온라인 강의 무제한 수강', validUntil: '2025.08.20', popularity: 4.3, isNew: false, clicks: 5678, brand: 'Coursera', rank: 14 },
  { id: 18, title: 'Udemy', category: 'education', discount: '80%', code: 'UDEMY80', description: '온라인 강의 대폭 할인', validUntil: '2025.08.05', popularity: 4.1, isNew: false, clicks: 4987, brand: 'Udemy', rank: 18 },
  
  // 클라우드 카테고리
  { id: 13, title: 'AWS 클라우드', category: 'cloud', discount: '$100', code: 'AWS100', description: '클라우드 서비스 크레딧', validUntil: '2025.09.30', popularity: 4.6, isNew: true, clicks: 5987, brand: 'AWS', rank: 13 },
  { id: 22, title: 'Dropbox Plus', category: 'cloud', discount: '40%', code: 'DROPBOX40', description: '클라우드 스토리지 할인', validUntil: '2025.08.30', popularity: 4.1, isNew: false, clicks: 4543, brand: 'Dropbox', rank: 22 },
  
  // 홈&리빙 카테고리
  { id: 35, title: '이케아', category: 'home', discount: '15%', code: 'IKEA15', description: '가구 및 홈 데코', validUntil: '2025.09.10', popularity: 4.3, isNew: false, clicks: 2432, brand: '이케아', rank: 35 }
]