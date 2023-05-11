const cors = require('cors');

// 定义翻译函数
async function translateText(text) {
  const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/translations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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",
    },
    body: JSON.stringify({
      model: "text-davinci-002",
      prompt: `Translate the following English text to Chinese: "${text}"`,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 1,
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

// 获取页面元素
const generateOutputButton = document.getElementById("generateOutputButton");
const customInput = document.getElementById("customInput");
const output = document.getElementById("output");

// 添加按钮点击事件监听器
generateOutputButton.addEventListener("click", async () => {
  const inputText = customInput.value;
  if (inputText) {
    const translatedText = await translateText(inputText);
    output.value = translatedText;
  } else {
    output.value = "请在输入框中输入要翻译的英文。";
  }
});