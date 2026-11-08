import Modal from "./components/Modal";
import RequestModal from "./components/RequestModal";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Icon from "./Icon";
import { categories, demoVideo, faqs, images, plans, projects, services, site } from "./data";
import type { Project } from "./data";
import { calculateQuote, initialQuote, pricing } from "./pricing";
import type { Quote } from "./pricing";

const navigation = [
  ["Inicio", "inicio"],
  ["Portafolio", "portafolio"],
  ["Servicios", "servicios"],
  ["Planes", "planes"],
  ["Sobre mí", "sobre-mi"],
  ["Contacto", "contacto"],
];
const money = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

function Button({
  children,
  onClick,
  secondary = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`btn ${secondary ? "btn-secondary" : "btn-primary"} ${className}`}
      onClick={onClick}
    >
      {children}
      <Icon name="diagonal" size={17} />
    </button>
  );
}
function Heading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <i />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [allProjects, setAllProjects] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [showreel, setShowreel] = useState(false);
  const [quote, setQuote] = useState<Quote>(initialQuote);
  const [request, setRequest] = useState<string | null>(null);
  const [legal, setLegal] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [active, setActive] = useState("inicio");
  const estimate = calculateQuote(quote);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document.querySelectorAll("section[id]").forEach((element) => observer.observe(element));
    const reveals = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            reveals.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => reveals.observe(el));
    return () => {
      observer.disconnect();
      reveals.disconnect();
    };
  }, []);
  useEffect(() => {
    if (notice) {
      const timeout = setTimeout(() => setNotice(""), 6000);
      return () => clearTimeout(timeout);
    }
  }, [notice]);
  function whatsapp(message: string) {
    if (!site.whatsapp) {
      setNotice(
        "WhatsApp aún no está configurado. Puedes preparar y descargar tu solicitud desde el formulario.",
      );
      return;
    }
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }
  const visible = projects
    .filter((p) => filter === "Todos" || p.category === filter)
    .slice(0, allProjects || filter !== "Todos" ? undefined : 3);
  const updateQuote = <K extends keyof Quote>(key: K, value: Quote[K]) =>
    setQuote((q) => ({ ...q, [key]: value }));
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header className="header">
        <div className="container nav">
          <a className="logo" href="#inicio" aria-label={`${site.name}, inicio`}>
            <span className="logo-icon">
              <i />
              <i />
              <i />
              <i />
            </span>
            {site.name.toLowerCase()}
            <span className="logo-dot">.</span>
          </a>
          <nav aria-label="Navegación principal" className={menu ? "nav-links open" : "nav-links"}>
            {navigation.map(([text, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "active" : ""}
                onClick={() => setMenu(false)}
              >
                {text}
              </a>
            ))}
          </nav>
          <a href="#contacto" className="nav-cta">
            Hablemos <Icon name="diagonal" size={15} />
          </a>
          <button
            className="menu-toggle icon-button"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <main id="contenido">
        <section id="inicio" className="hero container">
          <div className="hero-copy">
            <span className="availability">
              <i /> Disponible para nuevos proyectos
            </span>
            <h1>
              Transformo ideas
              <br />
              en contenido
              <br />
              que <span>conecta.</span>
              <span className="headline-star">
                <Icon name="spark" size={42} />
              </span>
            </h1>
            <p>
              Edición de video, contenido estratégico y gestión de redes sociales para marcas y
              creadores que quieren destacar.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#portafolio">
                Explorar mi trabajo <Icon name="diagonal" size={17} />
              </a>
              <a className="btn btn-secondary" href="#servicios">
                Contratar mis servicios <Icon name="arrow" size={17} />
              </a>
            </div>
            <div className="hero-note">
              <span className="mini-line" />
              Tu visión. Mi creatividad. Un gran resultado.
            </div>
          </div>
          <div className="hero-art">
            <div className="floating-label label-top">
              <span className="violet-dot" /> Historias que se sienten.
            </div>
            <button
              className="showreel"
              onClick={() => setShowreel(true)}
              aria-label="Reproducir showreel demostrativo"
            >
              <img
                src={images.desert}
                alt="Dunas del desierto iluminadas por una luz cinematográfica"
                width={1200}
                height={800}
                fetchPriority="high"
              />
              <div className="film-grain" />
              <div className="frame-corner tl" />
              <div className="frame-corner tr" />
              <div className="frame-corner bl" />
              <div className="frame-corner br" />
              <span className="frame-top">
                <span>
                  <i /> SHOWREEL
                </span>
                <span>CREATIVE PORTFOLIO</span>
              </span>
              <span className="play-button">
                <Icon name="play" size={25} />
              </span>
              <span className="frame-bottom">
                <span>
                  Una idea. Infinitas posibilidades.<small>VER SHOWREEL · DEMO</small>
                </span>
                <span className="film-time">
                  00:30<small>HD / 16:9</small>
                </span>
              </span>
            </button>
            <div className="floating-label label-bottom">
              <span className="tiny-icon">
                <Icon name="film" size={18} />
              </span>
              <span>
                De una idea a algo increíble.<small>EDICIÓN CON INTENCIÓN</small>
              </span>
              <Icon name="spark" size={20} />
            </div>
            <div className="art-caption">
              <span>01 — PLAY THE POSSIBILITIES</span>
              <span>
                VISUAL DEMO <span className="sound-bars">▂ ▅ ▃ ▆ ▂</span>
              </span>
            </div>
          </div>
        </section>
        <div className="specialties">
          <div className="container">
            <span>VIDEO EDITING</span>
            <Icon name="spark" />
            <span>SHORT-FORM CONTENT</span>
            <Icon name="spark" />
            <span>SOCIAL MEDIA</span>
            <Icon name="spark" />
            <span>CREATIVE STRATEGY</span>
            <Icon name="spark" />
          </div>
        </div>

        <section id="portafolio" className="section container">
          <div className="section-top reveal">
            <Heading
              eyebrow="PORTAFOLIO SELECCIONADO"
              title={
                <>
                  Menos palabras.
                  <br className="mobile-break" /> Más <span className="serif">play.</span>
                </>
              }
              description="Cada proyecto, una historia diferente. Dale play a lo que podemos crear."
            />
            <span className="section-aside">
              IDEAS EN MOVIMIENTO <Icon name="diagonal" size={24} />
            </span>
          </div>
          <div className="filters" aria-label="Filtrar proyectos">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={filter === c ? "selected" : ""}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visible.map((p, i) => (
              <button
                className={`project-card project-${p.id}`}
                key={p.id}
                onClick={() => setProject(p)}
              >
                <div className="project-image">
                  <img src={p.image} alt={p.title} loading="lazy" decoding="async" width={1200} height={800} />
                  <span className="project-label">{p.label}</span>
                  <span className="project-play">
                    <Icon name="play" size={18} />
                  </span>
                  <span className="project-format">
                    {p.aspect} <span>· DEMO</span>
                  </span>
                  <span className="project-number">0{i + 1}</span>
                </div>
                <div className="project-info">
                  <div>
                    <span className="project-category">{p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.services}</p>
                  </div>
                  <span className="project-arrow">
                    <Icon name="diagonal" />
                  </span>
                </div>
                <span className="sr-only">Ver proyecto: {p.description}</span>
              </button>
            ))}
          </div>
          <div className="portfolio-bottom">
            <span>
              <i className="violet-dot" /> Proyectos de ejemplo · No representan trabajos para
              clientes.
            </span>
            <button
              className="text-link"
              onClick={() => {
                setAllProjects(!allProjects);
                setFilter("Todos");
              }}
            >
              {allProjects ? "Ver selección" : "Ver todos los proyectos"}{" "}
              <Icon name="arrow" size={17} />
            </button>
          </div>
        </section>

        <section id="servicios" className="section services-section">
          <div className="container">
            <div className="section-top reveal">
              <Heading
                eyebrow="LO QUE PUEDO HACER POR TI"
                title={
                  <>
                    Tu contenido.
                    <br />
                    En su mejor versión.
                  </>
                }
              />
              <p className="section-description">
                No se trata solo de publicar.
                <br />
                Se trata de crear algo que importe.
              </p>
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <article className="service-card reveal" key={s.title}>
                  <div className="service-top">
                    <span className="service-icon">
                      <Icon name={s.icon} size={24} />
                    </span>
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <ul>
                    {s.items.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="text-link" onClick={() => setRequest(s.title)}>
                    Solicitar servicio <Icon name="diagonal" size={17} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cotizador" className="section container">
          <div className="reveal">
            <Heading
              eyebrow="SIN SORPRESAS. CON POSIBILIDADES."
              title={
                <>
                  Dale forma a tu próximo <span className="serif">proyecto.</span>
                </>
              }
              description="Cuéntame qué tienes en mente y obtén una primera estimación."
            />
          </div>
          <div className="quote-layout">
            <div className="quote-config">
              <div className="config-header">
                <Icon name="film" />
                <h3>Configura tu video</h3>
                <span>SEGÚN ALCANCE</span>
              </div>
              <div className="form-grid">
                <label>
                  Tipo de video
                  <select value={quote.type} onChange={(e) => updateQuote("type", +e.target.value)}>
                    {pricing.types.map((t, i) => (
                      <option value={i} key={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Duración del video final
                  <select
                    value={quote.duration}
                    onChange={(e) => updateQuote("duration", +e.target.value)}
                  >
                    {pricing.durations.map((t, i) => (
                      <option value={i} key={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <fieldset>
                <legend>Complejidad de edición</legend>
                <div className="complexity-options">
                  {pricing.complexities.map((c, i) => (
                    <label
                      className={quote.complexity === i ? "complexity selected" : "complexity"}
                      key={c.label}
                    >
                      <input
                        type="radio"
                        name="complexity"
                        checked={quote.complexity === i}
                        onChange={() => updateQuote("complexity", i)}
                      />
                      <span>
                        {c.label}
                        <small>{c.detail}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  Un toque extra <span>(opcional)</span>
                </legend>
                <div className="extras-grid">
                  {pricing.extras.map((extra, i) => (
                    <label className="checkbox-label" key={extra.label}>
                      <input
                        type="checkbox"
                        checked={quote.extras.includes(i)}
                        onChange={() =>
                          updateQuote(
                            "extras",
                            quote.extras.includes(i)
                              ? quote.extras.filter((x) => x !== i)
                              : [...quote.extras, i],
                          )
                        }
                      />
                      {extra.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="form-grid">
                <label>
                  Cantidad de videos
                  <input
                    type="number"
                    min="1"
                    max={pricing.maxQuantity}
                    step="1"
                    value={quote.quantity || ""}
                    onChange={(e) => updateQuote("quantity", Number(e.target.value))}
                  />
                </label>
                <label>
                  Plazo de entrega
                  <select
                    value={estimate.deadline}
                    disabled={quote.extras.includes(5)}
                    onChange={(e) => updateQuote("deadline", +e.target.value)}
                  >
                    {pricing.deadlines.map((t, i) => (
                      <option value={i} key={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <aside className="quote-summary">
              <div className="summary-heading">
                <span className="violet-dot" /> TU IDEA, EN NÚMEROS <Icon name="spark" />
              </div>
              <h3>Resumen del proyecto</h3>
              <dl>
                <div>
                  <dt>Servicio</dt>
                  <dd>{pricing.types[quote.type].label}</dd>
                </div>
                <div>
                  <dt>Duración</dt>
                  <dd>{pricing.durations[quote.duration].label}</dd>
                </div>
                <div>
                  <dt>Edición</dt>
                  <dd>{pricing.complexities[quote.complexity].label}</dd>
                </div>
                <div>
                  <dt>Cantidad</dt>
                  <dd>
                    {quote.quantity} {quote.quantity === 1 ? "video" : "videos"}
                  </dd>
                </div>
                <div>
                  <dt>Extras</dt>
                  <dd>
                    {quote.extras.length
                      ? quote.extras.map((i) => pricing.extras[i].label).join(", ")
                      : "Sin adicionales"}
                  </dd>
                </div>
                <div>
                  <dt>Plazo estimado*</dt>
                  <dd>{pricing.deadlines[estimate.deadline].days}</dd>
                </div>
              </dl>
              <div className="price" aria-live="polite">
                <span>INVERSIÓN ESTIMADA</span>
                {estimate.total === null ? (
                  <strong className="custom-price">Cotización personalizada</strong>
                ) : (
                  <strong>
                    <small>USD</small> {money(estimate.total)}
                    <span>.00</span>
                  </strong>
                )}
                <p>Precio estimado, sujeto a revisión del material y alcance.</p>
              </div>
              <Button
                onClick={() => {
                  if (quote.quantity < 1 || quote.quantity > pricing.maxQuantity || !Number.isInteger(quote.quantity)) {
                    setNotice("Introduce una cantidad entera de videos entre 1 y 20.");
                    return;
                  }
                  setRequest("Edición de video");
                }}
              >
                Solicitar cotización
              </Button>
              <small className="quote-disclaimer">
                Tarifas por configurar · Sin compromiso
                <br />
                *Para una pieza. El volumen puede ampliar el plazo.
              </small>
            </aside>
          </div>
        </section>

        <section id="planes" className="section plans-section">
          <div className="container">
            <div className="section-top reveal">
              <Heading
                eyebrow="A TU RITMO, A TU MEDIDA"
                title={
                  <>
                    Una idea puntual.
                    <br />O una gran alianza.
                  </>
                }
                description="Elige cómo quieres que trabajemos juntos."
              />
              <span className="pill">
                <span className="violet-dot" /> FLEXIBLE POR NATURALEZA
              </span>
            </div>
            <div className="freelance-banner">
              <span className="service-icon">
                <Icon name="film" size={25} />
              </span>
              <div>
                <span className="eyebrow">MODALIDAD FREELANCE</span>
                <h3>Un proyecto. Toda mi creatividad.</h3>
                <p>
                  Precio según alcance · Entregables definidos · Fecha acordada · Revisiones
                  establecidas · Opción recurrente
                </p>
              </div>
              <Button secondary onClick={() => setRequest("Freelance")}>
                Contratar un proyecto
              </Button>
            </div>
            <div className="plans-title">
              <h3>Community Management</h3>
              <span>ESTRATEGIA + CONTENIDO + CONSTANCIA</span>
            </div>
            <div className="plans-grid">
              {plans.map((p, i) => (
                <article className={`plan-card reveal ${i === 1 ? "featured" : ""}`} key={p.name}>
                  {i === 1 && (
                    <span className="plan-recommended">
                      <Icon name="spark" size={13} /> EL EQUILIBRIO CREATIVO
                    </span>
                  )}
                  <span className="plan-index">0{i + 1} / MENSUAL</span>
                  <h3>{p.name}</h3>
                  <p>{p.subtitle}</p>
                  <div className="plan-price">
                    Desde USD {p.price === null ? "—" : money(p.price)}{" "}
                    <span>{p.price === null ? "Cotizar" : ""}</span>
                    <small>/ mes · Según alcance</small>
                  </div>
                  <div className="plan-volume">
                    <span>{p.posts} publicaciones</span>
                    <span>{p.videos} videos</span>
                    <span>
                      {p.platforms} {p.platforms === 1 ? "plataforma" : "plataformas"}
                    </span>
                  </div>
                  <ul>
                    {p.items.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button secondary={i !== 1} onClick={() => setRequest(`Plan ${p.name}`)}>
                    Seleccionar plan
                  </Button>
                  <small className="plan-footnote">
                    Volumen orientativo y configurable en tu solicitud.
                  </small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre-mi" className="section container about-layout">
          <div className="about-photo reveal">
            <img
              src={images.portrait}
              alt="Retrato editorial nocturno, fotografía de ejemplo"
              loading="lazy"
            />
            <span className="photo-credit">FOTOGRAFÍA DE REFERENCIA · UNSPLASH</span>
            <div className="about-sticker">
              <Icon name="spark" size={28} />
              <span>La creatividad no se pausa.</span>
            </div>
          </div>
          <div className="about-copy reveal">
            <Heading
              eyebrow="DETRÁS DE CADA FRAME"
              title={
                <>
                  Creatividad con intención.
                  <br />
                  Contenido con <span className="serif">alma.</span>
                </>
              }
            />
            <p>
              Creo en las historias que te hacen detener el scroll. En los detalles que marcan la
              diferencia. Y en el poder de una buena idea, bien ejecutada.
            </p>
            <p>
              Mi enfoque combina edición audiovisual, storytelling y estrategia digital para dar
              forma a contenido que se sienta auténtico y tenga un propósito.
            </p>
            <span className="demo-note">
              Presentación de ejemplo · Personaliza este espacio con tu historia.
            </span>
            <div className="tool-list">
              {site.tools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <a className="text-link" href="#contacto">
              Conozcamos tu próxima idea <Icon name="diagonal" size={18} />
            </a>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="reveal">
              <Heading
                eyebrow="SIMPLE, CERCANO Y TRANSPARENTE"
                title={<>De tu idea al último frame.</>}
              />
            </div>
            <div className="process-grid">
              {[
                [
                  "Cuéntame tu idea",
                  "Te escucho. Conocemos tu marca, tus objetivos y eso que quieres contar.",
                ],
                [
                  "Definimos el camino",
                  "Acordamos alcance, presupuesto, entregables y fechas. Todo claro.",
                ],
                [
                  "Le damos vida",
                  "Edito y desarrollamos tu proyecto con creatividad y atención al detalle.",
                ],
                [
                  "Afinamos y entregamos",
                  "Revisamos juntos, ajustamos y dejamos todo listo para compartir.",
                ],
              ].map(([title, text], i) => (
                <article className="process-step reveal" key={title}>
                  <span className="step-number">
                    0{i + 1}
                    <span />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container faq-layout">
          <div className="reveal">
            <Heading
              eyebrow="ANTES DE DARLE PLAY"
              title={
                <>
                  Buenas preguntas.
                  <br />
                  Respuestas claras.
                </>
              }
              description="Si te queda alguna duda, estoy a un mensaje de distancia."
            />
            <button className="text-link" onClick={() => setRequest("Consulta general")}>
              Hablemos de tu proyecto <Icon name="diagonal" size={17} />
            </button>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Icon name="plus" size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contacto" className="contact-section">
          <div className="container contact-layout">
            <div>
              <span className="eyebrow">
                <i /> EL SIGUIENTE GRAN PROYECTO EMPIEZA AQUÍ
              </span>
              <h2>
                ¿Tienes una idea?
                <br />
                Hagámosla
                <br />
                <span>realidad.</span>
                <Icon name="diagonal" size={66} />
              </h2>
              <p>
                Cuéntame qué imaginas.
                <br />
                Yo te ayudo a darle forma.
              </p>
              <div className="contact-actions">
                <button className="btn btn-primary" onClick={() => setRequest("Consulta general")}>
                  Cuéntame tu proyecto <Icon name="diagonal" size={17} />
                </button>
                <button
                  className="text-link"
                  onClick={() =>
                    whatsapp("Hola, me gustaría conversar sobre un proyecto creativo.")
                  }
                >
                  <Icon name="whatsapp" size={20} /> Hablemos por WhatsApp
                </button>
              </div>
              <span className="contact-note">
                <span className="violet-dot" /> Sin compromiso. Sin respuestas automáticas.
              </span>
            </div>
            <div className="contact-note-card">
              <Icon name="spark" size={46} />
              <span>
                LAS BUENAS IDEAS
                <br />
                MERECEN SER VISTAS.
              </span>
              <p>¿Lo creamos juntos?</p>
              <button
                onClick={() => setRequest("Consulta general")}
                className="round-arrow"
                aria-label="Abrir formulario de contacto"
              >
                <Icon name="diagonal" size={29} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="container">
        <div className="footer-top">
          <a className="logo" href="#inicio">
            <span className="logo-icon">
              <i />
              <i />
              <i />
              <i />
            </span>
            {site.name.toLowerCase()}
            <span className="logo-dot">.</span>
          </a>
          <p>Ideas en movimiento. Contenido que conecta.</p>
          <div className="social-links">
            {Object.entries(site.socials).map(([name, url]) =>
              url ? (
                <a href={url} target="_blank" rel="noreferrer" key={name}>
                  {name}
                  <Icon name="diagonal" size={13} />
                </a>
              ) : (
                <button
                  key={name}
                  onClick={() => setNotice(`El enlace de ${name} está pendiente de configurar.`)}
                >
                  {name}
                  <Icon name="diagonal" size={13} />
                </button>
              ),
            )}
          </div>
        </div>
        <div className="footer-nav">
          {navigation.slice(1).map(([text, id]) => (
            <a href={`#${id}`} key={id}>
              {text}
            </a>
          ))}
          <button
            onClick={() =>
              site.email
                ? window.location.assign(`mailto:${site.email}`)
                : setNotice("Correo comercial pendiente de configurar en src/data.ts.")
            }
          >
            <Icon name="mail" size={15} />
            {site.email || "Contacto por correo"}
          </button>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}. Hecho con intención.
          </span>
          <span className="legal-links">
            <button onClick={() => setLegal("Privacidad")}>Aviso de privacidad</button>
            <button onClick={() => setLegal("Condiciones del servicio")}>
              Condiciones del servicio
            </button>
          </span>
          <a href="#inicio">VOLVER ARRIBA ↑</a>
        </div>
      </footer>
      {project && (
        <Modal title="Proyecto demostrativo" close={() => setProject(null)} wide>
          <div className="project-modal">
            <video
              controls
              autoPlay
              playsInline
              poster={project.image}
              src={project.video}
              onError={() =>
                setNotice("No se pudo cargar el video de muestra. Inténtalo de nuevo más tarde.")
              }
            />
            <span className="eyebrow">
              {project.category} · {project.aspect}
            </span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>{project.services}</p>
            <div className="integration-notice">
              Concepto y fotografías de demostración. El reproductor utiliza un montaje de imágenes
              de referencia de Unsplash, no un trabajo realizado para un cliente.
            </div>
            <Button
              onClick={() => {
                setProject(null);
                setRequest("Edición de video");
              }}
            >
              Quiero crear algo así
            </Button>
          </div>
        </Modal>
      )}
      {showreel && (
        <Modal title="Showreel · Video de muestra" close={() => setShowreel(false)} wide>
          <video
            className="showreel-video"
            controls
            autoPlay
            playsInline
            src={demoVideo}
            onError={() => setNotice("No se pudo cargar el showreel de muestra.")}
          />
          <p className="modal-caption">
            Estudio visual demostrativo de 30 segundos, sin audio, con fotografías de Unsplash.
            Reemplázalo por tu showreel en src/data.ts.
          </p>
        </Modal>
      )}
      {request !== null && (
        <RequestModal
          initialService={request}
          quote={quote}
          close={() => setRequest(null)}
          whatsapp={whatsapp}
        />
      )}
      {legal && (
        <Modal title={legal} close={() => setLegal(null)}>
          <div className="legal-content">
            <h2>{legal}</h2>
            {legal === "Privacidad" ? (
              <>
                <p>
                  Esta demostración no almacena ni envía tus datos a un servidor. El formulario
                  permite preparar y descargar una solicitud en tu dispositivo.
                </p>
                <p>
                  Al usar correo o WhatsApp, los datos se compartirán con el proveedor externo
                  seleccionado según sus políticas. No incluyas información sensible.
                </p>
              </>
            ) : (
              <>
                <p>
                  Las tarifas y los proyectos son demostrativos. Las solicitudes no constituyen una
                  contratación ni un contrato firmado. El alcance, los tiempos, las revisiones y el
                  pago requieren una propuesta aceptada por ambas partes.
                </p>
                <p>
                  No se procesan pagos. Las integraciones de pago y firma digital están reservadas
                  para una futura implementación.
                </p>
              </>
            )}
            <div className="integration-notice">
              Texto orientativo. Debe adaptarse a la identidad y obligaciones legales del
              profesional antes de publicar.
            </div>
          </div>
        </Modal>
      )}
      {notice && (
        <div className="toast" role="status">
          {notice}
          <button aria-label="Cerrar aviso" onClick={() => setNotice("")}>
            <Icon name="close" size={17} />
          </button>
        </div>
      )}
    </>
  );
}

export default App;
