import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // iOS 디바이스 확인
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // 이미 설치되었는지 확인
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
    setIsInstalled(isInStandaloneMode)

    // PWA 설치 이벤트 리스너
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (isIOS) {
      // iOS 사용자를 위한 안내
      alert('iOS에서 설치하려면:\n1. 공유 버튼(↗️) 터치\n2. "홈 화면에 추가" 선택')
      return
    }

    if (deferredPrompt) {
      // 안드로이드 Chrome 설치
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setShowPrompt(false)
        setIsInstalled(true)
      }
      
      setDeferredPrompt(null)
    }
  }

  // 이미 설치되었거나 표시할 필요 없으면 숨기기
  if (isInstalled || (!showPrompt && !isIOS)) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        style={{
          position: 'fixed',
          bottom: '6rem', // 하단 네비게이션 위에
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          maxWidth: '380px',
          width: 'calc(100% - 2rem)',
          margin: '0 1rem'
        }}
      >
        <motion.button
          onClick={handleInstallClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            background: 'linear-gradient(45deg, #16a34a, #22c55e)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>📱</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>
              앱으로 설치하기
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
              {isIOS ? '공유 버튼 → 홈 화면에 추가' : '홈에 설치하고 매일 할인받기'}
            </div>
          </div>
          <span style={{ fontSize: '1rem', opacity: 0.8 }}>→</span>
        </motion.button>
        
        {/* 닫기 버튼 */}
        <button
          onClick={() => setShowPrompt(false)}
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#000',
            color: '#fff',
            border: '1px solid #333',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

export default InstallButton