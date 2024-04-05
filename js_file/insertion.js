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
                array_ele.style.transform = `translate(${i * 50}px)`;

                var array_ele_label = document.createElement("label");
                array_ele_label.classList.add("block_id");
                array_ele_label.innerText = value;

                array_ele.appendChild(array_ele_label);
                container.appendChild(array_ele);
            });
        }

        function swap(el1, el2) {
            swapCount++;
            document.getElementById("swapCounter").innerText = swapCount;
            return new Promise((resolve) => {
                var temp = el1.style.transform;
                el1.style.transform = el2.style.transform;
                el2.style.transform = temp;

                window.requestAnimationFrame(function () {
                    setTimeout(() => {
                        container.insertBefore(el2, el1);
                        resolve();
                    }, 500);
                });
            });
        }

        async function InsertionSort(inputArray, delay = 500) {
            comparisonCount = 0;
            swapCount = 0;
            document.getElementById("comparisonCounter").innerText = comparisonCount;
            document.getElementById("swapCounter").innerText = swapCount;

            generateArray(inputArray); // Generate blocks based on user input
            var blocks = document.querySelectorAll(".block");

            // Set the color of the first element to green
            blocks[0].style.backgroundColor = "rgb(48, 240, 0)";

            for (var i = 1; i < blocks.length; i++) {
                var key = Number(blocks[i].childNodes[0].innerHTML);
                var j = i - 1;

                while (j >= 0 && Number(blocks[j].childNodes[0].innerHTML) > key) {
                    comparisonCount++;
                    document.getElementById("comparisonCounter").innerText = comparisonCount;
                    blocks[j + 1].style.backgroundColor = "rgb(255,255,0)";

                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, delay);
                    });

                    await swap(blocks[j], blocks[j + 1]);
                    blocks = document.querySelectorAll(".block");

                    blocks[j].style.backgroundColor = "rgb(48, 240, 0)";
                    blocks[j + 1].style.backgroundColor = "rgb(48, 240, 0)";

                    j--;
                }

                blocks[j + 1].childNodes[0].innerText = key;
                blocks[j + 1].style.backgroundColor = "rgb(48, 240, 0)";
            }

            // Set all blocks to green after sorting is complete
            blocks.forEach((block) => {
                block.style.backgroundColor = "rgb(48, 240, 0)";
            });
        }
        
            function InsertionBar(arr) {
            barcom = 0;
            barswap = 0;
            var container = document.getElementById("container");
            container.innerHTML = ""; // Clear previous bars
            
            document.getElementById("barcom").innerText = barcom;
            document.getElementById("barswap").innerText = barswap;

            var max = Math.max.apply(null, arr);
            for (var i = 0; i < arr.length; i++) {
                var bar = document.createElement("div");
                bar.style.position = "relative";
                bar.style.width = "40px";
                bar.style.margin = "0 2px";
                bar.style.backgroundColor = "blue";
                bar.style.borderRadius = "3px";
                bar.style.border = "0.1px solid #ffff";
                bar.style.height = (arr[i] / max) * 50 + "%";

                var valueSpan = document.createElement("span");
                valueSpan.style.position = "absolute";
                valueSpan.style.bottom = "-20px";
                valueSpan.style.left = "50%";
                valueSpan.style.transform = "translateX(-50%)";
                valueSpan.style.color = "white";
                valueSpan.innerText = arr[i];

                bar.appendChild(valueSpan);
                container.appendChild(bar);     
            }

            var delay = 1000;
            var i = 1;
            var interval = setInterval(function() {
                if (i < arr.length) {
                    var key = arr[i];
                    var j = i - 1;

                    while (j >= 0 && arr[j] > key) {
                        barcom++;
                        document.getElementById("barcom").innerText = barcom;

                        barswap++;
                        document.getElementById("barswap").innerText = barswap;

                        arr[j + 1] = arr[j];
                        var bars = container.children;
                        bars[j + 1].style.height = (arr[j + 1] / max) * 50 + "%";
                        bars[j + 1].children[0].innerText = arr[j + 1];

                        j--;

                        setTimeout(() => {}, delay);
                    }

                    arr[j + 1] = key;
                    var bars = container.children;
                    bars[j + 1].style.height = (key / max) * 50 + "%";
                    bars[j + 1].children[0].innerText = key;

                    setTimeout(() => {}, delay);

                    i++;
                } else {
                    clearInterval(interval);
                }
            }, delay);
        }



        function startSorting() {
            var userInput = document.getElementById("inputArray").value;
            if (userInput.length === 0) {
                alert('Please enter valid numbers separated by commas.');
                return;
            }
            var inputArray = userInput.split(",").map(Number); // Convert comma-separated string to array of numbers
            InsertionSort(inputArray);
        }

        function start() {
            var userInput = document.getElementById("inputArray").value;
            if (userInput.length === 0) {
                alert('Please enter valid numbers separated by commas.');
                return;
            }
            var inputArray = userInput.split(",").map(Number); // Convert comma-separated string to array of numbers
            InsertionBar(inputArray);
        }

        function displayCode() {
            var language = document.getElementById("languageSelect").value;
            var codeTextArea = document.getElementById("codeDisplay");
            var code = "";
        
            if (language === "cpp-insertion") {
                code = `// C++ program for insertion sort

#include <bits/stdc++.h>
using namespace std;

// Function to sort an array using
// insertion sort
void insertionSort(int arr[], int n)
{
	int i, key, j;
	for (i = 1; i < n; i++) {
		key = arr[i];
		j = i - 1;

		// Move elements of arr[0..i-1],
		// that are greater than key, 
		// to one position ahead of their
		// current position
		while (j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j];
			j = j - 1;
		}
		arr[j + 1] = key;
	}
}

// A utility function to print an array
// of size n
void printArray(int arr[], int n)
{
	int i;
	for (i = 0; i < n; i++)
		cout << arr[i] << " ";
	cout << endl;
}

// Driver code
int main()
{
	int arr[] = { 12, 11, 13, 5, 6 };
	int N = sizeof(arr) / sizeof(arr[0]);

	insertionSort(arr, N);
	printArray(arr, N);

	return 0;
}
`;
        
            } else if (language === "c-insertion") {
                code = `// C program for insertion sort
#include <math.h>
#include <stdio.h>

/* Function to sort an array using insertion sort*/
void insertionSort(int arr[], int n)
{
	int i, key, j;
	for (i = 1; i < n; i++) {
		key = arr[i];
		j = i - 1;

		/* Move elements of arr[0..i-1], that are
		greater than key, to one position ahead
		of their current position */
		while (j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j];
			j = j - 1;
		}
		arr[j + 1] = key;
	}
}

// A utility function to print an array of size n
void printArray(int arr[], int n)
{
	int i;
	for (i = 0; i < n; i++)
		printf("%d ", arr[i]);
	printf("\n");
}

/* Driver program to test insertion sort */
int main()
{
	int arr[] = { 12, 11, 13, 5, 6 };
	int n = sizeof(arr) / sizeof(arr[0]);

	insertionSort(arr, n);
	printArray(arr, n);

	return 0;
}                `;
        
            } else if (language === "java-insertion") {
                code = `// Java program for implementation of Insertion Sort
public class InsertionSort {
	/*Function to sort array using insertion sort*/
	void sort(int arr[])
	{
		int n = arr.length;
		for (int i = 1; i < n; ++i) {
			int key = arr[i];
			int j = i - 1;

			/* Move elements of arr[0..i-1], that are
			greater than key, to one position ahead
			of their current position */
			while (j >= 0 && arr[j] > key) {
				arr[j + 1] = arr[j];
				j = j - 1;
			}
			arr[j + 1] = key;
		}
	}

	/* A utility function to print array of size n*/
	static void printArray(int arr[])
	{
		int n = arr.length;
		for (int i = 0; i < n; ++i)
			System.out.print(arr[i] + " ");

		System.out.println();
	}

	// Driver method
	public static void main(String args[])
	{
		int arr[] = { 12, 11, 13, 5, 6 };

		InsertionSort ob = new InsertionSort();
		ob.sort(arr);

		printArray(arr);
	}
};

           
                `;
        
            } else if (language === "javascript-insertion") {
                code = `
            // Function to implement insertion sort 
function selectionSort(arr) { 

	// Getting the array length 
	let n = arr.length; 
	
	// To store value temporarily 
	let key; 
	
	// For iterations 
	let i, j; 
	
	// Iterate array in forward direction 
	for (i = 0; i < n ; ++i) { 
		key = arr[i]; 
		j = i - 1; 
		
		// Iterate and swap elements in backward direction 
		// till number is greater then the key 
		for (j; j >= 0, arr[j]>key; --j){ 
			arr[j+1]=arr[j]; 
		} 
		// Swap the key to right position 
		arr[j+1]=key; 
	} 
} 

// Input array 
const arr = [64, 25, 12, 22, 11]; 

// Display Input array 
console.log("Original array: " + arr); 

// Sort using function 
selectionSort(arr); 

// Display the output array after sorting 
console.log("After sorting: " + arr);
               `;
        
            }
        
            codeTextArea.value = code;
        }