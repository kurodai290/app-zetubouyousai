const Storage = {
  load() {
    return JSON.parse(localStorage.getItem("zetsubou_config") || "null") || structuredClone(window.DEFAULT_CONFIG);
  },
  save(config) {
    localStorage.setItem("zetsubou_config", JSON.stringify(config));
  },
  reset() {
    localStorage.removeItem("zetsubou_config");
  }
};
