// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active menu link tracking
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const menuLinks = document.querySelectorAll(".menu-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  menuLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Search functionality
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-bar input");

searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    console.log("Searching for:", searchTerm);
    alert(
      `Search functionality for: ${searchTerm}\n(This is a demo - implement your backend search)`
    );
    searchInput.value = "";
  }
});

// Allow Enter key to trigger search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Smooth load animation
window.addEventListener("load", () => {
  document.body.style.opacity = "1";

  // Animate service cards on load
  const cards = document.querySelectorAll(".service-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
});

// Mobile menu toggle (for future implementation if needed)
function initMobileMenu() {
  const navContent = document.querySelector(".nav-content");
  const menuItems = document.querySelector(".menu-items");

  // Check if we need mobile menu functionality
  if (window.innerWidth <= 768) {
    // You can add mobile menu logic here
  }
}

// Call on page load and window resize
window.addEventListener("load", initMobileMenu);
window.addEventListener("resize", initMobileMenu);

// Add scroll-to-top button functionality
function createScrollToTopButton() {
  const button = document.createElement("button");
  button.id = "scroll-to-top";
  button.innerHTML = "↑";
  button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 99;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  button.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.backgroundColor = "#008a3f";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.backgroundColor = "var(--primary-color)";
  });
}

// Initialize scroll-to-top button
window.addEventListener("load", createScrollToTopButton);

// Add keyboard shortcut for home (Press 'H')
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "h" && !e.ctrlKey && !e.metaKey) {
    // Only if not typing in input
    if (document.activeElement.tagName !== "INPUT") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
});

// Card link interactions
const cardLinks = document.querySelectorAll(".card-link");
cardLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const service = link
      .closest(".service-card")
      .querySelector("h3").textContent;
    alert(`Redirecting to ${service}\n(This is a demo interface)`);
  });
});

// Log page initialization
console.log("PhilHealth Portal initialized successfully");
console.log("Features:");
console.log("- Smooth navigation");
console.log("- Responsive design");
console.log("- Interactive animations");
console.log("- Press H to scroll to top");
