chrome.runtime.onInstalled.addListener(() => {
  // Создаем основной пункт меню
  chrome.contextMenus.create({
    id: 'gpt-emoji-suggest-root',
    title: 'GPT Assistant',
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
  if (!tab) return;

  const tabId = tab.id;

  if (info.menuItemId === 'gpt-emoji-suggest-item1') {
    tabId && chrome.tabs.sendMessage(tabId, {command: 'fetchSelectedTextAndDisplayEmojis'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item2') {
    tabId && chrome.tabs.sendMessage(tabId, {command: 'polite'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item3') {
    tabId && chrome.tabs.sendMessage(tabId, {command: 'aggresive'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item4') {
    tabId && chrome.tabs.sendMessage(tabId, {command: 'motivation'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item5') {
    tabId && chrome.tabs.sendMessage(tabId, {command: 'articleTitle'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item6') {
    tabId && chrome.tabs.sendMessage(tabId, {command: 'summary'});
  } else if (info.menuItemId === 'gpt-emoji-suggest-item7') {
    tabId && chrome.tabs.sendMessage(tabId, {command: 'sell'});
  }
});

export {}