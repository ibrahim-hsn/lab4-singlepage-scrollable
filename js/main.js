/**
 * Bento Developer Portfolio Controller
 * Vanilla JavaScript (No Frameworks, No Dependencies)
 * Ibrahim Bin Hassan — Aspiring AI / Machine Learning Engineer
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll Elevation
  const navbar = document.querySelector(".top-navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // 2. Active Section Navigation Tracking
  const sections = document.querySelectorAll("section[id], div[id='contact']");
  const navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${activeId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, {
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    });

    sections.forEach((sec) => observer.observe(sec));
  }

  // 3. Mobile Menu Toggle
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileDropdown = document.getElementById("mobile-dropdown");

  if (mobileBtn && mobileDropdown) {
    mobileBtn.addEventListener("click", () => {
      mobileDropdown.classList.toggle("open");
      const icon = mobileBtn.querySelector(".material-symbols-outlined");
      if (icon) {
        icon.textContent = mobileDropdown.classList.contains("open") ? "close" : "menu";
      }
    });

    mobileDropdown.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDropdown.classList.remove("open");
        const icon = mobileBtn.querySelector(".material-symbols-outlined");
        if (icon) icon.textContent = "menu";
      });
    });
  }

  // 4. Contact Form Handling
  const contactForm = document.getElementById("portfolio-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("sender-name")?.value || "";
      const email = document.getElementById("sender-email")?.value || "";
      const topic = document.getElementById("sender-topic")?.value || "";
      const message = document.getElementById("sender-message")?.value || "";

      // Toast notification
      showToast(`Thank you, ${name}! Your transmission has been queued.`);

      // Optional mailto trigger
      const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${topic} - from ${name}`);
      const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      contactForm.reset();

      setTimeout(() => {
        window.location.href = `mailto:Ibrahim..bin.hsn@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }, 1200);
    });
  }
});

// Toast notification display helper
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 4000);
}
