// Scroll-triggered animations for text
document.addEventListener("DOMContentLoaded", () => {
  const textBlocks = document.querySelectorAll(".text-block");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.5 });

  textBlocks.forEach((block) => observer.observe(block));
});
