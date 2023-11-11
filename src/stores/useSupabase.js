import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_APIKEY
);

export const useSupabase = defineStore("supabase", () => {
	const client = ref(supabase);
	const loading = ref(false);
	const user = useLocalStorage("user", null);
	const session = useLocalStorage("session", null);

	const supabaseLoading = computed(() => {
		return loading.value;
	});

	const getClient = computed(() => {
		return client.value;
	});

	const getUser = computed(() => {
		return JSON.parse(user.value);
	});

	const getSession = computed(() => {
		return JSON.parse(session.value);
	});

	async function register(email, password, full_name, username, role, router) {
		loading.value = true;
		if (!email || !password) return;
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				// options: {
				// 	data: {
				// 		full_name,
				// 		username,
				// 		role,
				// 	},
				// },
			});
			if (error) throw error;
			user.value = JSON.stringify(data.user);
			session.value = JSON.stringify(data.session);
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading.value = false;
			router.push({ name: "home" });
		}
	}

	async function login(email, password, router) {
		if (!email || !password) return;
		loading.value = true;
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw error;
			user.value = JSON.stringify(data.user);
			session.value = JSON.stringify(data.session);
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading.value = false;
			router.push({ name: "home" });
		}
	}

	async function logout(router) {
		loading.value = true;
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading.value = false;
			user.value = null;
			session.value = null;
			console.log("logout ");
			router.push({ name: "auth" });
		}
	}

	return {
		getClient,
		getUser,
		getSession,
		supabaseLoading,
		register,
		login,
		logout,
	};
});
