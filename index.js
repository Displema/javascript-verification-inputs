const form = document.querySelector('[name="verify"]');
const inputs = form.querySelectorAll('.inputs input');
const button = document.querySelector('[type="submit"]');

window.onload = function() {
  form.reset()
}

function checkCode() {
  let key = ""
  inputs.forEach(input => {
    key += input.value.toString()
  })
  if (key == "123456") {
    alert('Access granted')
  } else {
    alert('Try again')
    location.reload()
  }
}
function handleBackspace(e) {
  // support for backspacing from 1 input to another
  const key = e.key
  const input = e.target
  if(key === "Backspace" && input.previousElementSibling) {
    input.previousElementSibling.select()
  }
}

function submitCode(e) {
  // Auto submit the form if all fields are filled after a paste
  inputs.forEach( (input) => {
    if(!input.value) {
      return false
    }
  })
  button.click()
}

function selectText(e) {
  // select the text when the next input is focused
  const input = e.target
  input.nextElementSibling && input.nextElementSibling.value ? input.nextElementSibling.select() : ''
}

function handleInput(e) {
  // check for data that was inputtted and if there is a next input, focus it
  const input = e.target;
  if (input.nextElementSibling && input.value) {
    input.nextElementSibling.focus();
  }
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text');
  // loop over each input, and populate with the index of that string
  inputs.forEach((input, i) => {
    console.log(input);
    input.value = paste[i] || '';
  });
}

inputs[0].addEventListener('paste', handlePaste);
inputs[5].addEventListener('input', submitCode)
form.addEventListener('input', handleInput);
form.addEventListener('input', selectText)
inputs.forEach((input) => {
  input.addEventListener('keydown', handleBackspace)
})
