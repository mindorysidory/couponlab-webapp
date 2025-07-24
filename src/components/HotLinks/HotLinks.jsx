import React from 'react'
import { motion } from 'framer-motion'
import { hotLinks } from '../../data/hotlinks.js'  // ← .js 추가
import { formatNumber, trackEvent, vibrate } from '../../utils/helpers.js'  // ← .js 추가
import useStore from '../../store/useStore.js'  // ← .js 추가
import styles from './HotLinks.module.css'

const HotLinks = () => {
  const { activeCategory, searchQuery } = useStore()

  const filteredLinks = hotLinks.filter(link => {
    const categoryMatch = activeCategory === 'all' || link.category === activeCategory
    const searchMatch = !searchQuery || 
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return categoryMatch && searchMatch
  })

  const handleLinkClick = (link) => {
    trackEvent('hotlink_clicked', {
      link_id: link.id,
      link_title: link.title,
      link_url: link.url
    })
    vibrate(50)
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }

  if (filteredLinks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔍</div>
        <p>검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>🔥 HOT LINKS</h2>
        <p className={styles.subtitle}>지금 가장 핫한 링크들</p>
      </div>

      <div className={styles.linkGrid}>
        {filteredLinks.map((link, index) => (
          <motion.div
            key={link.id}
            className={`${styles.linkCard} ${link.isHot ? styles.hot : ''}`}
            onClick={() => handleLinkClick(link)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {link.isHot && (
              <div className={styles.hotBadge}>🔥 HOT</div>
            )}
            
            <div className={styles.linkThumbnail}>{link.thumbnail}</div>
            
            <div className={styles.linkContent}>
              <h3 className={styles.linkTitle}>{link.title}</h3>
              <p className={styles.linkDescription}>{link.description}</p>
              
              <div className={styles.linkStats}>
                <span className={styles.clicks}>
                  👥 {formatNumber(link.clicks)}
                </span>
                <span className={styles.external}>↗️</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HotLinks