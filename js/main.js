/**
 * Developer Portfolio — vanilla JS, no dependencies.
 * Ibrahim Bin Hassan
 */

document.addEventListener("DOMContentLoaded", () => {
  /* 1. Navbar elevation on scroll */
  const navbar = document.querySelector(".top-navbar");
  if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* 2. Active section tracking (sections are now top-level, so this works) */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = Array.from(document.querySelectorAll(".nav-links .nav-link"));

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const setActive = (id) => {
      navLinks.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`)
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  /* 3. Mobile menu toggle (with aria-expanded) */
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileDropdown = document.getElementById("mobile-dropdown");

  if (mobileBtn && mobileDropdown) {
    const icon = mobileBtn.querySelector(".material-symbols-outlined");

    const setMenu = (open) => {
      mobileDropdown.classList.toggle("open", open);
      mobileBtn.setAttribute("aria-expanded", String(open));
      mobileBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      if (icon) icon.textContent = open ? "close" : "menu";
    };

    mobileBtn.addEventListener("click", () =>
      setMenu(mobileBtn.getAttribute("aria-expanded") !== "true")
    );

    mobileDropdown.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => setMenu(false))
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDropdown.classList.contains("open")) {
        setMenu(false);
        mobileBtn.focus();
      }
    });
  }

  /* 4. Contact form — honest mailto handoff (nothing is sent silently) */
  const contactForm = document.getElementById("portfolio-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!contactForm.reportValidity()) return;

      const value = (id) => (document.getElementById(id)?.value || "").trim();
      const name = value("sender-name");
      const email = value("sender-email");
      const topic = value("sender-topic");
      const message = value("sender-message");

      const subject = encodeURIComponent(`[Portfolio] ${topic} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );

      showToast("Opening your email app…");
      window.location.href = `mailto:ibrahim.bin.hsn@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});

/* Toast helper */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 4000);
}
