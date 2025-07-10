const galMap = {
    "あ": "了",
    "い": "ﾚヽ",
    "う": "宀",
    "え": "之",
    "お": "よゝ",
    "か": "ｶゝ",
    "き": "(ｷ",
    "く": "〈",
    "け": "ﾚ†",
    "こ": "⊇",
    "さ": "(十",
    "し": "Ｕ",
    "す": "￡",
    "せ": "世",
    "そ": "ξ",
    "た": "†ﾆ",
    "ち": "干",
    "つ": "⊃",
    "て": "〒",
    "と": "`⊂",
    "な": "ナょ",
    "に": "しニ",
    "ぬ": "又",
    "ね": "Йё",
    "の": "σ",
    "は": "しよ",
    "ひ": "μ",
    "ふ": " ,3､",
    "へ": "∧",
    "ほ": "しま",
    "ま": "ма",
    "み": "ゐ",
    "む": "￡",
    "め": "мё",
    "も": "м○",
    "や": "ゃ",
    "ゆ": "ゅ",
    "よ": "ょ",
    "ら": "Яа",
    "り": "L|",
    "る": "ゑ",
    "れ": "Яё",
    "ろ": "З",
    "わ": "ш",
    "を": "ヲ",
    "ん": "ω",
    // 濁音
    "が": "ヵヽ”",
    "ぎ": "	(‡”",
    "ぐ": "＜”",
    "げ": "(†゛",
    "ご": "⊇”",
    "ざ": "±”",
    "じ": "∪”",
    "ず": "	￡”",
    "ぜ": "世”",
    "ぞ": "ζ゛",
    "だ": "ﾅﾆ”",
    "ぢ": "千”",
    "づ": "⊃”",
    "で": "〒゛",
    "ど": "ヽ⊂゛",
    "ば": "	(よ”",
    "び": "μ”",
    "ぶ": " ,3､”",
    "べ": "∧”",
    "ぼ": "(ま”",
    // 半濁音
    "ぱ": "	(ょﾟ",
    "ぴ": "μ○",
    "ぷ": ",3､○",
    "ぺ": "∧○",
    "ぽ": "(ま○"
};

function convertToGalmoji(input) {
  let result = "";

  // 小文字を大文字に変換（ゃ→や、っ→つ など）
  const smallToNormalMap = {
    "ぁ": "あ", "ぃ": "い", "ぅ": "う", "ぇ": "え", "ぉ": "お",
    "ゃ": "や", "ゅ": "ゆ", "ょ": "よ", "っ": "つ",
    "ゎ": "わ", "ゕ": "か", "ゖ": "け"
  };

  for (let char of input) {
    // 小文字を変換
    if (smallToNormalMap[char]) {
      char = smallToNormalMap[char];
    }

    // カタカナ→ひらがな変換（Unicodeを活用）
    if (char >= "ァ" && char <= "ヶ") {
      char = String.fromCharCode(char.charCodeAt(0) - 0x60);
    }

    result += galMap[char] || char;
  }

  return result;
}

document.getElementById("convert-btn").addEventListener("click", () => {
  const input = document.getElementById("input-text").value;
  const outputElement = document.getElementById("output-text");
  convertToGalmojiAnimated(input, outputElement);
});


function convertToGalmojiAnimated(input, outputElement, delay = 50) {
  const galmoji = convertToGalmoji(input);
  outputElement.textContent = "";

  let index = 0;

  function typeNextChar() {
    if (index < galmoji.length) {
      outputElement.textContent += galmoji[index];
      index++;
      setTimeout(typeNextChar, delay);
    }
  }

  typeNextChar();
}


document.getElementById("copy-btn").addEventListener("click", () => {
  const output = document.getElementById("output-text").textContent;
  if (!output) return alert("まず文字を変換してね！");

  navigator.clipboard.writeText(output)
    .then(() => {
      alert("ギャル文字をコピーしたよ💖✨");
    })
    .catch(err => {
      alert("コピーに失敗しちゃった🥲");
      console.error(err);
    });
});