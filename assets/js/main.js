/* Configuración central: cambia aquí el número y el mensaje */
const KATDOC = {
  whatsapp: "584249229539",
  mensaje: "Hola Katdoc, quiero agendar una cita para mi mascota."
};

document.querySelectorAll("[data-wa]").forEach(a => {
  const texto = a.dataset.wa || KATDOC.mensaje;
  a.href = `https://wa.me/${KATDOC.whatsapp}?text=${encodeURIComponent(texto)}`;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
});

const nav = document.getElementById("nav");
const btn = document.getElementById("menu");
const menu = abrir => {
  nav.classList.toggle("open", abrir);
  document.body.classList.toggle("menu-open", abrir);
  btn.setAttribute("aria-expanded", abrir);
  btn.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
};
btn.addEventListener("click", () => menu(!nav.classList.contains("open")));
document.getElementById("velo").addEventListener("click", () => menu(false));
nav.addEventListener("click", e => { if (e.target.closest("a")) menu(false); });
addEventListener("keydown", e => { if (e.key === "Escape") menu(false); });
matchMedia("(min-width: 821px)").addEventListener("change", e => e.matches && menu(false));

const barra = document.querySelector(".top");
addEventListener("scroll", () => barra.classList.toggle("on", scrollY > 8), { passive: true });
document.getElementById("anio").textContent = new Date().getFullYear();

/* Aparición suave al hacer scroll (se omite con "reducir movimiento") */
if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    io.unobserve(el);
    el.classList.add("in");
    setTimeout(() => { el.classList.remove("rv", "in"); el.style.transitionDelay = ""; }, 900);
  }), { threshold: 0.15 });
  document.querySelectorAll("#servicios h2,#servicios .intro,.card,.dom .wrap>*,.contacto .wrap>*").forEach((el, i) => {
    el.classList.add("rv");
    el.style.transitionDelay = (i % 3) * 80 + "ms";
    io.observe(el);
  });
}

/* Parallax suave: la imagen de domicilio baja un poco más lento que el scroll */
const fondo = document.querySelector(".fondo");
if (fondo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const seccion = fondo.parentElement;
  let espera = false;
  const mover = () => {
    espera = false;
    const r = seccion.getBoundingClientRect(), h = innerHeight;
    if (r.bottom < 0 || r.top > h) return;
    const p = (h - r.top) / (h + r.height);
    fondo.style.setProperty("--py", ((p - 0.5) * 140).toFixed(1) + "px");
  };
  addEventListener("scroll", () => { if (!espera) { espera = true; requestAnimationFrame(mover); } }, { passive: true });
  addEventListener("resize", mover);
  mover();
}