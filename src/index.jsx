import React, { useState, useEffect } from 'react';

// 아이콘들을 간단한 텍스트로 대체
const Heart = ({ className, onClick, fill }) => <span onClick={onClick} className={className} style={{ cursor: 'pointer' }}>❤️</span>;
const Search = ({ className }) => <span className={className}>🔍</span>;
const Copy = ({ className }) => <span className={className}>📋</span>;
const Star = ({ className }) => <span className={className}>⭐</span>;
const TrendingUp = ({ className }) => <span className={className}>📈</span>;
const Clock = ({ className }) => <span className={className}>⏰</span>;
const Gift = ({ className }) => <span className={className}>🎁</span>;
const ChevronDown = ({ className }) => <span className={className}>▼</span>;
const ChevronUp = ({ className }) => <span className={className}>▲</span>;
const Plus = ({ className }) => <span className={className}>➕</span>;
const Edit = ({ className }) => <span className={className}>✏️</span>;
const Trash2 = ({ className }) => <span className={className}>🗑️</span>;
const Save = ({ className }) => <span className={className}>💾</span>;

const CouponLabApp = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favoriteItems, setFavoriteItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showAllItems, setShowAllItems] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [discountItems, setDiscountItems] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newCoupon, setNewCoupon] = useState({
    title: '',
    category: 'fashion',
    discount: '',
    code: '',
    description: '',
    validUntil: '',
    brand: '',
    popularity: 4.0,
    isNew: false
  });

  const categories = [
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
  ];

  // 초기 데이터 로드
  useEffect(() => {
    const initialData = [
      { id: 1, title: '무신사 스토어', category: 'fashion', discount: '15%', code: 'MUSINSA15', description: '브랜드 의류 최대 15% 할인', validUntil: '2025.08.15', popularity: 4.8, isNew: true, clicks: 12340, brand: '무신사', rank: 1 },
      { id: 2, title: '배달의민족', category: 'food', discount: '3000원', code: 'BAEMIN3K', description: '최소주문 15,000원 이상 시', validUntil: '2025.07.30', popularity: 4.6, isNew: false, clicks: 11250, brand: '배달의민족', rank: 2 },
      { id: 3, title: '쿠팡 로켓배송', category: 'electronics', discount: '20%', code: 'ROCKET20', description: '전자제품 로켓배송 20% 할인', validUntil: '2025.08.01', popularity: 4.9, isNew: true, clicks: 10890, brand: '쿠팡', rank: 3 },
      { id: 4, title: 'ChatGPT Plus', category: 'ai', discount: '30%', code: 'GPTPLUS30', description: 'AI 서비스 1년 구독 할인', validUntil: '2025.08.20', popularity: 4.7, isNew: true, clicks: 9876, brand: 'OpenAI', rank: 4 },
      { id: 5, title: 'Figma Pro', category: 'design', discount: '25%', code: 'FIGMA25', description: '디자인 툴 프로 플랜 할인', validUntil: '2025.09.15', popularity: 4.8, isNew: false, clicks: 8765, brand: 'Figma', rank: 5 },
      { id: 6, title: 'Canva Pro', category: 'design', discount: '40%', code: 'CANVA40', description: '디자인 템플릿 무제한 이용', validUntil: '2025.08.30', popularity: 4.6, isNew: false, clicks: 8234, brand: 'Canva', rank: 6 },
      { id: 7, title: '아고다 호텔예약', category: 'travel', discount: '25%', code: 'AGODA25', description: '해외호텔 최대 25% 할인', validUntil: '2025.09.15', popularity: 4.7, isNew: false, clicks: 7890, brand: '아고다', rank: 7 },
      { id: 8, title: 'GitHub Copilot', category: 'dev', discount: '50%', code: 'COPILOT50', description: 'AI 코딩 어시스턴트 할인', validUntil: '2025.08.10', popularity: 4.9, isNew: true, clicks: 7456, brand: 'GitHub', rank: 8 },
      { id: 9, title: 'Notion Pro', category: 'productivity', discount: '35%', code: 'NOTION35', description: '팀 워크스페이스 할인', validUntil: '2025.09.01', popularity: 4.5, isNew: false, clicks: 7123, brand: 'Notion', rank: 9 },
      { id: 10, title: '올리브영', category: 'beauty', discount: '10%', code: 'OLIVE10', description: '뷰티 제품 추가 10% 할인', validUntil: '2025.07.25', popularity: 4.5, isNew: false, clicks: 6987, brand: '올리브영', rank: 10 },
      { id: 11, title: 'Netflix', category: 'subscription', discount: '20%', code: 'NETFLIX20', description: '스트리밍 서비스 첫 달 할인', validUntil: '2025.08.15', popularity: 4.4, isNew: false, clicks: 6543, brand: 'Netflix', rank: 11 },
      { id: 12, title: 'Adobe Creative', category: 'design', discount: '30%', code: 'ADOBE30', description: '크리에이티브 클라우드 할인', validUntil: '2025.08.25', popularity: 4.7, isNew: false, clicks: 6234, brand: 'Adobe', rank: 12 },
      { id: 13, title: 'AWS 클라우드', category: 'cloud', discount: '$100', code: 'AWS100', description: '클라우드 서비스 크레딧', validUntil: '2025.09.30', popularity: 4.6, isNew: true, clicks: 5987, brand: 'AWS', rank: 13 },
      { id: 14, title: 'Coursera Plus', category: 'education', discount: '45%', code: 'COURSERA45', description: '온라인 강의 무제한 수강', validUntil: '2025.08.20', popularity: 4.3, isNew: false, clicks: 5678, brand: 'Coursera', rank: 14 },
      { id: 15, title: 'Slack Pro', category: 'productivity', discount: '25%', code: 'SLACK25', description: '팀 커뮤니케이션 툴 할인', validUntil: '2025.08.31', popularity: 4.4, isNew: false, clicks: 5432, brand: 'Slack', rank: 15 },
      { id: 16, title: 'Spotify Premium', category: 'subscription', discount: '3개월', code: 'SPOTIFY3M', description: '음악 스트리밍 3개월 무료', validUntil: '2025.08.15', popularity: 4.2, isNew: false, clicks: 5234, brand: 'Spotify', rank: 16 },
      { id: 17, title: 'Midjourney', category: 'ai', discount: '20%', code: 'MJ20', description: 'AI 이미지 생성 서비스', validUntil: '2025.08.10', popularity: 4.8, isNew: true, clicks: 5123, brand: 'Midjourney', rank: 17 },
      { id: 18, title: 'Udemy', category: 'education', discount: '80%', code: 'UDEMY80', description: '온라인 강의 대폭 할인', validUntil: '2025.08.05', popularity: 4.1, isNew: false, clicks: 4987, brand: 'Udemy', rank: 18 },
      { id: 19, title: 'Zoom Pro', category: 'productivity', discount: '30%', code: 'ZOOM30', description: '화상회의 프로 플랜', validUntil: '2025.08.25', popularity: 4.3, isNew: false, clicks: 4876, brand: 'Zoom', rank: 19 },
      { id: 20, title: '11번가', category: 'electronics', discount: '15%', code: '11ST15', description: '전자제품 쿠폰 할인', validUntil: '2025.08.12', popularity: 4.0, isNew: false, clicks: 4765, brand: '11번가', rank: 20 }
    ];
    
    setDiscountItems(initialData);
  }, []);

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favoriteItems);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavoriteItems(newFavorites);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`할인코드 "${code}"가 복사되었습니다!`);
  };

  const filteredItems = discountItems
    .filter(item => 
      (activeCategory === 'all' || item.category === activeCategory) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'popular': return a.rank - b.rank;
        case 'new': return b.isNew - a.isNew;
        case 'discount': return b.clicks - a.clicks;
        default: return a.rank - b.rank;
      }
    });

  const displayItems = showAllItems ? filteredItems : filteredItems.slice(0, 20);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'system-ui, -apple-system' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '28rem', margin: '0 auto', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* 3D 큐브 로고 */}
              <div style={{ 
                position: 'relative', 
                width: '2rem', 
                height: '2rem',
                transform: 'perspective(100px) rotateX(15deg) rotateY(15deg)'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '1.75rem',
                  height: '1.75rem',
                  backgroundColor: '#3b82f6',
                  border: '1px solid #2563eb',
                  transform: 'translateZ(14px)'
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '1.75rem',
                  height: '1.75rem',
                  backgroundColor: '#60a5fa',
                  border: '1px solid #3b82f6',
                  transform: 'rotateY(90deg) translateZ(14px)'
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '1.75rem',
                  height: '1.75rem',
                  backgroundColor: '#93c5fd',
                  border: '1px solid #60a5fa',
                  transform: 'rotateX(90deg) translateZ(14px)'
                }}></div>
              </div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>쿠폰랩</h1>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setShowAdmin(!showAdmin)}
                style={{ padding: '0.5rem', backgroundColor: '#f3f4f6', borderRadius: '50%', border: 'none', cursor: 'pointer' }}
              >
                <Edit style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search style={{ 
              position: 'absolute', 
              left: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#9ca3af',
              width: '1rem',
              height: '1rem'
            }} />
            <input
              type="text"
              placeholder="브랜드, 상품을 검색해보세요"
              style={{
                width: '100%',
                paddingLeft: '2.5rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.75rem',
                border: 'none',
                fontSize: '0.875rem',
                boxSizing: 'border-box'
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
     <div style={{ 
  display: 'flex', 
  overflowX: 'auto', 
  overflowY: 'hidden',
  padding: '1rem', 
  gap: '0.75rem',
  scrollbarWidth: 'thin',
  scrollbarColor: '#cbd5e1 #f1f5f9',
  WebkitOverflowScrolling: 'touch'
}}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '3.5rem',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeCategory === category.id ? '#dbeafe' : 'transparent',
                  color: activeCategory === category.id ? '#2563eb' : '#6b7280'
                }}
              >
                <span style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{category.icon}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '500', whiteSpace: 'nowrap' }}>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '28rem', margin: '0 auto', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { value: 'popular', label: '랭킹순', icon: TrendingUp },
                { value: 'new', label: '최신순', icon: Clock },
                { value: 'discount', label: '인기순', icon: Gift }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSortBy(value)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '1.5rem',
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: sortBy === value ? '#dbeafe' : '#f3f4f6',
                    color: sortBy === value ? '#2563eb' : '#6b7280'
                  }}
                >
                  <Icon style={{ width: '1rem', height: '1rem' }} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              총 {filteredItems.length}개
            </div>
          </div>
        </div>
      </div>

      {/* Deal Cards */}
      <div style={{ maxWidth: '28rem', margin: '0 auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {displayItems.map((item) => (
          <div key={item.id} style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            border: '1px solid #e5e7eb', 
            padding: '0.75rem',
            position: 'relative'
          }}>
            {/* First Line: 사이트명 + New + 할인조건 + XX% 할인 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#{item.rank}' }}>#{item.rank}</span>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '0.875rem', margin: 0 }}>{item.title}</h3>
                {item.isNew && (
                  <span style={{ 
                    padding: '0.125rem 0.375rem', 
                    backgroundColor: '#fef2f2', 
                    color: '#dc2626', 
                    fontSize: '0.75rem', 
                    fontWeight: '500', 
                    borderRadius: '1rem'
                  }}>
                    NEW
                  </span>
                )}
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.description}
                </p>
              </div>
              <div style={{ 
                background: 'linear-gradient(to right, #ef4444, #ec4899)', 
                color: 'white', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '0.25rem', 
                fontSize: '0.75rem', 
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                {item.discount} 할인
              </div>
            </div>

            {/* Second Line: 별 + 사람 + 기간 + 할인코드 + 복사하기 + 좋아요 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: '#6b7280' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Star style={{ width: '0.75rem', height: '0.75rem', color: '#fbbf24', marginRight: '0.25rem' }} />
                  {item.popularity}
                </span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  👥 {(item.clicks / 1000).toFixed(1)}k
                </span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  📅 ~{item.validUntil.slice(5)}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <code style={{ 
                  backgroundColor: '#f3f4f6', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '0.25rem', 
                  fontSize: '0.75rem', 
                  fontFamily: 'monospace', 
                  fontWeight: 'bold'
                }}>
                  {item.code}
                </code>
                <button
                  onClick={() => copyCode(item.code)}
                  style={{ 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '0.25rem', 
                    fontSize: '0.75rem', 
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  복사
                </button>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  style={{ 
                    padding: '0.25rem',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Heart
                    className={favoriteItems.has(item.id) ? 'text-red-500' : 'text-gray-400'}
                    fill={favoriteItems.has(item.id)}
                    style={{ 
                      width: '1rem', 
                      height: '1rem',
                      color: favoriteItems.has(item.id) ? '#ef4444' : '#9ca3af'
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Show More Button */}
        {filteredItems.length > 20 && (
          <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
            <button
              onClick={() => setShowAllItems(!showAllItems)}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                margin: '0 auto',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>
                {showAllItems 
                  ? `Top 20만 보기` 
                  : `전체 ${filteredItems.length}개 보기`
                }
              </span>
              {showAllItems ? (
                <ChevronUp style={{ width: '1rem', height: '1rem' }} />
              ) : (
                <ChevronDown style={{ width: '1rem', height: '1rem' }} />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: 'white', 
        borderTop: '1px solid #e5e7eb',
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            {[
              { name: '홈', icon: '🏠', active: true },
              { name: '카테고리', icon: '📂', active: false },
              { name: '즐겨찾기', icon: '❤️', active: false },
              { name: '마이페이지', icon: '👤', active: false }
            ].map((tab) => (
              <button
                key={tab.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: tab.active ? '#2563eb' : '#6b7280'
                }}
              >
                <span style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{tab.icon}</span>
                <span style={{ fontSize: '0.75rem' }}>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Company Info */}
      <div style={{ backgroundColor: '#f3f4f6', paddingTop: '2rem', paddingBottom: '2rem', marginTop: '2rem', marginBottom: '4rem' }}>
        <div style={{ maxWidth: '28rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ 
              position: 'relative', 
              width: '1.5rem', 
              height: '1.5rem',
              transform: 'perspective(100px) rotateX(15deg) rotateY(15deg)'
            }}>
              <div style={{
                position: 'absolute',
                width: '1.25rem',
                height: '1.25rem',
                backgroundColor: '#3b82f6',
                border: '1px solid #2563eb',
                transform: 'translateZ(10px)'
              }}></div>
              <div style={{
                position: 'absolute',
                width: '1.25rem',
                height: '1.25rem',
                backgroundColor: '#60a5fa',
                border: '1px solid #3b82f6',
                transform: 'rotateY(90deg) translateZ(10px)'
              }}></div>
              <div style={{
                position: 'absolute',
                width: '1.25rem',
                height: '1.25rem',
                backgroundColor: '#93c5fd',
                border: '1px solid #60a5fa',
                transform: 'rotateX(90deg) translateZ(10px)'
              }}></div>
            </div>
            <h3 style={{ fontWeight: 'bold', color: '#111827' }}>쿠폰랩</h3>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>할인코드 전문 연구소</p>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
            검증된 할인 정보만을 제공하여<br />
            현명한 소비를 돕는 서비스입니다.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.75rem', color: '#9ca3af' }}>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>이용약관</a>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>개인정보처리방침</a>
            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>문의하기</a>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '1rem' }}>
            © 2025 CouponLab. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CouponLabApp />
  </React.StrictMode>
)
