window.DEFAULT_CONFIG = {
  title: "絶望要塞 Web",
  password: "admin",
  stages: [
    {
      id: "reflex",
      name: "反射神経ゲート",
      enabled: true,
      timeLimit: 10,
      tags: ["reaction", "easy"],
      params: { targetDelayMin: 1000, targetDelayMax: 3500 }
    },
    {
      id: "memory",
      name: "記憶配列室",
      enabled: true,
      timeLimit: 30,
      tags: ["memory", "medium"],
      params: { size: 3 }
    },
    {
      id: "maze",
      name: "回避迷路",
      enabled: true,
      timeLimit: 25,
      tags: ["maze", "medium"],
      params: { width: 12, height: 8, wallRate: 0.22 }
    },
    {
      id: "timing",
      name: "停止タイミング",
      enabled: true,
      timeLimit: 20,
      tags: ["timing", "hard"],
      params: { targetMin: 30, targetMax: 70 }
    },
    {
      id: "physics",
      name: "物理搬送区画",
      enabled: true,
      timeLimit: 35,
      tags: ["physics", "hard"],
      params: { blocks: 5 }
    }
  ]
};
