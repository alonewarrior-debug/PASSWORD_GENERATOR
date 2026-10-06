/* =========================================
   PASSWORD DATA
========================================= */

const data = {

    names: [
        "Rahul",
        "Arjun",
        "Vikram",
        "Aditya",
        "Rohan",
        "Kiran",
        "Aman",
        "Varun",
        "Aryan",
        "Kabir",
        "Neha",
        "Priya",
        "Ananya",
        "Sneha",
        "Meera"
    ],

    cars: [
        "BMW",
        "Audi",
        "Tesla",
        "Toyota",
        "Honda",
        "Ford",
        "Volvo",
        "Porsche",
        "Ferrari",
        "Lexus",
        "Nissan",
        "Mercedes",
        "Jaguar",
        "Bentley",
        "Lamborghini"
    ],

    watches: [
        "Rolex",
        "Titan",
        "Casio",
        "Omega",
        "Seiko",
        "Fossil",
        "Tissot",
        "Cartier",
        "TagHeuer",
        "Rado",
        "Citizen",
        "Timex"
    ],

    games: [
        "Minecraft",
        "Valorant",
        "Fortnite",
        "Pokemon",
        "Mario",
        "Roblox",
        "FreeFire",
        "PUBG",
        "Tekken",
        "FIFA",
        "GTA",
        "Minecraft"
    ],

    movies: [
        "Avatar",
        "Titanic",
        "Batman",
        "Avengers",
        "Matrix",
        "Inception",
        "Joker",
        "Gladiator",
        "Interstellar",
        "Rocky"
    ],

    animals: [
        "Tiger",
        "Lion",
        "Wolf",
        "Eagle",
        "Panther",
        "Falcon",
        "Shark",
        "Panda",
        "Leopard",
        "Cheetah"
    ],

    cities: [
        "Hyderabad",
        "Mumbai",
        "Delhi",
        "Chennai",
        "Bangalore",
        "Pune",
        "Dubai",
        "London",
        "Paris",
        "Tokyo",
        "Sydney",
        "NewYork"
    ]

};


/* =========================================
   SYMBOLS
========================================= */

const symbols = [
    "@",
    "#",
    "$",
    "%",
    "&",
    "!",
    "*",
    "?",
    "_",
    "+",
    "-"
];


/* =========================================
   ELEMENTS
========================================= */

const passwordDisplay =
    document.getElementById("password");

const categorySelect =
    document.getElementById("category");

const numbersCheckbox =
    document.getElementById("numbers");

const symbolsCheckbox =
    document.getElementById("symbols");

const numberLength =
    document.getElementById("numberLength");

const numberValue =
    document.getElementById("numberValue");

const generateBtn =
    document.getElementById("generateBtn");

const copyBtn =
    document.getElementById("copyBtn");

const strengthText =
    document.getElementById("strengthText");

const strengthBar =
    document.getElementById("strengthBar");


/* =========================================
   SECURE RANDOM NUMBER
========================================= */

function randomInt(max) {

    const array = new Uint32Array(1);

    crypto.getRandomValues(array);

    return array[0] % max;
}


/* =========================================
   RANDOM ITEM
========================================= */

function randomItem(array) {

    return array[randomInt(array.length)];

}


/* =========================================
   RANDOM NUMBER STRING
========================================= */

function createNumbers(length) {

    let result = "";

    for (let i = 0; i < length; i++) {

        result += randomInt(10);

    }

    return result;

}


/* =========================================
   RANDOM SYMBOL
========================================= */

function createSymbol() {

    return randomItem(symbols);

}


/* =========================================
   SELECT CATEGORY
========================================= */

function getCategory() {

    let category = categorySelect.value;

    if (category === "random") {

        const categories = Object.keys(data);

        category =
            randomItem(categories);

    }

    return category;

}


/* =========================================
   GENERATE PASSWORD
========================================= */

function generatePassword() {

    /*
        IMPORTANT:

        Only ONE category is selected.

        Example:

        Rahul@482

        OR

        BMW#729

        OR

        Rolex!531

        OR

        Minecraft$84

        It will NEVER create:

        Rahul@BMW#Rolex$482
    */


    const category =
        getCategory();


    /* Pick ONE word from ONE category */

    const word =
        randomItem(data[category]);


    let password = word;


    /* Add ONE symbol */

    if (symbolsCheckbox.checked) {

        password += createSymbol();

    }


    /* Add random numbers */

    if (numbersCheckbox.checked) {

        const length =
            Number(numberLength.value);

        password +=
            createNumbers(length);

    }


    /* Display */

    passwordDisplay.textContent =
        password;


    /* Update strength */

    updateStrength(password);


    /* Small animation */

    passwordDisplay.animate(

        [
            {
                transform: "scale(0.9)",
                opacity: 0
            },

            {
                transform: "scale(1)",
                opacity: 1
            }
        ],

        {
            duration: 300,
            easing: "ease-out"
        }

    );

}


/* =========================================
   PASSWORD STRENGTH
========================================= */

function updateStrength(password) {

    let score = 0;


    /* Length */

    if (password.length >= 8) {

        score += 25;

    }


    if (password.length >= 10) {

        score += 20;

    }


    /* Number */

    if (/\d/.test(password)) {

        score += 20;

    }


    /* Symbol */

    if (/[^A-Za-z0-9]/.test(password)) {

        score += 20;

    }


    /* Uppercase */

    if (/[A-Z]/.test(password)) {

        score += 15;

    }


    if (score < 40) {

        strengthText.textContent =
            "WEAK";

        strengthBar.style.width =
            "30%";

    }

    else if (score < 70) {

        strengthText.textContent =
            "MEDIUM";

        strengthBar.style.width =
            "65%";

    }

    else {

        strengthText.textContent =
            "GOOD";

        strengthBar.style.width =
            "100%";

    }

}


/* =========================================
   COPY PASSWORD
========================================= */

copyBtn.addEventListener(
    "click",
    async () => {

        const password =
            passwordDisplay.textContent;


        if (
            !password ||
            password === "Click Generate"
        ) {

            return;

        }


        try {

            await navigator.clipboard.writeText(
                password
            );


            copyBtn.textContent = "✓";


            setTimeout(() => {

                copyBtn.textContent = "📋";

            }, 1500);


        } catch (error) {

            alert(
                "Unable to copy password"
            );

        }

    }
);


/* =========================================
   NUMBER SLIDER
========================================= */

numberLength.addEventListener(
    "input",
    () => {

        numberValue.textContent =
            numberLength.value;

    }
);


/* =========================================
   GENERATE BUTTON
========================================= */

generateBtn.addEventListener(
    "click",
    generatePassword
);


/* =========================================
   FIRST PASSWORD
========================================= */

generatePassword();