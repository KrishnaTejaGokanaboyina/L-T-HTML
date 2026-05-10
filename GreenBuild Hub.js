document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".main-navbar");
    const backToTop = document.getElementById("backToTop");
    const contactForm = document.getElementById("contactForm");
    const subscribeForm = document.getElementById("subscribeForm");
    const searchForm = document.getElementById("searchForm");
    const scrollLinks = document.querySelectorAll(".scroll-link");
    const revealItems = document.querySelectorAll(".reveal");
    const counterItems = document.querySelectorAll(".counter");
    const navLinks = document.querySelectorAll(".nav-link");
    const calculatorForm = document.getElementById("calculatorForm");
    const cardDetailButtons = document.querySelectorAll(".card-detail-btn");
    const modalTitle = document.getElementById("infoModalTitle");
    const modalBody = document.getElementById("infoModalBody");

    function updateNavbar() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle("scrolled", scrolled);
        backToTop.classList.toggle("show", scrolled);
    }

    function animateCounter(counter) {
        const target = Number(counter.dataset.target);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));

        const interval = setInterval(function () {
            current += step;

            if (current >= target) {
                counter.textContent = target;
                clearInterval(interval);
            } else {
                counter.textContent = current;
            }
        }, 25);
    }

    const counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counterItems.forEach(function (counter) {
        counterObserver.observe(counter);
    });

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });
            this.classList.add("active");
        });
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchInput = document.getElementById("searchInput");
        const value = searchInput.value.trim();

        if (!value) {
            alert("Please enter a sustainable material or technique.");
            return;
        }

        alert("Search request submitted for: " + value);
        searchInput.value = "";
    });

    scrollLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetSelector = this.getAttribute("href");
            const targetElement = document.querySelector(targetSelector);

            if (!targetElement) {
                return;
            }

            const navbarOffset = navbar ? navbar.offsetHeight + 24 : 24;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            targetElement.classList.remove("highlight");
            void targetElement.offsetWidth;
            targetElement.classList.add("highlight");

            clearTimeout(targetElement.highlightTimeout);
            targetElement.highlightTimeout = setTimeout(function () {
                targetElement.classList.remove("highlight");
            }, 2400);

            if (window.bootstrap) {
                const dropdownElement = document.getElementById("materialsDropdown");

                if (dropdownElement) {
                    const dropdownInstance = window.bootstrap.Dropdown.getInstance(dropdownElement);

                    if (dropdownInstance) {
                        dropdownInstance.hide();
                    }
                }
            }
        });
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const queryType = document.getElementById("queryType").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (!name || !email || !phone || !queryType || !message) {
            formMessage.textContent = "Please complete all required inquiry fields.";
            return;
        }

        if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
            formMessage.textContent = "Please enter a valid 10-digit phone number.";
            return;
        }

        formMessage.textContent = "Thank you, " + name + ". Your inquiry has been submitted successfully.";
        contactForm.reset();
    });

    subscribeForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const subscribeEmail = document.getElementById("subscribeEmail").value.trim();
        const subscribeMessage = document.getElementById("subscribeMessage");

        if (!subscribeEmail) {
            subscribeMessage.textContent = "Please enter your email address.";
            return;
        }

        subscribeMessage.textContent = "Subscription successful for " + subscribeEmail + ".";
        subscribeForm.reset();
    });

    if (calculatorForm) {
        calculatorForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const areaInput = document.getElementById("areaInput");
            const calculatorResult = document.getElementById("calculatorResult");
            const area = Number(areaInput.value);

            if (!area || area <= 0) {
                calculatorResult.textContent = "Please enter a valid built-up area.";
                return;
            }

            const savings = Math.round(area * 1.8);
            calculatorResult.textContent = "Estimated annual carbon savings: " + savings + " kg CO2 with greener planning.";
        });
    }

    cardDetailButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            modalTitle.textContent = this.dataset.title;
            modalBody.textContent = this.dataset.body;
        });
    });

    updateNavbar();
    window.addEventListener("scroll", updateNavbar);
});
