import { createWebHistory, createRouter } from "vue-router";
// import { createRouter } from "vue-router";
import store from "./store/index"; // Vuex Store 가져오기

// 컴포넌트
import MainPage from "./components/MainPage.vue";
import RestaurantListPage from "./components/RestaurantListPage.vue";
import LocationPage from "./components/LocationPage.vue";
import LoginPage from "./components/LoginPage.vue";
import SignUpPage from "./components/SignUpPage.vue";
import Detail from "./components/RestaurantDetail.vue";
import Review from "./components/ReviewCont.vue";
import ReviewWrite from "./components/ReviewWrite.vue";

const router = createRouter({
  history: createWebHistory(),
  mode: 'hash', // history 대신 hash 사용
  routes: [ // 라우터 인스턴스 생성
    {
      path: "/gyeongi_gourmet_page", // 주소
      name: "Main",
      component: MainPage, // <router-view>에서 보여질 컴포넌트
    },
    {
      path: "/RestaurantList", // 주소
      name: "RestaurantList",
      component: RestaurantListPage, // <router-view>에서 보여질 컴포넌트
    },
    {
      path: "/Location", // 주소
      name: "Location",
      component: LocationPage, // <router-view>에서 보여질 컴포넌트
    },
    {
      path: "/Login", // 주소
      name: "Login",
      component: LoginPage, // <router-view>에서 보여질 컴포넌트
    },
    {
      path: "/SignUp", // 주소
      name: "SignUp",
      component: SignUpPage, // <router-view>에서 보여질 컴포넌트
    },
    {
      path: "/Detail",
      name: "Detail",
      component: Detail
    },
    {
      path: "/Review",
      name: "Review",
      component: Review
    },
    {
      path: "/ReviewWrite",
      name: "ReviewWrite",
      component: ReviewWrite
    },
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.state.user; // Vuex의 사용자 상태 확인
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 인증이 필요한 페이지에 접근하려면 로그인 페이지로 리다이렉트
    next({ name: "Login" });
  } else {
    next(); // 접근 허용
  }
});

export default router;
