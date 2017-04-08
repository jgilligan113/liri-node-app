function Animal (hungry, sleepy, bored, age) {
    this.hungry = hungry;
    this.sleepy = sleepy;
    this.bored = bored;
    this.age = age;

    this.feed = function() {
        console.log ("feeding");
    }

    this.sleep = function() {
        console.log ("sleeping")
    }

}

function Cat() {
    this.meow = function() {
        console.log("meow");
    }
}

console.log(new Animal(true, false, false, 12));

var newAnimal = new Animal(true, false, false, 12);
var myCat = new Cat();

var myCatProtoype = Object.getPrototypeOf(myCat);

Cat.protoype = newAnimal.prototype;

console.log("Prototype", Object.getPrototypeOf(myCat));

console.log(new Cat());