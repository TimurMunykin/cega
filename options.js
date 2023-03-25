document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language');
    const apikey = document.getElementById('apikey');
    const saveButton = document.getElementById('save');
  
    // Загрузите сохраненный язык из хранилища и установите его в качестве выбранного значения
    chrome.storage.sync.get('language', (data) => {
      languageSelect.value = data.language || 'en';
    });

    chrome.storage.sync.get('apikey', (data) => {
      apikey.value = data.apikey || '';
    });
    
    // Сохраните выбранный язык в хранилище при нажатии кнопки "Сохранить"
    saveButton.addEventListener('click', () => {
      chrome.storage.sync.set({ language: languageSelect.value }, () => {
        alert('Language saved!');
      });
      chrome.storage.sync.set({ apikey: apikey.value }, () => {
        alert('api saved!');
      }); 
    });
  });
  