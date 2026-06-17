import { create } from "zustand";

// 최근 본 상품 하나를 저장할 때 필요한 최소 정보
// id: 상세 페이지로 이동하거나 중복을 확인할 때 사용
// image: 최근 본 상품 영역에 썸네일로 보여줄 때 사용
type RecentViewItem = {
  id: string;
  image: string;
};

interface IRecentViewStore {
  // 최근 본 상품 목록. 객체 배열이므로 [{ id, image }, ...] 형태로 저장된다.
  recentViewItems: RecentViewItem[];

  // 최근 본 상품을 하나 추가하는 함수
  // 문자열 id만 받지 않고, id와 image가 들어 있는 객체 하나를 받는다.
  addRecentViewItem: (item: RecentViewItem) => void;
}

export const useRecentViewStore = create<IRecentViewStore>((set) => ({
  recentViewItems: [],

  addRecentViewItem: (item) => {
    // set은 Zustand store의 state를 변경할 때 사용하는 함수다.
    // React의 setState처럼 새 상태를 반환하면 store 값이 갱신된다.
    // set((state) => ...) 형태로 쓰면 현재 store 상태를 state 매개변수로 받을 수 있다.
    return set((state) => {
      // state.recentViewItems는 현재 store에 저장되어 있는 최근 본 상품 배열이다.
      // some은 배열 안에서 조건을 만족하는 값이 하나라도 있으면 true를 반환한다.
      // 여기서는 이미 같은 id의 상품이 최근 본 목록에 있는지 확인한다.
      const alreadyViewed = state.recentViewItems.some((recentItem) => {
        return item.id === recentItem.id;
      });

      // 이미 본 상품이면 중복으로 추가하지 않고 기존 state를 그대로 유지한다.
      if (alreadyViewed) return state;

      return {
        // 새 상품을 배열 맨 앞에 추가한다.
        // 기존 최근 본 상품들은 뒤에 이어 붙인다.
        // slice(0, 3)으로 앞에서부터 3개만 남겨 최대 3개 제한을 만든다.
        recentViewItems: [item, ...state.recentViewItems].slice(0, 3),
      };
    });
  },
}));
