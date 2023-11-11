<script setup>
	import { ref } from "vue";
	import { useSupabase } from "@/stores/useSupabase.js";

	import BaseInput from "@/components/base/BaseInput.vue";

	import { weekDayOptions } from "@/json/constants.js";

	const supabaseStore = useSupabase();
	const supabase = supabaseStore.getClient;
	const currentUser = supabaseStore.getUser;

	const periodoSlots = ref([]);
	const weekDays = ref([]);
	const startTime = ref();
	const endTime = ref();
	const slotDuration = ref(60);

	async function handleSubmit() {
		const startDate = new Date(periodoSlots.value[0]);
		const endDate = new Date(periodoSlots.value[1]);
		let slotDurationMinutes = Number(slotDuration.value);

		for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
			if (weekDays.value.includes(d.getDay())) {
				let startDateTime = new Date(d);
				startDateTime.setHours(startTime.value.getHours());
				startDateTime.setMinutes(startTime.value.getMinutes());

				let endDateTime = new Date(d);
				endDateTime.setHours(endTime.value.getHours());
				endDateTime.setMinutes(endTime.value.getMinutes());

				for (
					let slotTime = new Date(startDateTime); // Create a new Date object here
					slotTime < endDateTime;
					slotTime.setMinutes(slotTime.getMinutes() + slotDurationMinutes)
				) {
					let slotEndTime = new Date(
						slotTime.getTime() + slotDurationMinutes * 60000
					);

					// Check if the slotEndTime is after the endDateTime
					if (slotEndTime > endDateTime) {
						break;
					}

					// Insert into Supabase
					const { data, error } = await supabase.from("slots").insert([
						{
							start: slotTime,
							end: slotEndTime,
							status: 0,
							professional_id: currentUser.id,
							patient_id: null,
						},
					]);

					if (error) {
						console.error("Error inserting data: ", error);
					}
				}
			}
		}
	}
</script>

<template>
	<h1>Slots setup</h1>

	<p>Acá vas a poder gestionar los slots a abilitar para las reservas</p>
	<p>
		En la proxima pagina vas a poder gestionar las exepciones (horarios no
		disponibles, dias, no disponibles, etc...)
	</p>

	<form @submit.prevent="handleSubmit">
		<BaseInput
			label="Indica el periodo en le cual quieres habilitar las reservas"
		>
			<Calendar
				:minDate="new Date()"
				selectionMode="range"
				:manualInput="false"
				v-model="periodoSlots"
			></Calendar>
		</BaseInput>

		<BaseInput
			label="Indica en que dias de la semana quieres habilitar las reservas"
		>
			<MultiSelect
				:options="weekDayOptions"
				optionLabel="label"
				optionValue="value"
				v-model="weekDays"
			></MultiSelect>
		</BaseInput>

		<BaseInput
			label="indica en que horarios cada dia de la semana quieres habilitar las reservas"
		>
			<Calendar
				id="calendar-timeonly"
				v-model="startTime"
				timeOnly
				placeholder="desde"
			/>
			<Calendar
				id="calendar-timeonly"
				v-model="endTime"
				timeOnly
				placeholder="hasta"
			/>
		</BaseInput>

		<BaseInput label="Cuanto tiempo debe durar cada slot?">
			<InputText
				inputmode="numeric"
				pattern="[0-9]*"
				v-model="slotDuration"
			></InputText>
		</BaseInput>

		<Button
			type="submit"
			label="Submit"
		></Button>
	</form>
</template>
