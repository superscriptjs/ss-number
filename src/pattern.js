let _ = require('lodash');

const next = function(arr){
  let type = patternType(arr, true);
  let l1 = arr.pop();
  let l2 = arr.pop();

  if (type === "Arithmetic"){
    return (l1 - l2) + l1;
  } else if (type === "Geometric"){
    let common_ratio = (l1 / l2);
    return l1 * common_ratio;
  } else if (type === "Square"){
    // Step value between squares.
    let common_ratio = (Math.sqrt(l1) - Math.sqrt(l2))
    return Math.pow((Math.sqrt(l1) + common_ratio), 2);
  } else if (type === "Cube"){
    // Step value between cubes.
    let common_ratio = (Math.cbrt(l1) - Math.cbrt(l2))
    return Math.pow((Math.cbrt(l1) + common_ratio), 3);
  } else if (type === "Fibonacci"){
    return (l1 > l2) ? l1 + l2 : l2 - l1;
  } else {
    return null;
  }
}

const prev = function(arr){
  return next(arr.reverse());
}


const missing = function(arr){
  const length = arr.length - 1;
  var results = [];
  for (let x = 1; x <= length; x++){
    let new_array = _.clone(arr);
    new_array.splice(x,0,undefined);
    let pattern = _missing(new_array);
    if (pattern.type !== null){
      let n = _.some(results, function(t){
        return t.number === pattern.number
      });

      if (n === false) results.push(pattern);
    }
  }

  var array = Array.from(results);
  if (array.length === 1){
    return array[0];
  } else {
    console.log(array)
    return array[0];
  }
}
// Given an array, with an undefined slot, we try to satisfy the missing number
// Returns null or number
const _missing = function(arr){
  const length = arr.length - 1;
  const missing_index = arr.indexOf(undefined);
  const num_premutations = arr[missing_index+1] - arr[missing_index-1];

  let missing_number = null;
  let pattern_type = null;
  let set;

  for (let x = 0; x <= num_premutations; x++){
    let test_number = arr[missing_index-1] + x;
    arr.splice(missing_index, 1, test_number);
    let pt = patternType(arr);;
    if (pt !== "None"){
      missing_number = test_number;
      pattern_type = pt;
      set = _.clone(arr);
    }
  }
  return {
    number: missing_number,
    type: pattern_type,
    set: set
  }
}

const patternType = function(arr, strict) {
  let ap = 0, gp = 0, sq = 0, cb = 0, fb1 = 0, fb2 = 0;
  let total = arr.length - 2;
  for (let i = 0; i < total; i++) {
    if (arr[i+1] - arr[i] == arr[i+2] - arr[i+1]) ap++;
    if (arr[i+1] / arr[i] == arr[i+2] / arr[i+1]) gp++;
    if (Math.sqrt(arr[i]) % 1 === 0 && Math.sqrt(arr[i+1]) % 1 === 0) sq++;
    if (Math.cbrt(arr[i]) % 1 === 0 && Math.cbrt(arr[i+1]) % 1 === 0) cb++;
    if (arr[i+2] == arr[i] + arr[i+1]) fb1++;
    if (arr[i+2] == arr[i] - arr[i+1]) fb2++;
  }
  
  let types = [
    {'name':'Arithmetic', total: ap / total},
    {'name':'Geometric', total: gp / total},
    {'name':'Square', total: sq / total},
    {'name':'Cube', total: cb / total},
    {'name':'Fibonacci', total: fb1 / total},
    {'name':'Fibonacci', total: fb2 / total}
  ];

  let type = _.filter(types, function(o) { return o.total === 1});
  switch(type.length) {
    case 0: return "None"; break;
    case 1: return type[0].name; break;
    default: return (strict) ? type[0].name : "Many";
  }
};

export default{
  next,
  prev,
  patternType,
  missing
};