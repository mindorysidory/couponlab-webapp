import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const CouponLabApp = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: '전체', icon: '🌟' },
    { id: 'fashion', name: '패션', icon: '👗' },
    { id: 'food', name: '음식', icon: '🍔' },
    { id: 'electronics', name: '전자제품', icon: '📱' },
    { id: 'ai', name: 'AI서비스', icon: '🤖' },
    { id: 'design', name: '디자인툴', icon: '🎨' }
  ];

  const coupons = [
    { 
      id: 1, 
      title: '무신사 스토어', 
      category: 'fashion', 
      discount: '15%', 
      code: 'MUSINSA15', 
      description: '브랜드 의류 최대 15% 할인',
      popularity: 4.8,
      clicks: 12340
    },
    { 
      id: 2, 
      title: '배달의민족', 
      category: 'food', 
      discount: '3000원', 
      code: 'BAEMIN3K', 
      description: '최소주문 15,000원 이상 시',
      popularity: 4.6,
      clicks: 11250
    },
    { 
      id: 3, 
      title: 'ChatGPT Plus', 
      category: 'ai', 
      discount: '30%', 
      code: 'GPTPLUS30', 
      description: 'AI 서비스 1년 구독 할인',
      popularity: 4.7,
      clicks: 9876
    },
    { 
      id: 4, 
      title: 'Figma Pro', 
      category: 'design', 
      discount: '25%', 
      code: 'FIGMA25', 
      description: '디자인 툴 프로 플랜 할인',
      popularity: 4.8,
      clicks: 8765
    }
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`할인코드 "${code}"가 복사되었습니다!`);
  };

  const filteredCoupons = coupons.filter(coupon => 
    (activeCategory === 'all' || coupon.category === activeCategory) &&
    coupon.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      fontFamily: 'system-ui, -apple-system',
      maxWidth: '28rem',
      margin: '0 auto'
    }}>
      
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
        padding: '1rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          marginBottom: '1rem' 
        }}>
          <div style={{ 
            width: '2rem', 
            height: '2rem',
            backgroundColor: '#3b82f6',
            borderRadius: '0.25rem'
          }}></div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
            쿠폰랩
          </h1>
        </div>
        
        <input
          type="text"
          placeholder="브랜드, 상품을 검색해보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#f3f4f6',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Categories */}
      <div style={{ backgroundColor: 'white', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '4rem',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeCategory === category.id ? '#dbeafe' : 'transparent',
                color: activeCategory === category.id ? '#2563eb' : '#6b7280'
              }}
            >
              <span style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                {category.icon}
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Coupon List */}
      <div style={{ padding: '1rem' }}>
        <div style={{ 
          fontSize: '0.875rem', 
          color: '#6b7280', 
          marginBottom: '1rem' 
        }}>
          총 {filteredCoupons.length}개
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredCoupons.map((coupon) => (
            <div 
              key={coupon.id} 
              style={{ 
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '0.5rem'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    margin: '0 0 0.25rem 0' 
                  }}>
                    {coupon.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: '#6b7280', 
                    margin: 0 
                  }}>
                    {coupon.description}
                  </p>
                </div>
                <div style={{ 
                  backgroundColor: '#ef4444',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {coupon.discount} 할인
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  <span>⭐ {coupon.popularity}</span>
                  <span>👥 {(coupon.clicks / 1000).toFixed(1)}k</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <code style={{ 
                    backgroundColor: '#f3f4f6',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace'
                  }}>
                    {coupon.code}
                  </code>
                  <button
                    onClick={() => copyCode(coupon.code)}
                    style={{ 
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    복사
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        backgroundColor: '#f3f4f6',
        padding: '2rem 1rem',
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>🎲 쿠폰랩</h3>
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#6b7280', 
          margin: '0 0 1rem 0' 
        }}>
          할인코드 전문 연구소
        </p>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
          © 2025 CouponLab. All rights reserved.
        </p>
      </div>
      
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CouponLabApp />
  </React.StrictMode>
);
