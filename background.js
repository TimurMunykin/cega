chrome.runtime.onInstalled.addListener(() => {
  // Создаем основной пункт меню
  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-root',
    title: 'ChatGPT Emoji Suggest',
    contexts: ['selection'],
  });

  // Создаем первый пункт подменю
  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item1',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Предложить эмодзи для выделенного текста',
    contexts: ['selection'],
  });

  // Создаем второй пункт подменю
  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item2',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Новая функция',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'gpt-emoji-suggest-item1') {
    chrome.tabs.sendMessage(tab.id, {command: 'fetchSelectedTextAndDisplayEmojis'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item2') {
    chrome.tabs.sendMessage(tab.id, {command: 'customNewFunction'});
  }
});
