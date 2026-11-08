// Configura únicamente tarifas reales en USD. null impide publicar importes inventados.
export const pricing = {
  types: [
    { label: "Reel / TikTok / Short", base: null as number | null },
    { label: "Video de YouTube", base: null as number | null },
    { label: "Video comercial", base: null as number | null },
    { label: "Video corporativo", base: null as number | null },
    { label: "Proyecto personalizado", base: null },
  ],
  durations: [
    { label: "Hasta 30 segundos", multiplier: 1 },
    { label: "30 a 60 segundos", multiplier: 1.4 },
    { label: "1 a 3 minutos", multiplier: 2 },
    { label: "3 a 10 minutos", multiplier: 3.5 },
    { label: "Más de 10 minutos", multiplier: null },
  ],
  complexities: [
    { label: "Básica", detail: "Cortes, música y ajustes simples", multiplier: 1 },
    { label: "Intermedia", detail: "Subtítulos, efectos y color", multiplier: 1.6 },
    { label: "Avanzada", detail: "Animaciones y efectos visuales", multiplier: 2.5 },
  ],
  extras: [
    { label: "Subtítulos animados", price: null as number | null },
    { label: "Motion Graphics", price: null as number | null },
    { label: "Diseño de miniatura", price: null as number | null },
    { label: "Corrección de color avanzada", price: null as number | null },
    { label: "Formatos adicionales", price: null as number | null },
    { label: "Entrega urgente", price: 0 },
  ],
  deadlines: [
    { label: "Estándar", days: "5–7 días hábiles", multiplier: 1 },
    { label: "Prioritario", days: "3–4 días hábiles", multiplier: 1.25 },
    { label: "Urgente", days: "1–2 días hábiles", multiplier: 1.5 },
  ],
  maxQuantity: 20,
};
export type Quote = {
  type: number;
  duration: number;
  complexity: number;
  extras: number[];
  quantity: number;
  deadline: number;
};
export const initialQuote: Quote = {
  type: 0,
  duration: 1,
  complexity: 1,
  extras: [],
  quantity: 1,
  deadline: 0,
};
export function calculateQuote(q: Quote, rates = pricing) {
  const base = rates.types[q.type]?.base;
  const duration = rates.durations[q.duration]?.multiplier;
  const complexity = rates.complexities[q.complexity]?.multiplier;
  const deadline = q.extras.includes(5) ? 2 : q.deadline;
  const urgency = rates.deadlines[deadline]?.multiplier;
  if (
    base == null ||
    duration == null ||
    !complexity ||
    !urgency ||
    !Number.isInteger(q.quantity) ||
    q.quantity < 1 ||
    q.quantity > rates.maxQuantity ||
    q.extras.some((i) => !rates.extras[i] || rates.extras[i].price === null)
  )
    return { total: null, deadline };
  const extras = [...new Set(q.extras)].reduce((sum, i) => sum + (rates.extras[i].price ?? 0), 0);
  return {
    total: Math.round((base * duration * complexity + extras) * q.quantity * urgency),
    deadline,
  };
}
export function quoteSummary(q: Quote) {
  const result = calculateQuote(q);
  return `${pricing.types[q.type].label} · ${pricing.durations[q.duration].label} · Edición ${pricing.complexities[q.complexity].label}\nCantidad: ${q.quantity}\nExtras: ${q.extras.map((i) => pricing.extras[i].label).join(", ") || "Sin extras"}\nPlazo: ${pricing.deadlines[result.deadline].label} (${pricing.deadlines[result.deadline].days})\n${result.total === null ? "Cotización personalizada" : `Estimado: USD ${result.total}`} · Precio estimado, sujeto a revisión del material y alcance.`;
}
