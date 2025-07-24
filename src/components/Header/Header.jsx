import React from 'react'
import useStore from '../../store/useStore.js'
import styles from './Header.module.css'

const Header = () => {
  const { searchQuery, setSearchQuery, viewMode, setViewMode } = useStore()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 로고 및 타이틀 */}
        <div className={styles.brand}>
          <svg style={{ width: '32px', height: '32px', flexShrink: 0 }} viewBox="0 0 32 32">
            <defs>
              <radialGradient id="goldGradientHeader" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#fff59d"/>
                <stop offset="70%" stopColor="#ffca28"/>
                <stop offset="100%" stopColor="#ffb300"/>
              </radialGradient>
            </defs>
            {/* 외곽 검은 배경 */}
            <rect width="32" height="32" rx="8" fill="#000000"/>
            
            {/* 메인 동전 */}
            <circle cx="16" cy="16" r="12" 
                    fill="url(#goldGradientHeader)" 
                    stroke="#ffb300" 
                    strokeWidth="0.5"/>
            
            {/* 내부 원 (깊이감) */}
            <circle cx="16" cy="16" r="8" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.3)" 
                    strokeWidth="0.5"/>
            
            {/* 중앙 점 */}
            <circle cx="16" cy="16" r="2" 
                    fill="rgba(255,255,255,0.4)"/>
            
            {/* 하이라이트 */}
            <circle cx="13" cy="12" r="1.5" 
                    fill="rgba(255,255,255,0.6)"/>
          </svg>
          <h1 className={styles.title}>쿠폰랩</h1>
        </div>

        {/* 모드 전환 버튼 */}
        <div className={styles.modeSwitch}>
          <button 
            className={`${styles.modeBtn} ${viewMode === 'coupons' ? styles.active : ''}`}
            onClick={() => setViewMode('coupons')}
          >
            🎫 쿠폰
          </button>
          <button 
            className={`${styles.modeBtn} ${viewMode === 'hotlinks' ? styles.active : ''}`}
            onClick={() => setViewMode('hotlinks')}
          >
            🔥 핫링크
          </button>
        </div>
      </div>

      {/* 검색바 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={viewMode === 'coupons' ? '브랜드, 상품을 검색해보세요' : '핫한 링크를 찾아보세요'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className={styles.clearBtn}
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header