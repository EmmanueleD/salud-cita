<script setup>
	import { useSupabase } from "@/stores/useSupabase.js";
	import { RouterView, useRouter } from "vue-router";
	const { logout, supabaseLoading } = useSupabase();
	const router = useRouter();

	async function handleLogout() {
		await logout(router);
	}
</script>
<template>
	<h1>Dis is de defoult templeit</h1>
	<Button
		:loading="supabaseLoading"
		@click="handleLogout"
		label="Logout"
	></Button>
	<RouterView />
</template>
