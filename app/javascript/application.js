// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "sakura_study_path"

console.log("JavaScript is running!")
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = `
    <p>最小テンプレ起動中。ここに機能を追加していこう！</p>
    <button id="helloBtn">Hello</button>
    <div id="out"></div>
  `;
  document.getElementById("helloBtn")?.addEventListener("click", () => {
    document.getElementById("out").textContent = "Hello, world!";
  });
});