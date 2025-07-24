import React from 'react'
import useStore from '../../store/useStore.js'  // ← .js 추가
import { trackEvent, vibrate } from '../../utils/helpers.js'  // ← .js 추가
import styles from './Navigation.module.css'

const BottomNav = () => {
  const { viewMode, setViewMode, activeCategory, setActiveCategory } = useStore()

  const navItems = [
    { 
      id: 'home', 
      name: '홈', 
      icon: '🏠', 
      action: () => {
        setViewMode('coupons')
        setActiveCategory('all')
      }
    },
    { 
      id: 'coupons', 
      name: '쿠폰', 
      icon: '🎫', 
      action: () => setViewMode('coupons')
    },
    { 
      id: 'hotlinks', 
      name: '핫링크', 
      icon: '🔥', 
      action: () => setViewMode('hotlinks')
    },
    { 
      id: 'favorites', 
      name: '즐겨찾기', 
      icon: '❤️', 
      action: () => {
        // TODO: 즐겨찾기 페이지 구현
        alert('즐겨찾기 기능 준비 중입니다!')
      }
    }
  ]

  const handleNavClick = (item) => {
    vibrate(30)
    trackEvent('bottom_nav_clicked', { nav_item: item.id })
    item.action()
  }

  const isActive = (itemId) => {
    if (itemId === 'home') return viewMode === 'coupons' && activeCategory === 'all'
    if (itemId === 'coupons') return viewMode === 'coupons'
    if (itemId === 'hotlinks') return viewMode === 'hotlinks'
    return false
  }

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navContainer}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${
              isActive(item.id) ? styles.navActive : ''
            }`}
            onClick={() => handleNavClick(item)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav