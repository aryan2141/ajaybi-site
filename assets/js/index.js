const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);



let index = 0;
const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.dot');

function showSlide(i) {
    index = i;
    slides.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[i].classList.add('active');
}
dots.forEach((d, i) => d.onclick = () => showSlide(i));
setInterval(() => showSlide((index + 1) % 3), 5000);



var loader = document.getElementById("loader");

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        loader.classList.add("d-none");
    }, 2500);
});

// window.addEventListener("resize", () => {
//     location.reload();
// });

document.querySelectorAll(".aos-item").forEach(item => {

    if (window.innerWidth < 768) {
        item.dataset.aosDelay = item.dataset.delayMobile;
    } else {
        item.dataset.aosDelay = item.dataset.delayDesktop;
    }

});

AOS.refresh();

document.querySelectorAll("[data-target]").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.getElementById(link.dataset.target);

        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});

document.getElementById("form-submit-btn").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("form-msg").classList.remove("d-none");
})

const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {

        if (window.innerWidth < 992) {
            bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
        }

    });
});