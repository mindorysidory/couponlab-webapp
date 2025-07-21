import React from 'react'
import ReactDOM from 'react-dom/client'

// App 컴포넌트를 같은 파일에 정의
const App = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
          🎲 쿠폰랩
        </h1>
        <h2 style={{ color: '#1f2937', marginBottom: '15px' }}>
          할인코드 전문 연구소
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          검증된 할인 정보만을 제공하여 현명한 소비를 돕는 서비스
        </p>
        
        <div style={{ 
          backgroundColor: '#eff6ff', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>
            🎉 배포 성공!
          </h3>
          <p style={{ color: '#1f2937' }}>
            Vercel 배포가 성공적으로 완료되었습니다!
          </p>
        </div>

        <div style={{ fontSize: '14px', color: '#9ca3af' }}>
          © 2025 CouponLab. All rights reserved.
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
