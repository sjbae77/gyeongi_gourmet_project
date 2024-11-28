import { createStore } from "vuex";
import { auth } from "../firebase"; // Firebase 초기화 파일
import { onAuthStateChanged, signOut } from "firebase/auth";

const store = createStore({
  state: {
    user: null, // 로그인한 사용자 정보 저장
  },
  mutations: {
    setUser(state, user) {
      state.user = user; // 사용자 정보 저장
    },
    clearUser(state) {
      state.user = null; // 로그아웃 시 사용자 정보 초기화
    },
  },
  actions: {
    // Firebase의 인증 상태를 구독
    fetchUser({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("setUser", user); // 로그인된 사용자 저장
        } else {
          commit("clearUser"); // 로그아웃 처리
        }
      });
    },
    // 로그아웃 기능
    async logout({ commit }) {
      try {
        await signOut(auth);
        commit("clearUser"); // 상태 초기화
        console.log("User logged out.");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user, // 사용자가 로그인 상태인지 확인
    currentUser: (state) => state.user, // 현재 로그인된 사용자 정보 반환
  },
});

onAuthStateChanged(auth, (user) => {
  console.log(user)
  if (user) {
    // 사용자 로그인 상태
    console.log("현재 로그인된 사용자:", user.email);
  } else {
    // 사용자 로그아웃 상태
    console.log("로그인된 사용자가 없습니다.");
  }
});

export default store;