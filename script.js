const textArea = document.querySelector('.text');
const keyboard = document.querySelector('.keyboard');
const letters = document.querySelectorAll('.keyboard__symbol--letter');
const backspace = document.querySelector('.keyboard__symbol--backspace');
const capsLock = document.querySelector('.keyboard__symbol--capslock');
const enter = document.querySelector('.keyboard__symbol--enter');
const space = document.querySelector('.keyboard__symbol--space');
const done = document.querySelector('.keyboard__symbol--done');
const buttons = document.querySelectorAll('.keyboard__symbol');
const regExp = /^[0-9a-zA-Z.,?]$/;

let isCapsLockActive = false;

keyboard.addEventListener('mousedown', (e) => {
  const activeInput = document.activeElement;
  const isOneSymbolClicked = e.target.textContent.length === 1;
  const isSymbol = regExp.test(e.target.textContent);

  if (isOneSymbolClicked) {
    e.target.classList.add('keyboard__symbol--clicked');
  }
  if (isOneSymbolClicked && isSymbol) {
    activeInput.value += e.target.textContent;
  }

  switch (e.target) {
    case backspace:
      if (textArea.value.length > 0) {
        const str = textArea.value.split('');
        str.length -= 1;
        textArea.value = str.join('');
      }
      break;
    case capsLock:
      if (isCapsLockActive) {
        for (let i = 0; i < letters.length; i += 1) {
          letters[i].textContent = letters[i].textContent.toLowerCase();
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
      break;
    case enter:
      textArea.value += '\n';
      break;
    case space:
      textArea.value += ' ';
      break;
    case done:
      keyboard.classList.remove('keyboard--active');
      textArea.blur();
      break;
    default:
  }

  e.preventDefault();
});

window.addEventListener('keydown', (e) => {
  e.preventDefault();
  const activeInput = document.activeElement;
  const button = document.querySelector(`div[data-key='${e.keyCode}']`);
  if (button) {
    button.classList.add('keyboard__symbol--clicked');
  }
  if (e.keyCode === 32) {
    activeInput.value += ' ';
  }
  if (e.keyCode === 13) {
    activeInput.value += '\n';
  }
  if (e.keyCode === 8) {
    if (activeInput.value.length > 0) {
      const str = activeInput.value.split('');
      str.length -= 1;
      activeInput.value = str.join('');
    }
  }
  if (regExp.test(e.key)) {
    activeInput.value += isCapsLockActive ? button.textContent.toUpperCase()
      : button.textContent.toLowerCase();
  }
});

buttons.forEach((button) => {
  button.addEventListener('transitionend', () => {
    button.classList.remove('keyboard__symbol--clicked');
  });
});

textArea.addEventListener('focus', () => {
  keyboard.classList.add('keyboard--active');
});

textArea.addEventListener('blur', () => {
  keyboard.classList.remove('keyboard--active');
});
