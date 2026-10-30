
/* ==========================================
   SHRITYA — BIRTHDAY GREETING CARD
   COMPLETE UPDATED SCRIPT
========================================== */

"use strict";

/* ------------------------------------------
   LOGIN DETAILS
------------------------------------------ */

const CORRECT_USER_ID = "shritya";
const CORRECT_PASSWORD = "shritya03121207";

const loginScreen = document.getElementById("loginScreen");
const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("userPassword");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");


/* ------------------------------------------
   GLOBAL VARIABLES
------------------------------------------ */

let musicPlaying = false;

let typingIndex = 0;
let typingTimer = null;

let slideshowIndex = 0;
let slideshowTimer = null;
let slideshowObserver = null;

const message =
    "Some people make the world a little brighter simply by being in it. You are one of those people. I feel lucky to have you in my life. ❤️";


/* ------------------------------------------
   LOGIN SYSTEM
------------------------------------------ */

loginBtn?.addEventListener("click", checkLogin);

[userIdInput, passwordInput].forEach((field) => {

    field?.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            checkLogin();
        }

    });

    field?.addEventListener("input", () => {
        loginError?.classList.remove("show");
    });

});


function checkLogin() {

    const userId = userIdInput?.value.trim() || "";
    const password = passwordInput?.value || "";

    if (
        userId === CORRECT_USER_ID &&
        password === CORRECT_PASSWORD
    ) {

        loginScreen?.classList.add("is-leaving");

        window.setTimeout(() => {

            if (loginScreen) {
                loginScreen.style.display = "none";
            }

            document.body.classList.remove("is-locked");

            const musicButton =
                document.querySelector(".music-btn");

            if (musicButton) {
                musicButton.style.display = "grid";
            }

        }, 550);

    } else {

        loginError?.classList.add("show");

        if (passwordInput) {
            passwordInput.value = "";
            passwordInput.focus();
        }

    }

}


/* ------------------------------------------
   OPEN SURPRISE / ENVELOPE ANIMATION
------------------------------------------ */

function openSurprise() {

    const intro = document.getElementById("intro");
    const main = document.getElementById("main");

    if (
        !intro ||
        !main ||
        intro.classList.contains("is-opening")
    ) {
        return;
    }

    intro.classList.add("is-opening");

    window.setTimeout(() => {

        intro.style.display = "none";

        main.style.display = "block";

        requestAnimationFrame(() => {
            main.classList.add("is-visible");
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        startTyping();

        createConfetti();

        revealMemoryCards();

    }, 1050);

}


/* ------------------------------------------
   TYPING MESSAGE ANIMATION
------------------------------------------ */

function startTyping() {

    const target = document.getElementById("typing");

    if (!target) return;

    clearTimeout(typingTimer);

    target.textContent = "";

    typingIndex = 0;

    typeLetter();

}


function typeLetter() {

    const target = document.getElementById("typing");

    if (!target) return;

    if (typingIndex < message.length) {

        target.textContent += message.charAt(typingIndex++);

        typingTimer = setTimeout(typeLetter, 38);

    }

}


/* ------------------------------------------
   CONFETTI ANIMATION
------------------------------------------ */

function createConfetti() {

    const symbols = ["✧", "♡", "✿", "❀", "✦"];

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 34; i++) {

        const piece = document.createElement("span");

        const duration = Math.random() * 3 + 3;

        piece.className = "falling-confetti";

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.cssText = `
            position: fixed;
            top: -35px;
            left: ${Math.random() * 100}vw;
            z-index: 90;
            pointer-events: none;
            color: ${Math.random() > .5 ? "#bd7180" : "#b99a65"};
            font-size: ${Math.random() * 15 + 13}px;
            animation: cardConfetti ${duration}s linear ${Math.random()}s forwards;
        `;

        fragment.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, (duration + 2) * 1000);

    }

    document.body.appendChild(fragment);

    if (!document.getElementById("confetti-style")) {

        const style = document.createElement("style");

        style.id = "confetti-style";

        style.textContent = `
            @keyframes cardConfetti {
                to {
                    transform: translateY(110vh) rotate(540deg);
                    opacity: 0;
                }
            }
        `;

        document.head.appendChild(style);

    }

}


/* ------------------------------------------
   AUTOMATIC PHOTO SLIDESHOW STYLE
------------------------------------------ */

function addSlideshowStyles() {

    if (document.getElementById("slideshow-style")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "slideshow-style";

    style.textContent = `

        .gallery.slideshow-active {

            display: flex !important;

            justify-content: center;

            align-items: center;

            min-height: 460px;

            position: relative;

        }

        .slideshow-active .memory-card {

            display: none !important;

            width: min(100%, 650px);

            margin: 0 auto;

            opacity: 0;

            transform: translateY(10px);

        }

        .slideshow-active .memory-card.active-slide {

            display: block !important;

            opacity: 1;

            transform: translateY(0);

            animation: photoFade 1s ease;

        }

        .slideshow-active .memory-card img {

            width: 100%;

            height: 420px;

            object-fit: contain;

            background: #f3e5df;

            cursor: pointer;

        }

        .slideshow-active .memory-card figcaption {

            text-align: center;

        }

        @keyframes photoFade {

            from {

                opacity: 0;

                transform: translateY(15px) scale(.97);

            }

            to {

                opacity: 1;

                transform: translateY(0) scale(1);

            }

        }

        @media(max-width: 600px) {

            .gallery.slideshow-active {

                min-height: 340px;

            }

            .slideshow-active .memory-card img {

                height: 300px;

            }

        }

    `;

    document.head.appendChild(style);

}


/* ------------------------------------------
   AUTOMATIC PHOTO SLIDESHOW
------------------------------------------ */

function revealMemoryCards() {

    const gallery = document.querySelector(".gallery");

    const cards = Array.from(
        document.querySelectorAll(".memory-card")
    );

    if (!gallery || !cards.length) {
        return;
    }

    addSlideshowStyles();

    gallery.classList.add("slideshow-active");


    // Show selected photo

    function showPhoto(index) {

        cards.forEach((card) => {

            card.classList.remove(
                "active-slide",
                "show"
            );

        });

        slideshowIndex =
            ((index % cards.length) + cards.length) % cards.length;

        cards[slideshowIndex].classList.add(
            "active-slide",
            "show"
        );

    }


    // Start slideshow

    function startSlideshow() {

        if (slideshowTimer) {
            return;
        }

        showPhoto(slideshowIndex);

        slideshowTimer = setInterval(() => {

            showPhoto(slideshowIndex + 1);

        }, 3000);

    }


    // Stop slideshow

    function stopSlideshow() {

        if (slideshowTimer) {

            clearInterval(slideshowTimer);

            slideshowTimer = null;

        }

    }


    // Check whether gallery is visible

    if ("IntersectionObserver" in window) {

        slideshowObserver = new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        startSlideshow();

                    } else {

                        stopSlideshow();

                    }

                });

            },

            {
                threshold: 0.2
            }

        );

        slideshowObserver.observe(gallery);

    } else {

        startSlideshow();

    }

}


/* ------------------------------------------
   FULL SCREEN PHOTO VIEWER
------------------------------------------ */

function setupPhotoViewer() {

    const photos = Array.from(
        document.querySelectorAll(".memory-card img")
    );

    if (!photos.length) {
        return;
    }

    const viewer = document.createElement("div");

    viewer.className = "photo-viewer";

    viewer.setAttribute("role", "dialog");

    viewer.setAttribute("aria-modal", "true");

    viewer.setAttribute("aria-label", "Photo viewer");

    viewer.innerHTML = `

        <button
            class="viewer-close"
            type="button"
            aria-label="Close"
        >×</button>

        <button
            class="viewer-prev"
            type="button"
            aria-label="Previous photo"
        >‹</button>

        <img
            class="viewer-image"
            alt="Selected memory"
        >

        <button
            class="viewer-next"
            type="button"
            aria-label="Next photo"
        >›</button>

        <p class="viewer-count"></p>

    `;

    document.body.appendChild(viewer);

    const image = viewer.querySelector(".viewer-image");

    const count = viewer.querySelector(".viewer-count");

    let active = 0;


    function show(index) {

        active =
            ((index % photos.length) + photos.length) %
            photos.length;

        image.src = photos[active].getAttribute("src");

        image.alt = photos[active].alt || "Memory";

        count.textContent =
            `${String(active + 1).padStart(2, "0")} / ${photos.length}`;

    }


    function close() {

        viewer.classList.remove("is-open");

        document.body.classList.remove("viewer-open");

    }


    photos.forEach((photo, index) => {

        photo.addEventListener("click", () => {

            show(index);

            viewer.classList.add("is-open");

            document.body.classList.add("viewer-open");

        });

        photo.tabIndex = 0;

        photo.addEventListener("keydown", (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                photo.click();

            }

        });

    });


    viewer
        .querySelector(".viewer-close")
        .addEventListener("click", close);


    viewer
        .querySelector(".viewer-prev")
        .addEventListener("click", () => {

            show(active - 1);

        });


    viewer
        .querySelector(".viewer-next")
        .addEventListener("click", () => {

            show(active + 1);

        });


    viewer.addEventListener("click", (event) => {

        if (event.target === viewer) {
            close();
        }

    });


    document.addEventListener("keydown", (event) => {

        if (!viewer.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {
            close();
        }

        if (event.key === "ArrowLeft") {
            show(active - 1);
        }

        if (event.key === "ArrowRight") {
            show(active + 1);
        }

    });

}


/* ------------------------------------------
   BACKGROUND MUSIC
------------------------------------------ */

function toggleMusic() {

    const music = document.getElementById("music");

    const button = document.querySelector(".music-btn");

    if (!music) {
        return;
    }

    if (
        !music.querySelector("source") &&
        !music.getAttribute("src")
    ) {

        alert(
            "To use background music, add a music.mp3 file and its source inside the audio tag in index.html."
        );

        return;

    }


    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        button?.classList.remove("is-playing");

        button?.setAttribute("aria-label", "Play music");

    } else {

        music.play()

            .then(() => {

                musicPlaying = true;

                button?.classList.add("is-playing");

                button?.setAttribute("aria-label", "Pause music");

            })

            .catch(() => {

                alert(
                    "Music could not be played. Please check the music file."
                );

            });

    }

}


/* ------------------------------------------
   REPLAY WEBSITE
------------------------------------------ */

function replay() {

    window.location.reload();

}


/* ------------------------------------------
   WEBSITE INITIALIZATION
------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("is-locked");

    setupPhotoViewer();

});
