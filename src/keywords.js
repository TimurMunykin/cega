// Retrieve the selected text from the background script
chrome.runtime.sendMessage({ command: "getSelectedText" }, (response) => {
  const selectedText = response.selectedText;
  const selectedTextInput = document.getElementById("selected-text");
  selectedTextInput.value = selectedText;
});

const nextButton = document.getElementById("next");
const selectedTextInput = document.getElementById("selected-text");
const keywordsInput = document.getElementById("keywords");

// Send the selected text and keywords to the background script when the "Next" button is clicked
nextButton.addEventListener("click", () => {
  const selectedText = selectedTextInput.value.trim();
  const keywords = keywordsInput.value.trim();

  if (selectedText.length === 0 || keywords.length === 0) {
    alert("Please enter some text and keywords.");
    return;
  }

  // Send a message to the background script with the selected text and keywords
  chrome.runtime.sendMessage({ command: "sendTextAndKeywords", selectedText, keywords }, () => {
    // Close the current tab when the message has been sent
    window.close();
  });
});
