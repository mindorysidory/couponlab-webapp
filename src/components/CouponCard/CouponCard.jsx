import React from 'react'
import { motion } from 'framer-motion'
import useStore from '../../store/useStore'
import { copyToClipboard, showToast, formatNumber, trackEvent, vibrate } from '../../utils/helpers'
import styles from './CouponCard.module.css'

const CouponCard = ({ coupon }) => {
  const { favorites, toggleFavorite } = useStore()

  const handleCodeClick = async (e) => {
    e.stopPropagation()
    
    const success = await copyToClipboard(coupon.code)
    if (success) {
      showToast(`🎉 할인코드 "${coupon.code}"가 복사되었습니다!`)
      vibrate([100, 50, 100])
      trackEvent('coupon_copied', { 
        coupon_id: coupon.id, 
        coupon_title: coupon.title 
      })
    } else {
      showToast('❌ 복사에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const handleCardClick = () => {
    trackEvent('coupon_card_viewed', { 
      coupon_id: coupon.id,
      coupon_title: coupon.title 
    })
    vibrate(30)
  }

  return (
    <motion.div 
      className={styles.card}
      onClick={handleCardClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      {/* 첫 번째 줄: 랭킹 + 사이트명 + New + 설명 + 할인율 */}
      <div className={styles.firstLine}>
        <div className={styles.leftSection}>
          <span className={styles.rank}>#{coupon.rank}</span>
          <h3 className={`${styles.title} coupon-title`}>{coupon.title}</h3>
          {coupon.isNew && (
            <span className={styles.newBadge}>NEW</span>
          )}
          <p className={`${styles.description} coupon-description`}>
            {coupon.description}
          </p>
        </div>
        <div className={`${styles.discountBadge} discount-badge`}>
          {coupon.discount} 할인
        </div>
      </div>

      {/* 두 번째 줄: 별점 + 사용자 + 기간 + 할인코드 (클릭 가능) */}
      <div className={styles.secondLine}>
        <div className={styles.stats}>
          <span className={styles.stat}>
            ⭐ {coupon.popularity}
          </span>
          <span className={styles.stat}>
            👥 {formatNumber(coupon.clicks)}
          </span>
          <span className={styles.stat}>
            📅 ~{coupon.validUntil.slice(5)}
          </span>
        </div>

        <div className={styles.actions}>
          <code 
            className={styles.code}
            onClick={handleCodeClick}
            style={{ cursor: 'pointer' }}
            title="클릭하면 복사됩니다"
          >
            {coupon.code}
          </code>
        </div>
      </div>
    </motion.div>
  )
}

export default CouponCard