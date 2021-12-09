const carousel = document.getElementById("carousel"),
    content = document.getElementById("content"),
    next = document.getElementById("next"),
    prev = document.getElementById("prev"),
    first = document.getElementById("first"),
    last = document.getElementById("last");

let width = carousel.offsetWidth - 300;
window.addEventListener("resize", e => (width = carousel.offsetWidth - 300));

next.addEventListener("click", e => {
    carousel.scrollBy(width, 0);
    if (carousel.scrollWidth !== 0) {
        prev.style.display = "inline-flex";
        first.style.display = "inline-flex";
    }
    if (content.scrollWidth - width - 100 <= carousel.scrollLeft + width) {
        next.style.display = "none";
        last.style.display = "none";
    }
});
prev.addEventListener("click", e => {
    carousel.scrollBy(-(width), 0);
    if (carousel.scrollLeft - width <= 0) {
        prev.style.display = "none";
        first.style.display = "none";
    }
    if (!content.scrollWidth - (width) <= carousel.scrollLeft + width) {
        next.style.display = "inline-flex";
        last.style.display = "inline-flex";
    }
});
last.addEventListener("click", e => {
    carousel.scrollBy((carousel.scrollWidth), 0);
    prev.style.display = "inline-flex";
    first.style.display = "inline-flex";
    next.style.display = "none";
    last.style.display = "none";
});
first.addEventListener("click", e => {
    carousel.scrollBy(-carousel.scrollWidth, 0);
    prev.style.display = "none";
    first.style.display = "none";
    next.style.display = "inline-flex";
    last.style.display = "inline-flex";
});