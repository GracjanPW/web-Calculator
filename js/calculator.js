var total;
var calc = document.getElementById('calc');
var entry = document.getElementById('entry');
var buttons = document.getElementsByTagName('button');
var newEntry = false;
var newCalc = false;
var calcList = [];

entry.innerHTML = '0';

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', (event) => {
    switch (button.className) {
      case 'clean':
        console.log(1)
        clean();
        break;
      case 'delete':
        console.log(2)
        backspace();
        break;
      case 'clear':
        clear()
        break;
      case 'num':
        console.log(3)
        number(button.innerHTML);
        break;
      case 'oper':
        console.log(4)
        operator(button.innerHTML);
        break;
      case 'equal':
        equals();
        break;
      case 'flip':
        flip();
        break;
      case 'decimal':
        decimal();
        break;
      default:
        console.log(button.innerHTML)
    };
  });
});
function decimal() {
  if (newCalc) {
    clear();
    entry.innerHTML = '0.';
  } else if (!entry.innerHTML.includes('.')){
    entry.innerHTML += '.';
  }
}
function flip(){
  if (entry.innerHTML.includes('-')){
    entry.innerHTML = entry.innerHTML.slice(1, entry.innerHTML.length);
  } else {
    if (entry.innerHTML != '0'){
      entry.innerHTML = '-'+String(entry.innerHTML);
    }
  };
};

function clean() {
  entry.innerHTML = '0';
}
function backspace() {
  var len = entry.innerHTML.length
  
  if (len === 2 && entry.innerHTML.includes('-')){
    entry.innerHTML = '0'
  } else if (len===1){
    entry.innerHTML = '0'
  } else {
    entry.innerHTML = entry.innerHTML.slice(0,len-1);
  };
};
function number(num){
  if (newCalc) {
    clear();
  };
  if (isNaN(calcList.slice(calcList.length-1,calcList.length).join('')) && newEntry) {
    newEntry = false
    entry.innerHTML = num;
  } else {
    if (entry.innerHTML === '0') {
        entry.innerHTML = num;
    } else {
        entry.innerHTML += num;
    };
  };
};
function operator(oper) {
  if (calc.innerHTML.includes('=')) {
    calcList = [];
    newCalc = false;
    
  }
  if (!newEntry){
    newEntry = true
    calcList.push(eval(entry.innerHTML))
    calcList.push(oper)
    calc.innerHTML = calcList.join('');
    getTotal()
    console.log(total)
    entry.innerHTML = String(total)
  } else {
    calcList.pop()
    calcList.push(oper)
    calc.innerHTML = calcList.join('')
  }
};
function getTotal(){
  if (isNaN(calcList.slice(calcList.length-1,calcList.length))) {
    total = eval(calcList.slice(0,calcList.length-1).join(''));
  } else {
    total = eval(calcList.join(''));
  }
}
function clear(){
  entry.innerHTML = '0';
  calc.innerHTML = '';
  calcList = [];
  delete total;
  var total;
  newCalc = false;

};
function equals(){
  if (calc.innerHTML.includes('=')) {
    if (calcList.length ===1){
      calc.innerHTML = String(calcList.join(''))+'=';
    } else {
      var a = calcList.pop();
      var b = calcList.pop();
      calcList = [eval(entry.innerHTML),b,a]
    };
  } else {
    calcList.push(eval(entry.innerHTML));
  }
  newCalc = true;
  calc.innerHTML = String(calcList.join(''))+'=';
  getTotal();
  entry.innerHTML = total;
};