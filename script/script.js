const textarea = document.querySelector('textarea');
const output = document.querySelector('[data-output]');
const resetBtn = document.querySelector('[data-reset]');

class WordCounter {
  constructor(inputText) {
    this.inputText = inputText;
    this.inputText.addEventListener('input', () => {
      this.count();
    });
  }

  count() {
    const wordStat = this.getWordStatus(this.inputText.value.trim());
    this.emitEvent(wordStat);
  }

  getWordStatus(str) {
    const matches = str.match(/\S+/g);
    return {
      characters: str.replace(/\s+/g, '').length,
      words: matches ? matches.length : 0,
    };
  }

  emitEvent(wordStat) {
    const customEvent = new CustomEvent('count', {
      bubbles: true,
      cancelable: true,
      detail: {
        wordStat
      }
    });
    this.inputText.dispatchEvent(customEvent);
  }
}

const wordCounter = new WordCounter(textarea);

textarea.addEventListener('count', () => {
  output.innerHTML = `You've written <span style="font-weight:bold">${event.detail.wordStat.words} words </span> and <span style="font-weight:bold"> ${event.detail.wordStat.characters} characters</span>`;

  resetBtn.classList.add('active');
})

const placeholderLabel = document.querySelector('[data-placeholderLabel]');

textarea.addEventListener('focus', () => {
  placeholderLabel.classList.add('focus');
})

textarea.addEventListener('blur', () => {
  if (textarea.value == '') {
    placeholderLabel.classList.remove('focus');
  }
});

// reset Button
resetBtn.addEventListener('click', () => {
  textarea.value = '';
  output.innerHTML = 'You have 0 words and 0 characters';
  placeholderLabel.classList.remove('focus');
  resetBtn.classList.remove('active');
  
});