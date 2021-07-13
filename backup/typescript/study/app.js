var list = [1, 2, 3];
console.log(list);
var tuple;
tuple = ['hello', 10];
console.log(tuple);
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 0] = "Red";
    Color1[Color1["Green"] = 2] = "Green";
    Color1[Color1["Blue"] = 3] = "Blue";
})(Color1 || (Color1 = {}));
;
var c1 = Color1.Green;
console.log(c1);
// enum Color2 {Red = 1, Green = 2, Blue = 4};
// let c2: Color2 = Color2.Green;
// console.log(c2)
var notSure = 4;
notSure = 'string';
console.log(notSure);
notSure = false;
console.log(notSure);
function error(message) {
    throw new Error(message);
}
// error('errorrr');
