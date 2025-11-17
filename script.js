let chats = [];
let currentChat = [];

function saveChat() {
    localStorage.setItem("fitmind_chats", JSON.stringify(chats));
}

function loadHistory() {
    const saved = localStorage.getItem("fitmind_chats");
    if (saved) chats = JSON.parse(saved);

    const history = document.getElementById("history");
    history.innerHTML = "";

    chats.forEach((chat, index) => {
        let title = chat[0]?.text?.slice(0, 25) || "Nova konverzacija";
        let div = document.createElement("div");
        div.classList.add("history-item");
        div.textContent = title;

        div.onclick = () => loadChat(index);
        history.appendChild(div);
    });
}

function loadChat(index) {
    currentChat = chats[index];
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    currentChat.forEach(msg => addMessage(msg.text, msg.sender, false));
}

function addMessage(text, sender, save = true) {
    const chatBox = document.getElementById("chat-box");

    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;

    if (save) {
        currentChat.push({ sender, text });
        saveChat();
    }
}

document.getElementById("new-chat-btn").onclick = () => {
    if (currentChat.length > 0) chats.push(currentChat);
    currentChat = [];
    document.getElementById("chat-box").innerHTML = "";
    saveChat();
    loadHistory();
};

document.getElementById("send-btn").onclick = sendMessage;
document.getElementById("user-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (!text) return;

    input.value = "";

    addMessage(text, "user");

    setTimeout(() => {
        addMessage("FitMind AI će odgovoriti kad povežemo backend…", "bot");
    }, 300);
}

loadHistory();
