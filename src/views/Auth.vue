<script setup>
	import { ref } from "vue";
	import { useSupabase } from "@/stores/useSupabase.js";
	import { useRouter } from "vue-router";
	import BaseInput from "@/components/base/BaseInput.vue";

	const { register, login, supabaseLoading } = useSupabase();
	const router = useRouter();

	const email = ref("");
	const password = ref("");
	const full_name = ref("");
	const username = ref("");
	const role = ref(null);

	const ROLES = [
		{
			label: "Profesional",
			value: 1,
		},
		{
			label: "Paciente",
			value: 2,
		},
	];

	const MODES = {
		1: {
			label: "Login",
			formTitle: "Login",
			buttonLabel: "Login",
			message: "No tienes una cuenta?",
		},
		2: {
			label: "Registrarse",
			formTitle: "Registrarse",
			buttonLabel: "Registrarse",
			message: "Ya tienes una cuenta?",
		},
	};

	const mode = ref(1);

	async function handleSubmit() {
		if (mode.value === 1) {
			await login(email.value, password.value, router);
		}
		if (mode.value === 2) {
			await register(
				email.value,
				password.value,
				full_name.value,
				username.value,
				role.value,
				router
			);
		}
	}

	function toggleMode() {
		mode.value = mode.value === 1 ? 2 : 1;
	}
</script>

<template>
	<h1>{{ MODES[mode].label }}</h1>
	<form
		@submit.prevent="handleSubmit"
		class="flex flex-column"
	>
		<div class="w-full grid">
			<BaseInput
				label="Email"
				class="col-12"
			>
				<InputText v-model="email"></InputText>
			</BaseInput>

			<BaseInput
				label="Nombre completo"
				class="col-12"
			>
				<InputText v-model="full_name"></InputText>
			</BaseInput>

			<BaseInput
				label="Nombre de usuario"
				class="col-12"
			>
				<InputText v-model="username"></InputText>
			</BaseInput>

			<BaseInput
				label="Rol"
				class="col-12"
			>
				<Dropdown
					:options="ROLES"
					optionLabel="label"
					optionValue="value"
					v-model="role"
				></Dropdown>
			</BaseInput>

			<BaseInput
				label="Contraseña"
				class="col-12"
			>
				<Password v-model="password"></Password>
			</BaseInput>
		</div>

		<Button
			:loading="supabaseLoading"
			type="submit"
			:label="MODES[mode].buttonLabel"
			class="mt-2"
		></Button>

		<Button
			@click="toggleMode"
			text
			>{{ MODES[mode].message }}</Button
		>
	</form>
</template>
