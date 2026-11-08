export const site = {
  name: "FRAME",
  email: "", // Añade aquí tu correo comercial.
  whatsapp: "", // Número internacional, solo dígitos.
  socials: { Instagram: "", TikTok: "", YouTube: "", Behance: "" },
  tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut"],
};

export const images = {
  desert: `${import.meta.env.BASE_URL}images/desert.jpg`,
  car: `${import.meta.env.BASE_URL}images/automotive.jpg`,
  portrait: `${import.meta.env.BASE_URL}images/portrait.jpg`,
};

// Todos los proyectos son demostrativos; reemplaza video e imágenes por tu trabajo.
export const demoVideo = `${import.meta.env.BASE_URL}video/demo.mp4`;
export const categories = [
  "Todos",
  "Reels / TikToks",
  "Videos comerciales",
  "YouTube",
  "Contenido automotriz",
  "Motion Graphics",
];
export const projects = [
  {
    id: 1,
    title: "Entre el silencio y el movimiento",
    category: "Videos comerciales",
    label: "BRAND FILM",
    image: images.desert,
    description: "Una exploración visual del ritmo, la luz y los espacios abiertos.",
    services: "Edición · Color grading · Diseño sonoro",
    aspect: "16:9",
    video: demoVideo,
  },
  {
    id: 2,
    title: "Diseñado para sentir",
    category: "Contenido automotriz",
    label: "AUTOMOTIVE",
    image: images.car,
    description: "Detalles, precisión y movimiento en una pieza de inspiración automotriz.",
    services: "Montaje · Corrección de color · Sound design",
    aspect: "9:16",
    video: demoVideo,
  },
  {
    id: 3,
    title: "La ciudad no se detiene",
    category: "Reels / TikToks",
    label: "SOCIAL CONTENT",
    image: images.portrait,
    description: "Una historia urbana contada con transiciones y un ritmo propio.",
    services: "Edición vertical · Subtítulos · Transiciones",
    aspect: "9:16",
    video: demoVideo,
  },
  {
    id: 4,
    title: "Una historia, otro punto de vista",
    category: "YouTube",
    label: "STORYTELLING",
    image: images.desert,
    description: "Un ejercicio narrativo de edición para contenido de formato largo.",
    services: "Guion · Montaje · Audio",
    aspect: "16:9",
    video: demoVideo,
  },
  {
    id: 5,
    title: "Ritmo en cada fotograma",
    category: "Motion Graphics",
    label: "MOTION STUDY",
    image: images.portrait,
    description: "Estudio conceptual de títulos, composición y movimiento.",
    services: "Animación · Composición · Tipografía",
    aspect: "16:9",
    video: demoVideo,
  },
];
export type Project = (typeof projects)[number];
export const services = [
  {
    icon: "film",
    title: "Edición de video",
    description:
      "Cada corte cuenta. Transformo tu material en historias que se sienten y se recuerdan.",
    items: [
      "Reels, TikToks y YouTube Shorts",
      "Videos comerciales y corporativos",
      "Edición, color y diseño sonoro",
    ],
  },
  {
    icon: "social",
    title: "Community Management",
    description:
      "Una presencia digital con intención. Estrategia, constancia y contenido que conecta.",
    items: [
      "Estrategia y calendario de contenido",
      "Gestión y programación de publicaciones",
      "Seguimiento de métricas y reportes",
    ],
  },
  {
    icon: "spark",
    title: "Creación de contenido",
    description:
      "De la primera idea a la última versión. Contenido pensado para tu marca y tu audiencia.",
    items: [
      "Conceptos creativos y guiones",
      "Storytelling y dirección de contenido",
      "Adaptación a cada plataforma",
    ],
  },
];
export type MonthlyPlan = {
  name: string;
  subtitle: string;
  posts: number;
  videos: number;
  platforms: number;
  price: number | null;
  items: string[];
};
export const plans: MonthlyPlan[] = [
  {
    name: "Esencial",
    subtitle: "Una presencia con dirección.",
    posts: 8,
    videos: 2,
    platforms: 1,
    price: null,
    items: [
      "Planificación básica de contenido",
      "Calendario mensual",
      "Programación de publicaciones",
      "Reporte básico",
    ],
  },
  {
    name: "Crecimiento",
    subtitle: "El siguiente paso para tu marca.",
    posts: 12,
    videos: 4,
    platforms: 2,
    price: null,
    items: [
      "Estrategia mensual personalizada",
      "Calendario de publicaciones",
      "Edición de contenido",
      "Programación y seguimiento",
      "Reporte mensual",
    ],
  },
  {
    name: "Integral",
    subtitle: "Tu equipo creativo, mes a mes.",
    posts: 20,
    videos: 8,
    platforms: 3,
    price: null,
    items: [
      "Estrategia y mayor volumen de contenido",
      "Edición audiovisual",
      "Coordinación de publicaciones",
      "Análisis de métricas",
      "Reuniones de seguimiento",
    ],
  },
];
export const faqs = [
  [
    "¿Cuánto cuesta editar un video?",
    "Depende del formato, la duración y la complejidad. El cotizador prepara el alcance sin mostrar importes hasta configurar tarifas reales; el presupuesto final se confirma después de revisar tu material y definir el alcance.",
  ],
  [
    "¿Cuántas revisiones incluye el servicio?",
    "La cantidad se acuerda en cada propuesta. Como orientación, podemos definir dos rondas de ajustes dentro del alcance inicial. Los cambios adicionales se cotizan antes de realizarlos.",
  ],
  [
    "¿Cuánto demora una entrega?",
    "El plazo orientativo es de 5 a 7 días hábiles para una pieza estándar. Depende del volumen, la complejidad y la disponibilidad; confirmaremos una fecha antes de comenzar.",
  ],
  [
    "¿Puedo contratar varios videos al mes?",
    "Sí. Podemos definir un paquete recurrente de edición o un plan de Community Management según tus necesidades.",
  ],
  [
    "¿Cuál es la diferencia entre freelance y Community Manager?",
    "Freelance se centra en un proyecto con entregables concretos. Community Management es un acompañamiento mensual con estrategia, planificación y gestión de contenido.",
  ],
  [
    "¿Cómo funcionan los pagos?",
    "El importe, los plazos y el método de pago se acuerdan al aceptar la propuesta. Esta página no procesa pagos ni genera contratos firmados.",
  ],
  [
    "¿Qué necesito enviar para comenzar?",
    "Un breve resumen de tu idea, los archivos originales, referencias visuales, recursos de marca y la fecha deseada. Revisaremos todo antes de confirmar el proyecto.",
  ],
];
