let divideCounter = 0;
        let combineCounter = 0;
        let divider = 0;
        let combiner = 0;
        // Function to parse user input into an array of numbers
        function parseInput() {
            const input = document.getElementById('inputArray').value;
            const numbers = input.split(',').map(num => parseInt(num.trim(), 10));
            return numbers.filter(num => !isNaN(num));
        }

        // Create bars representing numbers with value text inside
        const barsContainer = document.getElementById('barsContainer');

        async function mergeSort(arr, start = 0, end = arr.length - 1) {
            
            
            if (start >= end) return;
            const mid = Math.floor((start + end) / 2);
            await mergeSort(arr, start, mid);
            await mergeSort(arr, mid + 1, end);
            divideCounter++;
            document.getElementById('divideCounter').innerText = divideCounter;
            await merge(arr, start, mid, end);
            
        }

        async function merge(arr, start, mid, end) {
            const left = arr.slice(start, mid + 1);
            const right = arr.slice(mid + 1, end + 1);
            let i = 0, j = 0, k = start;
            combineCounter++;
            document.getElementById('combineCounter').innerText = combineCounter;
            while (i < left.length && j < right.length) {
                if (left[i] <= right[j]) {
                    arr[k++] = left[i++];
                } else {
                    arr[k++] = right[j++];
                }
                await updateBars(arr, start, end, k - 1);
            }
            while (i < left.length) {
                arr[k++] = left[i++];
                await updateBars(arr, start, end, k - 1);
            }
            while (j < right.length) {
                arr[k++] = right[j++];
                await updateBars(arr, start, end, k - 1);
            }
        }

        async function updateBars(arr, start, end, pivot) {
            const bars = document.querySelectorAll('.bar');
            for (let i = start; i <= end; i++) {
                bars[i].style.height = `${arr[i] * 20}px`;
                bars[i].innerHTML = `<div class="value">${arr[i]}</div>`;
                if (i === pivot) {
                    bars[i].classList.add('pivot');
                } else {
                    bars[i].classList.remove('pivot');
                }
            }
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
        }

        async function startMergeSort() {
            const numbers = parseInput(); // Get numbers from user input
            if (numbers.length === 0) {
                alert('Please enter valid numbers separated by commas.');
                return;
            }
            
            document.getElementById('divideCounter').innerText = divideCounter;
            document.getElementById('combineCounter').innerText = combineCounter;

            barsContainer.innerHTML = ''; // Clear previous bars
            numbers.forEach(num => {
                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = `${num * 20}px`;
                barsContainer.appendChild(bar);
            });
            
            await mergeSort(numbers);
            
            
            
        }
        



        async function mergeSortRecursive(arr, left, right) {
            if (left >= right) {
                return;
            }

            const mid = Math.floor((left + right) / 2);
            await mergeSortRecursive(arr, left, mid);
            await mergeSortRecursive(arr, mid + 1, right);
            divider++;
            document.getElementById('divider').innerText = divider;
            await mergearray(arr, left, mid, right);
            
        }


        function delayExecution(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function mergearray(arr, left, mid, right) {
            const leftArray = arr.slice(left, mid + 1);
            const rightArray = arr.slice(mid + 1, right + 1);
            let i = 0,
                j = 0,
                k = left;
            combiner++;
            document.getElementById('combiner').innerText = combiner;
            while (i < leftArray.length && j < rightArray.length) {
                
                const leftIndex = left + i;
                const rightIndex = mid + 1 + j;

                const leftCell = document.querySelector(`#arrayContainer .array-cell:nth-child(${leftIndex + 1})`);
                const rightCell = document.querySelector(`#arrayContainer .array-cell:nth-child(${rightIndex + 1})`);

                leftCell.classList.add('highlight');
                rightCell.classList.add('highlight');

                await delayExecution(1000);

                if (leftArray[i] <= rightArray[j]) {
                    arr[k++] = leftArray[i++];
                } else {
                    arr[k++] = rightArray[j++];
                }

                visualizeArray();

                
                leftCell.classList.remove('highlight');
                rightCell.classList.remove('highlight');
            }

            while (i < leftArray.length) {
                arr[k++] = leftArray[i++];
                visualizeArray();
            }

            while (j < rightArray.length) {
                arr[k++] = rightArray[j++];
                visualizeArray();
            }

            await delayExecution(1000);

            for (let m = left; m <= right; m++) {
                const sortedCell = document.querySelector(`#arrayContainer .array-cell:nth-child(${m + 1})`);
                sortedCell.classList.add('sorted');
            }
        }


        function visualizeArray() {
            let arrayContainer = document.getElementById('arrayContainer');
            arrayContainer.innerHTML = '';

            array.forEach((value) => {
                let cell = document.createElement('div');
                cell.textContent = value;
                cell.classList.add('array-cell');
                arrayContainer.appendChild(cell);
            });
        }

        
        function startSort() {
            const input = document.getElementById('inputArray').value;
            if (input.length === 0) {
                alert('Please enter valid numbers separated by commas.');
                return;
            }
            array = input.split(',').map(Number); // Convert input string to array of numbers
            
            Sort(); // Start merge sort with user input data
        }


        async function Sort() {
            visualizeArray(); // Display the initial array
            document.getElementById('divider').innerText = divider;
            document.getElementById('combiner').innerText = combiner;
            await mergeSortRecursive(array, 0, array.length - 1);
        }
        

        function displayCode() {
            var language = document.getElementById("languageSelect").value;
            var codeTextArea = document.getElementById("codeDisplay");
            var code = "";
        
            if (language === "cpp-merge") {
                code = `    
        //C++ program for Merge Sort
        #include <bits/stdc++.h>
        using namespace std;

        // Merges two subarrays of array[].
        // First subarray is arr[begin..mid]
        // Second subarray is arr[mid+1..end]
        void merge(int array[], int const left, int const mid,
                int const right)
        {
            int const subArrayOne = mid - left + 1;
            int const subArrayTwo = right - mid;

            // Create temp arrays
            auto *leftArray = new int[subArrayOne],
                *rightArray = new int[subArrayTwo];

            // Copy data to temp arrays leftArray[] and rightArray[]
            for (auto i = 0; i < subArrayOne; i++)
                leftArray[i] = array[left + i];
            for (auto j = 0; j < subArrayTwo; j++)
                rightArray[j] = array[mid + 1 + j];

            auto indexOfSubArrayOne = 0, indexOfSubArrayTwo = 0;
            int indexOfMergedArray = left;

            // Merge the temp arrays back into array[left..right]
            while (indexOfSubArrayOne < subArrayOne
                && indexOfSubArrayTwo < subArrayTwo) {
                if (leftArray[indexOfSubArrayOne]
                    <= rightArray[indexOfSubArrayTwo]) {
                    array[indexOfMergedArray]
                        = leftArray[indexOfSubArrayOne];
                    indexOfSubArrayOne++;
                }
                else {
                    array[indexOfMergedArray]
                        = rightArray[indexOfSubArrayTwo];
                    indexOfSubArrayTwo++;
                }
                indexOfMergedArray++;
            }

            // Copy the remaining elements of
            // left[], if there are any
            while (indexOfSubArrayOne < subArrayOne) {
                array[indexOfMergedArray]
                    = leftArray[indexOfSubArrayOne];
                indexOfSubArrayOne++;
                indexOfMergedArray++;
            }

            // Copy the remaining elements of
            // right[], if there are any
            while (indexOfSubArrayTwo < subArrayTwo) {
                array[indexOfMergedArray]
                    = rightArray[indexOfSubArrayTwo];
                indexOfSubArrayTwo++;
                indexOfMergedArray++;
            }
            delete[] leftArray;
            delete[] rightArray;
        }

        // begin is for left index and end is right index
        // of the sub-array of arr to be sorted
        void mergeSort(int array[], int const begin, int const end)
        {
            if (begin >= end)
                return;

            int mid = begin + (end - begin) / 2;
            mergeSort(array, begin, mid);
            mergeSort(array, mid + 1, end);
            merge(array, begin, mid, end);
        }

        // UTILITY FUNCTIONS
        // Function to print an array
        void printArray(int A[], int size)
        {
            for (int i = 0; i < size; i++)
                cout << A[i] << " ";
            cout << endl;
        }

        // Driver code
        int main()
        {
            int arr[] = { 12, 11, 13, 5, 6, 7 };
            int arr_size = sizeof(arr) / sizeof(arr[0]);

            cout << "Given array is ";
            printArray(arr, arr_size);

            mergeSort(arr, 0, arr_size - 1);

            cout << "Sorted array is ";
            printArray(arr, arr_size);
            return 0;
        }
`;
        
            } else if (language === "c-merge") {
                code = `        
        // C program for Merge Sort
        #include <stdio.h>
        #include <stdlib.h>

        // Merges two subarrays of arr[].
        // First subarray is arr[l..m]
        // Second subarray is arr[m+1..r]
        void merge(int arr[], int l, int m, int r)
        {
            int i, j, k;
            int n1 = m - l + 1;
            int n2 = r - m;

            // Create temp arrays
            int L[n1], R[n2];

            // Copy data to temp arrays L[] and R[]
            for (i = 0; i < n1; i++)
                L[i] = arr[l + i];
            for (j = 0; j < n2; j++)
                R[j] = arr[m + 1 + j];

            // Merge the temp arrays back into arr[l..r
            i = 0;
            j = 0;
            k = l;
            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                }
                else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }

            // Copy the remaining elements of L[],
            // if there are any
            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }

            // Copy the remaining elements of R[],
            // if there are any
            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
            }
        }

        // l is for left index and r is right index of the
        // sub-array of arr to be sorted
        void mergeSort(int arr[], int l, int r)
        {
            if (l < r) {
                int m = l + (r - l) / 2;

                // Sort first and second halves
                mergeSort(arr, l, m);
                mergeSort(arr, m + 1, r);

                merge(arr, l, m, r);
            }
        }

        // Function to print an array
        void printArray(int A[], int size)
        {
            int i;
            for (i = 0; i < size; i++)
                printf("%d ", A[i]);
            printf("\n");
        }

        // Driver code
        int main()
        {
            int arr[] = { 12, 11, 13, 5, 6, 7 };
            int arr_size = sizeof(arr) / sizeof(arr[0]);

            printf("Given array is ");
            printArray(arr, arr_size);

            mergeSort(arr, 0, arr_size - 1);

            printf("Sorted array is ");
            printArray(arr, arr_size);
            return 0;
        }
                `;
        
            } else if (language === "java-merge") {
                code = `            
    // Java program for Merge Sort
    import java.io.*;

    class MergeSort {

        // Merges two subarrays of arr[].
        // First subarray is arr[l..m]
        // Second subarray is arr[m+1..r]
        void merge(int arr[], int l, int m, int r)
        {
            // Find sizes of two subarrays to be merged
            int n1 = m - l + 1;
            int n2 = r - m;

            // Create temp arrays
            int L[] = new int[n1];
            int R[] = new int[n2];

            // Copy data to temp arrays
            for (int i = 0; i < n1; ++i)
                L[i] = arr[l + i];
            for (int j = 0; j < n2; ++j)
                R[j] = arr[m + 1 + j];

            // Merge the temp arrays

            // Initial indices of first and second subarrays
            int i = 0, j = 0;

            // Initial index of merged subarray array
            int k = l;
            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                }
                else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }

            // Copy remaining elements of L[] if any
            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
            }

            // Copy remaining elements of R[] if any
            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
            }
        }

        // Main function that sorts arr[l..r] using
        // merge()
        void sort(int arr[], int l, int r)
        {
            if (l < r) {

                // Find the middle point
                int m = l + (r - l) / 2;

                // Sort first and second halves
                sort(arr, l, m);
                sort(arr, m + 1, r);

                // Merge the sorted halves
                merge(arr, l, m, r);
            }
        }

        // A utility function to print array of size n
        static void printArray(int arr[])
        {
            int n = arr.length;
            for (int i = 0; i < n; ++i)
                System.out.print(arr[i] + " ");
            System.out.println();
        }

        // Driver code
        public static void main(String args[])
        {
            int arr[] = { 12, 11, 13, 5, 6, 7 };

            System.out.println("Given array is");
            printArray(arr);

            MergeSort ob = new MergeSort();
            ob.sort(arr, 0, arr.length - 1);

            System.out.println("\nSorted array is");
            printArray(arr);
        }
    }`;
        
            }   else if (language === "javascript-merge") {
                code = `            
                // Function to merge two sorted parts of array 
function merge(arr, left, middle, right) { 
	
	// Length of both sorted aub arrays 
	let l1 = middle - left + 1; 
	let l2 = right - middle; 
	// Create new subarrays 
	let arr1 = new Array(l1); 
	let arr2 = new Array(l2); 
	
	// Assign values in subarrays 
	for (let i = 0; i < l1; ++i) { 
		arr1[i] = arr[left + i]; 
	} 
	for (let i = 0; i < l2; ++i) { 
		arr2[i] = arr[middle + 1 + i]; 
	} 

	// To travesrse and modify main array 
	let i = 0, 
		j = 0, 
		k = left; 
		
	// Assign the smaller value for sorted output 
	while (i < l1 && j < l2) { 
		if (arr1[i] < arr2[j]) { 
			arr[k] = arr1[i]; 
			++i; 
		} else { 
			arr[k] = arr2[j]; 
			j++; 
		} 
		k++; 
	} 
	// Update the remaining elements 
	while (i < l1) { 
		arr[k] = arr1[i]; 
		i++; 
		k++; 
	} 
	while (j < l2) { 
		arr[k] = arr1[j]; 
		j++; 
		k++; 
	} 
} 

// Function to implement merger sort in javaScript 
function mergeSort(arr, left, right) { 
	if (left >= right) { 
		return; 
	} 
	
	// Middle index to create subarray halves 
	let middle = left + parseInt((right - left) / 2); 
	
	// Apply mergeSort to both the halves 
	mergeSort(arr, left, middle); 
	mergeSort(arr, middle + 1, right); 
	
	// Merge both sorted parts 
	merge(arr, left, middle, right); 
} 

// Input array 
const arr = [ 38, 27, 43, 10] 

// Display input array 
console.log("Original array: " + arr); 

// Apply merge sort function 
mergeSort(arr, 0, arr.length - 1); 

// Display output 
console.log("After sorting: " + arr);
`;
        
            }
            codeTextArea.value = code;
        }