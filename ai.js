function send() {
    let input = document.getElementById("input").value;
    document.getElementById("input").value = "";

    addMessage("You: " + input);

    let reply = brain(input);

    addMessage("AI: " + reply);

    saveMemory(input);
}

function addMessage(msg) {
    let chat = document.getElementById("chat");
    chat.innerHTML += "<p>" + msg + "</p>";
}

// SIMPLE AI LOGIC
function brain(text) {
    text = text.toLowerCase();

    if (text.includes("suna")) return "Ni ANNUR AI ne 🤖";
    if (text.includes("hello")) return "Sannu 👋";
    if (text.includes("lafiya")) return "Lafiya lau 👍";
    if (text.includes("kudi")) return "Ina taimakon ka da kasuwanci 💰";

    return "Ban gane ba, amma zan koya 🤖";
}