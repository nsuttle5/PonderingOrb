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
      "Aiden Maxwell", "I see great mpreg in you",
    ],
  },
  number: {
    label: "Number",
    answers: ["0", "1", "2", "5", "7", "67", "ONE MILLION",], // change the range here
  },
  when: {
    label: "When",
    answers: ["When the stars align (they're busy)", "When you touch grass", "Before GTA VII", "When bro gets a job", "kkjgfkjkjgfdhkjfdkjgfdkjfds", "Next month", "Someday", "Never"],
  },
};

/* ============================================================
   BEHAVIOUR
   ============================================================ */
const frame  = document.getElementById("frame");
const hit    = document.getElementById("hit");
const answer = document.getElementById("answer");
const hint   = document.getElementById("hint");
const live   = document.getElementById("live");
const types  = document.getElementById("types");
const video  = document.getElementById("loop");

let category = "classic";
let last = null;
let busy = false;

// Build the category buttons
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

function pick() {
  const pool = CATEGORIES[category].answers;
  let result, tries = 0;
  do {
    const item = pool[Math.floor(Math.random() * pool.length)];
    result = typeof item === "function" ? item() : item;
    tries++;
  } while (result === last && tries < 8);   // avoid repeating the last answer
  last = result;
  return result;
}

function sizeFor(text) {
  if (/^\d+$/.test(text)) return "num";
  if (text.length <= 8) return "short";
  if (text.length > 18) return "long";
  return "normal";
}

function open() {
  const text = pick();
  answer.textContent = text;
  answer.dataset.size = sizeFor(text);
  live.textContent = text;
  frame.classList.add("is-open");
  hint.textContent = "Press again to put the answer away";
  hit.setAttribute("aria-label", "Put the answer away");
}

function close() {
  frame.classList.remove("is-open");
  live.textContent = "";
  hint.textContent = "Press the ball to ask";
  hit.setAttribute("aria-label", "Ask the ball");
}

hit.addEventListener("click", () => {
  if (busy) return;
  busy = true;
  setTimeout(() => (busy = false), 1100);   // lets each animation finish
  frame.classList.contains("is-open") ? close() : open();
  video.play().catch(() => {});             // keep the loop running
});

// The loop should never stop; nudge it if the browser pauses it
video.play().catch(() => {});
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) video.play().catch(() => {});
});