const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");
const navigationLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

function closeMenu() {
  navigation?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "打开导航");
}

menuButton?.addEventListener("click", () => {
  const isOpen = navigation?.classList.toggle("is-open") ?? false;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

const sections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navigationLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-24% 0px -58%", threshold: [0.05, 0.25, 0.5] },
);

sections.forEach((section) => observer.observe(section));

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) closeMenu();
});

