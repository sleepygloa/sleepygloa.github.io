let list : Array<number> = [1,2,3];

console.log(list);

let tuple : [string, number];

tuple = ['hello', 10];

console.log(tuple);


enum Color1 {Red, Green=2, Blue};
let c1:Color1 = Color1.Green;

console.log(c1);

// enum Color2 {Red = 1, Green = 2, Blue = 4};
// let c2: Color2 = Color2.Green;

// console.log(c2)

let notSure : any = 4;
notSure = 'string';
console.log(notSure);

notSure = false;
console.log(notSure);

function error(message : string):never{
    throw new Error(message);
}

// error('errorrr');

