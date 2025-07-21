import React, { useState, useEffect } from 'react';
import { Heart, Search, Copy, Star, TrendingUp, Clock, Gift, ChevronDown, ChevronUp, Plus, Edit, Trash2, Save } from 'lucide-react';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [favoriteItems, setFavoriteItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showAllItems, setShowAllItems] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [discountItems, setDiscountItems] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newCoupon, setNewCoupon] = useState({
    title: '',
    category: 'fashion',
    discount: '',
    code: '',
    description: '',
    validUntil: '',
    brand: '',
    popularity: 4.0,
    isNew: false
  });

  const categories = [
    { id: 'all', name: '전체', icon: '🌟' },
    { id: 'fashion', name: '패션', icon: '👗' },
    { id: 'food', name: '음식', icon: '🍔' },
    { id: 'electronics', name: '전자제품', icon: '📱' },
    { id: 'travel', name: '여행', icon: '✈️' },
    { id: 'beauty', name: '뷰티', icon: '💄' },
    { id: 'home', name: '홈&리빙', icon: '🏠' },
    { id: 'ai', name: 'AI서비스', icon: '🤖' },
    { id: 'design', name: '디자인툴', icon: '🎨' },
    { id: 'dev', name: '개발툴', icon: '💻' },
    { id: 'education', name: '교육', icon: '📚' },
    { id: 'subscription', name: '구독서비스', icon: '📺' },
    { id: 'productivity', name: '생산성', icon: '⚡' },
    { id: 'cloud', name: '클라우드', icon: '☁️' }
  ];

  // 초기 데이터 로드 (실제 환경에서는 API에서 가져옴)
  useEffect(() => {
    const initialData = [
      { id: 1, title: '무신사 스토어', category: 'fashion', discount: '15%', code: 'MUSINSA15', description: '브랜드 의류 최대 15% 할인', validUntil: '2025.08.15', popularity: 4.8, isNew: true, clicks: 12340, brand: '무신사', rank: 1 },
      { id: 2, title: '배달의민족', category: 'food', discount: '3000원', code: 'BAEMIN3K', description: '최소주문 15,000원 이상 시', validUntil: '2025.07.30', popularity: 4.6, isNew: false, clicks: 11250, brand: '배달의민족', rank: 2 },
      { id: 3, title: '쿠팡 로켓배송', category: 'electronics', discount: '20%', code: 'ROCKET20', description: '전자제품 로켓배송 20% 할인', validUntil: '2025.08.01', popularity: 4.9, isNew: true, clicks: 10890, brand: '쿠팡', rank: 3 },
      { id: 4, title: 'ChatGPT Plus', category: 'ai', discount: '30%', code: 'GPTPLUS30', description: 'AI 서비스 1년 구독 할인', validUntil: '2025.08.20', popularity: 4.7, isNew: true, clicks: 9876, brand: 'OpenAI', rank: 4 },
      { id: 5, title: 'Figma Pro', category: 'design', discount: '25%', code: 'FIGMA25', description: '디자인 툴 프로 플랜 할인', validUntil: '2025.09.15', popularity: 4.8, isNew: false, clicks: 8765, brand: 'Figma', rank: 5 },
      { id: 6, title: 'Canva Pro', category: 'design', discount: '40%', code: 'CANVA40', description: '디자인 템플릿 무제한 이용', validUntil: '2025.08.30', popularity: 4.6, isNew: false, clicks: 8234, brand: 'Canva', rank: 6 },
      { id: 7, title: '아고다 호텔예약', category: 'travel', discount: '25%', code: 'AGODA25', description: '해외호텔 최대 25% 할인', validUntil: '2025.09.15', popularity: 4.7, isNew: false, clicks: 7890, brand: '아고다', rank: 7 },
      { id: 8, title: 'GitHub Copilot', category: 'dev', discount: '50%', code: 'COPILOT50', description: 'AI 코딩 어시스턴트 할인', validUntil: '2025.08.10', popularity: 4.9, isNew: true, clicks: 7456, brand: 'GitHub', rank: 8 },
      { id: 9, title: 'Notion Pro', category: 'productivity', discount: '35%', code: 'NOTION35', description: '팀 워크스페이스 할인', validUntil: '2025.09.01', popularity: 4.5, isNew: false, clicks: 7123, brand: 'Notion', rank: 9 },
      { id: 10, title: '올리브영', category: 'beauty', discount: '10%', code: 'OLIVE10', description: '뷰티 제품 추가 10% 할인', validUntil: '2025.07.25', popularity: 4.5, isNew: false, clicks: 6987, brand: '올리브영', rank: 10 },
      { id: 11, title: 'Netflix', category: 'subscription', discount: '20%', code: 'NETFLIX20', description: '스트리밍 서비스 첫 달 할인', validUntil: '2025.08.15', popularity: 4.4, isNew: false, clicks: 6543, brand: 'Netflix', rank: 11 },
      { id: 12, title: 'Adobe Creative', category: 'design', discount: '30%', code: 'ADOBE30', description: '크리에이티브 클라우드 할인', validUntil: '2025.08.25', popularity: 4.7, isNew: false, clicks: 6234, brand: 'Adobe', rank: 12 },
      { id: 13, title: 'AWS 클라우드', category: 'cloud', discount: '$100', code: 'AWS100', description: '클라우드 서비스 크레딧', validUntil: '2025.09.30', popularity: 4.6, isNew: true, clicks: 5987, brand: 'AWS', rank: 13 },
      { id: 14, title: 'Coursera Plus', category: 'education', discount: '45%', code: 'COURSERA45', description: '온라인 강의 무제한 수강', validUntil: '2025.08.20', popularity: 4.3, isNew: false, clicks: 5678, brand: 'Coursera', rank: 14 },
      { id: 15, title: 'Slack Pro', category: 'productivity', discount: '25%', code: 'SLACK25', description: '팀 커뮤니케이션 툴 할인', validUntil: '2025.08.31', popularity: 4.4, isNew: false, clicks: 5432, brand: 'Slack', rank: 15 },
      { id: 16, title: 'Spotify Premium', category: 'subscription', discount: '3개월', code: 'SPOTIFY3M', description: '음악 스트리밍 3개월 무료', validUntil: '2025.08.15', popularity: 4.2, isNew: false, clicks: 5234, brand: 'Spotify', rank: 16 },
      { id: 17, title: 'Midjourney', category: 'ai', discount: '20%', code: 'MJ20', description: 'AI 이미지 생성 서비스', validUntil: '2025.08.10', popularity: 4.8, isNew: true, clicks: 5123, brand: 'Midjourney', rank: 17 },
      { id: 18, title: 'Udemy', category: 'education', discount: '80%', code: 'UDEMY80', description: '온라인 강의 대폭 할인', validUntil: '2025.08.05', popularity: 4.1, isNew: false, clicks: 4987, brand: 'Udemy', rank: 18 },
      { id: 19, title: 'Zoom Pro', category: 'productivity', discount: '30%', code: 'ZOOM30', description: '화상회의 프로 플랜', validUntil: '2025.08.25', popularity: 4.3, isNew: false, clicks: 4876, brand: 'Zoom', rank: 19 },
      { id: 20, title: '11번가', category: 'electronics', discount: '15%', code: '11ST15', description: '전자제품 쿠폰 할인', validUntil: '2025.08.12', popularity: 4.0, isNew: false, clicks: 4765, brand: '11번가', rank: 20 },
      { id: 21, title: 'Grammarly', category: 'productivity', discount: '50%', code: 'GRAMMAR50', description: '영어 문법 검사 도구', validUntil: '2025.08.20', popularity: 4.2, isNew: false, clicks: 4654, brand: 'Grammarly', rank: 21 },
      { id: 22, title: 'Dropbox Plus', category: 'cloud', discount: '40%', code: 'DROPBOX40', description: '클라우드 스토리지 할인', validUntil: '2025.08.30', popularity: 4.1, isNew: false, clicks: 4543, brand: 'Dropbox', rank: 22 },
      { id: 23, title: 'Shopify', category: 'dev', discount: '3개월', code: 'SHOPIFY3M', description: '이커머스 플랫폼 무료', validUntil: '2025.09.15', popularity: 4.4, isNew: false, clicks: 4432, brand: 'Shopify', rank: 23 },
      { id: 24, title: 'Webflow', category: 'design', discount: '30%', code: 'WEBFLOW30', description: '노코드 웹사이트 빌더', validUntil: '2025.08.25', popularity: 4.3, isNew: false, clicks: 4321, brand: 'Webflow', rank: 24 },
      { id: 25, title: 'Claude Pro', category: 'ai', discount: '25%', code: 'CLAUDE25', description: 'AI 어시스턴트 프로 플랜', validUntil: '2025.08.18', popularity: 4.6, isNew: true, clicks: 4210, brand: 'Anthropic', rank: 25 }
    ];
    
    // 실제 환경에서는 localStorage 대신 실제 데이터베이스 사용
    const savedData = localStorage.getItem('couponlab-data');
    if (savedData) {
      setDiscountItems(JSON.parse(savedData));
    } else {
      setDiscountItems(initialData);
      localStorage.setItem('couponlab-data', JSON.stringify(initialData));
    }
  }, []);

  // 데이터 저장 함수 (실제 환경에서는 API 호출)
  const saveToDatabase = (data) => {
    localStorage.setItem('couponlab-data', JSON.stringify(data));
  };

  // 할인코드 추가
  const addCoupon = () => {
    if (!newCoupon.title || !newCoupon.code) return;
    
    const newItem = {
      ...newCoupon,
      id: Date.now(),
      clicks: 0,
      rank: discountItems.length + 1
    };
    
    const updatedItems = [...discountItems, newItem];
    setDiscountItems(updatedItems);
    saveToDatabase(updatedItems);
    
    setNewCoupon({
      title: '',
      category: 'fashion',
      discount: '',
      code: '',
      description: '',
      validUntil: '',
      brand: '',
      popularity: 4.0,
      isNew: false
    });
    setIsAddingNew(false);
  };

  // 할인코드 수정
  const updateCoupon = (id, updatedData) => {
    const updatedItems = discountItems.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    );
    setDiscountItems(updatedItems);
    saveToDatabase(updatedItems);
    setEditingItem(null);
  };

  // 할인코드 삭제
  const deleteCoupon = (id) => {
    const updatedItems = discountItems.filter(item => item.id !== id);
    setDiscountItems(updatedItems);
    saveToDatabase(updatedItems);
  };

  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favoriteItems);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavoriteItems(newFavorites);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    // 실제 사용 통계 업데이트
    const updatedItems = discountItems.map(item => 
      item.code === code ? { ...item, clicks: item.clicks + 1 } : item
    );
    setDiscountItems(updatedItems);
    saveToDatabase(updatedItems);
  };

  const filteredItems = discountItems
    .filter(item => 
      (activeCategory === 'all' || item.category === activeCategory) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case 'popular': return a.rank - b.rank;
        case 'new': return b.isNew - a.isNew;
        case 'discount': return b.clicks - a.clicks;
        default: return a.rank - b.rank;
      }
    });

  const displayItems = showAllItems ? filteredItems : filteredItems.slice(0, 20);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {/* 3D 큐브 로고 */}
              <div className="relative w-8 h-8" style={{transform: 'perspective(100px) rotateX(15deg) rotateY(15deg)'}}>
                <div className="absolute w-7 h-7 bg-blue-500 border border-blue-600" style={{transform: 'translateZ(14px)'}}></div>
                <div className="absolute w-7 h-7 bg-blue-400 border border-blue-500" style={{transform: 'rotateY(90deg) translateZ(14px)'}}></div>
                <div className="absolute w-7 h-7 bg-blue-300 border border-blue-400" style={{transform: 'rotateX(90deg) translateZ(14px)'}}></div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">쿠폰랩</h1>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowAdmin(!showAdmin)}
                className="p-2 bg-gray-100 rounded-full"
              >
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="브랜드, 상품을 검색해보세요"
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-0 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Admin Panel */}
      {showAdmin && (
        <div className="bg-yellow-50 border-b">
          <div className="max-w-md mx-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">관리자 패널</h3>
              <button 
                onClick={() => setIsAddingNew(true)}
                className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>새 쿠폰 추가</span>
              </button>
            </div>
            
            {/* 새 쿠폰 추가 폼 */}
            {isAddingNew && (
              <div className="bg-white p-4 rounded-lg border mb-3">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    placeholder="서비스명"
                    className="px-3 py-2 border rounded text-sm"
                    value={newCoupon.title}
                    onChange={(e) => setNewCoupon({...newCoupon, title: e.target.value})}
                  />
                  <input
                    placeholder="브랜드명"
                    className="px-3 py-2 border rounded text-sm"
                    value={newCoupon.brand}
                    onChange={(e) => setNewCoupon({...newCoupon, brand: e.target.value})}
                  />
                  <select
                    className="px-3 py-2 border rounded text-sm"
                    value={newCoupon.category}
                    onChange={(e) => setNewCoupon({...newCoupon, category: e.target.value})}
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <input
                    placeholder="할인율 (예: 20%)"
                    className="px-3 py-2 border rounded text-sm"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
                  />
                  <input
                    placeholder="할인코드"
                    className="px-3 py-2 border rounded text-sm"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                  />
                  <input
                    placeholder="유효기간 (2025.08.31)"
                    className="px-3 py-2 border rounded text-sm"
                    value={newCoupon.validUntil}
                    onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})}
                  />
                </div>
                <input
                  placeholder="설명"
                  className="w-full px-3 py-2 border rounded text-sm mb-3"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({...newCoupon, description: e.target.value})}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newCoupon.isNew}
                      onChange={(e) => setNewCoupon({...newCoupon, isNew: e.target.checked})}
                    />
                    <span className="text-sm">신규 쿠폰</span>
                  </label>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setIsAddingNew(false)}
                      className="px-3 py-1.5 border rounded text-sm"
                    >
                      취소
                    </button>
                    <button 
                      onClick={addCoupon}
                      className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1.5 rounded text-sm"
                    >
                      <Save className="w-4 h-4" />
                      <span>저장</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-600">
              총 {discountItems.length}개의 할인코드가 등록되어 있습니다.
            </div>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto">
          <div className="flex overflow-x-auto p-4 space-x-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center min-w-14 p-2 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <span className="text-lg mb-1">{category.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              {[
                { value: 'popular', label: '랭킹순', icon: TrendingUp },
                { value: 'new', label: '최신순', icon: Clock },
                { value: 'discount', label: '인기순', icon: Gift }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSortBy(value)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm transition-colors ${
                    sortBy === value
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              총 {filteredItems.length}개
            </div>
          </div>
        </div>
      </div>

      {/* Deal Cards */}
      <div className="max-w-md mx-auto p-4 space-y-3">
        {displayItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border p-3 relative">
            {/* Admin Controls */}
            {showAdmin && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => setEditingItem(item.id)}
                  className="p-1 bg-blue-100 text-blue-600 rounded"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deleteCoupon(item.id)}
                  className="p-1 bg-red-100 text-red-600 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Editing Form */}
            {editingItem === item.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    defaultValue={item.title}
                    className="px-2 py-1 border rounded text-sm"
                    onBlur={(e) => updateCoupon(item.id, { title: e.target.value })}
                  />
                  <input
                    defaultValue={item.brand}
                    className="px-2 py-1 border rounded text-sm"
                    onBlur={(e) => updateCoupon(item.id, { brand: e.target.value })}
                  />
                  <input
                    defaultValue={item.discount}
                    className="px-2 py-1 border rounded text-sm"
                    onBlur={(e) => updateCoupon(item.id, { discount: e.target.value })}
                  />
                  <input
                    defaultValue={item.code}
                    className="px-2 py-1 border rounded text-sm"
                    onBlur={(e) => updateCoupon(item.id, { code: e.target.value })}
                  />
                </div>
                <input
                  defaultValue={item.description}
                  className="w-full px-2 py-1 border rounded text-sm"
                  onBlur={(e) => updateCoupon(item.id, { description: e.target.value })}
                />
                <button
                  onClick={() => setEditingItem(null)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  완료
                </button>
              </div>
            ) : (
              <>
                {/* First Line: 사이트명 + New + 할인조건 + XX% 할인 */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                    {item.isNew && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                        NEW
                      </span>
                    )}
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-bold">
                    {item.discount} 할인
                  </div>
                </div>

                {/* Second Line: 별 + 사람 + 기간 + 할인코드 + 복사하기 + 좋아요 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      {item.popularity}
                    </span>
                    <span className="flex items-center">
                      👥 {(item.clicks / 1000).toFixed(1)}k
                    </span>
                    <span className="flex items-center">
                      📅 ~{item.validUntil.slice(5)}
   </span>
                 </div>

                 <div className="flex items-center space-x-2">
                   <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono font-bold">
                     {item.code}
                   </code>
                   <button
                     onClick={() => copyCode(item.code)}
                     className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium"
                   >
                     복사
                   </button>
                   <button
                     onClick={() => toggleFavorite(item.id)}
                     className="p-1"
                   >
                     <Heart
                       className={`w-4 h-4 ${
                         favoriteItems.has(item.id)
                           ? 'text-red-500 fill-current'
                           : 'text-gray-400'
                       }`}
                     />
                   </button>
                 </div>
               </div>
             </>
           )}
         </div>
       ))}

       {/* Show More Button */}
       {filteredItems.length > 20 && (
         <div className="text-center py-4">
           <button
             onClick={() => setShowAllItems(!showAllItems)}
             className="flex items-center justify-center space-x-2 mx-auto bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
           >
             <span>
               {showAllItems 
                 ? `Top 20만 보기` 
                 : `전체 ${filteredItems.length}개 보기`
               }
             </span>
             {showAllItems ? (
               <ChevronUp className="w-4 h-4" />
             ) : (
               <ChevronDown className="w-4 h-4" />
             )}
           </button>
         </div>
       )}
     </div>

     {/* Bottom Navigation */}
     <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
       <div className="max-w-md mx-auto">
         <div className="flex justify-around py-2">
           {[
             { name: '홈', icon: '🏠', active: true },
             { name: '카테고리', icon: '📂', active: false },
             { name: '즐겨찾기', icon: '❤️', active: false },
             { name: '마이페이지', icon: '👤', active: false }
           ].map((tab) => (
             <button
               key={tab.name}
               className={`flex flex-col items-center py-2 px-4 ${
                 tab.active ? 'text-blue-600' : 'text-gray-500'
               }`}
             >
               <span className="text-xl mb-1">{tab.icon}</span>
               <span className="text-xs">{tab.name}</span>
             </button>
           ))}
         </div>
       </div>
     </div>

     {/* Footer with Company Info */}
     <div className="bg-gray-100 py-8 mt-8 mb-16">
       <div className="max-w-md mx-auto px-4 text-center">
         <div className="flex items-center justify-center space-x-2 mb-4">
           <div className="relative w-6 h-6" style={{transform: 'perspective(100px) rotateX(15deg) rotateY(15deg)'}}>
             <div className="absolute w-5 h-5 bg-blue-500 border border-blue-600" style={{transform: 'translateZ(10px)'}}></div>
             <div className="absolute w-5 h-5 bg-blue-400 border border-blue-500" style={{transform: 'rotateY(90deg) translateZ(10px)'}}></div>
             <div className="absolute w-5 h-5 bg-blue-300 border border-blue-400" style={{transform: 'rotateX(90deg) translateZ(10px)'}}></div>
           </div>
           <h3 className="font-bold text-gray-900">쿠폰랩</h3>
         </div>
         <p className="text-sm text-gray-600 mb-2">할인코드 전문 연구소</p>
         <p className="text-xs text-gray-500 mb-4">
           검증된 할인 정보만을 제공하여<br />
           현명한 소비를 돕는 서비스입니다.
         </p>
         <div className="flex justify-center space-x-4 text-xs text-gray-400">
           <a href="#" className="hover:text-gray-600">이용약관</a>
           <a href="#" className="hover:text-gray-600">개인정보처리방침</a>
           <a href="#" className="hover:text-gray-600">문의하기</a>
         </div>
         <p className="text-xs text-gray-400 mt-4">
           © 2025 CouponLab. All rights reserved.
         </p>
       </div>
     </div>
   </div>
 );
};

export default App;
