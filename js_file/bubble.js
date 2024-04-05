{
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

        async function BubbleSort(inputArray, delay = 500) {
            comparisonCount = 0;
            swapCount = 0;
            document.getElementById("comparisonCounter").innerText = comparisonCount;
            document.getElementById("swapCounter").innerText = swapCount;

            generateArray(inputArray); // Generate blocks based on user input
            var blocks = document.querySelectorAll(".block");

            for (var i = 0; i < blocks.length; i += 1) {
                for (var j = 0; j < blocks.length - i - 1; j += 1) {
                    comparisonCount++;
                    document.getElementById("comparisonCounter").innerText = comparisonCount;

                    blocks[j].style.backgroundColor = "rgb(255,255,0)";
                    blocks[j + 1].style.backgroundColor = "rgb(255,255,0)";

                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, delay);
                    });

                    var value1 = Number(blocks[j].childNodes[0].innerHTML);
                    var value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

                    if (value1 > value2) {
                        swapCount++;
                        document.getElementById("swapCounter").innerText = swapCount;
                        await swap(blocks[j], blocks[j + 1]);
                        blocks = document.querySelectorAll(".block");
                    }
                    blocks[j].style.backgroundColor = "#ffff";
                    blocks[j + 1].style.backgroundColor = "#ffff";
                }

                blocks[blocks.length - i - 1].style.backgroundColor = "rgb(48, 240, 0)";
            }
        }
        
function bubbleSortVisualization(arr) {
    barcom = 0;
    barswap = 0;
    var container = document.getElementById("container");
    container.innerHTML = ""; // Clear previous bars

    document.getElementById("barcom").innerText = barcom;
    document.getElementById("barswap").innerText = barswap;

    var max = Math.max.apply(null, arr);
    for (var i = 0; i < arr.length; i++) {
        var bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = (arr[i] / max) * 100 + "%";
        bar.innerHTML = '<span class="value">' + arr[i] + '</span>';
        container.appendChild(bar);
    }

    var delay = 1000;
    var i = 0;
    var j = 0;
    var bars = container.getElementsByClassName("bar"); // Get all bars

    var interval = setInterval(function () {
        if (i < arr.length) {
            if (j < arr.length - i - 1) {
                barcom++;
                document.getElementById("barcom").innerText = barcom;

                bars[j].classList.add("current"); // Highlight current bar

                if (arr[j] > arr[j + 1]) {
                    barswap++;
                    document.getElementById("barswap").innerText = barswap;

                    var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    for (var k = 0; k < arr.length; k++) {
                        bars[k].style.height = (arr[k] / max) * 100 + "%";
                        bars[k].innerHTML = '<span class="value">' + arr[k] + '</span>';
                    }
                }

                setTimeout(() => {
                    bars[j].classList.remove("current"); // Remove highlight after delay
                }, delay / 2);

                j++;
            } else {
                i++;
                j = 0;
            }
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
        
            
            // Validate maximum length
            if (!inputArray.every(num => num >= 0 && num <= 999)) {
                alert("Input numbers must be between 0 and 999.");
                return;
            }
        
            BubbleSort(inputArray);
        }
        
        function start() {
            var userInput = document.getElementById("inputArray").value;
            if (userInput.length === 0) {
                alert('Please enter valid numbers separated by commas.');
                return;
            }
            var inputArray = userInput.split(",").map(Number); 
            
            if (!inputArray.every(num => num >= 0 && num <= 999)) {
                alert("Input numbers must be between 0 and 999.");
                return;
            }
        
            bubbleSortVisualization(inputArray);
        }

        function displayCode() {
            var language = document.getElementById("languageSelect").value;
            var codeTextArea = document.getElementById("codeDisplay");
            var code = "";
        
            if (language === "cpp-bubble") {
                code = `
                
        #include <iostream>
        #include <vector>
        
        using namespace std;
        
        void bubbleSort(vector<int>& arr) {
            int n = arr.size();
            for (int i = 0; i < n - 1; i++) {
                for (int j = 0; j < n - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        
        int main() {
            vector<int> arr = {7, 2, 5, 3, 8, 1, 9, 4, 6};
            int n = arr.size();
        
            cout << "Original Array:" << endl;
            for (int i = 0; i < n; i++) {
                cout << arr[i] << " ";
            }
            cout << endl;
        
            bubbleSort(arr);
        
            cout << "Sorted Array:" << endl;
            for (int i = 0; i < n; i++) {
                cout << arr[i] << " ";
            }
            cout << endl;
        
            return 0;
        }`;
        
            } else if (language === "c-bubble") {
                code = `
                
                // C program for implementation of Bubble sort
                #include <stdio.h>
                
                // Swap function
                void swap(int* arr, int i, int j)
                {
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
                
                // A function to implement bubble sort
                void bubbleSort(int arr[], int n)
                {
                    int i, j;
                    for (i = 0; i < n - 1; i++)
                
                        // Last i elements are already
                        // in place
                        for (j = 0; j < n - i - 1; j++)
                            if (arr[j] > arr[j + 1])
                                swap(arr, j, j + 1);
                }
                
                // Function to print an array
                void printArray(int arr[], int size)
                {
                    int i;
                    for (i = 0; i < size; i++)
                        printf("%d ", arr[i]);
                }
                
                // Driver code
                int main()
                {
                    int arr[] = { 5, 1, 4, 2, 8 };
                    int N = sizeof(arr) / sizeof(arr[0]);
                    bubbleSort(arr, N);
                    printf("Sorted array: ");
                    printArray(arr, N);
                    return 0;
                }
                `;
        
            } else if (language === "java-bubble") {
                code = `
                
                // Java program for implementation 
                // of Bubble Sort 
                class BubbleSort { 
                    void bubbleSort(int arr[]) 
                    { 
                        int n = arr.length; 
                        for (int i = 0; i < n - 1; i++) 
                            for (int j = 0; j < n - i - 1; j++) 
                                if (arr[j] > arr[j + 1]) { 
                                    // swap temp and arr[i] 
                                    int temp = arr[j]; 
                                    arr[j] = arr[j + 1]; 
                                    arr[j + 1] = temp; 
                                } 
                    } 
                
                    // Prints the array 
                    void printArray(int arr[]) 
                    { 
                        int n = arr.length; 
                        for (int i = 0; i < n; ++i) 
                            System.out.print(arr[i] + " "); 
                        System.out.println(); 
                    } 
                
                    // Driver method to test above 
                    public static void main(String args[]) 
                    { 
                        BubbleSort ob = new BubbleSort(); 
                        int arr[] = { 64, 34, 25, 12, 22, 11, 90 }; 
                        ob.bubbleSort(arr); 
                        System.out.println("Sorted array"); 
                        ob.printArray(arr); 
                    } 
                }                
                `;
        
            }   else if (language === "javascript-bubble") {
                code = `
                
                // Bubble sort Implementation using Javascript

                // Creating the bblSort function
                function bblSort(arr) {

                    for (var i = 0; i < arr.length; i++) {

                        // Last i elements are already in place 
                        for (var j = 0; j < (arr.length - i - 1); j++) {

                            // Checking if the item at present iteration 
                            // is greater than the next iteration
                            if (arr[j] > arr[j + 1]) {

                                // If the condition is true
                                // then swap them
                                var temp = arr[j]
                                arr[j] = arr[j + 1]
                                arr[j + 1] = temp
                            }
                        }
                    }

                    // Print the sorted array
                    console.log(arr);
                }

                // This is our unsorted array
                var arr = [234, 43, 55, 63, 5, 6, 235, 547];

                // Now pass this array to the bblSort() function
                bblSort(arr);

                `;
        
            }
        
            codeTextArea.value = code;
        }
        
    }