import { createWebHistory, createRouter } from "vue-router";

// 컴포넌트
import MainPage from "./components/MainPage.vue";
import RestaurantListPage from "./components/RestaurantListPage.vue";
import LocationPage from "./components/LocationPage.vue";
import LoginPage from "./components/LoginPage.vue";
import SignUpPage from "./components/SignUpPage.vue";
import Detail from "./components/RestaurantDetail.vue";
import Review from "./components/ReviewCont.vue";

// 라우터 인스턴스 생성
const routes = [
  {
    path: "/", // 주소
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
  // {
  //   path: "/Detail/:id",   // 동적 라우트 매칭
  //   name: "DetailView",
  //   component: DetailView
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
