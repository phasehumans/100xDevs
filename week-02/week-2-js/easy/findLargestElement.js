/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let max= numbers[0]

    /* 
    - consider index 0 has max
    - loop over array compare and change max
    
    */

    for (let i = 1; i < numbers.length; i++){
        if (numbers[i] > max){
            max= numbers[i]
        }

    }

    return max
}


function largeElmt (arr){
    let mx= arr[0]

    for (let i= 1; i < arr.length; i++){
        if(arr[i] > mx){
            mx= arr[i]
        }
    }

    return mx
}

module.exports = findLargestElement;