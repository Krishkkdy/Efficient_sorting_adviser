var comparisonCount = 0;
var swapCount = 0;
var barcom=0;
var barswap=0;

var container = document.getElementById("array");

function generateArray(inputArray) {
container.innerHTML = ""; // Clear previous content

inputArray.forEach((value, i) => {
    var array_ele = document.createElement("div");
    array_ele.classList.add("block");

    array_ele.style.height = '50px';
    array_ele.style.transform = `translate(${i}px)`;

    var array_ele_label = document.createElement("label");
    array_ele_label.classList.add("block_id");
    array_ele_label.innerText = value;

    array_ele.appendChild(array_ele_label);
    container.appendChild(array_ele);
});
}

function swap(el1, el2) {
return new Promise((resolve) => {
const temp = el1.innerText;
el1.innerText = el2.innerText;
el2.innerText = temp;

window.requestAnimationFrame(function () {
    setTimeout(() => {
        el1.style.backgroundColor = "#ffffff"; // Change color of el1 back to white
        el2.style.backgroundColor = "#ffffff"; // Change color of el2 back to white
        resolve();
    }, 500);
});
});
}


async function SelectionSort(inputArray, delay = 500) {
comparisonCount = 0;
    swapCount = 0;
generateArray(inputArray); // Generate blocks based on user input
var blocks = document.querySelectorAll(".block");


for (var i = 0; i < blocks.length - 1; i += 1) {
var minIndex = i;

blocks[i].style.backgroundColor = "rgb(255,255,0)"; // Highlight the current element being considered as the minimum

for (var j = i + 1; j < blocks.length; j += 1) {
    blocks[j].style.backgroundColor = "rgb(255,255,0)"; // Highlight the element being compared
        
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });

    var value1 = Number(blocks[j].innerText);
    var value2 = Number(blocks[minIndex].innerText);

    if (value1 < value2) {
        blocks[minIndex].style.backgroundColor = "#ffff"; // Reset color of the previous minimum
        minIndex = j;
    } else {
        blocks[j].style.backgroundColor = "#ffff"; // Reset color of the compared element
    }

    // Increment comparison counter
    comparisonCount++;
    document.getElementById('comparisonCounter').innerText = comparisonCount;
}

if (minIndex !== i) {
    await swap(blocks[i], blocks[minIndex]);
    // Increment swap counter
    swapCount++;
    document.getElementById('swapCounter').innerText = swapCount;
}

blocks[i].style.backgroundColor = "rgb(48, 240, 0)"; // Mark the sorted element
}

blocks[blocks.length - 1].style.backgroundColor = "rgb(48, 240, 0)"; // Last element sorted
}

//bars

async function delay(ms) {
return new Promise(resolve => setTimeout(resolve, 1000));
}

async function swapa(arr, i, j) {
await delay(100); // Adjust the speed of visualization
let temp = arr[i];
arr[i] = arr[j];
arr[j] = temp;
updateBars(arr);
// Increment bar swap counter
barswap++;
document.getElementById('barswap').innerText = barswap;
}

function updateBars(arr) {
const container = document.getElementById('container');
container.innerHTML = '';
var max = Math.max.apply(null, arr);
arr.forEach((num, index) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${num/max * 200}px`;
    const value = document.createElement('div');
    value.classList.add('value');
    value.textContent = num;
    bar.appendChild(value);
    container.appendChild(bar);
});
document.getElementById('barcom').innerText = barcom;
}

async function selectionSort(arr) {
barcom = 0;
barswap = 0;

const len = arr.length;
for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {

        if (arr[j] < arr[minIndex]) {
            minIndex = j;
        }
        // Increment bar comparison counter
        barcom++;
        document.getElementById('barcom').innerText = barcom;
    }
    if (minIndex !== i) {
        await swapa(arr, i, minIndex);
    }
}
}

async function start() {
const inputData = document.getElementById('inputArray').value;
if (inputData.length === 0) {
        alert('Please enter valid numbers separated by commas.');
        return;
    }
const arr = inputData.split(',').map(Number);
updateBars(arr);
selectionSort(arr);
}


function startSorting() {
    var userInput = document.getElementById("inputArray").value;
    if (userInput.length === 0) {
        alert('Please enter valid numbers separated by commas.');
        return;
    }
    var inputArray = userInput.split(",").map(Number); // Convert comma-separated string to array of numbers
    SelectionSort(inputArray);
}

function displayCode() {
    var language = document.getElementById("languageSelect").value;
    var codeTextArea = document.getElementById("codeDisplay");
    var code = "";

    if (language === "cpp-selection") {
        code = `    
        // C++ program for implementation of 
        // selection sort 
        #include <bits/stdc++.h> 
        using namespace std; 

        // Function for Selection sort 
        void selectionSort(int arr[], int n) 
        { 
            int i, j, min_idx; 

            // One by one move boundary of 
            // unsorted subarray 
            for (i = 0; i < n - 1; i++) { 

                // Find the minimum element in 
                // unsorted array 
                min_idx = i; 
                for (j = i + 1; j < n; j++) { 
                    if (arr[j] < arr[min_idx]) 
                        min_idx = j; 
                } 

                // Swap the found minimum element 
                // with the first element 
                if (min_idx != i) 
                    swap(arr[min_idx], arr[i]); 
            } 
        } 

        // Function to print an array 
        void printArray(int arr[], int size) 
        { 
            int i; 
            for (i = 0; i < size; i++) { 
                cout << arr[i] << " "; 
                cout << endl; 
            } 
        } 

        // Driver program 
        int main() 
        { 
            int arr[] = { 64, 25, 12, 22, 11 }; 
            int n = sizeof(arr) / sizeof(arr[0]); 

            // Function Call 
            selectionSort(arr, n); 
            cout << "Sorted array: \n"; 
            printArray(arr, n); 
            return 0; 
        } 

`;

    } else if (language === "c-selection") {
        code = `
        // C program for implementation of selection sort 
        #include <stdio.h> 

        void swap(int *xp, int *yp) 
        { 
            int temp = *xp; 
            *xp = *yp; 
            *yp = temp; 
        } 

        void selectionSort(int arr[], int n) 
        { 
            int i, j, min_idx; 

            // One by one move boundary of unsorted subarray 
            for (i = 0; i < n-1; i++) 
            { 
                // Find the minimum element in unsorted array 
                min_idx = i; 
                for (j = i+1; j < n; j++) 
                if (arr[j] < arr[min_idx]) 
                    min_idx = j; 

                // Swap the found minimum element with the first element 
                if(min_idx != i) 
                    swap(&arr[min_idx], &arr[i]); 
            } 
        } 

        /* Function to print an array */
        void printArray(int arr[], int size) 
        { 
            int i; 
            for (i=0; i < size; i++) 
                printf("%d ", arr[i]);  
        } 

        // Driver program to test above functions 
        int main() 
        { 
            int arr[] = {64, 25, 12, 22, 11}; 
            int n = sizeof(arr)/sizeof(arr[0]); 
            selectionSort(arr, n); 
            printf("Sorted array: "); 
            printArray(arr, n); 
            return 0; 
        } 

        `;

    } else if (language === "java-selection") {
        code = `
    // Java program for implementation of Selection Sort 
    import java.io.*; 
    public class SelectionSort 
    { 
        void sort(int arr[]) 
        { 
            int n = arr.length; 

            // One by one move boundary of unsorted subarray 
            for (int i = 0; i < n-1; i++) 
            { 
                // Find the minimum element in unsorted array 
                int min_idx = i; 
                for (int j = i+1; j < n; j++) 
                    if (arr[j] < arr[min_idx]) 
                        min_idx = j; 

                // Swap the found minimum element with the first 
                // element 
                int temp = arr[min_idx]; 
                arr[min_idx] = arr[i]; 
                arr[i] = temp; 
            } 
        } 

        // Prints the array 
        void printArray(int arr[]) 
        { 
            int n = arr.length; 
            for (int i=0; i<n; ++i) 
                System.out.print(arr[i]+" "); 
            System.out.println(); 
        } 

        // Driver code to test above 
        public static void main(String args[]) 
        { 
            SelectionSort ob = new SelectionSort(); 
            int arr[] = {64,25,12,22,11}; 
            ob.sort(arr); 
            System.out.println("Sorted array"); 
            ob.printArray(arr); 
        } 
    } 
        
        `;

    }   else if (language === "javascript-selection") {
        code = `
        // C program for implementation of selection sort 
        #include <stdio.h> 

        void swap(int *xp, int *yp) 
        { 
            int temp = *xp; 
            *xp = *yp; 
            *yp = temp; 
        } 

        void selectionSort(int arr[], int n) 
        { 
            int i, j, min_idx; 

            // One by one move boundary of unsorted subarray 
            for (i = 0; i < n-1; i++) 
            { 
                // Find the minimum element in unsorted array 
                min_idx = i; 
                for (j = i+1; j < n; j++) 
                if (arr[j] < arr[min_idx]) 
                    min_idx = j; 

                // Swap the found minimum element with the first element 
                if(min_idx != i) 
                    swap(&arr[min_idx], &arr[i]); 
            } 
        } 

        /* Function to print an array */
        void printArray(int arr[], int size) 
        { 
            int i; 
            for (i=0; i < size; i++) 
                printf("%d ", arr[i]);  
        } 

        // Driver program to test above functions 
        int main() 
        { 
            int arr[] = {64, 25, 12, 22, 11}; 
            int n = sizeof(arr)/sizeof(arr[0]); 
            selectionSort(arr, n); 
            printf("Sorted array: "); 
            printArray(arr, n); 
            return 0; 
        } 

        `;

    }
    codeTextArea.value = code;
}