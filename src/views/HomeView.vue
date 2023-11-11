<script setup>
	import { useSupabase } from "@/stores/useSupabase.js";
	const supabase = useSupabase();

	const user = supabase.getUser;
</script>

<template>
	<h1>Home</h1>
	{{ user }}
</template>
