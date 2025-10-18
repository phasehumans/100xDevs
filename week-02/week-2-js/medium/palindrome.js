/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let fliterStr= ''
  for (char in str){
    if(char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z' || char >= '0' && char <= '9'){
      fliterStr= fliterStr + char.toLowerCase()
    }
  }

  let left= 0
  let right= fliterStr.length - 1


  /*
  - filter / normalize str
  - comapre left and right 


  madam
  left= 0
  right= 4

  str[0] == str[4] -> m == m
  str[1] == str[3] -> a == a

  left 2 and right 2 -> condn (left < right) X
  while( left <= right ) - this makes more sense
  
  */
  while(left <= right){
    if(fliterStr[left] !== fliterStr[right]){
      return false
    }

    left++
    right--
  }


  return true;
}

module.exports = isPalindrome;
