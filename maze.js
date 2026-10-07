window.Games.maze = function(stage, root, done) {
  const W = stage.params.width, H = stage.params.height, wallRate = stage.params.wallRate;
  const canvas = document.createElement("canvas");
  canvas.width = 700; canvas.height = 460;
  root.innerHTML = `<div class="card"><h2>${stage.name}</h2><p>矢印キーでゴールへ。</p></div>`;
  root.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const map = Array.from({length:H}, () => Array.from({length:W}, () => Math.random() < wallRate ? 1 : 0));
  map[0][0] = 0; map[H-1][W-1] = 0;
  let x = 0, y = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const cw = canvas.width / W, ch = canvas.height / H;
    for (let j=0;j<H;j++) for (let i=0;i<W;i++) {
      ctx.fillStyle = map[j][i] ? "#223" : "#0a1017";
      ctx.fillRect(i*cw, j*ch, cw, ch);
    }
    ctx.fillStyle = "#4ade80"; ctx.fillRect((W-1)*cw, (H-1)*ch, cw, ch);
    ctx.fillStyle = "#5cc8ff"; ctx.fillRect(x*cw+cw*0.15, y*ch+ch*0.15, cw*0.7, ch*0.7);
  }
  const key = e => {
    let nx=x, ny=y;
    if (e.key==="ArrowUp") ny--;
    if (e.key==="ArrowDown") ny++;
    if (e.key==="ArrowLeft") nx--;
    if (e.key==="ArrowRight") nx++;
    if (map[ny]?.[nx] === 0) { x=nx; y=ny; draw(); }
    if (x===W-1 && y===H-1) { window.removeEventListener("keydown", key); done(true, true); }
  };
  window.addEventListener("keydown", key);
  draw();
};
