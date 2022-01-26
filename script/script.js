class WordCounter {
		constructor(inputText) {
				this.inputText = inputText;
				this.inputText.addEventListener('input', () => {
						this.count();
				});
		}
		
		count() {
				let wordStat = this.getWordStatus(this.inputText.value.trim());
				this.emitEvent(wordStat);
		}
		
		getWordStatus(str) {
				let matches = str.match(/\S+/g);
				return {
						characters: str.replace(/\s+/g, '').length,
						words: matches ? matches.length : 0,
				};
	}
		
	emitEvent(wordStat) {
				let customEvent = new CustomEvent('count', {
						bubbles: true,
						cancelable: true,
						detail: {
								wordStat
						}
				});
				this.inputText.dispatchEvent(customEvent);
		}
}

let textarea = document.querySelector('textarea');
let output = document.querySelector('[data-output]');

let textArea = new WordCounter(textarea);

 //to clear textarea
let resetBtn = document.createElement('button');

textarea.addEventListener('count', () => {
		output.innerHTML = `You've written <span style="font-weight:bold">${event.detail.wordStat.words} words </span> and <span style="font-weight:bold"> ${event.detail.wordStat.characters} characters</span>`;
		
		//reset Button
		resetBtn.innerHTML = 'Reset';
		resetBtn.addEventListener('click', () => {
				textarea.value = '';
		});
		 let txtDiv = document.querySelector('[data-txtDiv]');
			txtDiv.appendChild(resetBtn);
})
