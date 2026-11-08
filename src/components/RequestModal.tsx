import { useState } from "react";
import Icon from "../Icon";
import { plans, site } from "../data";
import { pricing, quoteSummary } from "../pricing";
import type { Quote } from "../pricing";
import Modal from "./Modal";

export default function RequestModal({
  initialService,
  quote,
  close,
  whatsapp,
}: {
  initialService: string;
  quote: Quote;
  close: () => void;
  whatsapp: (message: string) => void;
}) {
  const [step, setStep] = useState(1);
  const [modality, setModality] = useState(
    initialService.includes("Plan") || initialService === "Community Management"
      ? "Community Management"
      : "Freelance",
  );
  const [selected, setSelected] = useState(
    initialService.startsWith("Plan")
      ? initialService
      : initialService === "Community Management"
        ? "Plan Esencial"
        : ["Creación de contenido", "Consulta general"].includes(initialService)
          ? initialService
          : "Edición de video",
  );
  const [volume, setVolume] = useState({
    posts: plans.find((p) => `Plan ${p.name}` === initialService)?.posts || 8,
    videos: plans.find((p) => `Plan ${p.name}` === initialService)?.videos || 2,
    platforms: plans.find((p) => `Plan ${p.name}` === initialService)?.platforms || 1,
  });
  const [included, setIncluded] = useState<string[]>(
    plans.find((p) => `Plan ${p.name}` === initialService)?.items || plans[0].items,
  );
  const [client, setClient] = useState({
    name: "",
    brand: "",
    email: "",
    phone: "",
    socials: "",
    description: "",
    budget: "",
    date: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const summary = `SOLICITUD DE PROYECTO · ${site.name}\nModalidad: ${modality}\nServicio: ${selected}\n${modality === "Freelance" && selected === "Edición de video" ? quoteSummary(quote) : modality === "Community Management" ? `${volume.posts} publicaciones · ${volume.videos} videos · ${volume.platforms} plataformas / mes\nIncluye: ${included.join(", ")}\nPrecio mensual: por cotizar` : "Alcance y presupuesto por definir"}\n\nNombre: ${client.name}\nMarca: ${client.brand || "No indicada"}\nCorreo: ${client.email}\nWhatsApp: ${client.phone}\nRedes: ${client.socials || "No indicadas"}\nProyecto: ${client.description}\nPresupuesto: ${client.budget || "Por definir"}\nFecha deseada: ${client.date}\n\nSolicitud sin compromiso, pendiente de revisión y aceptación por ambas partes.`;
  function download() {
    setBusy(true);
    setStatus("");
    try {
      const url = URL.createObjectURL(new Blob([summary], { type: "text/plain;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "solicitud-frame.txt";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus(
        "Resumen preparado y descarga iniciada. No se ha enviado ninguna solicitud ni confirmado una contratación.",
      );
    } catch {
      setStatus(
        "No se pudo descargar el resumen. Puedes seleccionar el texto y copiarlo manualmente.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal title="Hagamos algo increíble" close={close}>
      <div className="request-content">
        <div className="request-steps">
          {["Modalidad", "Servicios", "Tus datos", "Resumen"].map((s, i) => (
            <span key={s} className={step >= i + 1 ? "current" : ""}>
              <b>{i + 1}</b>
              {s}
            </span>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 2 && modality === "Freelance" && selected === "Edición de video" &&
              (!Number.isInteger(quote.quantity) || quote.quantity < 1 || quote.quantity > pricing.maxQuantity)) {
              setStatus(`Configura una cantidad entre 1 y ${pricing.maxQuantity} videos en el cotizador.`);
              return;
            }
            if (step === 3 && (!client.name.trim() || client.description.trim().length < 15)) {
              setStatus("Indica tu nombre y describe el proyecto con al menos 15 caracteres útiles.");
              return;
            }
            setStatus("");
            setStep(Math.min(4, step + 1));
          }}
        >
          {step === 1 && (
            <>
              <span className="eyebrow">PASO 01</span>
              <h2>¿Cómo trabajamos juntos?</h2>
              <p>Un proyecto puntual o una alianza a largo plazo.</p>
              {["Freelance", "Community Management"].map((m) => (
                <label className={`modality-option ${modality === m ? "selected" : ""}`} key={m}>
                  <input
                    type="radio"
                    name="modality"
                    checked={modality === m}
                    onChange={() => {
                      setModality(m);
                      setSelected(m === "Freelance" ? "Edición de video" : "Plan Esencial");
                      setIncluded(plans[0].items);
                      setVolume({ posts: 8, videos: 2, platforms: 1 });
                    }}
                  />
                  <span>
                    <strong>{m}</strong>
                    <small>
                      {m === "Freelance"
                        ? "Entregables y presupuesto por proyecto."
                        : "Estrategia y contenido cada mes."}
                    </small>
                  </span>
                  <Icon name={m === "Freelance" ? "film" : "social"} />
                </label>
              ))}
            </>
          )}
          {step === 2 && (
            <>
              <span className="eyebrow">PASO 02</span>
              <h2>Tu proyecto, a tu medida.</h2>
              <label>
                Servicio o plan
                <select
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    const plan = plans.find((p) => `Plan ${p.name}` === e.target.value);
                    if (plan) {
                      setVolume({
                        posts: plan.posts,
                        videos: plan.videos,
                        platforms: plan.platforms,
                      });
                      setIncluded(plan.items);
                    }
                  }}
                >
                  {(modality === "Freelance"
                    ? [
                        "Edición de video",
                        "Creación de contenido",
                        "Proyecto personalizado",
                        "Consulta general",
                      ]
                    : plans.map((p) => `Plan ${p.name}`)
                  ).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              {modality === "Community Management" ? (
                <>
                  <div className="form-grid volume-fields">
                    {(["posts", "videos", "platforms"] as const).map((key, i) => (
                      <label key={key}>
                        {["Publicaciones / mes", "Videos / mes", "Plataformas"][i]}
                        <input
                          type="number"
                          min={key === "platforms" ? 1 : 0}
                          max="100"
                          required
                          value={volume[key]}
                          onChange={(e) => setVolume({ ...volume, [key]: +e.target.value })}
                        />
                      </label>
                    ))}
                  </div>
                  <fieldset>
                    <legend>Servicios incluidos</legend>
                    {Array.from(new Set(plans.flatMap((p) => p.items))).map((item) => (
                      <label className="checkbox-label plan-checkbox" key={item}>
                        <input
                          type="checkbox"
                          checked={included.includes(item)}
                          onChange={() =>
                            setIncluded(
                              included.includes(item)
                                ? included.filter((s) => s !== item)
                                : [...included, item],
                            )
                          }
                        />
                        {item}
                      </label>
                    ))}
                  </fieldset>
                </>
              ) : selected === "Edición de video" ? (
                <>
                  <pre className="request-summary">{quoteSummary(quote)}</pre>
                  <button
                    className="text-link"
                    type="button"
                    onClick={() => {
                      close();
                      document.getElementById("cotizador")?.scrollIntoView({
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                      });
                    }}
                  >
                    Cambiar configuración en el cotizador <Icon name="arrow" size={16} />
                  </button>
                </>
              ) : (
                <p>
                  Definiremos juntos los entregables, revisiones y plazos después de conocer tu
                  idea.
                </p>
              )}
              <p className="demo-note">
                La selección no reserva fechas ni confirma una contratación.
              </p>
            </>
          )}
          {step === 3 && (
            <>
              <span className="eyebrow">PASO 03</span>
              <h2>Cuéntame un poco más.</h2>
              <div className="form-grid">
                {(
                  [
                    { key: "name", label: "Nombre", type: "text", required: true },
                    { key: "brand", label: "Marca o empresa (opcional)", type: "text" },
                    { key: "email", label: "Correo electrónico", type: "email", required: true },
                    { key: "phone", label: "WhatsApp", type: "tel", required: true },
                    { key: "socials", label: "Redes sociales (opcional)", type: "text" },
                    { key: "budget", label: "Presupuesto USD (opcional)", type: "text" },
                    {
                      key: "date",
                      label: "Fecha de entrega deseada",
                      type: "date",
                      required: true,
                    },
                  ] as const
                ).map((field) => (
                  <label key={field.key}>
                    {field.label}
                    <input
                      type={field.type}
                      required={"required" in field && field.required}
                      value={client[field.key]}
                      min={
                        field.type === "date" ? localToday() : undefined
                      }
                      pattern={field.type === "tel" ? "[+0-9 ()-]{7,20}" : undefined}
                      onChange={(e) => setClient({ ...client, [field.key]: e.target.value })}
                    />
                  </label>
                ))}
              </div>
              <label>
                Descripción del proyecto
                <textarea
                  minLength={15}
                  maxLength={4000}
                  required
                  rows={4}
                  value={client.description}
                  placeholder="Tu idea, objetivos y referencias…"
                  onChange={(e) => setClient({ ...client, description: e.target.value })}
                />
              </label>
              <label className="checkbox-label consent">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                Entiendo que preparar esta solicitud no la envía ni confirma una contratación. Solo
                compartiré mis datos al elegir un canal externo.
              </label>
            </>
          )}
          {step === 4 && (
            <>
              <span className="eyebrow">PASO 04</span>
              <h2>Todo listo para conversar.</h2>
              <pre className="request-summary">{summary}</pre>
              <div className="integration-notice">
                Modo demostración: no hay un servidor de envíos conectado. Descarga el resumen o
                utiliza un canal externo una vez configurado.
              </div>
              <div className="request-send">
                <button
                  className="btn btn-primary"
                  type="button"
                  disabled={busy}
                  onClick={download}
                >
                  {busy ? "Preparando…" : "Descargar solicitud"}
                  <Icon name="arrow" size={17} />
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => whatsapp(summary)}
                >
                  <Icon name="whatsapp" size={18} />
                  WhatsApp
                </button>
                <button
                  className="text-link"
                  type="button"
                  onClick={() => {
                    if (!site.email) {
                      setStatus(
                        "El correo comercial no está configurado. Descarga la solicitud para conservarla.",
                      );
                      return;
                    }
                    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Solicitud de proyecto · " + client.name)}&body=${encodeURIComponent(summary)}`;
                  }}
                >
                  Enviar por correo <Icon name="mail" size={16} />
                </button>
              </div>
              <p className="demo-note">
                Pagos y firma digital: integraciones futuras, no disponibles en esta versión.
              </p>
            </>
          )}
          <p className="form-status" role="status">{status}</p>
          <div className="request-bottom">
            {step > 1 ? (
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setStep(step - 1);
                  setStatus("");
                }}
              >
                ← Atrás
              </button>
            ) : (
              <span>Sin compromiso.</span>
            )}
            {step < 4 && (
              <button type="submit" className="btn btn-primary">
                Continuar <Icon name="arrow" size={17} />
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}

function localToday() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}
