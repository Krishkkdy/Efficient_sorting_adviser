function sortNumbers() {
    const inputNumbers = document.getElementById('inputArray').value;
    const numbersArray = inputNumbers.split(',').map(Number);

    // Sort using Bubble Sort
    const [bubbleSorted, bubbleComparisons, bubbleswaps] = bubbleSort([...numbersArray]);

    // Sort using Selection Sort
    const [selectionSorted, selectionComparisons, selectionswaps] = selectionSort([...numbersArray]);

    // Sort using Insertion Sort
    const [insertionSorted, insertionComparisons, insertionswaps] = insertionSort([...numbersArray]);

    // Sort using Quick Sort
    const [quickSorted, quickComparisons, quickdivide, quickcombine] = quickSort([...numbersArray]);


    let mostEfficient = 'Bubble Sort';
      let minComparisons = bubbleComparisons;
      let minswaps = bubbleswaps;
      if (selectionswaps < minswaps) {
          mostEfficient = 'Selection Sort';
          minswaps = selectionswaps;
      }
      if (insertionswaps < minswaps) {
          mostEfficient = 'Insertion Sort';
          minswaps = insertionswaps;
      }

      


      document.getElementById('minComparisons').innerText = `${minComparisons}`;
      document.getElementById('minswaps').innerText = `${minswaps}`;
      document.getElementById('mostEfficient').innerText = ` ${mostEfficient}`;


    // Display sorted numbers and comparisons
    document.getElementById('bubble').innerHTML = bubbleSorted;
    document.getElementById('bubbleComparisons').innerText = bubbleComparisons;
    document.getElementById('bubbleswaps').innerText = bubbleswaps;

    document.getElementById('selection').innerHTML = selectionSorted;
    document.getElementById('selectionComparisons').innerText = selectionComparisons;
    document.getElementById('selectionswaps').innerText = selectionswaps;
    

    document.getElementById('insertion').innerHTML = insertionSorted;
    document.getElementById('insertionComparisons').innerText = insertionComparisons;
    document.getElementById('insertionswaps').innerText = insertionswaps;

    document.getElementById('quick').innerHTML = quickSorted;
    document.getElementById('quickComparisons').innerText = quickComparisons;
    document.getElementById('quickdivide').innerText = quickdivide;
    document.getElementById('quickcombine').innerText = quickcombine;
  }

  function bubbleSort(arr) {
    let comparisons = 0;
    let swap = 0;
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if (arr[j] > arr[j + 1]) {
          swap++;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return [arr, comparisons, swap];
  }

  function selectionSort(arr) {
    let comparisons = 0;
    let swap = 0;
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
          swap++;
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
    return [arr, comparisons, swap];
  }

  function insertionSort(arr) {
    let comparisons = 0;
    let swap = 0;
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      let current = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > current) {
        comparisons++;
        swap++;
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return [arr, comparisons,swap];
  }

  function quickSort(arr) {
    let comparisons = 0;
    let divide = 0;
    let combine = 0;
    if (arr.length <= 1) {
      return [arr, comparisons];
    }
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
      comparisons++;
      divide++;
      combine++;
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    const sortedLeft = quickSort(left);

    const sortedRight = quickSort(right);
    return [sortedLeft[0].concat(pivot, sortedRight[0]), comparisons + sortedLeft[1] + sortedRight[1], divide, combine];
  }