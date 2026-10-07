window.Games.memory = function(stage, root, done) {
  const size = stage.params.size;
  const seq = Array.from({length:size}, () => Math.floor(Math.random() * 4));
  const labels = ["▲","■","●","◆"];
  let shown = "";
  root.innerHTML = `<div class="card">
    <h2>${stage.name}</h2>
    <p>表示された順番を入力。</p>
    <div id="seq" style="font-size:32px;letter-spacing:10px;"></div>
    <button id="start">表示</button>
    <div id="form"></div>
  </div>`;

  const seqEl = root.querySelector("#seq");
  const form = root.querySelector("#form");
  root.querySelector("#start").onclick = async () => {
    seqEl.textContent = "";
    for (const n of seq) {
      seqEl.textContent = labels[n];
      await new Promise(r => setTimeout(r, 600));
      seqEl.textContent = "";
      await new Promise(r => setTimeout(r, 250));
    }
    form.innerHTML = `
      <input id="ans" placeholder="例: 0 1 3" />
      <button id="submit">送信</button>
    `;
    form.querySelector("#submit").onclick = () => {
      const ans = form.querySelector("#ans").value.trim().split(/\s+/).map(Number);
      done(JSON.stringify(ans) === JSON.stringify(seq), true);
    };
  };
};
