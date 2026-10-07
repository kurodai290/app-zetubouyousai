const Storage = {
  load() {
    try {
      const saved = localStorage.getItem("zetsubou_config");
      if (!saved) return structuredClone(window.DEFAULT_CONFIG);
      const config = JSON.parse(saved);
      if (!config || !Array.isArray(config.stages)) throw new Error("設定データが壊れています。");
      return config;
    } catch (error) {
      console.warn("保存された設定を読み込めなかったため、初期設定を使用します。", error);
      localStorage.removeItem("zetsubou_config");
      return structuredClone(window.DEFAULT_CONFIG);
    }
  },
  save(config) {
    localStorage.setItem("zetsubou_config", JSON.stringify(config));
  },
  reset() {
    localStorage.removeItem("zetsubou_config");
  }
};
