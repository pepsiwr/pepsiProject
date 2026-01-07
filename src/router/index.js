import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '@/view/login.vue')
    },
    {
        path: '/registar',
        name: 'registar',
        component: () => import(/* webpackChunkName: "about" */ '@/view/registar.vue')
    }, {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "about" */ '@/view/dashboard.vue'),
        // เพิ่ม meta เพื่อบอกว่าหน้านี้ต้องมีการตรวจสอบสิทธิ์ (Authentication)
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(), // ใช้ History Mode เพื่อให้ URL ดูสวยงาม (ไม่มี #)
    routes
})
router.beforeEach((to, from, next) => {
    // เช็คว่าหน้าที่จะไป (to) มีการตั้งค่า meta: { requiresAuth: true } หรือไม่
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // ดึงข้อมูลจาก sessionStorage (สมมติว่าตอน login คุณเก็บไว้ในชื่อ 'user')
    const isAuthenticated = sessionStorage.getItem('userInfo');

    if (requiresAuth && !isAuthenticated) {
        // ถ้าต้องใช้สิทธิ์แต่ไม่มีข้อมูลใน session ให้ส่งไปหน้า login
        next('/login');
    } else {
        // ถ้ามีข้อมูล หรือหน้านั้นไม่ต้องใช้สิทธิ์ ก็ให้ผ่านไปได้ปกติ
        next();
    }
});
export default router