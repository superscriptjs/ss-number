
const arithGeo = function(arr) {
  var ap, gp;

  for (i = 0; i< (arr.length - 2); i++) {
    if(!(ap = arr[i+1] - arr[i] == arr[i+2] - arr[i+1])) break;
  }

  if(ap) return "Arithmetic";
  for (i = 0; i< (arr.length - 2); i++) {
    if(!(gp = arr[i+1] / arr[i] == arr[i+2] / arr[i+1])) break;
  }

  if(gp) return "Geometric";
  return -1;
};

export default{
  arithGeo
};