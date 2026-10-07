const app = {
  config: Storage.load(),
  stages: [],
  index: -1,
  init() {
    this.stages = this.config.stages.filter(s => s.enabled);
    document.querySelector("#meta").innerHTML =
      `<span class="tag">${this.config.title}</span>
       <span class="tag">全${this.stages.length}ステージ</span>`;
    this.log = document.querySelector("#log");
    this.gameArea = document.querySelector("#gameArea");
    this.btnStart = document.querySelector("#btnStart");
    this.btnNext = document.querySelector("#btnNext");
    this.btnReset = document.querySelector("#btnReset");

    this.btnStart.onclick = () => this.start();
    this.btnNext.onclick = () => this.next();
    this.btnReset.onclick = () => { Storage.reset(); location.reload(); };
    this.renderIdle();
  },
  renderIdle() {
    this.gameArea.innerHTML = `<div class="card">開始でゲームを始めます。</div>`;
  },
  start() {
    UI.clear(this.log);
    this.index = 0;
    this.runStage();
  },
  next() {
    this.index++;
    this.runStage();
  },
  runStage() {
    const stage = this.stages[this.index];
    if (!stage) {
      this.gameArea.innerHTML = `<div class="card"><h2>クリア</h2><p class="ok">全ステージ突破</p></div>`;
      this.btnNext.disabled = true;
      return;
    }
    UI.log(this.log, `START: ${stage.name}`);
    this.btnNext.disabled = true;

    const done = (ok) => {
      UI.log(this.log, `${ok ? "CLEAR" : "FAIL"}: ${stage.name}`);
      this.btnNext.disabled = false;
      this.btnNext.textContent = "次へ";
    };

    Games[stage.id](stage, this.gameArea, done);
  }
};
window.addEventListener("DOMContentLoaded", () => app.init());
