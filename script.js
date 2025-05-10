document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navLinks = document.querySelector(".nav-links")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        const spans = mobileMenuBtn.querySelectorAll("span")
        spans[0].classList.toggle("rotate-45")
        spans[1].classList.toggle("opacity-0")
        spans[2].classList.toggle("rotate-neg-45")
      })
    }
  
    // Language Selector
    const langBtns = document.querySelectorAll(".lang-btn")
  
    langBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        langBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")
        const lang = this.getAttribute("data-lang")
        // Here you would implement the language change functionality
        console.log(`Language changed to ${lang}`)
      })
    })
  
    // Hero Slider
    const slides = document.querySelectorAll(".hero-slider .slide")
    const dots = document.querySelectorAll(".hero-slider .dot")
    const prevBtn = document.querySelector(".hero-slider .prev-btn")
    const nextBtn = document.querySelector(".hero-slider .next-btn")
    let currentSlide = 0
    let slideInterval
  
    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))
  
      slides[index].classList.add("active")
      dots[index].classList.add("active")
      currentSlide = index
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
      showSlide(currentSlide)
    }
  
    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 5000)
    }
  
    if (slides.length > 0 && dots.length > 0) {
      // Initialize slider
      showSlide(0)
      startSlideInterval()
  
      // Event listeners for slider controls
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          clearInterval(slideInterval)
          prevSlide()
          startSlideInterval()
        })
      }
  
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          clearInterval(slideInterval)
          nextSlide()
          startSlideInterval()
        })
      }
  
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          clearInterval(slideInterval)
          showSlide(index)
          startSlideInterval()
        })
      })
    }
  
    // Testimonial Slider
    const testimonials = document.querySelectorAll(".testimonial")
    const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
    const testimonialPrevBtn = document.querySelector(".testimonials .prev-btn")
    const testimonialNextBtn = document.querySelector(".testimonials .next-btn")
    let currentTestimonial = 0
  
    function showTestimonial(index) {
      testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
      testimonialDots.forEach((dot) => dot.classList.remove("active"))
  
      testimonials[index].classList.add("active")
      testimonialDots[index].classList.add("active")
      currentTestimonial = index
    }
  
    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length
      showTestimonial(currentTestimonial)
    }
  
    function prevTestimonial() {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
      showTestimonial(currentTestimonial)
    }
  
    if (testimonials.length > 0 && testimonialDots.length > 0) {
      // Initialize testimonial slider
      showTestimonial(0)
  
      // Event listeners for testimonial slider controls
      if (testimonialPrevBtn) {
        testimonialPrevBtn.addEventListener("click", prevTestimonial)
      }
  
      if (testimonialNextBtn) {
        testimonialNextBtn.addEventListener("click", nextTestimonial)
      }
  
      testimonialDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showTestimonial(index)
        })
      })
  
      // Auto-rotate testimonials
      setInterval(nextTestimonial, 8000)
    }
  
    // Counter Animation
    const counters = document.querySelectorAll(".counter")
  
    function animateCounter(counter) {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const duration = 2000 // 2 seconds
      const step = target / (duration / 16) // 60fps
      let current = 0
  
      const updateCounter = () => {
        current += step
        if (current < target) {
          counter.textContent = Math.ceil(current)
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target
        }
      }
  
      updateCounter()
    }
  
    // Intersection Observer for counters
    if (counters.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.5 },
      )
  
      counters.forEach((counter) => {
        observer.observe(counter)
      })
    }
  
    // Accordion
    const accordionItems = document.querySelectorAll(".accordion-item")
  
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header")
  
      if (header) {
        header.addEventListener("click", () => {
          item.classList.toggle("active")
  
          // Close other accordion items
          accordionItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("active")
            }
          })
        })
      }
    })
  
    // Course Filters
    const applyFiltersBtn = document.getElementById("apply-filters")
    const courseCards = document.querySelectorAll(".course-card")
  
    if (applyFiltersBtn && courseCards.length > 0) {
      applyFiltersBtn.addEventListener("click", () => {
        const ageFilter = document.getElementById("age-filter").value
        const categoryFilter = document.getElementById("category-filter").value
        const formatFilter = document.getElementById("format-filter").value
  
        courseCards.forEach((card) => {
          const age = card.getAttribute("data-age")
          const category = card.getAttribute("data-category")
          const format = card.getAttribute("data-format")
  
          const ageMatch = ageFilter === "all" || age === ageFilter
          const categoryMatch = categoryFilter === "all" || category === categoryFilter
          const formatMatch = formatFilter === "all" || format === formatFilter
  
          if (ageMatch && categoryMatch && formatMatch) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    }
  
    // Form Validation
    const registrationForm = document.getElementById("course-registration")
  
    if (registrationForm) {
      registrationForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Basic form validation
        const fullname = document.getElementById("fullname").value.trim()
        const age = document.getElementById("age").value
        const phone = document.getElementById("phone").value.trim()
        const course = document.getElementById("course").value
        const format = document.querySelector('input[name="format"]:checked')
  
        let isValid = true
        let errorMessage = ""
  
        if (fullname === "") {
          isValid = false
          errorMessage += "Please enter your full name.\n"
        }
  
        if (age === "" || age < 7 || age > 17) {
          isValid = false
          errorMessage += "Please enter a valid age between 7 and 17.\n"
        }
  
        if (phone === "") {
          isValid = false
          errorMessage += "Please enter your phone number.\n"
        }
  
        if (course === "") {
          isValid = false
          errorMessage += "Please select a course.\n"
        }
  
        if (!format) {
          isValid = false
          errorMessage += "Please select a preferred format.\n"
        }
  
        if (isValid) {
          // Form is valid, show success message
          alert("Registration submitted successfully! We will contact you shortly.")
          registrationForm.reset()
        } else {
          // Show error message
          alert("Please correct the following errors:\n\n" + errorMessage)
        }
      })
    }
  
    // Newsletter Form
    const newsletterForm = document.querySelector(".newsletter-form")
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        const email = this.querySelector('input[type="email"]').value.trim()
  
        if (email === "") {
          alert("Please enter your email address.")
          return
        }
  
        // Here you would typically send the email to your server
        alert("Thank you for subscribing to our newsletter!")
        this.reset()
      })
    }
  })
  