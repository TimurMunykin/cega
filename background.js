chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest',
    title: 'Get Emoji Suggestions',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'gpt-emoji-suggest') {
    chrome.tabs.sendMessage(tab.id, { type: 'FETCH_EMOJIS' }, (response) => {
      if (response.success) {
        fetchEmojiSuggestions(response.selectedText).then((emojis) => {
          chrome.tabs.sendMessage(tab.id, { type: 'SHOW_EMOJIS', emojis });
        });
      }
    });
  }
});

// async function fetchEmojiSuggestions(text) {
//   return Promise.resolve([
//     '🔄 Counterclockwise Arrows Emoji: Represents the updating process, which is relevant to auto-updating options in request forms.',
// '⚙️ Gear Emoji: Symbolizes settings or configuration, which can relate to the automatic update options in the RF editor.',
// '🤖 Robot Emoji: Indicates automation or an automated process, reflecting the automatic update of options when custom field values change.'
//   ]);
//   // Здесь вы будете делать запрос к вашему API ChatGPT для получения эмодзи
//   // Верните промис с массивом из 3-х эмодзи
// }

async function fetchEmojiSuggestions(text) {
  const apiKey = ''; // Замените на ваш API-ключ
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: `Given the text "${text}", suggest three emojis (unicode characters) that are related to the text.`,
        max_tokens: 20,
        n: 1,
        stop: null,
        temperature: 0.5
      })
    });

    const data = await response.json();
    const completion = data.choices[0].text;
    const emojis = completion.trim().split(' ').slice(0, 3);

    return emojis;
  } catch (error) {
    console.error('Error fetching emoji suggestions:', error);
    return [];
  }
}
