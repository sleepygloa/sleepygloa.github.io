abstract class Animal{
    //추상 메소드
    abstract makeSound(): void;
    //일반 메소드
    move(): void{
        console.log("moving....");
    }
}


class Dog extends Animal{
    makeSound(){
        console.log("bowowowo");
    }
}

const myDog = new Dog();
myDog.makeSound();
myDog.move();