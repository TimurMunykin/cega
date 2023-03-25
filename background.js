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
    title: 'Сделать текст более вежливым',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item3',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Сделать текст более агресивным',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item4',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Сделать текст более мотивирующим',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item5',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Сделать название для статьи',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item6',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Краткое описание текста',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'gpt-emoji-suggest-item1') {
    chrome.tabs.sendMessage(tab.id, {command: 'fetchSelectedTextAndDisplayEmojis'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item2') {
    chrome.tabs.sendMessage(tab.id, {command: 'polite'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item3') {
    chrome.tabs.sendMessage(tab.id, {command: 'aggresive'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item4') {
    chrome.tabs.sendMessage(tab.id, {command: 'motivation'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item5') {
    chrome.tabs.sendMessage(tab.id, {command: 'articleTitle'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item6') {
    chrome.tabs.sendMessage(tab.id, {command: 'summary'});
  }
});
