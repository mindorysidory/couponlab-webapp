import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // 상태
      activeCategory: 'all',
      searchQuery: '',
      favorites: new Set(),
      viewMode: 'coupons', // 'coupons' | 'hotlinks'
      showAllItems: false,
      
      // 액션
      setActiveCategory: (category) => set({ activeCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setShowAllItems: (show) => set({ showAllItems: show }),
      
      // 즐겨찾기 관리
      toggleFavorite: (id) => set((state) => {
        const newFavorites = new Set(state.favorites)
        if (newFavorites.has(id)) {
          newFavorites.delete(id)
        } else {
          newFavorites.add(id)
        }
        return { favorites: newFavorites }
      }),
      
      // 초기화
      reset: () => set({
        activeCategory: 'all',
        searchQuery: '',
        showAllItems: false
      })
    }),
    {
      name: 'couponlab-storage',
      partialize: (state) => ({
        favorites: Array.from(state.favorites),
        activeCategory: state.activeCategory
      }),
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error) {
            console.log('저장된 데이터 로드 중 오류:', error)
          } else if (state) {
            // Set 객체로 변환
            state.favorites = new Set(state.favorites || [])
          }
        }
      }
    }
  )
)

export default useStore