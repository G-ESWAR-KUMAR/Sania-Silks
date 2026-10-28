document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    console.log("GSAP initialized.");
    console.log("ScrollTrigger initialized.");


    // ==========================================
    // PRELOADER
    // ==========================================

    const loader = document.querySelector(".loader");
    const loaderLogo = document.querySelector(".loader__logo");

    const loaderTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        },

        onComplete: () => {
            loader.style.display = "none";
        }
    });

    loaderTimeline
        .from(loaderLogo, {
            opacity: 0,
            y: 20,
            duration: 0.8
        })
        .to(loaderLogo, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            delay: 0.4
        })
        .to(loader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut"
        });


    // ==========================================
    // HERO INTRO
    // ==========================================

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power3.out"
        },

        delay: 1.7
    });

    heroTimeline
        .from(".hero__eyebrow", {
            y: 30,
            opacity: 0,
            duration: 0.8
        })
        .from(".hero__title", {
            y: 80,
            opacity: 0,
            duration: 1.2
        }, "-=0.45")
        .from(".hero__description", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.65")
        .from(".hero__cta", {
            y: 25,
            opacity: 0,
            duration: 0.7
        }, "-=0.5")
        .from(".hero__image-wrapper", {
            y: 60,
            opacity: 0,
            duration: 1.2
        }, "-=1");


    // ==========================================
    // HERO IMAGE PARALLAX
    // ==========================================

    gsap.to(".hero__image-wrapper img", {
        yPercent: 8,
        ease: "none",

        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

        // ==========================================
    // GLOBAL SCROLL REVEALS
    // ==========================================

    const revealGroups = [
        ".services__intro",
        ".service",
        ".about__eyebrow",
        ".about__visual",
        ".about__text",
        ".showcase__header",
        ".collection-item",
        ".process__header",
        ".process-step"
    ];

    revealGroups.forEach((selector) => {
        gsap.utils.toArray(selector).forEach((element) => {
            gsap.from(element, {
                y: 45,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 88%",
                    toggleActions: "play none none none"
                }
            });
        });
    });


    // ==========================================
    // CONTACT REVEAL
    // ==========================================

    gsap.from(".contact__eyebrow", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".contact",
            start: "top 75%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".contact__title", {
        y: 55,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".contact",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".contact__action, .contact__bottom", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".contact__main",
            start: "top 75%",
            toggleActions: "play none none none"
        }
    });


    // ==========================================
    // FOOTER REVEAL
    // ==========================================

    gsap.from(".footer__top, .footer__divider, .footer__bottom", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".site-footer",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });


    // ==========================================
    // COLLECTION IMAGE HOVER
    // ==========================================

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        gsap.utils.toArray(".collection-item__image img").forEach((image) => {
            const hoverTimeline = gsap.timeline({ paused: true });

            hoverTimeline.to(image, {
                scale: 1.06,
                duration: 0.6,
                ease: "power2.out"
            });

            image.closest(".collection-item").addEventListener("mouseenter", () => {
                hoverTimeline.play();
            });

            image.closest(".collection-item").addEventListener("mouseleave", () => {
                hoverTimeline.reverse();
            });
        });
    }

    // ==========================================
// NAVBAR SCROLL STATE
// ==========================================

const header = document.querySelector(".site-header");

if (header) {
    ScrollTrigger.create({
        start: "top -80",

        onEnter: () => {
            header.classList.add("site-header--scrolled");
        },

        onLeaveBack: () => {
            header.classList.remove("site-header--scrolled");
        }
    });
}

// ==========================================
// MOBILE MENU
// ==========================================

const menuButton = document.querySelector(".nav__menu-button");
const menuLabel = document.querySelector(".nav__menu-label");
const menuOverlay = document.querySelector(".nav-overlay");

const menuLinks = gsap.utils.toArray(".nav-overlay__link");

if (menuButton && menuOverlay) {

    let menuOpen = false;

    const menuTimeline = gsap.timeline({
        paused: true,

        onStart: () => {
            menuOverlay.style.visibility = "visible";
            menuOverlay.style.pointerEvents = "auto";
            menuOverlay.setAttribute("aria-hidden", "false");
        },

        onReverseComplete: () => {
            menuOverlay.style.visibility = "hidden";
            menuOverlay.style.pointerEvents = "none";
            menuOverlay.setAttribute("aria-hidden", "true");
        }
    });

    menuTimeline
        .to(menuOverlay, {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power2.out"
        })
        .from(menuLinks, {
            y: 35,
            opacity: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out"
        }, "-=0.15");


    // Open the menu

    function openMenu() {

        menuOpen = true;

        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Close navigation menu");

        if (menuLabel) {
            menuLabel.textContent = "Close";
        }

        menuTimeline.play();
    }


    // Close the menu

    function closeMenu() {

        if (!menuOpen) return;

        menuOpen = false;

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

        if (menuLabel) {
            menuLabel.textContent = "Menu";
        }

        menuTimeline.reverse();
    }


    // Toggle menu using the navbar button

    menuButton.addEventListener("click", () => {

        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    // Close after selecting a section

    menuLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    // Close using Escape

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && menuOpen) {
            closeMenu();
        }

    });

}

});