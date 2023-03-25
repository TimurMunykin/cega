const style = document.createElement('style');
style.textContent = `
  .gpt-emoji-suggester-popup {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    gap: 5px;
    z-index: 9999999;
  }
`;
document.head.appendChild(style);