<script setup>
	import { computed } from "vue";
	import { useSupabase } from "@/stores/useSupabase.js";
	import { RouterView } from "vue-router";
	import DefaultTemplate from "@/views/template/DefaultTemplate.vue";
	const supabase = useSupabase();
	const currentUser = computed(() => supabase.getUser);
</script>

<template>
	<DefaultTemplate v-if="currentUser" />
	<RouterView v-else />
</template>
