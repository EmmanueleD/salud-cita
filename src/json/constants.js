const weekDayOptions = [
	{
		label: "Lunes",
		value: 1,
	},
	{
		label: "Martes",
		value: 2,
	},
	{
		label: "Miercoles",
		value: 3,
	},
	{
		label: "Jueves",
		value: 4,
	},
	{
		label: "Viernes",
		value: 5,
	},
	{
		label: "Sabado",
		value: 6,
	},
	{
		label: "Domingo",
		value: 0,
	},
];

const weekDayMap = {
	Lunes: 1,
	Martes: 2,
	Miercoles: 3,
	Jueves: 4,
	Viernes: 5,
	Sabado: 6,
	Domingo: 0,
};

const slotStatusOptions = [
	{
		label: "Disponible",
		value: 0,
	},
	{
		label: "Reservado",
		value: 1,
	},
	{
		label: "Cancelado",
		value: 2,
	},
	{
		label: "Pagado",
		value: 3,
	},
];

const slotStatusMap = {
	Disponible: 0,
	Reservado: 1,
	Cancelado: 2,
	Pagado: 3,
};

export { weekDayOptions, weekDayMap, slotStatusOptions, slotStatusMap };
