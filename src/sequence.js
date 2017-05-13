const next = function(arr){
  let type = patternType(arr);
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

const patternType = function(arr) {
  let ap, gp, sq, cb, fb;

  for (let i = 0; i < (arr.length - 2); i++) {
    if(!(ap = arr[i+1] - arr[i] == arr[i+2] - arr[i+1])) break;
  }
  if(ap) return "Arithmetic";

  for (let i = 0; i < (arr.length - 2); i++) {
    if(!(gp = arr[i+1] / arr[i] == arr[i+2] / arr[i+1])) break;
  }
  if(gp) return "Geometric";

  for (let i = 0; i < (arr.length - 2); i++) {
    if (!(sq = Math.sqrt(arr[i]) % 1 === 0 && Math.sqrt(arr[i+1]) % 1 === 0)) break;
  }
  if (sq) return "Square";

  for (let i = 0; i < (arr.length - 2); i++) {
    if (!(cb = Math.cbrt(arr[i]) % 1 === 0 && Math.cbrt(arr[i+1]) % 1 === 0)) break;
  }
  if (cb) return "Cube";

  // Fib up
  for (let i = 0; i < (arr.length - 3); i++) {
    if (!(fb = (arr[i+2] == arr[i] + arr[i+1]))) break;
  }
  if (fb) return "Fibonacci";

  // Fib down
  for (let i = 0; i < (arr.length - 3); i++) {
    if (!(fb = (arr[i+2] == arr[i] - arr[i+1]))) break;
  }
  if (fb) return "Fibonacci";
  return -1;
};

export default{
  next,
  prev,
  patternType
};