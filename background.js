chrome.runtime.onInstalled.addListener(() => {
  // Создаем основной пункт меню
  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-root',
    title: ' GPT Assistant',
    contexts: ['selection'],
  });

  // Создаем первый пункт подменю
  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item1',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Emoji для текста',
    contexts: ['selection'],
  });

  // Создаем второй пункт подменю
  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item2',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Веждивый текст',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item3',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Агресивный текст',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item4',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Мотивирующий текст',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item5',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Название для статьи',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item6',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Краткое описание',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-item7',
    parentId: 'gpt-emoji-suggest-root',
    title: 'Продающий текст',
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
  } else if (info.menuItemId === 'gpt-emoji-suggest-item7') {
    chrome.tabs.sendMessage(tab.id, {command: 'sell'});
  }
});
