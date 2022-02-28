import {
  firstKeyWithValueOf,
  isKeyOf,
  isValueOf,
  keys,
  length,
  regexKeyMatcher,
  regexValueMatcher,
  valueIsSpecificKey,
  values,
} from '@nathanpb/kext/enum'

enum Food {
  CARROT = '🥕',
  GRAPE = '🍇',
  APPLE = '🍎',
  PEACH = '🍑',
  SALAD = '🍉 + 🍌 + 🍊 + 🍎 + 🍓'
}

console.log(length(Food)) // > 4
console.log(keys(Food))   // > Set(5){ 'CARROT', 'GRAPE', 'APPLE', 'PEACH' }
console.log(values(Food)) // > ['🥕', '🍇', '🍎', '🍑']

console.log(isValueOf(Food, '🍑'))  // > true
console.log(isValueOf(Food, '🐱'))  // > false
console.log(isKeyOf(Food, 'GRAPE')) // > true
console.log(isKeyOf(Food, 'CAT'))   // > false
console.log(firstKeyWithValueOf(Food,'🍎')) // > APPLE

console.log(valueIsSpecificKey(Food, 'GRAPE', '🍑')) // > false
console.log(valueIsSpecificKey(Food, 'GRAPE', '🍇')) // > true

regexKeyMatcher(Food)   // Regex that match any key
regexValueMatcher(Food) // Regex that match any value
