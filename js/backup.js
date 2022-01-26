
let button;
let sel;
let arr;
let num_el = 20; //default
let running = false;

let CANVAS_X_DIMENSION = 500;
let CANVAS_Y_DIMENSION = 500;
let el_width = CANVAS_X_DIMENSION/num_el;

function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function buildPage(){
  background(0);
  // run button
  button = createButton('Run');
  button.position(50, 10);
  button.mousePressed(StartSort);

  // Drop Down list : algorithm selection
  alg = createSelect();
  alg.position(100, 10);
  alg.option('Bubble Sort');
  alg.option('Insertion Sort');
  alg.selected('Insertion Sort');



  // number of element
  let inp = createInput(str(num_el));
  inp.position(250, 10);
  inp.size(100);
  inp.input(myInputEvent);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initilizeArray(){
  len = num_el; // numero di elementi
  let array = [];
  for ( let i = 0; i< len; i++){
    array.push((1+i)*10);
  }
  shuffleArray(array);
  return array;
}

function drawRect(array){
  // rect(30, 20, 55, 55); # location dimension
  leftPos = 0
  for (let i =0;i<array.length;i++){
    let c = color(255, 204, 0);
    fill(c);
    rect(leftPos, CANVAS_Y_DIMENSION-array[i],el_width, array[i] );
    leftPos+=el_width;
  }

}

function setup() {
  createCanvas( CANVAS_X_DIMENSION, CANVAS_Y_DIMENSION);
  buildPage();
  arr = initilizeArray();
  drawRect(arr);


}




function draw() {
  background(0);
  drawRect(arr)

  if(running){
    let iterator = InsertionSortStep(arr)
    if(iterator.next().done){
      running = false;
    }
  }
}

function StartSort() {
  text('It is a ' + alg.value() + '!', 50, 50);
  //InsertionSort(arr);

  running = true
}


function myInputEvent(){



  n = parseInt(this.value());

  if( n <2 || n >50){
    fill(color(255, 0, 255));
    text('Please, insert a number between 2 and 50', 50, 50);
    num_el = 20
    return
  }

  //text(':' +typeof(n)+' '+n, 50, 50);

  num_el = n;
  el_width = CANVAS_X_DIMENSION/num_el;
  arr = initilizeArray();

}
