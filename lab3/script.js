(function () {

    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

// Основне завдання
    for (var i = 0; i < names.length; i++) {

        var firstLetter = names[i].charAt(0).toLowerCase();

        if (firstLetter === "j") {
            byeSpeaker.speak(names[i]);
        } else {
            helloSpeaker.speak(names[i]);
        }

    }

// Додаткове завдання
    console.log("---- Names longer than 4 letters ----");

    for (var i = 0; i < names.length; i++) {

        if (names[i].length > 4) {
            console.log(names[i]);
        }

    }

})();