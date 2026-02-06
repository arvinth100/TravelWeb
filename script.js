const sections = document.querySelectorAll(".section");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));

const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

const showTestimonial = (index) => {
  testimonials.forEach((item, idx) => {
    item.classList.toggle("active", idx === index);
  });
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === index);
  });
};

const next = () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
};

const prev = () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
};

document.querySelector(".next").addEventListener("click", next);
document.querySelector(".prev").addEventListener("click", prev);

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentIndex = Number(dot.dataset.index);
    showTestimonial(currentIndex);
  });
});

setInterval(next, 6000);

/* Staggered gallery reveal and hover hooks */
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  galleryImages.forEach((img, i) => {
    if (!("loading" in HTMLImageElement.prototype)) {
      // fallback for older browsers: set attribute
      img.setAttribute("loading", "lazy");
    } else {
      img.loading = "lazy";
    }

    img.addEventListener("load", () => {
      setTimeout(() => {
        img.setAttribute("data-loaded", "true");
      }, i * 120);
    });

    if (img.complete) {
      setTimeout(() => {
        img.setAttribute("data-loaded", "true");
      }, i * 120);
    }

    img.addEventListener("mouseenter", () => img.classList.add("hovering"));
    img.addEventListener("mouseleave", () => img.classList.remove("hovering"));
  });
});
