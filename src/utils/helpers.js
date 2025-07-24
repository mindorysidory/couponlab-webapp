// 유틸리티 함수들
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    // 폴백 방법
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (err) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

export const showToast = (message, duration = 3000) => {
  // 기존 토스트 제거
  const existingToast = document.querySelector('.toast')
  if (existingToast) {
    existingToast.remove()
  }

  // 새 토스트 생성
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = message
  document.body.appendChild(toast)

  // 자동 제거
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove()
    }
  }, duration)
}

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

export const trackEvent = (eventName, data = {}) => {
  // Google Analytics 또는 기타 분석 도구 연동
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, data)
  }
  console.log('Event tracked:', eventName, data)
}

export const vibrate = (pattern = [100]) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}