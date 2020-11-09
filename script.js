const textArea = document.querySelector('.text');
const keyboard = document.querySelector('.keyboard');
const letters = document.querySelectorAll('.keyboard__symbol--letter');
const backspace = document.querySelector('.keyboard__symbol--backspace');
const capsLock = document.querySelector('.keyboard__symbol--capslock');
const enter = document.querySelector('.keyboard__symbol--enter');
const space = document.querySelector('.keyboard__symbol--space');
const done = document.querySelector('.keyboard__symbol--done');
const regExp = /[0-9a-zA-Z.,?]/;

let isCapsLockActive = false;

keyboard.addEventListener('click', (e) => {
  const isOneSymbolClicked = e.target.textContent.length === 1;
  const isSymbol = regExp.test(e.target.textContent);

  if (isOneSymbolClicked && isSymbol) {
    textArea.value += e.target.textContent;
  }
});

backspace.addEventListener('click', () => {
  if (textArea.value.length > 0) {
    const str = textArea.value.split('');
    str.length -= 1;
    textArea.value = str.join('');
  }
});

capsLock.addEventListener('click', () => {
  if (isCapsLockActive) {
    for (let i = 0; i < letters.length; i += 1) {
      letters[i].textContent = letters[i].textContent.toLocaleLowerCase();
    }
    capsLock.style.color = '#ffffff';
    isCapsLockActive = false;
  } else {
    for (let i = 0; i < letters.length; i += 1) {
      letters[i].textContent = letters[i].textContent.toUpperCase();
    }
    capsLock.style.color = '#0e03aa';
    isCapsLockActive = true;
  }
});

enter.addEventListener('click', () => {
  textArea.value += '\n';
});

space.addEventListener('click', () => {
  textArea.value += ' ';
});

done.addEventListener('click', () => {
  keyboard.classList.remove('keyboard--active');
});

textArea.addEventListener('focus', () => {
  keyboard.classList.add('keyboard--active');
});
