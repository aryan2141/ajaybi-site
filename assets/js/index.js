const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

var loader = document.getElementById("loader");
const aosItems = document.querySelectorAll(".aos-item");
const formSubmitButton = document.getElementById("form-submit-btn");
const formMessage = document.getElementById("form-msg");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");
const mobileAosBreakpoint = 768;
const desktopNavBreakpoint = 992;
const reloadWidthThreshold = 80;
let lastViewportWidth = window.innerWidth;

function syncAosDelays() {
    aosItems.forEach((item) => {
        const nextDelay = window.innerWidth < mobileAosBreakpoint
            ? item.dataset.delayMobile
            : item.dataset.delayDesktop;

        if (nextDelay) {
            item.dataset.aosDelay = nextDelay;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        loader.classList.add("d-none");
    }, 2500);

    syncAosDelays();

    if (window.AOS) {
        AOS.refresh();
    }
});

let resizeTimeout;
window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
        const currentViewportWidth = window.innerWidth;
        const crossedDesktopBreakpoint = (
            lastViewportWidth < desktopNavBreakpoint && currentViewportWidth >= desktopNavBreakpoint
        ) || (
            lastViewportWidth >= desktopNavBreakpoint && currentViewportWidth < desktopNavBreakpoint
        );
        const widthChangedEnough = Math.abs(currentViewportWidth - lastViewportWidth) >= reloadWidthThreshold;

        if (crossedDesktopBreakpoint || widthChangedEnough) {
            lastViewportWidth = currentViewportWidth;
            window.location.reload();
            return;
        }

        lastViewportWidth = currentViewportWidth;
    }, 200);
});

document.querySelectorAll("[data-target]").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.getElementById(link.dataset.target);

        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});

if (formSubmitButton && formMessage) {
    formSubmitButton.addEventListener("click", function (e) {
        e.preventDefault();
        formMessage.classList.remove("d-none");
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {

        if (window.innerWidth < desktopNavBreakpoint && navbarCollapse) {
            bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
        }

    });
});
