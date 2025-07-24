{/* 쿠폰 목록 헤더 */}
<div style={{ 
  padding: '1rem', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center' 
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <h2 style={{ 
      margin: 0, 
      fontSize: '1.125rem', 
      fontWeight: '600',
      color: 'var(--text-primary)'
    }}>
      🎫 할인 쿠폰
    </h2>
    <span style={{
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      background: 'var(--background-card)',
      padding: '0.25rem 0.5rem',
      borderRadius: '12px',
      border: '1px solid var(--border-color)'
    }}>
      💡 코드를 클릭하면 복사!
    </span>
  </div>
  <span style={{ 
    fontSize: '0.875rem', 
    color: 'var(--text-secondary)' 
  }}>
    총 {filteredCoupons.length}개
  </span>
</div>