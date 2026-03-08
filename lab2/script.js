// ========================================
// 1. car1 через new Object()
// ========================================

let car1 = new Object();

car1.color = "blue";
car1.maxSpeed = 180;

car1.driver = {
    name: "Uliana Dubrovska",
    category: "C",
    personalLimitations: "No driving at night"
};

car1.tuning = true;
car1.numberOfAccidents = 0;

car1.drive = function () {
    console.log("I am not driving at night");
};

console.log("car1:", car1);
car1.drive();


// ========================================
// 2. car2 через літерал
// ========================================

let car2 = {

    color: "green",
    maxSpeed: 280,

    driver: {
        name: "Uliana Dubrovska",
        category: "B",
        personalLimitations: null
    },

    tuning: false,
    numberOfAccidents: 2,

    drive: function () {
        console.log("I can drive anytime");
    }

};

console.log("car2:", car2);
car2.drive();


// ========================================
// 3. Конструктор Truck
// ========================================

function Truck(color, weight, avgSpeed, brand, model) {

    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

}


// ========================================
// 4. AssignDriver
// ========================================

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {

    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };

};


// ========================================
// 5. trip()
// ========================================

Truck.prototype.trip = function() {

    if (!this.driver) {
        console.log("No driver assigned");
        return;
    }

    let message = "Driver " + this.driver.name;

    if (this.driver.nightDriving) {
        message += " drives at night";
    } else {
        message += " does not drive at night";
    }

    message += " and has " + this.driver.experience + " years of experience";

    console.log(message);

};


// ========================================
// 6. Створення Truck
// ========================================

let truck1 = new Truck("white", 5000, 90, "Volvo", "FH");
let truck2 = new Truck("black", 4500, 80, "MAN", "TGX");

truck1.AssignDriver("Lilia Bulatova", true, 10);
truck2.AssignDriver("Vlad Danyleychuk", false, 5);

truck1.trip();
truck2.trip();


// ========================================
// 7. Клас Square
// ========================================

class Square {

    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square: 4 equal sides and 4 right angles.");
    }

    length() {
        console.log("Perimeter =", this.a * 4);
    }

    square() {
        console.log("Area =", this.a * this.a);
    }

    info() {
        console.log("Square side:", this.a);
        console.log("Angles: 90 90 90 90");
        console.log("Perimeter:", this.a * 4);
        console.log("Area:", this.a * this.a);
    }

}


// ========================================
// 8. Rectangle
// ========================================

class Rectangle extends Square {

    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle: opposite sides equal.");
    }

    length() {
        console.log("Perimeter =", 2 * (this.a + this.b));
    }

    square() {
        console.log("Area =", this.a * this.b);
    }

    info() {
        console.log("Rectangle sides:", this.a, this.b);
        console.log("Angles: 90 90 90 90");
        console.log("Perimeter:", 2 * (this.a + this.b));
        console.log("Area:", this.a * this.b);
    }

}


// ========================================
// 9. Rhombus + getters/setters
// ========================================

class Rhombus extends Square {

    constructor(a, alpha, beta) {
        super(a);
        this._alpha = alpha;
        this._beta = beta;
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(value) {
        this._alpha = value;
    }

    get beta() {
        return this._beta;
    }

    set beta(value) {
        this._beta = value;
    }

    static help() {
        console.log("Rhombus: all sides equal.");
    }

    length() {
        console.log("Perimeter =", this.a * 4);
    }

    square() {
        let area = this.a * this.a * Math.sin(this._alpha * Math.PI / 180);
        console.log("Area =", area);
    }

    info() {
        console.log("Rhombus side:", this.a);
        console.log("Angles:", this._alpha, this._beta);
        console.log("Perimeter:", this.a * 4);
        this.square();
    }

}


// ========================================
// 10. Parallelogram
// ========================================

class Parallelogram extends Rectangle {

    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }

    static help() {
        console.log("Parallelogram: opposite sides parallel.");
    }

    length() {
        console.log("Perimeter =", 2 * (this.a + this.b));
    }

    square() {
        let area = this.a * this.b * Math.sin(this.alpha * Math.PI / 180);
        console.log("Area =", area);
    }

    info() {
        console.log("Parallelogram sides:", this.a, this.b);
        console.log("Angles:", this.alpha, this.beta);
        console.log("Perimeter:", 2 * (this.a + this.b));
        this.square();
    }

}


// ========================================
// 11. Демонстрація help()
// ========================================

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();


// ========================================
// 12. Створення об'єктів
// ========================================

let sq = new Square(5);
let rect = new Rectangle(4, 6);
let rhomb = new Rhombus(5, 120, 60);
let para = new Parallelogram(5, 7, 110, 70);

sq.info();
rect.info();
rhomb.info();
para.info();


// ========================================
// 13. Triangular
// ========================================

function Triangular(a = 3, b = 4, c = 5) {

    return {
        a: a,
        b: b,
        c: c
    };

}

let t1 = Triangular();
let t2 = Triangular(5, 6, 7);
let t3 = Triangular(10, 8, 6);

console.log(t1);
console.log(t2);
console.log(t3);


// ========================================
// 14. PiMultiplier
// ========================================

function PiMultiplier(number) {

    return function () {
        return Math.PI * number;
    };

}

let multiplyBy2 = PiMultiplier(2);
let multiplyByTwoThirds = PiMultiplier(2/3);
let divideBy2 = PiMultiplier(0.5);

console.log(multiplyBy2());
console.log(multiplyByTwoThirds());
console.log(divideBy2());


// ========================================
// 15. Painter
// ========================================

function Painter(color) {

    return function(obj) {

        if (obj.type) {
            console.log(color + " " + obj.type);
        } else {
            console.log("No 'type' property occurred!");
        }

    }

}

let PaintBlue = Painter("Blue");
let PaintRed = Painter("Red");
let PaintYellow = Painter("Yellow");


// ========================================
// 16. Тестові об'єкти
// ========================================

let obj1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

let obj2 = {
    type: "Truck",
    avgSpeed: 90,
    loadCapacity: 2400
};

let obj3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};


// ========================================
// 17. Демонстрація Painter
// ========================================

PaintBlue(obj1);
PaintRed(obj1);
PaintYellow(obj1);

PaintBlue(obj2);
PaintRed(obj2);
PaintYellow(obj2);

PaintBlue(obj3);
PaintRed(obj3);
PaintYellow(obj3);