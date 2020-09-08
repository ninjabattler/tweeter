$(document).ready(function() {

  $('textarea').on('keydown', function() {
    const counters = document.getElementsByClassName('counter');
    const charsLeft = 140 - (this.value.length)
    for(let counter of counters){ 
      counter.innerHTML = charsLeft;
      if(charsLeft < 0){
        counter.className = 'counter overLimit';
      } else {
        counter.className = 'counter'
      } 
    }
  });
  
});