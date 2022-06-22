var count = 0;
const countCharactersInTextView = (textView, countView, titleView) => {
  textView.addEventListener('input', () => {
    const text = textView.value;
    count = text.length;    
    countView.innerHTML = count;

    if(count > 280) {
      countView.classList.add('text-danger');
      titleView.classList.remove('hidden');
    } else {      
      countView.classList.remove('text-danger');
    }
  });
}