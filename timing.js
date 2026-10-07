window.Games = window.Games || {};
window.Games.timing = function(stage, root, done) {
  const min = stage.params.targetMin, max = stage.params.targetMax;
  const target = min + Math.random() * (max - min);
  const started = performance.now();
  root.innerHTML = `<div class="card">
    <h2>${stage.name}</h2>
    <p>バーを見て、目標位置で止める。</p>
    <progress id="bar" max="100" value="0" style="width:100%"></progress>
    <button id="stop" type="button">STOP</button>
    <div id="result"></div>
  </div>`;
  const bar = root.querySelector("#bar");
  const result = root.querySelector("#result");
  let running = true;
  function tick() {
    if (!running) return;
    const t = (performance.now() - started) / 20 % 100;
    bar.value = t;
    requestAnimationFrame(tick);
  }
  tick();
  root.querySelector("#stop").onclick = () => {
    running = false;
    const v = bar.value;
    const ok = Math.abs(v - target) <= 8;
    result.textContent = `目標:${target.toFixed(1)} 現在:${v.toFixed(1)}`;
    done(ok, true);
  };
};
