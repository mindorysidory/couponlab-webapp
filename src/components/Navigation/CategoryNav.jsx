import React from 'react'
import { motion } from 'framer-motion'
import useStore from '../../store/useStore.js'  // ← .js 추가
import { categories } from '../../data/coupons.js'  // ← .js 추가
import { hotLinkCategories } from '../../data/hotlinks.js'  // ← .js 추가
import styles from './Navigation.module.css'

const CategoryNav = () => {
  const { activeCategory, setActiveCategory, viewMode } = useStore()
  
  const currentCategories = viewMode === 'coupons' ? categories : hotLinkCategories

  return (
    <div className={styles.categoryNav}>
      <div className={styles.categoryScroll}>
        {currentCategories.map((category) => (
          <motion.button
            key={category.id}
            className={`${styles.categoryItem} ${
              activeCategory === category.id ? styles.active : ''
            }`}
            onClick={() => setActiveCategory(category.id)}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.categoryIcon}>{category.icon}</span>
            <span className={styles.categoryName}>{category.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default CategoryNav