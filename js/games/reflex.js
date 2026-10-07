window.Games = window.Games || {};
Games.reflex = function(stage, root, done) {
  root.innerHTML = `<div class="card">
    <h2>${stage.name}</h2>
    <p>「GO」を見たら即クリック。</p>
    <button id="goBtn" disabled>待機中...</button>
    <div id="msg"></div>
  </div>`;

  const btn = root.querySelector("#goBtn");
  const msg = root.querySelector("#msg");
  const delay = stage.params.targetDelayMin + Math.random() * (stage.params.targetDelayMax - stage.params.targetDelayMin);

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = "GO";
    msg.textContent = "今だ！";
    const start = performance.now();
    btn.onclick = () => done(true, Math.round(performance.now() - start) < 800);
  }, delay);
};
