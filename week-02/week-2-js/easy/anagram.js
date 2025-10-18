/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // first check length and compare
  if(str1.legth != str2.legth){
    return false
  }

  /* 
  
  sortString: aSd -> asd -> ["a", "s", "d"] -> ["a", "d", "s"] -> ads
  - sort and then compare both strings
  
  */
  function sortString(str){
    return str.toLowerCase().split("").sort().join("");
  }

  return sortString(str1) === sortString(str2)
}




function anagram(str1, str2){
  if(str1.legth != str2.legth){
    return false
  }

  function sortStr(str){
    return str.toLowerCase().split("").sort().join("");
  }

return sortStr(str1) === sortStr(str2)

}

module.exports = isAnagram;
