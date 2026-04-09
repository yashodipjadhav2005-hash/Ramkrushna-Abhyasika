window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.classList.add("hide"), 500);
  }
});

const navMap = {
  btnSeats: "seats.html",
  btnBook: "seats.html",
  btnTour: "libraryPhoto.html"
};

Object.entries(navMap).forEach(([id, path]) => {
  const btn = document.getElementById(id);
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.location.href = path;
  });
});

const revealElements = document.querySelectorAll(".reveal-up");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

const countElements = document.querySelectorAll(".metric-value[data-count]");

const animateCount = (element) => {
  const end = Number(element.getAttribute("data-count"));
  if (Number.isNaN(end)) return;

  const duration = 900;
  const startTime = performance.now();

  const step = (timestamp) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(end * eased));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  countElements.forEach((el) => counterObserver.observe(el));
} else {
  countElements.forEach((el) => animateCount(el));
}
