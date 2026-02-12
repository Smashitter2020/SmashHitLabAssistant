import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const chat = document.getElementById("chat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("user-input");

let engine;
try {
  engine = await CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC");
} catch (err) {
  addMessage("message-error", err.message);
}

let busy = false;

async function ask(prompt) {
  try {
    const reply = await engine.chat.completions.create({
      messages: [
        { role: "system", content: "You are Smash Hit Lab assistant, helps with modding, blueprints, and guide." },
        { role: "user", content: prompt }
      ]
    });

    const text = reply.choices[0].message.content;

    if (text.length > 2000) return addMessage("message-ai", "[Response too long]");
    
    addMessage("message-ai", text);
  } catch (err) {
    addMessage("message-error", err.message);
  }
}

function addMessage(classType, text) {
  const message = document.createElement("div");
  message.textContent = text;
  message.classList.add(classType);
  chat.appendChild(message);
}

async function handleSend() {
  if (busy) return;

  const prompt = userInput.value.trim();
  if (!prompt) return;

  addMessage("message-user", prompt);

  busy = true;
  sendBtn.disabled = true;

  await ask(prompt);

  busy = false;
  sendBtn.disabled = userInput.value.trim() === "";
  userInput.value = "";
}

sendBtn.addEventListener("click", handleSend);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSend();
  }
});

userInput.addEventListener("input", () => {
  if (!busy) sendBtn.disabled = userInput.value.trim() === "";
});