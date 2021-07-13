class Person{

    name:string;

    constructor(name){
        this.name = name;
    }

    walk(){
        console.log('${this.name} is walking.');
    }

}

const person = new Person("Lee");
console.log(person);