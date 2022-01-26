

function* InsertionSort(array){
  // Basic idea:
  // Take the first 2 elements. Are they sorted?
  // If no sort them.
  // Take the first 3 elements.  Is the 3rd in the right position?
  // If no move it to the left until it is.
  // Take the first 4 elements.  Is the 4th in the right position?
  // If no move it to the left until it is.
  // Iterate for all n elements.
  let t;
  for (let i=1; i<array.length; i++){
    if (array[i] < array[i-1] ){
      for(let j = i; array[j]< array[j-1] ;j--){
        console.log(array);
        console.log("swapping "+array[j]+" "+array[j-1]);
        t = array[j];
        array[j] = array[j-1];
        array[j-1] = t;
        yield [j-1];
      }
    }
  }
  return true
}

function* SelectionSort(array){
  let t = 0;
  let min, minIndex;
  for (let i=0; i<array.length ;i++){
    min = array[i];
    minIndex = i;
    for (let j = i; j<array.length; j++){
      if( min > array[j]){
        min = array[j]
        minIndex = j;
      }
      yield [minIndex, j];
    }
    t = array[i];
    array[i] = min;
    array[minIndex] = t;
    yield [minIndex];

  }
  return true
}
