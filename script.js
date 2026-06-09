gsap.registerPlugin(ScrollTrigger);

const pages = Array.from(document.querySelectorAll(".page"));
const reveals = Array.from(document.querySelectorAll(".reveal"));
const navDots = Array.from(document.querySelectorAll(".nav-dot"));
const progressBar = document.querySelector(".progress-bar");
const nextButton = document.querySelector(".floating-next");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
}

function updateActiveNav() {
  const current = pages.find((page) => {
    const rect = page.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.35;
  }) || pages[0];

  navDots.forEach((dot) => {
    dot.classList.toggle("active", dot.getAttribute("href") === `#${current.id}`);
  });

  const isLastPage = current.id === pages[pages.length - 1].id;
  nextButton.textContent = isLastPage ? "↑" : "↓";
  nextButton.setAttribute("aria-label", isLastPage ? "返回顶部" : "下一页");
}

function scrollToAdjacentPage() {
  const currentIndex = pages.findIndex((page) => {
    const rect = page.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.35;
  });

  const activeIndex = currentIndex === -1 ? 0 : currentIndex;
  const targetIndex = activeIndex >= pages.length - 1 ? 0 : activeIndex + 1;

  pages[targetIndex].scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start"
  });
}

function attachPointerInteraction() {
  if (prefersReducedMotion) return;

  pages.forEach((page) => {
    page.addEventListener("pointermove", (event) => {
      const rect = page.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      const shiftX = ((x - 50) / 50) * 8;
      const shiftY = ((y - 50) / 50) * 8;

      page.style.setProperty("--pointer-x", `${x}%`);
      page.style.setProperty("--pointer-y", `${y}%`);
      page.style.setProperty("--pointer-glow", "1");
      page.style.setProperty("--pointer-shift-x", `${shiftX * -1}px`);
      page.style.setProperty("--pointer-shift-y", `${shiftY * -1}px`);
    });

    page.addEventListener("pointerleave", () => {
      page.style.setProperty("--pointer-glow", "0");
      page.style.setProperty("--pointer-shift-x", "0px");
      page.style.setProperty("--pointer-shift-y", "0px");
    });
  });
}

function attachJobCardInteraction() {
  if (prefersReducedMotion) return;

  const jobCards = Array.from(document.querySelectorAll("#page11 .job-card"));

  jobCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width;
      const offsetY = (event.clientY - rect.top) / rect.height;
      const rotateY = (offsetX - 0.5) * 8;
      const rotateX = (0.5 - offsetY) * 8;

      card.style.setProperty("--job-rotate-x", `${rotateX}deg`);
      card.style.setProperty("--job-rotate-y", `${rotateY}deg`);
      card.style.setProperty("--job-shift-y", "-8px");
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--job-rotate-x", "0deg");
      card.style.setProperty("--job-rotate-y", "0deg");
      card.style.setProperty("--job-shift-y", "0px");
    });
  });
}

if (!prefersReducedMotion) {
  gsap.from(".side-nav", {
    x: 18,
    opacity: 0,
    duration: 0.8,
    delay: 0.15,
    ease: "power2.out"
  });

  reveals.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: index % 3 * 0.06,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 84%",
        toggleActions: "play none none reverse"
      }
    });
  });

  pages.forEach((page) => {
    gsap.to(page, {
      backgroundPosition: "10% 8%, 88% 92%, 50% 50%",
      scrollTrigger: {
        trigger: page,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

} else {
  reveals.forEach((item) => {
    item.style.opacity = "1";
    item.style.transform = "none";
  });
}

window.addEventListener("scroll", () => {
  updateProgress();
  updateActiveNav();
}, { passive: true });

window.addEventListener("resize", updateActiveNav);
nextButton.addEventListener("click", scrollToAdjacentPage);

navDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    requestAnimationFrame(updateActiveNav);
  });
});

attachPointerInteraction();
attachJobCardInteraction();
updateProgress();
updateActiveNav();
