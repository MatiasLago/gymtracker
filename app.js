// Datos de la rutina extraídos del Excel
const routineData = {
    mesociclo1: {
        semana1: {
            dia1: [
                { name: "Sentadilla", sets: 3, reps: "7", rpe: 6 },
                { name: "Press de Banca", sets: 3, reps: "7", rpe: 6 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "8", rpe: 6 },
                { name: "Press Inclinado c/mancuernas", sets: 2, reps: "15", rpe: 7 },
                { name: "Vuelos laterales", sets: 2, reps: "15-20", rpe: 8 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 3, reps: "7", rpe: 6 },
                { name: "Press Militar c/barra", sets: 3, reps: "7", rpe: 6 },
                { name: "Remo c/barra", sets: 3, reps: "10", rpe: 6 },
                { name: "Percha al Pecho", sets: 3, reps: "15", rpe: 7 },
                { name: "SS de Brazos a elección", sets: 3, reps: "12-15", rpe: 8 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 3, reps: "10", rpe: 6 },
                { name: "Press de Banca (toma cerrada)", sets: 3, reps: "10", rpe: 6 },
                { name: "Press de Piernas", sets: 2, reps: "12", rpe: 7 },
                { name: "Push Ups c/deficit", sets: 2, reps: "AMRAP", rpe: 8 },
                { name: "Vuelos laterales", sets: 3, reps: "12-15", rpe: 8 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 3, reps: "10", rpe: 6 },
                { name: "Press Militar c/barra", sets: 3, reps: "10", rpe: 6 },
                { name: "Dominadas", sets: 3, reps: "AMRAP", rpe: 7 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "15-20", rpe: 8 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 8 }
            ]
        },
        semana2: {
            dia1: [
                { name: "Sentadilla", sets: 3, reps: "7", rpe: 7 },
                { name: "Press de Banca", sets: 3, reps: "7", rpe: 7 },
                { name: "Estocadas", sets: 3, reps: "8", rpe: 7 },
                { name: "Press Inclinado c/mancuernas", sets: 2, reps: "15", rpe: 8 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 3, reps: "7", rpe: 7 },
                { name: "Press Militar c/barra", sets: 3, reps: "7", rpe: 7 },
                { name: "Remo c/barra", sets: 3, reps: "10", rpe: 7 },
                { name: "Percha al Pecho", sets: 3, reps: "15", rpe: 8 },
                { name: "SS de Brazos a elección", sets: 3, reps: "12-15", rpe: 9 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 3, reps: "10", rpe: 7 },
                { name: "Press de Banca (toma cerrada)", sets: 3, reps: "10", rpe: 7 },
                { name: "Press de Piernas", sets: 3, reps: "12", rpe: 8 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Vuelos laterales", sets: 3, reps: "12-15", rpe: 9 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 3, reps: "10", rpe: 7 },
                { name: "Press Militar c/barra", sets: 3, reps: "10", rpe: 7 },
                { name: "Dominadas", sets: 3, reps: "AMRAP", rpe: 8 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "15-20", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 9 }
            ]
        },
        semana3: {
            dia1: [
                { name: "Sentadilla", sets: 3, reps: "7", rpe: 7.5 },
                { name: "Press de Banca", sets: 4, reps: "7", rpe: 7.5 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "8", rpe: 8 },
                { name: "Press Inclinado c/mancuernas", sets: 2, reps: "15", rpe: 8 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 3, reps: "7", rpe: 7.5 },
                { name: "Press Militar c/barra", sets: 4, reps: "7", rpe: 7.5 },
                { name: "Remo c/barra", sets: 3, reps: "10", rpe: 8 },
                { name: "Percha al Pecho", sets: 3, reps: "15", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 4, reps: "12-15", rpe: 9 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 3, reps: "10", rpe: 7.5 },
                { name: "Press de Banca (toma cerrada)", sets: 3, reps: "10", rpe: 7.5 },
                { name: "Press de Piernas", sets: 3, reps: "12", rpe: 9 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Vuelos laterales", sets: 3, reps: "12-15", rpe: 9 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 3, reps: "10", rpe: 7.5 },
                { name: "Press Militar c/barra", sets: 3, reps: "10", rpe: 7.5 },
                { name: "Dominadas", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "15-20", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 9 }
            ]
        },
        semana4: {
            dia1: [
                { name: "Sentadilla", sets: 3, reps: "7", rpe: 8 },
                { name: "Press de Banca", sets: 4, reps: "7", rpe: 8 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "8", rpe: 9 },
                { name: "Press Inclinado c/mancuernas", sets: 3, reps: "15", rpe: 9 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 3, reps: "7", rpe: 8 },
                { name: "Press Militar c/barra", sets: 4, reps: "7", rpe: 8 },
                { name: "Remo c/barra", sets: 3, reps: "10", rpe: 8 },
                { name: "Percha al Pecho", sets: 3, reps: "15", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 4, reps: "12-15", rpe: 9 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 3, reps: "10", rpe: 8 },
                { name: "Press de Banca (toma cerrada)", sets: 3, reps: "10", rpe: 8 },
                { name: "Press de Piernas", sets: 3, reps: "12", rpe: 9 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Vuelos laterales", sets: 3, reps: "12-15", rpe: 9 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 3, reps: "10", rpe: 8 },
                { name: "Press Militar c/barra", sets: 3, reps: "10", rpe: 8 },
                { name: "Dominadas", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "15-20", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 9 }
            ]
        }
    },
    mesociclo2: {
        semana1: {
            dia1: [
                { name: "Sentadilla", sets: 4, reps: "5", rpe: 6 },
                { name: "Press de Banca", sets: 4, reps: "5", rpe: 6 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "10", rpe: 7 },
                { name: "Press Inclinado c/mancuernas", sets: 3, reps: "12", rpe: 7 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 8 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 4, reps: "5", rpe: 6 },
                { name: "Press Militar c/barra", sets: 4, reps: "5", rpe: 6 },
                { name: "Remo c/barra", sets: 3, reps: "8", rpe: 7 },
                { name: "Percha al Pecho", sets: 3, reps: "12", rpe: 7 },
                { name: "SS de Brazos a elección", sets: 3, reps: "12-15", rpe: 8 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 3, reps: "8", rpe: 6 },
                { name: "Press de Banca (toma cerrada)", sets: 3, reps: "8", rpe: 6 },
                { name: "Press de Piernas", sets: 3, reps: "10", rpe: 7 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 8 },
                { name: "Vuelos laterales", sets: 3, reps: "15-20", rpe: 8 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 3, reps: "8", rpe: 6 },
                { name: "Press Militar c/mancuernas", sets: 3, reps: "10", rpe: 7 },
                { name: "Dominadas", sets: 3, reps: "AMRAP", rpe: 7 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "12-15", rpe: 8 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 8 }
            ]
        },
        semana2: {
            dia1: [
                { name: "Sentadilla", sets: 4, reps: "5", rpe: 7 },
                { name: "Press de Banca", sets: 4, reps: "5", rpe: 7 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "10", rpe: 8 },
                { name: "Press Inclinado c/mancuernas", sets: 3, reps: "12", rpe: 8 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 4, reps: "5", rpe: 7 },
                { name: "Press Militar c/barra", sets: 4, reps: "5", rpe: 7 },
                { name: "Remo c/barra", sets: 3, reps: "8", rpe: 8 },
                { name: "Percha al Pecho", sets: 3, reps: "12", rpe: 8 },
                { name: "SS de Brazos a elección", sets: 3, reps: "12-15", rpe: 9 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 3, reps: "8", rpe: 7 },
                { name: "Press de Banca (toma cerrada)", sets: 3, reps: "8", rpe: 7 },
                { name: "Press de Piernas", sets: 3, reps: "10", rpe: 8 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Vuelos laterales", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 3, reps: "8", rpe: 7 },
                { name: "Press Militar c/mancuernas", sets: 3, reps: "10", rpe: 8 },
                { name: "Dominadas", sets: 3, reps: "AMRAP", rpe: 8 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "12-15", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 9 }
            ]
        },
        semana3: {
            dia1: [
                { name: "Sentadilla", sets: 4, reps: "5", rpe: 7.5 },
                { name: "Press de Banca", sets: 5, reps: "5", rpe: 7.5 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "10", rpe: 8 },
                { name: "Press Inclinado c/mancuernas", sets: 3, reps: "12", rpe: 8 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 4, reps: "5", rpe: 7.5 },
                { name: "Press Militar c/barra", sets: 5, reps: "5", rpe: 7.5 },
                { name: "Remo c/barra", sets: 4, reps: "8", rpe: 8 },
                { name: "Percha al Pecho", sets: 3, reps: "12", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 4, reps: "12-15", rpe: 9 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 4, reps: "8", rpe: 7.5 },
                { name: "Press de Banca (toma cerrada)", sets: 4, reps: "8", rpe: 7.5 },
                { name: "Press de Piernas", sets: 3, reps: "10", rpe: 9 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Vuelos laterales", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 4, reps: "8", rpe: 7.5 },
                { name: "Press Militar c/mancuernas", sets: 3, reps: "10", rpe: 8 },
                { name: "Dominadas", sets: 4, reps: "AMRAP", rpe: 9 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "12-15", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 9 }
            ]
        },
        semana4: {
            dia1: [
                { name: "Sentadilla", sets: 4, reps: "5", rpe: 8 },
                { name: "Press de Banca", sets: 5, reps: "5", rpe: 8 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "10", rpe: 9 },
                { name: "Press Inclinado c/mancuernas", sets: 3, reps: "12", rpe: 9 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 4, reps: "5", rpe: 8 },
                { name: "Press Militar c/barra", sets: 5, reps: "5", rpe: 8 },
                { name: "Remo c/barra", sets: 4, reps: "8", rpe: 8 },
                { name: "Percha al Pecho", sets: 3, reps: "12", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 4, reps: "12-15", rpe: 9 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 4, reps: "8", rpe: 8 },
                { name: "Press de Banca (toma cerrada)", sets: 4, reps: "8", rpe: 8 },
                { name: "Press de Piernas", sets: 3, reps: "10", rpe: 9 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Vuelos laterales", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 4, reps: "8", rpe: 8 },
                { name: "Press Militar c/mancuernas", sets: 3, reps: "10", rpe: 9 },
                { name: "Dominadas", sets: 4, reps: "AMRAP", rpe: 9 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "12-15", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 9 }
            ]
        }
    },
    mesociclo3: {
        semana1: {
            dia1: [
                { name: "Sentadilla", sets: 5, reps: "3", rpe: 7 },
                { name: "Press de Banca", sets: 5, reps: "3", rpe: 7 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "8", rpe: 7 },
                { name: "Press Inclinado c/mancuernas", sets: 3, reps: "10", rpe: 7 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 8 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 5, reps: "3", rpe: 7 },
                { name: "Press Militar c/barra", sets: 5, reps: "3", rpe: 7 },
                { name: "Remo c/barra", sets: 4, reps: "6", rpe: 7 },
                { name: "Percha al Pecho", sets: 3, reps: "10", rpe: 7 },
                { name: "SS de Brazos a elección", sets: 3, reps: "12-15", rpe: 8 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 3, reps: "6", rpe: 7 },
                { name: "Press de Banca (toma cerrada)", sets: 3, reps: "6", rpe: 7 },
                { name: "Press de Piernas", sets: 3, reps: "8", rpe: 7 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 8 },
                { name: "Vuelos laterales", sets: 3, reps: "15-20", rpe: 8 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 3, reps: "6", rpe: 7 },
                { name: "Press Militar c/mancuernas", sets: 3, reps: "8", rpe: 7 },
                { name: "Dominadas", sets: 3, reps: "AMRAP", rpe: 7 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "10-12", rpe: 8 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 8 }
            ]
        },
        semana2: {
            dia1: [
                { name: "Sentadilla", sets: 5, reps: "3", rpe: 7.5 },
                { name: "Press de Banca", sets: 5, reps: "3", rpe: 7.5 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "8", rpe: 8 },
                { name: "Press Inclinado c/mancuernas", sets: 3, reps: "10", rpe: 8 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 5, reps: "3", rpe: 7.5 },
                { name: "Press Militar c/barra", sets: 5, reps: "3", rpe: 7.5 },
                { name: "Remo c/barra", sets: 4, reps: "6", rpe: 8 },
                { name: "Percha al Pecho", sets: 3, reps: "10", rpe: 8 },
                { name: "SS de Brazos a elección", sets: 3, reps: "12-15", rpe: 9 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 3, reps: "6", rpe: 7.5 },
                { name: "Press de Banca (toma cerrada)", sets: 3, reps: "6", rpe: 7.5 },
                { name: "Press de Piernas", sets: 3, reps: "8", rpe: 8 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Vuelos laterales", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 3, reps: "6", rpe: 7.5 },
                { name: "Press Militar c/mancuernas", sets: 3, reps: "8", rpe: 8 },
                { name: "Dominadas", sets: 3, reps: "AMRAP", rpe: 8 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "10-12", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 9 }
            ]
        },
        semana3: {
            dia1: [
                { name: "Sentadilla", sets: 5, reps: "3", rpe: 8 },
                { name: "Press de Banca", sets: 6, reps: "3", rpe: 8 },
                { name: "Sentadilla Búlgara", sets: 3, reps: "8", rpe: 8 },
                { name: "Press Inclinado c/mancuernas", sets: 3, reps: "10", rpe: 8 },
                { name: "Face Pull", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 5, reps: "3", rpe: 8 },
                { name: "Press Militar c/barra", sets: 6, reps: "3", rpe: 8 },
                { name: "Remo c/barra", sets: 4, reps: "6", rpe: 8 },
                { name: "Percha al Pecho", sets: 3, reps: "10", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 4, reps: "12-15", rpe: 9 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 4, reps: "6", rpe: 8 },
                { name: "Press de Banca (toma cerrada)", sets: 4, reps: "6", rpe: 8 },
                { name: "Press de Piernas", sets: 3, reps: "8", rpe: 9 },
                { name: "Push Ups c/deficit", sets: 3, reps: "AMRAP", rpe: 9 },
                { name: "Vuelos laterales", sets: 3, reps: "15-20", rpe: 9 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 4, reps: "6", rpe: 8 },
                { name: "Press Militar c/mancuernas", sets: 3, reps: "8", rpe: 8 },
                { name: "Dominadas", sets: 4, reps: "AMRAP", rpe: 9 },
                { name: "Remo c/polea/maquina", sets: 3, reps: "10-12", rpe: 9 },
                { name: "SS de Brazos a elección", sets: 3, reps: "15-20", rpe: 9 }
            ]
        },
        semana4: {
            dia1: [
                { name: "Sentadilla", sets: 3, reps: "2", rpe: 9 },
                { name: "Press de Banca", sets: 3, reps: "2", rpe: 9 },
                { name: "Sentadilla Búlgara", sets: 2, reps: "8", rpe: 7 },
                { name: "Press Inclinado c/mancuernas", sets: 2, reps: "10", rpe: 7 },
                { name: "Face Pull", sets: 2, reps: "15-20", rpe: 7 }
            ],
            dia2: [
                { name: "Peso Muerto", sets: 3, reps: "2", rpe: 9 },
                { name: "Press Militar c/barra", sets: 3, reps: "2", rpe: 9 },
                { name: "Remo c/barra", sets: 2, reps: "6", rpe: 7 },
                { name: "Percha al Pecho", sets: 2, reps: "10", rpe: 7 },
                { name: "SS de Brazos a elección", sets: 2, reps: "12-15", rpe: 7 }
            ],
            dia3: [
                { name: "Sentadilla", sets: 2, reps: "4", rpe: 7 },
                { name: "Press de Banca (toma cerrada)", sets: 2, reps: "4", rpe: 7 },
                { name: "Press de Piernas", sets: 2, reps: "8", rpe: 7 },
                { name: "Push Ups c/deficit", sets: 2, reps: "AMRAP", rpe: 7 },
                { name: "Vuelos laterales", sets: 2, reps: "15-20", rpe: 7 }
            ],
            dia4: [
                { name: "Peso Muerto Rumano", sets: 2, reps: "4", rpe: 7 },
                { name: "Press Militar c/mancuernas", sets: 2, reps: "8", rpe: 7 },
                { name: "Dominadas", sets: 2, reps: "AMRAP", rpe: 7 },
                { name: "Remo c/polea/maquina", sets: 2, reps: "10-12", rpe: 7 },
                { name: "SS de Brazos a elección", sets: 2, reps: "15-20", rpe: 7 }
            ]
        }
    }
};

// Estado de la aplicación
let state = {
    currentMesociclo: 1,
    currentWeek: 1,
    currentDay: 1,
    currentExerciseIndex: null
};

// Cache de datos en memoria
let cachedData = null;

// URL del servidor (se detecta automáticamente)
const API_URL = `${window.location.origin}/api/data`;

// Cargar datos guardados (primero local, luego sincroniza con servidor)
function loadSavedData() {
    // Si hay cache en memoria, usarlo
    if (cachedData) {
        return cachedData;
    }

    // Cargar desde localStorage como fallback
    const saved = localStorage.getItem('gymTrackerData');
    if (saved) {
        cachedData = JSON.parse(saved);
        return cachedData;
    }

    cachedData = {
        workouts: {},
        completedDays: {}
    };
    return cachedData;
}

// Guardar datos (local + servidor)
function saveData(data) {
    cachedData = data;

    // Guardar en localStorage (backup local)
    localStorage.setItem('gymTrackerData', JSON.stringify(data));

    // Guardar en servidor (nube)
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(() => {
        showSyncStatus('Guardado en la nube');
    }).catch(() => {
        showSyncStatus('Guardado localmente (sin conexion)');
    });
}

// Sincronizar con servidor al iniciar
async function syncWithServer() {
    try {
        showSyncStatus('Sincronizando...');
        const response = await fetch(API_URL);
        if (response.ok) {
            const serverData = await response.json();
            const localData = JSON.parse(localStorage.getItem('gymTrackerData') || '{}');

            // Merge: combinar datos locales y del servidor
            const mergedData = mergeData(localData, serverData);

            cachedData = mergedData;
            localStorage.setItem('gymTrackerData', JSON.stringify(mergedData));

            // Si hay diferencias, subir los datos combinados
            if (JSON.stringify(mergedData) !== JSON.stringify(serverData)) {
                await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mergedData)
                });
            }

            showSyncStatus('Sincronizado');
            return mergedData;
        }
    } catch (e) {
        showSyncStatus('Modo offline');
    }
    return loadSavedData();
}

// Combinar datos locales y del servidor
function mergeData(local, server) {
    const merged = {
        workouts: { ...server.workouts, ...local.workouts },
        completedDays: { ...server.completedDays }
    };

    // Merge completedDays arrays
    Object.keys(local.completedDays || {}).forEach(key => {
        if (!merged.completedDays[key]) {
            merged.completedDays[key] = local.completedDays[key];
        } else {
            // Combinar y eliminar duplicados por timestamp
            const combined = [...merged.completedDays[key], ...local.completedDays[key]];
            const unique = combined.filter((item, index, self) =>
                index === self.findIndex(t => t.timestamp === item.timestamp)
            );
            merged.completedDays[key] = unique;
        }
    });

    return merged;
}

// Mostrar estado de sincronización
function showSyncStatus(message) {
    let statusEl = document.getElementById('syncStatus');
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'syncStatus';
        statusEl.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 12px;
            z-index: 1000;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(statusEl);
    }
    statusEl.textContent = message;
    statusEl.style.opacity = '1';

    setTimeout(() => {
        statusEl.style.opacity = '0';
    }, 2000);
}

// Obtener ejercicios para el día actual
function getExercises() {
    const meso = `mesociclo${state.currentMesociclo}`;
    const week = `semana${state.currentWeek}`;
    const day = `dia${state.currentDay}`;

    return routineData[meso]?.[week]?.[day] || [];
}

// Obtener clave única para el día
function getDayKey() {
    return `m${state.currentMesociclo}w${state.currentWeek}d${state.currentDay}`;
}

// Renderizar lista de ejercicios
function renderExercises() {
    const container = document.getElementById('exerciseList');
    const exercises = getExercises();
    const data = loadSavedData();
    const dayKey = getDayKey();
    const dayData = data.workouts[dayKey] || {};

    container.innerHTML = exercises.map((exercise, index) => {
        const exerciseData = dayData[index] || {};
        const isCompleted = exerciseData.completed;
        const lastWeight = exerciseData.sets?.[0]?.weight || '';

        return `
            <div class="exercise-card ${isCompleted ? 'completed' : ''}" data-index="${index}">
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-details">
                    <span>${exercise.sets} sets</span>
                    <span>${exercise.reps} reps</span>
                    <span>RPE ${exercise.rpe}</span>
                </div>
                ${lastWeight ? `<div class="exercise-weight">Ultimo: ${lastWeight} kg</div>` : ''}
            </div>
        `;
    }).join('');

    // Agregar event listeners
    container.querySelectorAll('.exercise-card').forEach(card => {
        card.addEventListener('click', () => openExerciseModal(parseInt(card.dataset.index)));
    });

    updateCompletedDaysUI();
}

// Abrir modal de ejercicio
function openExerciseModal(index) {
    state.currentExerciseIndex = index;
    const exercises = getExercises();
    const exercise = exercises[index];
    const data = loadSavedData();
    const dayKey = getDayKey();
    const exerciseData = data.workouts[dayKey]?.[index] || {};

    document.getElementById('modalExerciseName').textContent = exercise.name;
    document.getElementById('modalSets').textContent = exercise.sets;
    document.getElementById('modalReps').textContent = exercise.reps;
    document.getElementById('modalRPE').textContent = exercise.rpe;

    // Generar inputs para sets
    const setsContainer = document.getElementById('setsContainer');
    setsContainer.innerHTML = '';

    for (let i = 0; i < exercise.sets; i++) {
        const setData = exerciseData.sets?.[i] || {};
        setsContainer.innerHTML += `
            <div class="set-row">
                <span class="set-number">Set ${i + 1}</span>
                <div class="set-input">
                    <label>Peso (kg)</label>
                    <input type="number" class="weight-input" data-set="${i}"
                           value="${setData.weight || ''}" placeholder="0" step="0.5">
                </div>
                <div class="set-input">
                    <label>Reps</label>
                    <input type="number" class="reps-input" data-set="${i}"
                           value="${setData.reps || ''}" placeholder="${exercise.reps}">
                </div>
            </div>
        `;
    }

    document.getElementById('exerciseNotes').value = exerciseData.notes || '';
    document.getElementById('exerciseModal').classList.add('active');
}

// Cerrar modal
function closeModal() {
    document.getElementById('exerciseModal').classList.remove('active');
}

// Guardar ejercicio
function saveExercise() {
    const data = loadSavedData();
    const dayKey = getDayKey();

    if (!data.workouts[dayKey]) {
        data.workouts[dayKey] = {};
    }

    const sets = [];
    document.querySelectorAll('.set-row').forEach((row, i) => {
        const weight = row.querySelector('.weight-input').value;
        const reps = row.querySelector('.reps-input').value;
        sets.push({
            weight: weight ? parseFloat(weight) : null,
            reps: reps ? parseInt(reps) : null
        });
    });

    const hasData = sets.some(s => s.weight !== null || s.reps !== null);

    data.workouts[dayKey][state.currentExerciseIndex] = {
        sets,
        notes: document.getElementById('exerciseNotes').value,
        completed: hasData,
        date: new Date().toISOString()
    };

    saveData(data);
    closeModal();
    renderExercises();
}

// Completar entrenamiento
function completeWorkout() {
    const data = loadSavedData();
    const dayKey = getDayKey();
    const today = new Date().toISOString().split('T')[0];

    if (!data.completedDays[dayKey]) {
        data.completedDays[dayKey] = [];
    }

    data.completedDays[dayKey].push({
        date: today,
        timestamp: new Date().toISOString()
    });

    saveData(data);
    updateCompletedDaysUI();
    renderHistory();
    renderStreakCard();

    // Animación de celebración
    const streakCard = document.getElementById('streakCard');
    streakCard.classList.add('streak-celebrate');
    setTimeout(() => streakCard.classList.remove('streak-celebrate'), 600);

    alert('Entrenamiento completado!');
}

// Actualizar UI de días completados
function updateCompletedDaysUI() {
    const data = loadSavedData();

    document.querySelectorAll('.day-btn').forEach(btn => {
        const day = btn.dataset.day;
        const dayKey = `m${state.currentMesociclo}w${state.currentWeek}d${day}`;

        if (data.completedDays[dayKey]?.length > 0) {
            btn.classList.add('completed');
        } else {
            btn.classList.remove('completed');
        }
    });
}

// Renderizar historial
function renderHistory() {
    const data = loadSavedData();
    const container = document.getElementById('historyList');

    const entries = [];

    Object.entries(data.completedDays).forEach(([dayKey, completions]) => {
        completions.forEach(completion => {
            const match = dayKey.match(/m(\d)w(\d)d(\d)/);
            if (match) {
                entries.push({
                    mesociclo: match[1],
                    week: match[2],
                    day: match[3],
                    date: completion.date,
                    timestamp: completion.timestamp
                });
            }
        });
    });

    entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (entries.length === 0) {
        container.innerHTML = '<div class="no-data">No hay entrenamientos registrados</div>';
        return;
    }

    container.innerHTML = entries.slice(0, 20).map(entry => {
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="history-item">
                <div class="history-date">${formattedDate}</div>
                <div class="history-workout">Mesociclo ${entry.mesociclo} - Semana ${entry.week} - Dia ${entry.day}</div>
            </div>
        `;
    }).join('');
}

// Obtener todos los ejercicios únicos
function getAllExercises() {
    const exercises = new Set();

    Object.values(routineData).forEach(meso => {
        Object.values(meso).forEach(week => {
            Object.values(week).forEach(day => {
                day.forEach(ex => exercises.add(ex.name));
            });
        });
    });

    return Array.from(exercises).sort();
}

// Renderizar select de ejercicios para progreso
function renderExerciseSelect() {
    const select = document.getElementById('exerciseProgressSelect');
    const exercises = getAllExercises();

    select.innerHTML = exercises.map(ex =>
        `<option value="${ex}">${ex}</option>`
    ).join('');
}

// Renderizar progreso de ejercicio
function renderProgress() {
    const exerciseName = document.getElementById('exerciseProgressSelect').value;
    const data = loadSavedData();
    const container = document.getElementById('progressChart');

    const progressData = [];

    Object.entries(data.workouts).forEach(([dayKey, dayData]) => {
        Object.entries(dayData).forEach(([index, exerciseData]) => {
            const match = dayKey.match(/m(\d)w(\d)d(\d)/);
            if (match && exerciseData.sets) {
                const meso = `mesociclo${match[1]}`;
                const week = `semana${match[2]}`;
                const day = `dia${match[3]}`;
                const exercise = routineData[meso]?.[week]?.[day]?.[parseInt(index)];

                if (exercise && exercise.name === exerciseName) {
                    const maxWeight = Math.max(...exerciseData.sets.filter(s => s.weight).map(s => s.weight));
                    if (maxWeight > 0) {
                        progressData.push({
                            date: exerciseData.date,
                            weight: maxWeight,
                            dayKey
                        });
                    }
                }
            }
        });
    });

    progressData.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (progressData.length === 0) {
        container.innerHTML = '<div class="no-data">No hay datos de progreso para este ejercicio</div>';
        return;
    }

    container.innerHTML = progressData.map(entry => {
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short'
        });

        return `
            <div class="progress-entry">
                <span class="progress-date">${formattedDate}</span>
                <span class="progress-weight">${entry.weight} kg</span>
            </div>
        `;
    }).join('');
}

// Calcular racha de entrenamiento
function calculateStreak() {
    const data = loadSavedData();
    const dateSet = new Set();

    // Extraer todas las fechas únicas de completedDays
    Object.values(data.completedDays || {}).forEach(completions => {
        completions.forEach(c => {
            if (c.date) dateSet.add(c.date);
        });
    });

    if (dateSet.size === 0) {
        return { currentStreak: 0, bestStreak: 0, lastWorkoutDate: null };
    }

    // Ordenar fechas de más reciente a más antigua
    const dates = Array.from(dateSet).sort((a, b) => new Date(b) - new Date(a));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const mostRecent = new Date(dates[0]);
    mostRecent.setHours(0, 0, 0, 0);

    const daysSinceLast = Math.floor((today - mostRecent) / (1000 * 60 * 60 * 24));

    // Si pasaron más de 2 días desde el último entrenamiento, racha actual = 0
    let currentStreak = 0;
    if (daysSinceLast <= 2) {
        currentStreak = 1;
        for (let i = 0; i < dates.length - 1; i++) {
            const current = new Date(dates[i]);
            const next = new Date(dates[i + 1]);
            current.setHours(0, 0, 0, 0);
            next.setHours(0, 0, 0, 0);
            const gap = Math.floor((current - next) / (1000 * 60 * 60 * 24));
            if (gap <= 2) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    // Calcular mejor racha histórica
    let bestStreak = 1;
    let tempStreak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
        const current = new Date(dates[i]);
        const next = new Date(dates[i + 1]);
        current.setHours(0, 0, 0, 0);
        next.setHours(0, 0, 0, 0);
        const gap = Math.floor((current - next) / (1000 * 60 * 60 * 24));
        if (gap <= 2) {
            tempStreak++;
        } else {
            tempStreak = 1;
        }
        if (tempStreak > bestStreak) bestStreak = tempStreak;
    }

    if (currentStreak > bestStreak) bestStreak = currentStreak;

    return { currentStreak, bestStreak, lastWorkoutDate: dates[0] };
}

// Generar datos del calendario semanal (últimos 7 días)
function getWeekCalendarData() {
    const data = loadSavedData();
    const dateSet = new Set();

    Object.values(data.completedDays || {}).forEach(completions => {
        completions.forEach(c => {
            if (c.date) dateSet.add(c.date);
        });
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay(); // 0=Dom, 1=Lun, ...
    // Calcular el lunes de esta semana
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    const dayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const week = [];

    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const isToday = d.getTime() === today.getTime();
        week.push({
            dayLabel: dayLabels[i],
            date: dateStr,
            hasWorkout: dateSet.has(dateStr),
            isToday
        });
    }

    return week;
}

// Renderizar streak card
function renderStreakCard() {
    const { currentStreak, bestStreak } = calculateStreak();
    const weekData = getWeekCalendarData();

    document.getElementById('streakCount').textContent = currentStreak;
    document.getElementById('streakBest').textContent = `Mejor racha: ${bestStreak} días`;

    const weekContainer = document.getElementById('streakWeek');
    weekContainer.innerHTML = weekData.map(day => {
        const classes = ['streak-day'];
        if (day.hasWorkout) classes.push('active');
        if (day.isToday) classes.push('today');

        return `
            <div class="${classes.join(' ')}">
                <span class="streak-day-label">${day.dayLabel}</span>
                <div class="streak-day-dot"></div>
            </div>
        `;
    }).join('');
}

// Actualizar header
function updateHeader() {
    document.getElementById('currentMesociclo').textContent = `Mesociclo ${state.currentMesociclo}`;
    document.getElementById('currentWeek').textContent = `Semana ${state.currentWeek}`;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');

            if (tab.dataset.tab === 'streak') {
                renderStreakCard();
            } else if (tab.dataset.tab === 'history') {
                renderHistory();
            } else if (tab.dataset.tab === 'progress') {
                renderExerciseSelect();
                renderProgress();
            }
        });
    });

    // Day buttons
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentDay = parseInt(btn.dataset.day);
            renderExercises();
        });
    });

    // Mesociclo select
    document.getElementById('mesocicloSelect').addEventListener('change', (e) => {
        state.currentMesociclo = parseInt(e.target.value);
        updateHeader();
        renderExercises();
    });

    // Week select
    document.getElementById('weekSelect').addEventListener('change', (e) => {
        state.currentWeek = parseInt(e.target.value);
        updateHeader();
        renderExercises();
    });

    // Modal close
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('exerciseModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });

    // Save exercise
    document.getElementById('saveExercise').addEventListener('click', saveExercise);

    // Complete workout
    document.getElementById('completeWorkout').addEventListener('click', completeWorkout);

    // Progress exercise select
    document.getElementById('exerciseProgressSelect').addEventListener('change', renderProgress);

    // Initial render
    updateHeader();
    renderExercises();
    renderStreakCard();

    // Sincronizar con servidor
    syncWithServer().then(() => {
        renderExercises();
        updateCompletedDaysUI();
        renderStreakCard();
    });

    // Cargar pasos
    loadTodaySteps();
});

// Cargar pasos de hoy
async function loadTodaySteps() {
    try {
        const response = await fetch(`${window.location.origin}/api/steps`);
        if (response.ok) {
            const steps = await response.json();
            const today = new Date().toISOString().split('T')[0];
            const todaySteps = steps[today];

            if (todaySteps) {
                document.getElementById('todaySteps').textContent =
                    todaySteps.count.toLocaleString();
            } else {
                document.getElementById('todaySteps').textContent = '--';
            }
        }
    } catch (e) {
        console.log('No se pudieron cargar los pasos');
    }
}

// Service Worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('gymTrackerTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gymTrackerTheme', theme);
    updateThemeToggleIcon(theme);
    updateThemeColor(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function updateThemeToggleIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
}

function updateThemeColor(theme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
    }
}

// Initialize theme
initTheme();

// Theme toggle listener
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('gymTrackerTheme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});
