document.addEventListener("DOMContentLoaded", () => {
  // Language Switcher
  const langBtns = document.querySelectorAll(".lang-btn")
  let currentLang = localStorage.getItem("language") || "en"

  // Set active language button
  langBtns.forEach((btn) => {
    const lang = btn.getAttribute("data-lang")
    if (lang === currentLang) {
      btn.classList.add("active")
    }

    btn.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang")
      if (selectedLang !== currentLang) {
        langBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")
        currentLang = selectedLang
        localStorage.setItem("language", currentLang)

        // Update page content
        updatePageContent(currentLang)
      }
    })
  })

  // Initialize page with correct language
  updatePageContent(currentLang)

  // Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const body = document.body

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    body.classList.add("dark-theme")
  } else if (savedTheme === "light") {
    body.classList.remove("dark-theme")
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark-theme")
    localStorage.setItem("theme", "dark")
  }

  // Theme toggle functionality
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-theme")
      const theme = body.classList.contains("dark-theme") ? "dark" : "light"
      localStorage.setItem("theme", theme)
    })
  }

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
        errorMessage +=
          getTranslation(currentLang, "contact.fullName") + " " + getTranslation(currentLang, "common.required") + ".\n"
      }

      if (age === "" || age < 7 || age > 17) {
        isValid = false
        errorMessage += "Please enter a valid age between 7 and 17.\n"
      }

      if (phone === "") {
        isValid = false
        errorMessage +=
          getTranslation(currentLang, "contact.phone") + " " + getTranslation(currentLang, "common.required") + ".\n"
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

  // Location Tabs
  const locationTabBtns = document.querySelectorAll(".tab-btn")
  const locationTabPanels = document.querySelectorAll(".tab-panel")

  if (locationTabBtns.length > 0 && locationTabPanels.length > 0) {
    locationTabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons and panels
        locationTabBtns.forEach((b) => b.classList.remove("active"))
        locationTabPanels.forEach((panel) => panel.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Show corresponding panel
        const tabId = this.getAttribute("data-tab")
        const panel = document.getElementById(tabId)
        if (panel) {
          panel.classList.add("active")
          panel.classList.add("page-transition")
          setTimeout(() => {
            panel.classList.remove("page-transition")
          }, 500)
        }
      })
    })
  }

  // Map pins interaction
  const mapPins = document.querySelectorAll(".map-pin")

  if (mapPins.length > 0) {
    mapPins.forEach((pin) => {
      pin.addEventListener("click", function () {
        const location = this.getAttribute("data-location")

        // Activate corresponding tab
        locationTabBtns.forEach((btn) => {
          btn.classList.remove("active")
          if (btn.getAttribute("data-tab") === location) {
            btn.classList.add("active")
          }
        })

        // Show corresponding tab panel
        locationTabPanels.forEach((panel) => {
          panel.classList.remove("active")
          if (panel.id === location) {
            panel.classList.add("active")
            panel.classList.add("page-transition")
            setTimeout(() => {
              panel.classList.remove("page-transition")
            }, 500)
          }
        })

        // Scroll to tab content
        const tabsContainer = document.querySelector(".tabs-container")
        if (tabsContainer) {
          tabsContainer.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })
  }

  // Blog category filtering
  const categoryBtns = document.querySelectorAll(".category-btn")
  const blogCards = document.querySelectorAll(".blog-card")

  if (categoryBtns.length > 0 && blogCards.length > 0) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Update active button
        categoryBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")

        const category = this.getAttribute("data-category")

        // Filter blog posts with animation
        blogCards.forEach((card) => {
          card.classList.remove("pagination-slide")

          if (category === "all" || card.getAttribute("data-category") === category) {
            card.style.display = "block"
            setTimeout(() => {
              card.classList.add("pagination-slide")
            }, 10)
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  }

  // Blog search functionality
  const searchInput = document.getElementById("blog-search")

  if (searchInput && blogCards.length > 0) {
    searchInput.addEventListener("keyup", function () {
      const searchTerm = this.value.toLowerCase()

      blogCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase()
        const content = card.querySelector("p").textContent.toLowerCase()

        card.classList.remove("pagination-slide")

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          card.style.display = "block"
          setTimeout(() => {
            card.classList.add("pagination-slide")
          }, 10)
        } else {
          card.style.display = "none"
        }
      })
    })
  }

  // Pagination (for blog and other paginated content)
  const paginationBtns = document.querySelectorAll(".pagination-btn")

  if (paginationBtns.length > 0) {
    paginationBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Update active button
        paginationBtns.forEach((b) => b.classList.remove("active"))
        if (!this.classList.contains("next")) {
          this.classList.add("active")
        }

        // Add animation to content
        const contentContainer = this.closest("section").querySelector(".blog-posts-grid, .courses-grid")
        if (contentContainer) {
          contentContainer.classList.add("pagination-slide")
          setTimeout(() => {
            contentContainer.classList.remove("pagination-slide")
          }, 500)
        }

        // Scroll to top of content
        const contentSection = this.closest("section")
        if (contentSection) {
          contentSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  // FAQ Category Tabs
  const faqCategoryTabs = document.querySelectorAll(".category-tab")
  const faqCategories = document.querySelectorAll(".faq-category")

  if (faqCategoryTabs.length > 0 && faqCategories.length > 0) {
    faqCategoryTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Update active tab
        faqCategoryTabs.forEach((t) => t.classList.remove("active"))
        this.classList.add("active")

        // Show corresponding category
        const category = this.getAttribute("data-category")
        faqCategories.forEach((cat) => {
          cat.classList.remove("active")
          if (cat.id === category) {
            cat.classList.add("active")
            cat.classList.add("page-transition")
            setTimeout(() => {
              cat.classList.remove("page-transition")
            }, 500)
          }
        })
      })
    })
  }

  // FAQ Search
  const faqSearchInput = document.getElementById("faq-search")
  const faqItems = document.querySelectorAll(".accordion-item")

  if (faqSearchInput && faqItems.length > 0) {
    faqSearchInput.addEventListener("keyup", function () {
      const searchTerm = this.value.toLowerCase()

      if (searchTerm.length > 2) {
        faqItems.forEach((item) => {
          const question = item.querySelector("h3").textContent.toLowerCase()
          const answer = item.querySelector(".accordion-content p").textContent.toLowerCase()

          if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = "block"
            item.classList.add("active")
          } else {
            item.style.display = "none"
          }
        })
      } else if (searchTerm.length === 0) {
        faqItems.forEach((item) => {
          item.style.display = "block"
          item.classList.remove("active")
        })
      }
    })
  }

  // Initialize AOS (Animate on Scroll)
  let AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    })
  }
})

// Language Translation Functions
async function loadLanguages() {
  try {
    const response = await fetch("/languages/index.js")
    if (!response.ok) {
      throw new Error("Failed to load language files")
    }
    const languagesModule = await import("/languages/index.js")
    return languagesModule.default
  } catch (error) {
    console.error("Error loading languages:", error)
    return null
  }
}

function getTranslation(lang, key) {
  // Split the key by dots to access nested properties
  const keys = key.split(".")
  let translation = window.languages[lang]

  // Navigate through the nested properties
  for (const k of keys) {
    if (translation && translation[k]) {
      translation = translation[k]
    } else {
      // Fallback to English if translation not found
      translation = window.languages["en"]
      for (const k of keys) {
        if (translation && translation[k]) {
          translation = translation[k]
        } else {
          return key // Return the key itself if no translation found
        }
      }
    }
  }

  return translation
}

async function updatePageContent(lang) {
  // If languages are not loaded yet, load them
  if (!window.languages) {
    try {
      const response = await fetch(`/languages/${lang}.js`)
      const enResponse = await fetch("/languages/en.js")

      if (!response.ok || !enResponse.ok) {
        throw new Error("Failed to load language files")
      }

      const langText = await response.text()
      const enText = await enResponse.text()

      // Convert the JS module to a usable object
      const langObj = eval(`(${langText.replace("export default", "return")})`)
      const enObj = eval(`(${enText.replace("export default", "return")})`)

      window.languages = {
        [lang]: langObj,
        en: enObj,
      }
    } catch (error) {
      console.error("Error loading languages:", error)
      return
    }
  }

  // Update navigation links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const key = link.getAttribute("data-lang-key")
    if (key) {
      link.textContent = getTranslation(lang, key)
    }
  })

  // Update hero section
  const heroSlides = document.querySelectorAll(".hero-slider .slide")
  heroSlides.forEach((slide, index) => {
    const titleEl = slide.querySelector("h2")
    const subtitleEl = slide.querySelector("p")
    const buttonEl = slide.querySelector(".btn")

    if (titleEl) titleEl.textContent = getTranslation(lang, `hero.slide${index + 1}.title`)
    if (subtitleEl) subtitleEl.textContent = getTranslation(lang, `hero.slide${index + 1}.subtitle`)
    if (buttonEl) buttonEl.textContent = getTranslation(lang, `hero.slide${index + 1}.button`)
  })

  // Update intro section
  const introTitle = document.querySelector(".intro-content h2")
  const introParagraphs = document.querySelectorAll(".intro-content p")

  if (introTitle) introTitle.textContent = getTranslation(lang, "intro.title")
  if (introParagraphs.length >= 2) {
    introParagraphs[0].textContent = getTranslation(lang, "intro.paragraph1")
    introParagraphs[1].textContent = getTranslation(lang, "intro.paragraph2")
  }

  // Update quick actions
  const quickActionsTitle = document.querySelector(".quick-actions h2")
  if (quickActionsTitle) quickActionsTitle.textContent = getTranslation(lang, "quickActions.title")

  const actionButtons = document.querySelectorAll(".action-btn")
  actionButtons.forEach((btn) => {
    const key = btn.getAttribute("data-lang-key")
    if (key) {
      const spanEl = btn.querySelector("span")
      if (spanEl) spanEl.textContent = getTranslation(lang, key)
    }
  })

  // Update featured courses
  const featuredCoursesTitle = document.querySelector(".featured-courses h2")
  if (featuredCoursesTitle) featuredCoursesTitle.textContent = getTranslation(lang, "featuredCourses.title")

  const viewAllBtn = document.querySelector(".view-all .btn")
  if (viewAllBtn) viewAllBtn.textContent = getTranslation(lang, "featuredCourses.viewAll")

  const courseCards = document.querySelectorAll(".course-card")
  courseCards.forEach((card, index) => {
    const titleEl = card.querySelector("h3")
    const descEl = card.querySelector("p")
    const enrollBtn = card.querySelector(".btn")
    const ageGroup = card.querySelector(".age-group")

    if (titleEl) titleEl.textContent = getTranslation(lang, `featuredCourses.course${index + 1}.title`)
    if (descEl) descEl.textContent = getTranslation(lang, `featuredCourses.course${index + 1}.description`)
    if (enrollBtn) enrollBtn.textContent = getTranslation(lang, "featuredCourses.enroll")
    if (ageGroup) ageGroup.textContent = getTranslation(lang, `featuredCourses.course${index + 1}.ageGroup`)

    // Update course details
    const details = card.querySelectorAll(".course-details span")
    if (details.length >= 3) {
      const durationText = details[0].querySelector("i").nextSibling
      const formatText = details[1].querySelector("i").nextSibling
      const priceText = details[2].querySelector("i").nextSibling

      if (durationText)
        durationText.textContent = " " + getTranslation(lang, `featuredCourses.course${index + 1}.duration`)
      if (formatText) formatText.textContent = " " + getTranslation(lang, `featuredCourses.course${index + 1}.format`)
      if (priceText) priceText.textContent = " " + getTranslation(lang, `featuredCourses.course${index + 1}.price`)
    }
  })

  // Update gallery
  const galleryTitle = document.querySelector(".gallery h2")
  if (galleryTitle) galleryTitle.textContent = getTranslation(lang, "gallery.title")

  // Update testimonials
  const testimonialsTitle = document.querySelector(".testimonials h2")
  if (testimonialsTitle) testimonialsTitle.textContent = getTranslation(lang, "testimonials.title")

  const testimonials = document.querySelectorAll(".testimonial")
  testimonials.forEach((testimonial, index) => {
    const contentEl = testimonial.querySelector("p")
    const nameEl = testimonial.querySelector("h4")
    const courseEl = testimonial.querySelector(".testimonial-author div p")

    if (contentEl) contentEl.textContent = getTranslation(lang, `testimonials.testimonial${index + 1}.content`)
    if (nameEl) nameEl.textContent = getTranslation(lang, `testimonials.testimonial${index + 1}.name`)
    if (courseEl) courseEl.textContent = getTranslation(lang, `testimonials.testimonial${index + 1}.course`)
  })

  // Update stats
  const statItems = document.querySelectorAll(".stat-item p")
  const statLabels = ["students", "instructors", "courses", "locations"]

  statItems.forEach((item, index) => {
    if (index < statLabels.length) {
      item.textContent = getTranslation(lang, `stats.${statLabels[index]}`)
    }
  })

  // Update newsletter
  const newsletterTitle = document.querySelector(".newsletter-content h2")
  const newsletterSubtitle = document.querySelector(".newsletter-content p")
  const newsletterBtn = document.querySelector(".newsletter-form button")
  const newsletterInput = document.querySelector(".newsletter-form input")

  if (newsletterTitle) newsletterTitle.textContent = getTranslation(lang, "newsletter.title")
  if (newsletterSubtitle) newsletterSubtitle.textContent = getTranslation(lang, "newsletter.subtitle")
  if (newsletterBtn) newsletterBtn.textContent = getTranslation(lang, "newsletter.button")
  if (newsletterInput) newsletterInput.placeholder = getTranslation(lang, "newsletter.placeholder")

  // Update footer
  const footerSlogan = document.querySelector(".footer-logo p")
  if (footerSlogan) footerSlogan.textContent = getTranslation(lang, "footer.slogan")

  const footerHeadings = document.querySelectorAll(".footer-column h3")
  const footerHeadingKeys = ["quickLinks", "resources", "contact"]

  footerHeadings.forEach((heading, index) => {
    if (index < footerHeadingKeys.length) {
      heading.textContent = getTranslation(lang, `footer.${footerHeadingKeys[index]}`)
    }
  })

  const footerSocialHeading = document.querySelector(".footer-social h3")
  if (footerSocialHeading) footerSocialHeading.textContent = getTranslation(lang, "footer.followUs")

  const footerCopyright = document.querySelector(".footer-bottom p")
  if (footerCopyright) footerCopyright.textContent = getTranslation(lang, "footer.copyright")

  // Update contact page if it exists
  const contactHeroTitle = document.querySelector(".contact-hero .hero-content h1")
  const contactHeroSubtitle = document.querySelector(".contact-hero .hero-content p")

  if (contactHeroTitle) contactHeroTitle.textContent = getTranslation(lang, "contact.title")
  if (contactHeroSubtitle) contactHeroSubtitle.textContent = getTranslation(lang, "contact.subtitle")

  // Update info cards
  const infoCardTitles = document.querySelectorAll(".info-card h3")
  const infoCardKeys = ["visitUs", "callUs", "emailUs", "liveChat"]

  infoCardTitles.forEach((title, index) => {
    if (index < infoCardKeys.length) {
      title.textContent = getTranslation(lang, `contact.${infoCardKeys[index]}`)
    }
  })

  // Update contact form
  const formTitle = document.querySelector(".form-container h2")
  const formSubtitle = document.querySelector(".form-container > p")

  if (formTitle) formTitle.textContent = getTranslation(lang, "contact.formTitle")
  if (formSubtitle) formSubtitle.textContent = getTranslation(lang, "contact.formSubtitle")

  // Update form labels
  const formLabels = document.querySelectorAll(".contact-form label")
  const formLabelKeys = ["fullName", "email", "phone", "subject", "message", "subscribe"]

  formLabels.forEach((label, index) => {
    if (index < formLabelKeys.length) {
      // Check if this is a checkbox label
      if (label.querySelector('input[type="checkbox"]')) {
        const textNode = Array.from(label.childNodes).find((node) => node.nodeType === 3)
        if (textNode) textNode.textContent = getTranslation(lang, `contact.${formLabelKeys[index]}`)
      } else {
        // For regular labels, just update the text content
        label.textContent = getTranslation(lang, `contact.${formLabelKeys[index]}`) + (index < 4 ? " *" : "")
      }
    }
  })

  // Update submit button
  const submitBtn = document.querySelector(".form-submit .btn")
  if (submitBtn) submitBtn.textContent = getTranslation(lang, "contact.send")

  // Update FAQ section
  const faqTitle = document.querySelector(".faq-preview .section-header h2")
  const faqSubtitle = document.querySelector(".faq-preview .section-header p")

  if (faqTitle) faqTitle.textContent = getTranslation(lang, "contact.faqTitle")
  if (faqSubtitle) faqSubtitle.textContent = getTranslation(lang, "contact.faqSubtitle")

  // Update view all FAQs button
  const viewAllFaqsBtn = document.querySelector(".view-more-faq .btn")
  if (viewAllFaqsBtn) viewAllFaqsBtn.textContent = getTranslation(lang, "contact.viewAllFaqs")

  // Update social connect section
  const connectTitle = document.querySelector(".social-connect .section-header h2")
  const connectSubtitle = document.querySelector(".social-connect .section-header p")

  if (connectTitle) connectTitle.textContent = getTranslation(lang, "contact.connectTitle")
  if (connectSubtitle) connectSubtitle.textContent = getTranslation(lang, "contact.connectSubtitle")

  // Update CTA section
  const ctaTitle = document.querySelector(".cta h2")
  const ctaSubtitle = document.querySelector(".cta p")

  if (ctaTitle && window.location.pathname.includes("contact")) {
    ctaTitle.textContent = getTranslation(lang, "cta.title")
    if (ctaSubtitle) ctaSubtitle.textContent = getTranslation(lang, "cta.subtitle")
  }

  // Update CTA buttons
  const ctaButtons = document.querySelectorAll(".cta-buttons .btn")
  if (ctaButtons.length >= 2) {
    ctaButtons[0].textContent = getTranslation(lang, "quickActions.exploreCourses")
    ctaButtons[1].textContent = getTranslation(lang, "quickActions.registerNow")
  }
}
