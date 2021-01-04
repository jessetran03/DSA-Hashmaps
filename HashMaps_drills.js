const HashMap = require('./hashmap')

HashMap.MAX_LOAD_RATIO = 0.5
HashMap.SIZE_RATIO = 3

function main() {
  const lotr = new HashMap();
  lotr.set("Hobbit", "Bilbo")
  lotr.set("Hobbit", "Frodo")
  lotr.set("Wizard", "Gandalf")
  lotr.set("Human", "Aragorn")
  lotr.set("Elf", "Legolas")
  lotr.set("Maiar", "The Necromancer")
  lotr.set("Maiar", "Sauron")
  lotr.set("RingBearer", "Gollum")
  lotr.set("LadyOfLight", "Galadriel")
  lotr.set("HalfElven", "Arwen")
  lotr.set("Ent", "Treebeard")

  console.log(lotr)

  console.log(lotr.get("Maiar"))
  console.log(lotr.get("Hobbit"))
  // The values of Maiar and Hobbit are Sauron and Frodo respectively.
  // It does not return the values Bilbo and The Necromancer since this
  // HashMap does not resolve collisions.

  console.log(lotr._capacity)
  // The capacity of the hash table is 24
  // the length became greater than half the capacity, the capacity was increased by 3x
}

// main();

// 2. WhatDoesThisDo

const WhatDoesThisDo = function(){
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1,10);
  map1.set(str2,20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3,20);
  map2.set(str4,10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
}

// WhatDoesThisDo()
// This function causes a collision between the two values, 
// so the latter value overwrites the former value with the duplicate key

// 3. Demonstrate understanding of Hash maps

//    1) 22 88 null null 4 15 28 17 59 31 10 
//    2) null 28 20 12 null 5 15 null 17 
//            19              33
//            10

// 4. Remove duplicates

function removeDuplicates(str) {
  const duplicate = new HashMap()
  let newStr = ''
  for (let i = 0; i < str.length; i++) {
    try {
      duplicate.get(str[i])
    }
    catch(e) {
      duplicate.set(str[i], i)
      newStr += str[i];
    }
  }
  return newStr
}

// console.log(removeDuplicates("google"))
// console.log(removeDuplicates("google all that you think can think of"))

// 5. Any permutation a panlindrome

function palindrome(str) {
  const result = new HashMap()
  for (let i = 0; i < str.length; i++) {
    try {
      result.delete(str[i])
    }
    catch(e) {
      result.set(str[i], i)
    }
  }
  if (result.length <= 1) {
    return true;
  }
  return false;
}

// console.log(palindrome('acecarr'))
// console.log(palindrome('north'))

// 6. Anagram grouping

const anagramList = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']

function groupAnagrams(list) {
  const anagrams = [];
  while (list.length > 0) {

    // Declare new group of anagrams

    const tempList = []
    const group = [list[0]]

    // Set HashMap for new group

    const letters = new HashMap();
    for (let i = 0; i < list[0].length; i++) {
      letters.set(list[0][i], i)
    }

    // Check through list to see if anagram or not

    for (let i = 1; i < list.length; i++) {
      let isAnagram = true;
      for (let j = 0; j < list[i].length; j++) {
        try {
          letters.get(list[i][j])
        }
        catch(e) {
          isAnagram = false;
        }
      }
      if (isAnagram) {
        group.push(list[i])
      }
      else {
        tempList.push(list[i])
      }
    }

    // Add group to anagrams

    anagrams.push(group)

    // Reset list

    while (list.length > 0) {
      list.pop();
    }
    for (let i = 0; i < tempList.length; i++) {
      list.push(tempList[i]);
    }
  }
  
  return anagrams;
}

// console.log(groupAnagrams(anagramList))