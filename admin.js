const admin = {
  config: Storage.load(),
  init() {
    const root = document.querySelector("#adminApp");
    root.innerHTML = `
      <div class="grid">
        <div class="card">
          <label>タイトル</label>
          <input id="title" value="${this.config.title}">
          <label>管理パスワード</label>
          <input id="pass" value="${this.config.password}">
        </div>
        <div id="stages"></div>
        <div class="row gap">
          <button id="save">保存</button>
          <button id="reset">初期化</button>
        </div>
      </div>
    `;
    const stagesEl = root.querySelector("#stages");
    stagesEl.innerHTML = this.config.stages.map((s, i) => `
      <div class="card">
        <label><input type="checkbox" data-k="enabled" data-i="${i}" ${s.enabled ? "checked" : ""}> 有効</label>
        <input data-k="name" data-i="${i}" value="${s.name}">
        <input data-k="timeLimit" data-i="${i}" type="number" value="${s.timeLimit}">
        <input data-k="tags" data-i="${i}" value="${s.tags.join(",")}">
        <textarea data-k="params" data-i="${i}">${JSON.stringify(s.params)}</textarea>
      </div>
    `).join("");

    root.querySelector("#save").onclick = () => {
      this.config.title = root.querySelector("#title").value;
      this.config.password = root.querySelector("#pass").value;
      [...root.querySelectorAll("[data-k]")].forEach(el => {
        const i = +el.dataset.i, k = el.dataset.k;
        if (k === "enabled") this.config.stages[i].enabled = el.checked;
        else if (k === "timeLimit") this.config.stages[i].timeLimit = +el.value;
        else if (k === "tags") this.config.stages[i].tags = el.value.split(",").map(v => v.trim()).filter(Boolean);
        else if (k === "name") this.config.stages[i].name = el.value;
        else if (k === "params") this.config.stages[i].params = JSON.parse(el.value);
      });
      Storage.save(this.config);
      alert("保存しました");
    };
    root.querySelector("#reset").onclick = () => {
      Storage.reset();
      location.reload();
    };
  }
};
window.addEventListener("DOMContentLoaded", () => admin.init());
