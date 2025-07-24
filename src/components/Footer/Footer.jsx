import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 로고 섹션 */}
        <div className={styles.logoSection}>
          <svg className={styles.footerLogo} viewBox="0 0 32 32">
            <defs>
              <radialGradient id="goldGradientFooter" cx="40%" cy="30%">
                <stop offset="0%" stopColor="#fff59d"/>
                <stop offset="100%" stopColor="#ffca28"/>
              </radialGradient>
            </defs>
            <rect width="32" height="32" rx="7" fill="#000000"/>
            <circle cx="16" cy="16" r="11" 
                    fill="url(#goldGradientFooter)" 
                    stroke="#ffb300" 
                    strokeWidth="0.5"/>
            <circle cx="14" cy="13" r="2" 
                    fill="rgba(255,255,255,0.2)"/>
          </svg>
          <h3 className={styles.footerTitle}>쿠폰랩</h3>
        </div>

        <p className={styles.description}>할인코드 전문 연구소</p>
        <p className={styles.tagline}>
          검증된 할인 정보만을 제공하여<br />
          현명한 소비를 돕는 서비스입니다.
        </p>

        {/* 베타 테스트 안내 */}
        <div className={styles.betaNotice}>
          <p>🚧 현재 베타 테스트 중입니다</p>
          <p>더 나은 서비스를 위해 여러분의 피드백을 기다립니다!</p>
        </div>

        {/* 링크 섹션 */}
        <div className={styles.links}>
          <a 
            href="#" 
            className={styles.link}
            onClick={(e) => {
              e.preventDefault()
              alert('준비 중인 페이지입니다.')
            }}
          >
            이용약관
          </a>
          <a 
            href="#" 
            className={styles.link}
            onClick={(e) => {
              e.preventDefault()
              alert('준비 중인 페이지입니다.')
            }}
          >
            개인정보처리방침
          </a>
          <a 
            href="mailto:tjsalg1@gmail.com?subject=쿠폰랩 피드백&body=안녕하세요! 쿠폰랩에 대한 피드백을 보내드립니다." 
            className={styles.link}
          >
            피드백 보내기
          </a>
        </div>

        {/* 저작권 */}
        <div className={styles.copyright}>
          <p>© {currentYear} CouponLab. All rights reserved.</p>
          <p>Made with ❤️ in Seoul, Korea</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer