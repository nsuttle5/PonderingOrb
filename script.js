/* ============================================================
   RESPONSES
   Each category is { label, answers }. An answer is either a
   string or a function that returns one (for random numbers etc).
   Add, rename or remove categories freely: the buttons are built
   from this object.
   ============================================================ */
const randInt = (min, max) => String(Math.floor(Math.random() * (max - min + 1)) + min);

const CATEGORIES = {
  classic: {
    label: "Classic",
    answers: [
      "It is giving yes", "Nah, you're cooked", "Not in this economy", "Chat, is this real?", "Delulu is not the solulu",
      "You are NOT beating the allegations", "The timeline is not looking good", "I am literally a ball", "I wasn't programmed for this", "I'll answer after we talk about your search history",
      "I know what you are", "Your aura speaks louder than your words", "I saw your future. I can't unsee", "This is canon",
      "Yes, I get whatcha mean~ *wink*", "Mods, twist their balls", "I'm pooping myself (yes)", "-farts cutely- \n(yes)",
      "Aiden Maxwell", "I see great mpreg in you", "-farts un-cutely- \n(no)", "I see feet pics in your future", "Give me 5 bucks and I'll do whatever you want",
      "You've run out of tokens", "The person to your left is madly in love with you", "The person to your right is a skin walker", "Kill. The. King.",
      "You think that's happening? Ha!", "Your future is red", "Don't fall asleep tonight"
    ],
  },
  number: {
    label: "Number",
    answers: ["0", "1", "2", "5", "7", "67", "ONE MILLION", "-4", "17", "420", "Infinite", "DNE", ".001", "Good luck", "I didn't know it was possible to get that much"], // change the range here
  },
  when: {
    label: "When",
    answers: ["When the stars align (they're busy)", "When you touch grass", "Before GTA VII", "When bro gets a job", "kkjgfkjkjgfdhkjfdkjgfdkjfds", "Next month", "Someday", "Never"
      , "Don't count on it sonion", "In the next minute", "Right. Now.", "Ask Joseph"
    ],
  },
};

const TAROT_CARDS = [
  { key: "chariot", name: "The Chariot", image: "tarot/TheChariot.png", uprightMeaning: "Willpower and disciplined movement carry you toward a clear victory.", reversedMeaning: "Scattered focus and control struggles can stall your progress." },
  { key: "strength", name: "Strength", image: "tarot/Strength.png", uprightMeaning: "Gentle courage and patience tame what once felt overwhelming.", reversedMeaning: "Self-doubt and emotional reactivity weaken your confidence." },
  { key: "death", name: "Death", image: "tarot/Death.png", uprightMeaning: "A deep ending clears space for meaningful renewal.", reversedMeaning: "Resistance to change keeps you attached to what has already passed." },
  { key: "temperance", name: "Temperance", image: "tarot/Temperance.png", uprightMeaning: "Balance and moderation help everything blend into harmony.", reversedMeaning: "Imbalance or excess creates friction between goals and actions." },
  { key: "sun", name: "The Sun", image: "tarot/TheSun.png", uprightMeaning: "Joy, clarity, and vitality illuminate the path ahead.", reversedMeaning: "Clouded optimism suggests joy is present but not fully embraced." },
  { key: "hermit", name: "The Hermit", image: "tarot/TheHermit.png", uprightMeaning: "Inner guidance appears through reflection and solitude.", reversedMeaning: "Isolation or avoidance can block the insight you seek." },
  { key: "judgement", name: "Judgement", image: "tarot/Judgement.png", uprightMeaning: "A wake-up call invites truth, release, and new purpose.", reversedMeaning: "Harsh self-criticism or denial delays necessary transformation." },
  { key: "hanged-man", name: "The Hanged Man", image: "tarot/TheHangedMan.png", uprightMeaning: "A new perspective emerges when you willingly pause.", reversedMeaning: "Stalling without surrender keeps you suspended in frustration." },
  { key: "devil", name: "The Devil", image: "tarot/TheDevil.png", uprightMeaning: "Attachment, temptation, or fear asks to be consciously confronted.", reversedMeaning: "Breaking patterns and reclaiming agency become possible now." },
  { key: "hierophant", name: "The Hierophant", image: "tarot/TheHierophant.png", uprightMeaning: "Tradition, mentorship, and shared values offer support.", reversedMeaning: "Rigid systems may need to be questioned or redefined." },
  { key: "lovers", name: "The Lovers", image: "tarot/TheLovers.png", uprightMeaning: "Alignment in love and values supports an important choice.", reversedMeaning: "Misalignment or conflict signals the need for honest communication." },
  { key: "justice", name: "Justice", image: "tarot/Justice.png", uprightMeaning: "Truth, accountability, and fairness restore equilibrium.", reversedMeaning: "Bias or avoidance of responsibility can distort outcomes." },
  { key: "tower", name: "The Tower", image: "tarot/TheTower.png", uprightMeaning: "A sudden shake-up dismantles what is no longer stable.", reversedMeaning: "Fear of collapse may prolong what is already falling away." },
  { key: "high-priestess", name: "The High Priestess", image: "tarot/TheHighPriestess.png", uprightMeaning: "Intuition and hidden wisdom guide this moment.", reversedMeaning: "Ignoring inner knowing leads to confusion or mixed signals." },
  { key: "empress", name: "The Empress", image: "tarot/TheEmpress.png", uprightMeaning: "Nurturing energy, creativity, and abundance are growing.", reversedMeaning: "Overgiving or creative blocks call for self-care and boundaries." },
  { key: "moon", name: "The Moon", image: "tarot/TheMoon.png", uprightMeaning: "Dreams, symbols, and mystery reveal deeper emotional currents.", reversedMeaning: "Confusion begins to clear as hidden fears come to light." },
  { key: "world", name: "The World", image: "tarot/TheWorld.png", uprightMeaning: "Completion and integration mark a meaningful milestone.", reversedMeaning: "An unfinished cycle asks for one final act of closure." },
  { key: "magician", name: "The Magician", image: "tarot/TheMagician.png", uprightMeaning: "Skill and intention turn ideas into tangible results.", reversedMeaning: "Misused power or self-doubt can distort your manifestation." },
  { key: "emperor", name: "The Emperor", image: "tarot/TheEmperor.png", uprightMeaning: "Structure and leadership create stability and momentum.", reversedMeaning: "Overcontrol or rigidity can limit growth and collaboration." },
  { key: "jester", name: "The Jester", image: "tarot/TheJester.png", uprightMeaning: "A leap of faith invites a fresh beginning and open-hearted curiosity.", reversedMeaning: "Impulsiveness or fear of the unknown may block your first step." },
];

const REVERSED_CHANCE = 0.35;

/* ============================================================
   BEHAVIOUR
   ============================================================ */
const frame = document.getElementById("frame");
const hit = document.getElementById("hit");
const answer = document.getElementById("answer");
const hint = document.getElementById("hint");
const live = document.getElementById("live");
const types = document.getElementById("types");
const video = document.getElementById("loop");
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const tarotDeck = document.getElementById("tarot-deck");
const shuffleTarot = document.getElementById("shuffle-tarot");
const resetTarot = document.getElementById("reset-tarot");
const tarotPrev = document.getElementById("tarot-prev");
const tarotNext = document.getElementById("tarot-next");
const tarotPageLabel = document.getElementById("tarot-page");
const fartSound = document.getElementById("fart-sound");

let category = "classic";
let last = null;
let busy = false;
let tarotState = [];
let tarotPage = 0;

// Tracks used answers separately for each category
const usedAnswers = Object.fromEntries(
  Object.keys(CATEGORIES).map(key => [key, new Set()])
);

const TAROT_PAGE_SIZE = 3;
let resumeMusicAfterFart = false;

// Build the category buttons
if (types) {
  for (const [key, { label }] of Object.entries(CATEGORIES)) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "choice";
    b.textContent = label;
    b.dataset.key = key;
    b.setAttribute("aria-pressed", String(key === category));
    b.addEventListener("click", () => {
      category = key;
      types.querySelectorAll(".choice").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
    });
    types.appendChild(b);
  }
}

function pick() {
  const pool = CATEGORIES[category].answers;
  const used = usedAnswers[category];

  // Reset only when every answer has been used
  if (used.size >= pool.length) {
    used.clear();
  }

  // Get answers that haven't been used yet
  const remaining = pool
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => !used.has(index));

  // Randomly select one unused answer
  const choice = remaining[
    Math.floor(Math.random() * remaining.length)
  ];

  // Mark it as used
  used.add(choice.index);

  const result = typeof choice.item === "function"
    ? choice.item()
    : choice.item;

  last = result;
  return result;
}

function shuffle(array) {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function sizeFor(text) {
  if (/^\d+$/.test(text)) return "num";
  if (text.length <= 8) return "short";
  if (text.length > 18) return "long";
  return "normal";
}

function open() {
  if (!answer || !frame || !hint || !hit || !live) return;
  const text = pick();
  answer.textContent = text;
  answer.dataset.size = sizeFor(text);
  live.textContent = text;
  frame.classList.add("is-open");
  hint.textContent = "Press again to put the answer away";
  hit.setAttribute("aria-label", "Put the answer away");
}

function close() {
  if (!frame || !hint || !hit || !live) return;
  frame.classList.remove("is-open");
  live.textContent = "";
  hint.textContent = "Press the ball to ask";
  hit.setAttribute("aria-label", "Ask the ball");
}

function updateMusicToggle() {
  if (!music || !musicToggle) return;
  const isPlaying = !music.paused;
  musicToggle.textContent = isPlaying ? "Pause music" : "Play music";
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
}

function startMusic() {
  if (!music.paused || !fartSound.paused) return;
  music.play().then(updateMusicToggle).catch(updateMusicToggle);
}

function playFartSound() {
  if (Math.random() >= 0.04) return false;

  resumeMusicAfterFart = resumeMusicAfterFart || !music.paused;
  music.pause();
  fartSound.currentTime = 0;

  const resumeAfterFart = () => {
    fartSound.onended = null;
    const shouldResume = resumeMusicAfterFart;
    resumeMusicAfterFart = false;
    if (shouldResume) startMusic();
  };
  fartSound.onended = resumeAfterFart;
  fartSound.play().catch(resumeAfterFart);
  updateMusicToggle();
  return true;
}

function renderTarot() {
  if (!tarotDeck || !tarotPageLabel || !tarotPrev || !tarotNext) return;
  tarotDeck.innerHTML = "";
  const pages = Math.max(1, Math.ceil(tarotState.length / TAROT_PAGE_SIZE));
  if (tarotPage > pages - 1) tarotPage = pages - 1;

  const start = tarotPage * TAROT_PAGE_SIZE;
  const end = start + TAROT_PAGE_SIZE;
  const pageItems = tarotState.slice(start, end);

  tarotPageLabel.textContent = `Page ${tarotPage + 1} / ${pages}`;
  tarotPrev.disabled = tarotPage === 0;
  tarotNext.disabled = tarotPage === pages - 1;

  pageItems.forEach((card, localIndex) => {
    const index = start + localIndex;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tarot-card";
    if (card.revealed) button.classList.add("is-revealed");
    button.setAttribute("aria-label", card.revealed ? `${card.name} revealed` : "Face-down tarot card");
    button.dataset.key = card.key;

    button.innerHTML = `
      <div class="tarot-card-inner">
        <div class="tarot-face tarot-back"><span>Tarot</span></div>
        <div class="tarot-face tarot-front">
          <div class="tarot-image-wrap">
            <img class="tarot-image${card.isReversed ? " is-reversed" : ""}" src="${card.image}" alt="${card.name}" loading="lazy">
          </div>
          <div class="tarot-front-content">
            <p class="tarot-name">${card.name}</p>
            <p class="tarot-orientation">${card.isReversed ? "Reversed" : "Upright"}</p>
            <p class="tarot-meaning">${card.isReversed ? card.reversedMeaning : card.uprightMeaning}</p>
          </div>
        </div>
      </div>
    `;

    const img = button.querySelector(".tarot-image");
    img.addEventListener("error", () => {
      img.style.display = "none";
    });

    button.addEventListener("click", () => {
      if (tarotState[index].revealed) return;
      tarotState[index].revealed = true;
      renderTarot();
    });

    tarotDeck.appendChild(button);
  });
}

function buildTarotSpread() {
  tarotState = shuffle(TAROT_CARDS).map((card) => ({
    ...card,
    isReversed: Math.random() < REVERSED_CHANCE,
    revealed: false,
  }));
  tarotPage = 0;
  renderTarot();
}

function resetTarotSpread() {
  tarotState = tarotState.map((card) => ({ ...card, revealed: false }));
  renderTarot();
}

if (musicToggle && music) {
  musicToggle.addEventListener("click", () => {
    if (!fartSound.paused) return;
  if (music.paused) {
      music.play().then(updateMusicToggle).catch(updateMusicToggle);
    } else {
      music.pause();
      updateMusicToggle();
    }
  });
}

if (shuffleTarot && resetTarot && tarotPrev && tarotNext) {
  shuffleTarot.addEventListener("click", buildTarotSpread);
  resetTarot.addEventListener("click", resetTarotSpread);
  tarotPrev.addEventListener("click", () => {
    if (tarotPage === 0) return;
    tarotPage -= 1;
    renderTarot();
  });
  tarotNext.addEventListener("click", () => {
    const pages = Math.max(1, Math.ceil(tarotState.length / TAROT_PAGE_SIZE));
    if (tarotPage >= pages - 1) return;
    tarotPage += 1;
    renderTarot();
  });
}

if (hit && frame && video) {
  hit.addEventListener("click", () => {
    if (busy) return;
    if (!playFartSound()) startMusic();
    busy = true;
    setTimeout(() => (busy = false), 1100); // lets each animation finish
    frame.classList.contains("is-open") ? close() : open();
    video.play().catch(() => {}); // keep the loop running
  });

  // The loop should never stop; nudge it if the browser pauses it
  video.play().catch(() => {});
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) video.play().catch(() => {});
  });
}

if (tarotDeck) {
  buildTarotSpread();
}

startMusic();
document.addEventListener("pointerdown", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });