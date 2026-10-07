window.app = {
  config: null,
  stages: [],
  index: -1,
  init() {
    try {
      this.config = Storage.load();
      this.stages = Array.isArray(this.config.stages)
        ? this.config.stages.filter(s => s && s.enabled && s.id)
        : [];

      const meta = document.querySelector("#meta");
      this.log = document.querySelector("#log");
      this.gameArea = document.querySelector("#gameArea");
      this.btnStart = document.querySelector("#btnStart");
      this.btnNext = document.querySelector("#btnNext");
      this.btnReset = document.querySelector("#btnReset");

      if (!meta || !this.log || !this.gameArea || !this.btnStart || !this.btnNext || !this.btnReset) {
        throw new Error("必要なHTML要素が見つかりません。");
      }

      meta.innerHTML =
        `<span class="tag">${UI.escape(this.config.title || "絶望要塞 Web")}</span>
         <span class="tag">全${this.stages.length}ステージ</span>`;

      this.btnStart.onclick = () => this.start();
      this.btnNext.onclick = () => this.next();
      this.btnReset.onclick = () => {
        Storage.reset();
        location.reload();
      };

      this.renderIdle();
    } catch (error) {
      console.error(error);
      const area = document.querySelector("#gameArea");
      if (area) {
        area.innerHTML = `<div class="card ng"><h2>起動エラー</h2><p>${UI.escape(error.message)}</p><p>リセットを押して設定を初期化してください。</p></div>`;
      }
    }
  },

  renderIdle() {
    this.gameArea.innerHTML = `<div class="card">「開始」を押すとゲームが始まります。</div>`;
    this.btnStart.disabled = false;
    this.btnNext.disabled = true;
  },

  start() {
    if (!this.stages.length) {
      this.gameArea.innerHTML = `<div class="card ng"><h2>ステージがありません</h2><p>管理画面でステージを1つ以上「有効」にしてください。</p></div>`;
      return;
    }
    UI.clear(this.log);
    this.index = 0;
    this.btnStart.disabled = true;
    this.runStage();
  },

  next() {
    if (this.index < 0) return;
    this.index++;
    this.runStage();
  },

  runStage() {
    const stage = this.stages[this.index];
    if (!stage) {
      this.gameArea.innerHTML = `<div class="card"><h2>クリア</h2><p class="ok">全ステージ突破！</p></div>`;
      this.btnNext.disabled = true;
      this.btnStart.disabled = false;
      return;
    }

    const game = window.Games && window.Games[stage.id];
    if (typeof game !== "function") {
      UI.log(this.log, `ERROR: ${stage.id} のゲームが読み込まれていません`);
      this.gameArea.innerHTML = `<div class="card ng"><h2>ステージ起動エラー</h2><p>「${UI.escape(stage.name)}」のゲームプログラムが見つかりません。</p><p>ファイル名・scriptの読み込み順を確認してください。</p></div>`;
      this.btnNext.disabled = true;
      return;
    }

    UI.log(this.log, `START: ${stage.name}`);
    this.btnNext.disabled = true;

    let finished = false;
    const done = (ok) => {
      if (finished) return;
      finished = true;
      UI.log(this.log, `${ok ? "CLEAR" : "FAIL"}: ${stage.name}`);
      this.btnNext.disabled = false;
      this.btnNext.textContent = ok ? "次へ" : "次へ（再挑戦可）";
    };

    try {
      game(stage, this.gameArea, done);
    } catch (error) {
      console.error(error);
      UI.log(this.log, `ERROR: ${error.message}`);
      this.gameArea.innerHTML = `<div class="card ng"><h2>ゲーム起動エラー</h2><p>${UI.escape(error.message)}</p></div>`;
    }
  }
};

window.addEventListener("DOMContentLoaded", () => window.app.init());
