window.UI = {
  log(el, msg) { el.textContent += msg + "\n"; },
  clear(el) { el.textContent = ""; },
  escape(s) {
    return String(s).replace(/[&<>"']/g, m => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[m]));
  }
};
