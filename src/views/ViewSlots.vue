<script setup>
	import { ref, onMounted } from "vue";
	import { useSupabase } from "@/stores/useSupabase.js";

	import { slotStatusMap, slotStatusOptions } from "@/json/constants.js";

	onMounted(() => {
		getSlots();
	});

	const supabaseStore = useSupabase();
	const supabase = supabaseStore.getClient;
	const currentUser = supabaseStore.getUser;

	const loadingGetSlots = ref(false);

	const slots = ref([]);

	async function getSlots() {
		loadingGetSlots.value = true;

		try {
			const { data, error } = await supabase
				.from("slots")
				.select()
				.eq("professional_id", currentUser.id);
			if (error) {
				throw error;
			}
			slots.value = data.filter(
				(slot) => slot.status === slotStatusMap["Disponible"]
			);
		} catch (err) {
			console.log(err);
		} finally {
			loadingGetSlots.value = false;
		}
	}
</script>

<template>
	<Button
		@click="getSlots"
		:loading="loadingGetSlots"
		label="Get Slots"
	></Button>

	<div class="flex w-full">
		<div
			v-for="slot of slots"
			:key="slot.id"
		>
			{{
				new Date(slot.start).toLocaleDateString("es", {
					hour: "numeric",
					minute: "numeric",
				})
			}}
			{{ slotStatusOptions[slot.status].label }}
		</div>
	</div>
</template>
