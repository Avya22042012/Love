/* ==============================
   LOGIN SYSTEM
============================== */

const CORRECT_USER_ID = "shritya";
const CORRECT_PASSWORD = "shritya03121207";

const loginScreen = document.getElementById("loginScreen");
const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("userPassword");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

loginBtn.addEventListener("click", checkLogin);

passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkLogin();
    }
});

function checkLogin() {

    const userId = userIdInput.value.trim();
    const password = passwordInput.value;

    if (
        userId === CORRECT_USER_ID &&
        password === CORRECT_PASSWORD
    ) {
        loginScreen.style.display = "none";
        document.body.style.overflow = "";
    } else {
        loginError.classList.add("show");

        passwordInput.value = "";
        passwordInput.focus();
    }
}









/* =====================================
   OPEN SURPRISE
===================================== */

function openSurprise() {

    const intro = document.getElementById("intro");
    const main = document.getElementById("main");

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        main.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        startTyping();

        createConfetti();

    }, 800);

}


/* =====================================
   TYPING EFFECT
===================================== */

const message =
    "Some people make the world a little brighter simply by being in it. You are one of those people. ❤️";

let typingIndex = 0;

function startTyping() {

    const typingElement =
        document.getElementById("typing");

    typingElement.innerHTML = "";

    typingIndex = 0;

    typeLetter();

}

function typeLetter() {

    const typingElement =
        document.getElementById("typing");

    if (typingIndex < message.length) {

        typingElement.innerHTML +=
            message.charAt(typingIndex);

        typingIndex++;

        setTimeout(typeLetter, 45);

    }

}


/* =====================================
   CONFETTI
===================================== */

function createConfetti() {

    const symbols = [
        "✨",
        "❤️",
        "🎉",
        "🎊",
        "💖",
        "⭐",
        "🎈"
    ];

    for (let i = 0; i < 45; i++) {

        const confetti =
            document.createElement("div");

        confetti.innerText =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        confetti.style.position = "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-50px";

        confetti.style.fontSize =
            Math.random() * 20 + 12 + "px";

        confetti.style.zIndex = "999";

        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);


        const duration =
            Math.random() * 4 + 3;

        confetti.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(720deg)`,
                    opacity: 0
                }
            ],

            {
                duration:
                    duration * 1000,

                easing: "linear"
            }

        );


        setTimeout(() => {

            confetti.remove();

        }, duration * 1000);

    }

}


/* =====================================
   REPLAY
===================================== */

function replay() {

    location.reload();

}


/* =====================================
   MUSIC
===================================== */

let musicPlaying = false;

function toggleMusic() {

    const music =
        document.getElementById("music");

    if (!music.src) {

        alert(
            "First add your music file as music.mp3"
        );

        return;

    }

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

    } else {

        music.play();

        musicPlaying = true;

    }

}
