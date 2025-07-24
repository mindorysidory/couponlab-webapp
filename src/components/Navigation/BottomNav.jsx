import React from 'react'
import useStore from '../../store/useStore.js'
import { trackEvent, vibrate } from '../../utils/helpers.js'
import styles from './Navigation.module.css'

const BottomNav = () => {
  const { viewMode, setViewMode, activeCategory, setActiveCategory } = useStore()

  const handleNavClick = (mode, category = 'all') => {
    setViewMode(mode)
    setActiveCategory(category)
    trackEvent('bottom_nav_clicked', { mode, category })
    vibrate(30)
  }

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navContainer}>
        {/* 홈 */}
        <button 
          className={`${styles.navItem} ${viewMode === 'coupons' && activeCategory === 'all' ? styles.navActive : ''}`}
          onClick={() => handleNavClick('coupons', 'all')}
        >
          <span className={styles.navIcon}>🏠</span>
          <span className={styles.navLabel}>홈</span>
        </button>

        {/* 핫링크 */}
        <button 
          className={`${styles.navItem} ${viewMode === 'hotlinks' ? styles.navActive : ''}`}
          onClick={() => handleNavClick('hotlinks')}
        >
          <span className={styles.navIcon}>🔥</span>
          <span className={styles.navLabel}>핫링크</span>
        </button>

        {/* 즐겨찾기 */}
        <button 
          className={`${styles.navItem} ${viewMode === 'coupons' && activeCategory === 'favorites' ? styles.navActive : ''}`}
          onClick={() => handleNavClick('coupons', 'favorites')}
        >
          <span className={styles.navIcon}>💖</span>
          <span className={styles.navLabel}>즐겨찾기</span>
        </button>
      </div>
    </nav>
  )
}

export default BottomNav