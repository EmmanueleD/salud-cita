import { createRouter, createWebHistory } from "vue-router";
import { useSupabase } from "@/stores/useSupabase";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			meta: { requiresAuth: true },
			beforeEnter: authMiddleware,
			component: () => import("../views/HomeView.vue"),
		},
		{
			path: "/auth",
			name: "auth",
			beforeEnter: authMiddleware,
			component: () => import("../views/Auth.vue"),
		},
		{
			path: "/setup-slots",
			name: "setup-slots",
			meta: { requiresAuth: true },
			beforeEnter: authMiddleware,
			component: () => import("../views/SetupSlots.vue"),
		},
		{
			path: "/view-slots",
			name: "view-slots",
			meta: { requiresAuth: true },
			beforeEnter: authMiddleware,
			component: () => import("../views/ViewSlots.vue"),
		},
	],
});

function authMiddleware(to, from, next) {
	const { getUser } = useSupabase();
	if (to.meta.requiresAuth && !getUser) {
		next({ name: "auth" });
	} else {
		next();
	}
}

export default router;
