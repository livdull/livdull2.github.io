// ============================================
// PORTFOLIO WEBSITE - JAVASCRIPT FUNCTIONALITY
// ============================================

// Developer Information - Print to Console
console.log("%c=== PORTFOLIO WEBSITE ===", "color: #3498db; font-size: 16px; font-weight: bold;")
console.log("%cDeveloper: Your Name", "color: #2c3e50; font-size: 14px;")
console.log("%cGitHub: https://github.com/yourusername", "color: #e74c3c; font-size: 14px;")
console.log("%cEmail: hello@example.com", "color: #27ae60; font-size: 14px;")
console.log("%cPhone: +1 (555) 123-4567", "color: #f39c12; font-size: 14px;")
console.log("%cPortfolio built with HTML, CSS, and JavaScript", "color: #9b59b6; font-size: 12px; font-style: italic;")

// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle menu on hamburger click
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navMenu.contains(event.target)
    const isClickOnHamburger = hamburger.contains(event.target)

    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
})

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ============================================
// FORM SUBMISSION HANDLING
// ============================================

const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    // Formspree handles submission, but we can add custom logic here
    console.log("Contact form submitted")
  })
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe project cards and FAQ items
document.querySelectorAll(".project-card, .faq-item, .skill-item").forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(20px)"
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(element)
})

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    const sectionId = section.id

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
      })

      if (sectionId) {
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
        if (activeLink) {
          activeLink.classList.add("active")
        }
      }
    }
  })
})

// ============================================
// GALLERY IMAGE LAZY LOADING
// ============================================

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.add("loaded")
          observer.unobserve(img)
        }
      }
    })
  })

  document.querySelectorAll(".gallery-item img").forEach((img) => imageObserver.observe(img))
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    // Remove previous ripple if exists
    const previousRipple = this.querySelector(".ripple")
    if (previousRipple) {
      previousRipple.remove()
    }

    this.appendChild(ripple)
  })
})

// ============================================
// FORM INPUT VALIDATION
// ============================================

const formInputs = document.querySelectorAll("input, textarea")

formInputs.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value.trim() === "" && this.hasAttribute("required")) {
      this.style.borderColor = "#e74c3c"
    } else {
      this.style.borderColor = ""
    }
  })

  input.addEventListener("focus", function () {
    this.style.borderColor = "#3498db"
  })
})

// ============================================
// PERFORMANCE: DEBOUNCE FUNCTION
// ============================================

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// ============================================
// RESPONSIVE MENU CLOSE ON RESIZE
// ============================================

window.addEventListener(
  "resize",
  debounce(() => {
    const hamburger = document.getElementById("hamburger")
    const navMenu = document.getElementById("navMenu")

    if (window.innerWidth > 768) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }, 250),
)

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener("load", () => {
  document.body.style.animation = "fadeIn 0.5s ease-in"
  console.log("Portfolio loaded successfully!")
})

// ============================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================================

document.addEventListener("keydown", (e) => {
  // Close mobile menu on Escape
  if (e.key === "Escape") {
    const hamburger = document.getElementById("hamburger")
    const navMenu = document.getElementById("navMenu")
    if (navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }
  }
})

console.log("%cPortfolio website ready!", "color: #27ae60; font-size: 14px; font-weight: bold;")
