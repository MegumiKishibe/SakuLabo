const initSakuraStudyPath = () => {
  const root = document.querySelector(".sakura-study-path");
  if (!root) return; 
  const MIN = 5, MAX = 10;

  const buttons = Array.from(root.querySelectorAll(".option-btn"));
  const countEl = root.querySelector("#count");
  const resultBtn = root.querySelector("#resultBtn");
  const resultEl = root.querySelector("#result");


  // タイプごとの表示内容（おすすめ勉強法）
  const RECS = {
    photo: {
      label: "視覚優位：写真（カメラアイ）タイプ",
      lead: "イメージとセットで覚えると強いタイプです。",
      tips: [
        "文字だけで覚えようとせず、図・写真・イラストを添える",
        "英単語は「意味をイラスト化」して記憶に定着させる",
        "ノートは“見て思い出せる”レイアウト（色分け・図解）にする"
      ]
    },
    "3d": {
      label: "視覚優位：三次元映像タイプ",
      lead: "空間・時間・状況と一緒に記憶すると強いタイプです。",
      tips: [
        "覚えた時の状況（場所・人・気温・出来事）とセットで思い出す",
        "動画・ストーリーで理解する（YouTube/解説動画など）",
        "歴史は年号だけでなく“その年の出来事・人物”と一緒に覚える"
      ]
    },
    lang_movie: {
      label: "言語優位：言語映像タイプ",
      lead: "文章をイメージ化して覚えるのが得意なタイプです。",
      tips: [
        "語呂合わせ＋情景イメージで覚える（場面を想像）",
        "英単語は“使う場面”を具体的にイメージする",
        "浮かんだイメージを一度絵にするとさらに定着しやすい"
      ]
    },
    lang_abstract: {
      label: "言語優位：言語抽象タイプ",
      lead: "情報を整理して“構造化”すると理解が深まるタイプです。",
      tips: [
        "図式化・相関図・時系列で整理してノートにまとめる",
        "英単語・漢字は繰り返し書いて定着させる",
        "コーネル式ノート術（メモ/キーワード/要約の3分割）を試す"
      ]
    },
    aud_lang: {
      label: "聴覚優位：聴覚言語タイプ",
      lead: "“耳から入れる学習”が最短ルートになりやすいタイプです。",
      tips: [
        "書くより“聞く回数”を増やして覚える（音で反復）",
        "映画・洋楽・シャドーイングなどで発音/リズムごと身につける",
        "通学・移動時間はリスニング教材で効率よく使う"
      ]
    },
    aud_sound: {
      label: "聴覚優位：聴覚＆音タイプ",
      lead: "リズム・抑揚・メロディー化で記憶が加速するタイプです。",
      tips: [
        "文章にリズムや抑揚をつけて読む/口ずさむ",
        "替え歌を作ってメロディーに乗せて覚える",
        "覚えやすい“キャッチーなメロディ”を見つけて反復する"
      ]
    }
  };

  const selected = new Set();

  const updateUI = () => {
    const n = selected.size;
    countEl.textContent = n;
    resultBtn.disabled = !(n >= MIN && n <= MAX);
  };

  // ボタンだけ反応（ボタン以外触っても何も起きない）
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const isOn = btn.classList.contains("is-selected");

      // 解除
      if (isOn) {
        btn.classList.remove("is-selected");
        selected.delete(btn);
        updateUI();
        return;
      }

      // 11個目は禁止（無視）
      if (selected.size >= MAX) return;

      // 追加
      btn.classList.add("is-selected");
      selected.add(btn);
      updateUI();
    });
  });

  // 結果表示
  resultBtn.addEventListener("click", () => {
    const tally = {};
    selected.forEach(btn => {
      const t = btn.dataset.type;      // data-type を使う想定
      tally[t] = (tally[t] || 0) + 1;
    });

    // 多い順に並べる
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    const bestScore = sorted[0]?.[1] || 0;
    const topTypes = sorted.filter(([, score]) => score === bestScore).map(([type]) => type);

    const renderOne = (type) => {
      const rec = RECS[type];
      if (!rec) return "";
      const tipsHtml = rec.tips.map(t => `<li>${t}</li>`).join("");
      return `
        <section class="result-block">
          <h2 class="result-title">${rec.label}</h2>
          <p class="result-lead">${rec.lead}</p>
          <h3 class="result-sub">おすすめの勉強法</h3>
          <ul class="result-list">${tipsHtml}</ul>
        </section>
      `;
    };

    const header =
      (topTypes.length >= 2)
        ? `<p class="result-note">判定：複合タイプ（同点）です。上位の特徴を組み合わせるのがおすすめです。</p>`
        : "";

    resultEl.style.display = "block";
    resultEl.innerHTML = `
      ${header}
      ${topTypes.map(renderOne).join("")}
      <p class="result-meta">選択数：${selected.size} / 10（結果反映：上位 ${bestScore} 件）</p>
    `;
  });

  updateUI();
};

document.addEventListener("turbo:load", initSakuraStudyPath);

