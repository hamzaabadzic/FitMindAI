// ------------------------
//  FitMind AI ENGINE V3
// ------------------------

const API_KEY = "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"; // ← UBACI SVOJ KLJUČ OVDE

const SYSTEM_PROMPT = `
Ti si FitMind AI – napredni trener za ishranu, trening, zdravlje, oporavak i mindset.
Odgovaraj stručno, motivirajuće i jasno.
Uvijek koristi ove sekcije:

1) 🥗 Ishrana
2) 🏋️‍♂️ Trening
3) 😴 Oporavak
4) 🔥 Mindset
5) ❓ Kviz (ako ga korisnik želi)

Budi prijateljski ton, ali stručan. Personalizuj savjete.
`;

// ------------------------------
//  SLANJE PORUKE PREKO OPENAI API
// ------------------------------

async function askFitMind(prompt) {

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: prompt }
            ],
            temperature: 0.8
        })
    });

    const data = await response.json();

    return data.choices[0].message.content;
}

// ------------------------------
//  UI HANDLING
// ------------------------------

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";

    addMessage("FitMind razmišlja… ⏳", "bot");

    const reply = await askFitMind(message);

    chatBox.lastChild.innerText = reply;
}
