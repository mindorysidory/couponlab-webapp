import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from './store/useStore'
import { coupons } from './data/coupons.js'  // ← .js 확장자 추가

// Components  
import Header from './components/Header/Header.jsx'  // ← .jsx 확장자 추가
import CategoryNav from './components/Navigation/CategoryNav.jsx'
import CouponCard from './components/CouponCard/CouponCard.jsx'
import HotLinks from './components/HotLinks/HotLinks.jsx'
import BottomNav from './components/Navigation/BottomNav.jsx'
import Footer from './components/Footer/Footer.jsx'

// Styles
import './styles/globals.css'

function App() {
  const { 
    activeCategory, 
    searchQuery, 
    viewMode, 
    showAllItems, 
    setShowAllItems 
  } = useStore()

  // 쿠폰 필터링
  const filteredCoupons = coupons.filter(coupon => {
    const categoryMatch = activeCategory === 'all' || coupon.category === activeCategory
    const searchMatch = !searchQuery || 
      coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.brand.toLowerCase().includes(searchQuery.toLowerCase())
    
    return categoryMatch && searchMatch
  })

  // 표시할 쿠폰 개수 제한
  const displayCoupons = showAllItems ? filteredCoupons : filteredCoupons.slice(0, 20)

  return (
    <div className="container">
      {/* 헤더 */}
      <Header />
      
      {/* 카테고리 네비게이션 */}
      <CategoryNav />

      {/* 메인 콘텐츠 */}
      <main style={{ paddingBottom: '6rem' }}>
        <AnimatePresence mode="wait">
          {viewMode === 'coupons' ? (
            <motion.div
              key="coupons"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* 쿠폰 목록 헤더 */}
              <div style={{ 
                padding: '1rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '1.125rem', 
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  🎫 할인 쿠폰
                </h2>
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--text-secondary)' 
                }}>
                  총 {filteredCoupons.length}개
                </span>
              </div>

              {/* 쿠폰 카드 리스트 */}
              <div style={{ padding: '0 1rem' }}>
                {displayCoupons.length > 0 ? (
                  <>
                    {displayCoupons.map((coupon) => (
                      <CouponCard key={coupon.id} coupon={coupon} />
                    ))}
                    
                    {/* 더보기 버튼 */}
                    {filteredCoupons.length > 20 && (
                      <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                        <button
                          onClick={() => setShowAllItems(!showAllItems)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            margin: '0 auto',
                            backgroundColor: 'var(--accent-color)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '25px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                          }}
                        >
                          <span>
                            {showAllItems 
                              ? `Top 20만 보기` 
                              : `전체 ${filteredCoupons.length}개 보기`
                            }
                          </span>
                          <span style={{ transform: showAllItems ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            ▼
                          </span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '3rem 1rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                    <p>검색 결과가 없습니다.</p>
                    <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                      다른 키워드로 검색해보세요.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hotlinks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HotLinks />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 푸터 */}
        <Footer />
      </main>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  )
}

export default App