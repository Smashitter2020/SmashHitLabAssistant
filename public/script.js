import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const chat = document.getElementById("chat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("user-input");

const engine = await CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC");

async function ask(prompt) {
  try {
    const reply = await engine.chat.completions.create({
      messages: [ 
        { role: "system", content: "You are Smash Hit Lab assistant, helps with modding, blueprints, and guide." }, 
        { role: "user", content: prompt}
      ]
    });

    const text = reply.choices[0].message.content;
    addMessage("message-ai", text);
    
  } catch (err) {
    console.warn("LLM error: ", err.message);
  }
}

function addMessage(classType, text) {
  const message = document.createElement("div");
  message.textContent = text;
  message.classList.add(classType);
  chat.appendChild(message);
}

function handleSend() {
  const prompt = userInput.value.trim();
  addMessage("message-user", prompt);
  ask(prompt);
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
  if (userInput.value.trim() === "") {
    sendBtn.disabled = true;
  } else {
    sendBtn.disabled = false;
  }
});