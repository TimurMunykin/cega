chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'fetchSelectedTextAndDisplayEmojis') {
    fetchSelectedTextAndDisplayEmojis();
  } else {
    proccesMessage(message.command);
  }
});

async function fetchSelectedTextAndDisplayEmojis() {
  const selectedText = window.getSelection().toString();

  if (selectedText) {

      const selectedText = window.getSelection().toString().trim();

      if (selectedText) {
        const language = (await chrome.storage.sync.get('language')).language || 'English';
        const apikey = (await chrome.storage.sync.get('apikey')).apikey;
        emojis = await fetchEmojiSuggestions(selectedText, language, apikey);
      }

    if (emojis) {
      displayEmojis(emojis);
    }
  }
}

async function proccesMessage(command) {
  const selectedText = window.getSelection().toString();

  if (selectedText) {

      const selectedText = window.getSelection().toString().trim();

      if (selectedText) {
        const language = (await chrome.storage.sync.get('language')).language || 'English';
        const apikey = (await chrome.storage.sync.get('apikey')).apikey;
        let prompt = '';
        switch (command) {
          case 'polite':
            prompt = `Given the text "${selectedText}" makes it more polite. Awnser in ${language}`
            break;
          case 'aggresive':
            prompt = `Given the text "${selectedText}" makes it more aggresive. Awnser in ${language}`
            break;
          case 'motivation':
            prompt = `Given the text "${selectedText}" makes it more motivated. Awnser in ${language}`
            break;
          case 'articleTitle':
            prompt = `Make a title for article:"${selectedText}". Awnser in ${language}`
            break;
          case 'summary':
            prompt = `Make summary for "${selectedText}". Awnser in ${language}`
            break;
          case 'sell':
            prompt = `Make this text more salesly: "${selectedText}". Awnser in ${language}`
            break;
          default:
            break;
        }
        const gptAnswer = await fetchProccesedMessage(apikey, prompt);
        showPopup(gptAnswer);
      }
  }
}

async function fetchProccesedMessage(apikey, prompt) {
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 500,
        n: 1,
        stop: null,
        temperature: 0.5
      })
    });

    const data = await response.json();
    const text = data.choices[0].text;

    return text;
  } catch (error) {
    console.error('Error fetching emoji suggestions:', error);
    return [];
  }
}

async function fetchEmojiSuggestions(text, language, apikey) {
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

  const prompt = `Given the text "${text}"suggest three emojis (unicode characters) that are related to the text, along with a brief explanation for each. Awnser in ${language}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 750,
        n: 1,
        stop: null,
        temperature: 0.5
      })
    });

    const data = await response.json();
    const completion = data.choices[0].text;
    const emojiInfo = completion.trim().split('\n').slice(0, 3).map(info => {
      const [emojiWithLabel, explanation] = info.split(': ');
      const emoji = emojiWithLabel.replace(/ *\([^)]*\) */, '');
      return { emoji, explanation };
    });

    return emojiInfo;
  } catch (error) {
    console.error('Error fetching emoji suggestions:', error);
    return [];
  }
}


function displayEmojis(emojiInfo) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const emojiPopup = document.createElement('div');
  emojiPopup.style.position = 'absolute';
  emojiPopup.style.top = `${rect.top + window.scrollY - 50}px`;
  emojiPopup.style.left = `${rect.left + window.scrollX}px`;
  emojiPopup.style.backgroundColor = '#ffffff';
  emojiPopup.style.border = '1px solid #cccccc';
  emojiPopup.style.borderRadius = '5px';
  emojiPopup.style.padding = '10px';
  emojiPopup.style.zIndex = '9999';
  emojiPopup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  emojiPopup.style.width = '300px';

  emojiInfo.forEach(({ emoji, explanation }) => {
    const emojiElement = document.createElement('span');
    emojiElement.textContent = emoji;
    emojiElement.style.fontSize = '14px';
    emojiElement.style.marginRight = '8px';

    const explanationElement = document.createElement('span');
    explanationElement.textContent = explanation;
    explanationElement.style.fontSize = '14px';

    const emojiContainer = document.createElement('div');
    emojiContainer.style.marginBottom = '5px';
    emojiContainer.appendChild(emojiElement);
    emojiContainer.appendChild(explanationElement);

    emojiPopup.appendChild(emojiContainer);
  });

  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '5px';
  closeButton.style.right = '5px';
  closeButton.style.border = 'none';
  closeButton.style.background = 'none';
  closeButton.style.fontSize =
    '18px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.padding = '0';
  closeButton.style.lineHeight = '1';
  closeButton.style.color = '#999999';
  closeButton.addEventListener('click', () => {
    emojiPopup.remove();
  });

  emojiPopup.appendChild(closeButton);
  document.body.appendChild(emojiPopup);
}


function showPopup(text) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const emojiPopup = document.createElement('div');
  emojiPopup.style.position = 'absolute';
  emojiPopup.style.top = `${rect.top + window.scrollY - 50}px`;
  emojiPopup.style.left = `${rect.left + window.scrollX}px`;
  emojiPopup.style.backgroundColor = '#ffffff';
  emojiPopup.style.border = '1px solid #cccccc';
  emojiPopup.style.borderRadius = '5px';
  emojiPopup.style.padding = '10px';
  emojiPopup.style.zIndex = '9999';
  emojiPopup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  emojiPopup.style.width = '500px';
  emojiPopup.textContent = text;

  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '5px';
  closeButton.style.right = '5px';
  closeButton.style.border = 'none';
  closeButton.style.background = 'none';
  closeButton.style.fontSize =
    '18px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.padding = '0';
  closeButton.style.lineHeight = '1';
  closeButton.style.color = '#999999';
  closeButton.addEventListener('click', () => {
    emojiPopup.remove();
  });

  emojiPopup.appendChild(closeButton);
  document.body.appendChild(emojiPopup);
}
