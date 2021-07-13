var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.walk = function () {
        console.log('${this.name} is walking.');
    };
    return Person;
}());
var person = new Person("Lee");
console.log(person);
