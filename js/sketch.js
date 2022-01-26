
let runButton; // run button object
let arr; // array to be sorted
let num_el = 40; // length of array
let running = false; // state of sorting
let sorted = false; // state of array
let sortIterator; // iterator of sorting algorithm

// usefull variable
let CANVAS_X_DIMENSION = 600;
let CANVAS_Y_DIMENSION = 600;
let MAX_EL = 100;
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
  runButton = createButton('Run');
  runButton.position(50, 10);
  runButton.mousePressed(StartSort);

  // Drop Down list : algorithm selection
  alg = createSelect();
  alg.position(100, 10);
  alg.option('Selection Sort');
  alg.option('Insertion Sort');
  alg.selected('Insertion Sort');

  // number of element
  let inp = createInput(str(num_el));
  inp.position(250, 10);
  inp.size(100);
  inp.input(myInputEvent);
}

function shuffleArray(array) {
    // randomize array to be sorted
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initilizeArray(){
  // generate an increasing array
  len = num_el; // number of element
  let array = [];
  for ( let i = 0; i< len; i++){
    array.push((1+i)* (CANVAS_Y_DIMENSION / num_el) );
  }
  shuffleArray(array);
  return array;
}

function drawRect(array, highlight = [] ){
  // Draw the rectangles of the array
  // if highlight is set (number) array[highlight] will be red
  leftPos = 0
  for (let i =0;i<array.length;i++){
    let c = color(255, 204, 0);
    if( highlight.includes(i)  ){
      c = color(255,0,0);
    }
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



function StartSort() {
  //InsertionSort(arr);
  if(sorted){
    arr = initilizeArray()
  }
  if( alg.value() == "Insertion Sort")
    iterator = InsertionSort(arr);
  if( alg.value() == "Selection Sort")
    iterator = SelectionSort(arr);
  running = true
}


function myInputEvent(){

  n = parseInt(this.value());

  if( n <2 || n >MAX_EL){
    fill(color(255, 0, 255));
    text('Please, insert a number between 2 and 50', 50, 50);
    num_el = 20
    return
  }

  num_el = n;
  el_width = CANVAS_X_DIMENSION/num_el;
  arr = initilizeArray();

}


function draw() {
  // this is the main loop function
  background(0); // draw black background
  yieldReturn = [];
  //if(!running)
  //  drawRect(arr);
  if(running){
    yieldReturn = iterator.next().value;
    if(yieldReturn === true){
      running = false;
      sorted = true;
      yieldReturn = []
    }
  }
  drawRect(arr, yieldReturn);
}
