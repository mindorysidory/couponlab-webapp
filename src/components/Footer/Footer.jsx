import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 로고 섹션 */}
        <div className={styles.logoSection}>
          <svg className={styles.footerLogo} viewBox="0 0 32 32">
            <defs>
              <radialGradient id="goldGradientFooter" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#fff59d"/>
                <stop offset="70%" stopColor="#ffca28"/>
                <stop offset="100%" stopColor="#ffb300"/>
              </radialGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="#000000"/>
            <circle cx="16" cy="16" r="12" 
                    fill="url(#goldGradientFooter)" 
                    stroke="#ffb300" 
                    strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="8" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.3)" 
                    strokeWidth="0.5"/>
            <circle cx="16" cy="16" r="2" 
                    fill="rgba(255,255,255,0.4)"/>
            <circle cx="13" cy="12" r="1.5" 
                    fill="rgba(255,255,255,0.6)"/>
          </svg>
          <h3 className={styles.footerTitle}>쿠폰랩</h3>
        </div>

        <p className={styles.description}>
          최고의 할인 혜택을 찾아드립니다
        </p>

        <p className={styles.tagline}>
          매일 업데이트되는 최신 쿠폰과 핫한 링크들로<br />
          스마트한 쇼핑의 즐거움을 경험해보세요.
        </p>

        {/* 베타 안내 */}
        <div className={styles.betaNotice}>
          <p>🚀 현재 베타 서비스 중입니다</p>
          <p>
            더 나은 서비스를 위해 지속적으로 개선하고 있습니다. 
            피드백이나 제안사항이 있으시면 언제든 알려주세요!
          </p>
        </div>

        {/* 링크 */}
        <div className={styles.links}>
          <a href="/terms.html" target="_blank" className={styles.link}>이용약관</a>
          <a href="mailto:tjsalg1@gmail.com" className={styles.link}>개선 피드백/문의하기</a>
        </div>

        {/* 저작권 */}
        <div className={styles.copyright}>
          <p>© 2025 쿠폰랩. All rights reserved.</p>
          <p>
            본 서비스는 쿠폰 정보 제공과 제휴 마케팅을 통해 운영됩니다. 
            일부 링크를 통한 구매 시 소정의 수수료를 받을 수 있습니다.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer