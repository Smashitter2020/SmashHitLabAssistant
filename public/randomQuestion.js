const questions = ["What is a mod blueprint in Smash Hit Lab?", "How do I get started with Modding Guide?", "How do modding tools work in Smash Hit Lab?", "What are community mods in Smash Hit Lab?", "How do mod blueprints work in Smash Hit Lab?", "How do I make a 4th-powerup blueprint in Smash Hit Lab?"];
const randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", () => {
  const index = Math.floor(Math.random() * questions.length);
  document.getElementById("user-input").value = questions[index];
});