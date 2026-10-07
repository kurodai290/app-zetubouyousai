window.Games = window.Games || {};
window.Games.physics = function(stage, root, done) {
  const canvas = document.createElement("canvas");
  canvas.width = 700; canvas.height = 460;
  root.innerHTML = `<div class="card"><h2>${stage.name}</h2><p>ブロックを左から右へ落とし、ライン到達で成功。</p></div>`;
  root.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let blocks = [];
  let score = 0;
  let dragging = null;

  for (let i=0;i<stage.params.blocks;i++) {
    blocks.push({x:30, y:40+i*50, vx:0, vy:0, w:40, h:30, placed:false});
  }

  const mouse = {x:0,y:0};
  canvas.onmousemove = e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX-r.left) * canvas.width / r.width;
    mouse.y = (e.clientY-r.top) * canvas.height / r.height;
    if (dragging) { dragging.x = mouse.x - dragging.w/2; dragging.y = mouse.y - dragging.h/2; }
  };
  canvas.onmousedown = () => {
    dragging = blocks.find(b => mouse.x>b.x && mouse.x<b.x+b.w && mouse.y>b.y && mouse.y<b.y+b.h);
  };
  window.onmouseup = () => dragging = null;

  function loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(620, 0, 4, 460);

    for (const b of blocks) {
      if (!dragging || dragging !== b) {
        b.vy += 0.3;
        b.y += b.vy;
      }
      if (b.y + b.h > 430) { b.y = 430 - b.h; b.vy = 0; }
      ctx.fillStyle = "#5cc8ff";
      ctx.fillRect(b.x, b.y, b.w, b.h);
      if (b.x + b.w > 620) b.placed = true;
    }
    score = blocks.filter(b => b.placed).length;
    ctx.fillStyle = "#fff";
    ctx.fillText(`配置数: ${score}/${blocks.length}`, 20, 20);
    if (score === blocks.length) return done(true, true);
    requestAnimationFrame(loop);
  }
  loop();
};
