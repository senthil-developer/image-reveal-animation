gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const initialClipPaths = [
  "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
  "polygon(33% 0%, 33% 0%, 33% 0%, 33% 0%)",
  "polygon(66% 0%, 66% 0%, 66% 0%, 66% 0%)",
  "polygon(0% 33%, 0% 33%, 0% 33%, 0% 33%)",
  "polygon(33% 33%, 33% 33%, 33% 33%, 33% 33%)",
  "polygon(66% 33%, 66% 33%, 66% 33%, 66% 33%)",
  "polygon(0% 66%, 0% 66%, 0% 66%, 0% 66%)",
  "polygon(33% 66%, 33% 66%, 33% 66%, 33% 66%)",
  "polygon(66% 66%, 66% 66%, 66% 66%, 66% 66%)",
];
const finalClipPaths = [
  "polygon(0% 0%, 33.5% 0%, 33.5% 33%, 0% 33.5%)",
  "polygon(33% 0%, 66.5% 0%, 66.5% 33%, 33% 33.5%)",
  "polygon(66% 0%, 100% 0%, 100% 33%, 66% 33.5%)",
  "polygon(0% 33%, 33.5% 33%, 33.5% 66%, 0% 66.5%)",
  "polygon(33% 33%, 66.5% 33%, 66.5% 66%, 33% 66.5%)",
  "polygon(66% 33%, 100% 33%, 100% 66%, 66% 66.5%)",
  "polygon(0% 66%, 33.5% 66%, 33.5% 100%, 0% 100%)",
  "polygon(33% 66%, 66.5% 66%, 66.5% 100%, 33% 100%)",
  "polygon(66% 66%, 100% 66%, 100% 100%, 66% 100%)",
];

function createMask() {
  const imgs = document.querySelectorAll(".img");

  imgs.forEach((img, index) => {
    for (let i = 1; i <= 9; i++) {
      const mask = document.createElement("div");
      mask.classList.add("mask", `m-${i}`);
      img.appendChild(mask);
    }
  });
}

createMask();

const rows = gsap.utils.toArray(".row");

rows.forEach((row) => {
  const imgs = row.querySelectorAll(".img");

  imgs.forEach((img) => {
    const masks = img.querySelectorAll(".mask");

    masks.forEach((mask, index) => {
      gsap.set(mask, {
        clipPath: initialClipPaths[index],
      });
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: "top 75%",
      },
    });

    const animationOrder = [
      [".m-1"],
      [".m-2", ".m-4"],
      [".m-3", ".m-5", ".m-7"],
      [".m-6", ".m-8"],
      [".m-9"],
    ];

    animationOrder.forEach((targets, index) => {
      tl.to(
        targets.map((cls) => img.querySelector(cls)),
        {
          clipPath: (i, el) => finalClipPaths[Array.from(masks).indexOf(el)],
          duration: 0.5,
          ease: "power2.inOut",
          stagger: 0.1,
        },
        index * 0.125
      );
    });
  });
});

window.onload = () => {
  const footer = document.querySelector("footer");

  footer.innerHTML = `
 <p>&copy; 2024 Western Couture. All rights reserved.</p>
  <div>
    ${link
      .map((linkItem) => {
        return `<a href="${linkItem.url}">
        <i class="${linkItem.icon}" onmouseover="this.classList.add('animate')" onmouseout="this.classList.remove('animate')"></i>
        <span class="sr-only">${linkItem.label}</span>
      </a>`;
      })
      .join("")}
  </div>
`;
};

const link = [
  {
    icon: "fa-brands fa-github fa-2xl",
    label: "GitHub",
    url: "https://github.com/senthil-developer/image-reveal-animation",
  },
  {
    icon: "fa-solid fa-envelope fa-2xl",
    label: "Email",
    url: "mailto:senthildeveloper4@gmail.com",
  },
];
