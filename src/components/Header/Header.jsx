import React from 'react'
import useStore from '../../store/useStore'
import styles from './Header.module.css'

const Header = () => {
  const { searchQuery, setSearchQuery, viewMode, setViewMode } = useStore()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 로고 및 타이틀 */}
        <div className={styles.brand}>
          <svg className={styles.logo} viewBox="0 0 32 32">
            <defs>
              <radialGradient id="goldGradient" cx="40%" cy="30%">
                <stop offset="0%" stopColor="#fff59d"/>
                <stop offset="100%" stopColor="#ffca28"/>
              </radialGradient>
            </defs>
            <rect width="32" height="32" rx="7" fill="#000000"/>
            <circle cx="16" cy="16" r="11" 
                    fill="url(#goldGradient)" 
                    stroke="#ffb300" 
                    strokeWidth="0.5"/>
            <circle cx="14" cy="13" r="2" 
                    fill="rgba(255,255,255,0.2)"/>
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
            placeholder={viewMode === 'coupons' ? '브랜드, 상품을 검색해보세요' : '핫한 링크를 찾아보세요'}
            className={styles.searchInput}
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