/* THE RESIDENCE · interacciones del sitio */
(function () {
  "use strict";

  var WA_PHONE = "541166425883";
  var root = document.documentElement;
  root.classList.remove("no-js");

  function waLink(text) {
    return "https://api.whatsapp.com/send?phone=" + WA_PHONE + "&text=" + encodeURIComponent(text);
  }

  /* Enlaces de WhatsApp con mensaje prearmado: <a data-wa="Mensaje"> */
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var msg = a.getAttribute("data-wa") || "¡Hola! Quiero información sobre The Residence.";
    a.href = waLink(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* Altura de la barra superior (para el header transparente del inicio) */
  var topbar = document.querySelector(".topbar");
  function setTopbar() { if (topbar) root.style.setProperty("--tb", topbar.offsetHeight + "px"); }
  setTopbar();
  window.addEventListener("resize", setTopbar);

  /* Header con sombra al hacer scroll */
  var header = document.querySelector(".header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 30);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menú mobile */
  var drawer = document.querySelector(".drawer");
  var toggle = document.querySelector(".nav-toggle");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle) toggle.addEventListener("click", function () { setDrawer(true); });
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      if (e.target === drawer || e.target.closest(".drawer__close") || e.target.closest("a")) setDrawer(false);
    });
  }

  /* Animaciones de entrada */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Lightbox: agrupa por [data-gallery] */
  var lb, lbImg, lbCap, lbCount, items = [], index = 0;
  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Galería de fotos");
    lb.innerHTML =
      '<span class="lightbox__count"></span>' +
      '<figure style="margin:0;text-align:center"><img class="lightbox__img" alt=""><figcaption class="lightbox__caption"></figcaption></figure>' +
      '<button class="lightbox__btn lightbox__close" aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>' +
      '<button class="lightbox__btn lightbox__prev" aria-label="Anterior"><i class="fa-solid fa-chevron-left"></i></button>' +
      '<button class="lightbox__btn lightbox__next" aria-label="Siguiente"><i class="fa-solid fa-chevron-right"></i></button>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector(".lightbox__img");
    lbCap = lb.querySelector(".lightbox__caption");
    lbCount = lb.querySelector(".lightbox__count");
    lb.querySelector(".lightbox__close").addEventListener("click", closeLb);
    lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(index - 1); });
    lb.querySelector(".lightbox__next").addEventListener("click", function () { show(index + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }
  function show(i) {
    index = (i + items.length) % items.length;
    var it = items[index];
    var img = it.querySelector("img");
    lbImg.src = it.getAttribute("data-full") || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = it.getAttribute("data-caption") || img.alt;
    lbCount.textContent = (index + 1) + " / " + items.length;
  }
  function closeLb() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-gallery] .gallery__item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!lb) buildLightbox();
      var group = btn.closest("[data-gallery]");
      items = Array.prototype.slice.call(group.querySelectorAll(".gallery__item"));
      show(items.indexOf(btn));
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lightbox__close").focus();
    });
  });

  /* Pestañas de departamentos: resalta la sección visible */
  var tabLinks = document.querySelectorAll(".unit-tabs a");
  if (tabLinks.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tabLinks.forEach(function (l) {
          l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    tabLinks.forEach(function (l) {
      var target = document.querySelector(l.getAttribute("href"));
      if (target) spy.observe(target);
    });
  }

  /* Cotizador: arma el mensaje y abre WhatsApp */
  var form = document.getElementById("cotizador-form");
  if (form) {
    var params = new URLSearchParams(location.search);
    ["depto", "plan"].forEach(function (name) {
      var val = params.get(name);
      if (!val) return;
      var input = form.querySelector('[name="' + name + '"][value="' + val + '"]');
      if (input) input.checked = true;
    });

    var desde = form.querySelector('[name="desde"]');
    var hasta = form.querySelector('[name="hasta"]');
    var today = new Date().toISOString().slice(0, 10);
    if (desde) desde.min = today;
    if (desde && hasta) {
      desde.addEventListener("change", function () {
        hasta.min = desde.value;
        if (hasta.value && hasta.value < desde.value) hasta.value = "";
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var fmt = function (v) { return v ? v.split("-").reverse().join("/") : "a definir"; };
      var lines = [
        "¡Hola The Residence! Quiero pedir mi tarifa 🌊",
        "",
        "• Departamento: " + (data.get("depto") || "a definir"),
        "• Tipo de estadía: " + (data.get("plan") || "a definir"),
        "• Ingreso: " + fmt(data.get("desde")),
        "• Salida: " + fmt(data.get("hasta")),
        "• Adultos: " + (data.get("adultos") || "-") + " · Menores: " + (data.get("menores") || "0"),
        "• Pago: " + (data.get("pago") || "a definir")
      ];
      var nombre = (data.get("nombre") || "").trim();
      var nota = (data.get("nota") || "").trim();
      if (nombre) lines.push("• Nombre: " + nombre);
      if (nota) lines.push("", nota);
      window.open(waLink(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* Año del footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
