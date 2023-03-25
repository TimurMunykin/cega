chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'FETCH_EMOJIS') {
      const selectedText = window.getSelection().toString();
  
      if (selectedText) {
        sendResponse({ success: true, selectedText });
      } else {
        sendResponse({ success: false });
      }
    } else if (message.type === 'SHOW_EMOJIS') {
      showEmojiPopup(message.emojis);
    }
  });

  function showEmojiPopup(emojis) {
    const popup = document.createElement('div');
    popup.classList.add('emoji-popup');
    popup.innerHTML = emojis.join(' ');
  
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
  
    popup.style.position = 'fixed';
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.top = `${rect.top + window.scrollY - 40}px`;
  
    document.body.appendChild(popup);
  
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 10000);
  }
  
const emojiPopupStyles = `
  .emoji-popup {
    background-color: white;
    border: 1px solid black;
    border-radius: 4px;
    padding: 8px;
    font-size: 24px;
    z-index: 9999;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
`;

const styleElement = document.createElement('style');
styleElement.textContent = emojiPopupStyles;
document.head.appendChild(styleElement);
