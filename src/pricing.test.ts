import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateQuote as calculateWithRates, initialQuote, pricing, quoteSummary } from "./pricing.ts";

// Tarifas sintéticas usadas exclusivamente para verificar la fórmula.
const rates = { ...pricing, types: pricing.types.map((t, i) => ({ ...t, base: [45, 100, 150, 180, null][i] })), extras: pricing.extras.map((e, i) => ({ ...e, price: [15, 40, 15, 25, 10, 0][i] })) };
const calculateQuote = (q: typeof initialQuote) => calculateWithRates(q, rates);

test("sin tarifas reales no se muestran importes", () => {
  assert.equal(calculateWithRates(initialQuote).total, null);
  assert.equal(calculateWithRates({ ...initialQuote, extras: [0] }).total, null);
  assert.doesNotMatch(quoteSummary(initialQuote), /Estimado: USD/);
});

test("tarifa básica según tipo, duración y complejidad", () => {
  assert.equal(calculateQuote({ ...initialQuote, duration: 0, complexity: 0 }).total, 45);
  assert.equal(calculateQuote(initialQuote).total, 101);
  assert.equal(calculateQuote({ ...initialQuote, type: 2, duration: 2, complexity: 2 }).total, 750);
});
test("extras por pieza, cantidad y urgencia se aplican de forma consistente", () => {
  assert.equal(
    calculateQuote({
      ...initialQuote,
      duration: 0,
      complexity: 0,
      quantity: 3,
      extras: [0, 2],
      deadline: 1,
    }).total,
    281,
  );
  assert.equal(
    calculateQuote({ ...initialQuote, duration: 0, complexity: 0, extras: [5] }).total,
    68,
  );
  assert.equal(calculateQuote({ ...initialQuote, extras: [5], deadline: 1 }).deadline, 2);
  assert.equal(
    calculateQuote({ ...initialQuote, extras: [5], deadline: 2 }).total,
    calculateQuote({ ...initialQuote, deadline: 2 }).total,
  );
});
test("no se inventan importes fuera de los límites", () => {
  for (const change of [
    { type: 4 },
    { duration: 4 },
    { quantity: 21 },
    { quantity: 0 },
    { quantity: -1 },
    { quantity: 1.5 },
    { quantity: NaN },
  ]) {
    assert.equal(calculateQuote({ ...initialQuote, ...change }).total, null);
  }
  assert.notEqual(calculateQuote({ ...initialQuote, quantity: 20 }).total, null);
});
test("resumen incluye alcance, extras y advertencia de estimación", () => {
  const summary = quoteSummary({ ...initialQuote, extras: [0, 5], quantity: 2 });
  assert.match(summary, /Cantidad: 2/);
  assert.match(summary, /Subtítulos animados/);
  assert.match(summary, /Urgente/);
  assert.match(summary, /sujeto a revisión del material y alcance/);
  assert.match(quoteSummary({ ...initialQuote, type: 4 }), /Cotización personalizada/);
});
