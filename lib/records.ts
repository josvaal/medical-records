import { PatientRecord } from "./models/PatientRecord";

export const patientRecords: PatientRecord[] = [
  {
    id: "r1a2b3c4d5e6f7g8h9i0",
    title: "Consulta General",
    type: "consultation", // Cambio aquí
    doctor: {
      id: "d1a2b3c4d5e6f7g8h9i0",
      name: "Dr. Juan Carlos",
      lastname: "Pérez González",
    },
    comment: "Paciente con síntomas leves de resfriado.",
    image: "image1.jpg",
    patientId: "a1b2c3d4e5f6g7h8i9j0",
  },
  {
    id: "r2a3b4c5d6e7f8g9h0j1",
    title: "Chequeo Anual",
    type: "exam", // Cambio aquí
    doctor: {
      id: "d2a3b4c5d6e7f8g9h0j1",
      name: "Dr. María Fernanda",
      lastname: "López Rodríguez",
    },
    comment: "Paciente en buen estado general.",
    image: "image2.jpg",
    patientId: "k1l2m3n4o5p6q7r8s9t0",
  },
  {
    id: "r3a4b5c6d7e8f9g0h1j2",
    title: "Control de Diabetes",
    type: "analysis", // Cambio aquí
    doctor: {
      id: "d3a4b5c6d7e8f9g0h1j2",
      name: "Dr. Pedro Andrés",
      lastname: "Castillo Herrera",
    },
    comment: "Paciente con diabetes tipo 2 en tratamiento.",
    image: "image3.jpg",
    patientId: "u1v2w3x4y5z6a7b8c9d0",
  },
  {
    id: "r4a5b6c7d8e9f0g1h2j3",
    title: "Consulta Especializada",
    type: "consultation", // Cambio aquí
    doctor: {
      id: "d4a5b6c7d8e9f0g1h2j3",
      name: "Dra. Andrea Isabel",
      lastname: "Martín Sánchez",
    },
    comment: "Paciente con dolores musculares recurrentes.",
    image: "image4.jpg",
    patientId: "e1f2g3h4i5j6k7l8m9n0",
  },
  {
    id: "r5a6b7c8d9e0f1g2h3j4",
    title: "Control de Presión Arterial",
    type: "analysis", // Cambio aquí
    doctor: {
      id: "d5a6b7c8d9e0f1g2h3j4",
      name: "Dr. Luis Alberto",
      lastname: "Alonso Pérez",
    },
    comment: "Paciente con hipertensión leve, seguimiento trimestral.",
    image: "image5.jpg",
    patientId: "a1s2d3f4g5h6j7k8l9m0",
  },
  {
    id: "r6a7b8c9d0e1f2g3h4j5",
    title: "Consulta Oftalmológica",
    type: "consultation", // Cambio aquí
    doctor: {
      id: "d6a7b8c9d0e1f2g3h4j5",
      name: "Dr. Carlos Eduardo",
      lastname: "González Vargas",
    },
    comment: "Paciente con visión borrosa, probable necesidad de lentes.",
    image: "image6.jpg",
    patientId: "p1q2r3s4t5u6v7w8x9y0",
  },
  {
    id: "r7a8b9c0d1e2f3g4h5j6",
    title: "Examen de Sangre",
    type: "exam", // Cambio aquí
    doctor: {
      id: "d7a8b9c0d1e2f3g4h5j6",
      name: "Dra. Ana Carolina",
      lastname: "Martínez Fernández",
    },
    comment: "Exámenes rutinarios de sangre para evaluación de salud.",
    image: "image7.jpg",
    patientId: "o1p2q3r4s5t6u7v8w9x0",
  },
  {
    id: "r8a9b0c1d2e3f4g5h6j7",
    title: "Consulta Dermatológica",
    type: "consultation", // Cambio aquí
    doctor: {
      id: "d8a9b0c1d2e3f4g5h6j7",
      name: "Dr. Pedro Luis",
      lastname: "López Salazar",
    },
    comment: "Paciente con manchas en la piel, diagnóstico pendiente.",
    image: "image8.jpg",
    patientId: "z1a2b3c4d5e6f7g8h9i0",
  },
  {
    id: "r9a0b1c2d3e4f5g6h7j8",
    title: "Consulta Psiquiátrica",
    type: "consultation", // Cambio aquí
    doctor: {
      id: "d9a0b1c2d3e4f5g6h7j8",
      name: "Dra. Susana Patricia",
      lastname: "Rodríguez Muñoz",
    },
    comment: "Paciente con trastornos de ansiedad.",
    image: "image9.jpg",
    patientId: "l1m2n3o4p5q6r7s8t9u0",
  },
  {
    id: "r10a1b2c3d4e5f6g7h8",
    title: "Control de Asma",
    type: "analysis", // Cambio aquí
    doctor: {
      id: "d10a1b2c3d4e5f6g7h8",
      name: "Dr. José Luis",
      lastname: "Pérez Molina",
    },
    comment: "Paciente con asma, uso de inhalador recomendado.",
    image: "image10.jpg",
    patientId: "v1w2x3y4z5a6b7c8d9e0",
  },
  {
    id: "r11a2b3c4d5e6f7g8h9",
    title: "Consulta de Control",
    type: "consultation", // Cambio aquí
    doctor: {
      id: "d11a2b3c4d5e6f7g8h9",
      name: "Dr. Juan Carlos",
      lastname: "Pérez González",
    },
    comment: "Paciente estable, sin cambios en su condición.",
    image: "image11.jpg",
    patientId: "a1b2c3d4e5f6g7h8i9j0",
  },
  {
    id: "r12a3b4c5d6e7f8g9h0",
    title: "Chequeo General",
    type: "exam", // Cambio aquí
    doctor: {
      id: "d12a3b4c5d6e7f8g9h0",
      name: "Dr. María Fernanda",
      lastname: "López Rodríguez",
    },
    comment: "Paciente saludable, se recomienda ejercicio regular.",
    image: "image12.jpg",
    patientId: "k1l2m3n4o5p6q7r8s9t0",
  },
  {
    id: "r13a4b5c6d7e8f9g0h1",
    title: "Tratamiento Antiinflamatorio",
    type: "analysis", // Cambio aquí
    doctor: {
      id: "d13a4b5c6d7e8f9g0h1",
      name: "Dr. Pedro Andrés",
      lastname: "Castillo Herrera",
    },
    comment:
      "Paciente con dolor muscular, tratamiento antiinflamatorio prescrito.",
    image: "image13.jpg",
    patientId: "u1v2w3x4y5z6a7b8c9d0",
  },
  {
    id: "r14a5b6c7d8e9f0g1h2",
    title: "Examen de Colesterol",
    type: "exam", // Cambio aquí
    doctor: {
      id: "d14a5b6c7d8e9f0g1h2",
      name: "Dra. Andrea Isabel",
      lastname: "Martín Sánchez",
    },
    comment: "Paciente con antecedentes familiares de colesterol alto.",
    image: "image14.jpg",
    patientId: "e1f2g3h4i5j6k7l8m9n0",
  },
];
