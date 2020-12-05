for(let i = 0; i < questions.length; ++i) {
    survey_div = $("#survey-div")
    let to_append;
    if(questions[i].answers == 2) {
        to_append = $("<div class='question-outer-div><h3 class='question-h3'>" + questions[i].q + "</h3><div class='answers-div'><h5 class='option-h5'>" + questions[i].a1.name + "</h5><img alt='" + questions[i].a1.name + "' src='" + questions[i].a1.image + "'><h5 class='option-h5'>" + questions[i].a2.name + "</h5><img alt='" + questions[i].a2.name + "' src='" + questions[i].a2.image + "'></div></div>")

    }
    else if(questions[i].answers == 4) {
        to_append = $("<div class='question-outer-div><h3 class='question-h3'>" + questions[i].q + "</h3><div class='answers-div'><h5 class='option-h5'>" + questions[i].a1.name + "</h5><img alt='" + questions[i].a1.name + "' src='" + questions[i].a1.image + "'><h5 class='option-h5'>" + questions[i].a2.name + "</h5><img alt='" + questions[i].a2.name + "' src='" + questions[i].a2.image + "'><h5 class='option-h5'>" + questions[i].a3.name + "</h5><img alt='" + questions[i].a3.name + "' src='" + questions[i].a3.image + "'><h5 class='option-h5'>" + questions[i].a4.name + "</h5><img alt='" + questions[i].a4.name + "' src='" + questions[i].a4.image + "'></div></div>")
    }
    survey_div.append(to_append)
}

let questions = [
    {
        q: "Bach or Drake?",
        answers: 4,
        a1 = {
            name: "Bach",
            image: "",
            genre: "Classical"
        },
        a2 = {
            name: "Drake",
            image: "",
            genre: "Hip-Hop"
        }
    },
    {
        q: "Pick a meme song.", 
        answers: 4,
        a1 = {
            name: "Gangnam Style by PSY",
            image: "",
            genre: "Pop"
        },
        a2 = {
            name: "What Does the Fox Say by Ylvis",
            image: "",
            genre: "Pop"
        },
        a3 = {
            name: "Sandstorm by Darude",
            image: "",
            genre: "Electronic/Dance"
        },
        a4 = {
            name: "Beethoven's 5th",
            image: "",
            genre: "Classical"
        },
    },
    {
        q: "Which version of 'Baby' is your favorite?",
        answers: 4,
        a1 = {
            name: "Baby by Justin Bieber",
            image: "",
            genre: "Pop"
        },
        a2 = {
            name: "Babysitter by Dababy",
            image: "",
            genre: "Hip-Hop"
        },
        a3 = {
            name: "Babydoll by Dominic Fike",
            image: "",
            genre: "Rock"
        },
        a4 = {
            name: "Baby its Cold Outside by Frank Sinatra",
            image: "",
            genre: "Jazz"
        },
    },
    {
        q: "Old Taylor Swift or New Taylor Swift?",
        answers: 4,
        a1 = {
            name: "Old Taylor",
            image: "",
            genre: "Country"
        },
        a2 = {
            name: "New Taylor",
            image: "",
            genre: "Pop"
        }
    },
    {
        q: "Pick a geographic location.",
        answers: 4,
        a1 = {
            name: "Californiacation by The Red Hot Chilli Peppers",
            image: "",
            genre: "Rock"
        },
        a2 = {
            name: "Sweet Home Alabama by Lynyrd Skynyrd",
            image: "",
            genre: "Country"
        },
        a3 = {
            name: "Empire State of Mind by Alecia Keys",
            image: "",
            genre: "R&B/Soul"
        },
        a4 = {
            name: "Paris by the Chainsmokers",
            image: "",
            genre: "Electronic/Dance"
        },
    },
    {
        q: "Stay?", 
        answers: 4,
        a1 = {
            name: "Should I Stay or Should I Go by the Clash",
            image: "",
            genre: "Rock"
        },
        a2 = {
            name: "Stay by Rihanna",
            image: "",
            genre: "R&B/Soul"
        },
        a3 = {
            name: "Stay by Zedd & Alessia Cara",
            image: "",
            genre: "Electronic/Dance"
        },
        a4 = {
            name: "Lets Stay Together by Al Green",
            image: "",
            genre: "Jazz"
        },
    },
    {
        q: "Ya like jazz?", 
        answers: 4,
        a1 = {
            name: "I love jazz!",
            image: "",
            genre: "Jazz"
        },
        a2 = {
            name: "I hate jazz.",
            image: "",
            genre: "Electronic/Dance"
        },
        a3 = {
            name: "I love the Bee Movie",
            image: "",
            genre: "Pop"
        },
        a4 = {
            name: "Oh that's from that movie my kids made me watch",
            image: "",
            genre: "Classical"
        },
    },
    {
        q: "How do you like your USA?",
        answers: 4,
        a1 = {
            name: "American Idiot by Greenday",
            image: "",
            genre: "Rock"
        },
        a2 = {
            name: "This is America by Childish Gambino",
            image: "",
            genre: "Hip-Hop"
        },
        a3 = {
            name: "Party in the USA Miley Cyrus?",
            image: "",
            genre: "Pop"
        },
        a4 = {
            name: "American Boy Estelle",
            image: "",
            genre: "R&B/Soul"
        },
    },

    {
        q: "Bodies but like, only in a weird way if you make it weird.",
        answers: 4,
        a1 = {
            name: "Body by Loud Luxury",
            image: "",
            genre: "Electronic/Dance"
        },
        a2 = {
            name: "Touch my Body by Maria Carey",
            image: "",
            genre: "R&B/Soul"
        },
        a3 = {
            name: "Talking Body by Tove Lo",
            image: "",
            genre: "Pop"
        },
        a4 = {
            name: "Somebody to Love by Queen",
            image: "",
            genre: "Rock"
        },
    },

    {
        q: "Pick an accessory.",
        answers: 4,
        a1 = {
            name: "Cowboy Boots",
            image: "",
            genre: "Country"
        },
        a2 = {
            name: "Rave Kandi Bracelet",
            image: "",
            genre: "Electronic/Dance"
        },
        a3 = {
            name: "Healing Crystals",
            image: "",
            genre: "R&B/Soul"
        },
        a4 = {
            name: "Fedora",
            image: "",
            genre: "Jazz"
        },
    },
    {
        q: "Pick a vibey space.",
        answers: 4,
        a1 = {
            name: "Music Festival",
            image: "",
            genre: "Pop"
        },
        a2 = {
            name: "Underground Bar",
            image: "",
            genre: "Rock"
        },
        a3 = {
            name: "County Fair",
            image: "",
            genre: "Country"
        },
        a4 = {
            name: "Coffee Shop",
            image: "",
            genre: "Jazz"
        },
        a5 = {
            name: "Symphony Hall",
            image: "",
            genre: "Classical"
        },
        a6 = {
            name: "Rave",
            image: "",
            genre: "Electronic/Dance"
        },
        a7 = {
            name: "Driving with the Windows Down",
            image: "",
            genre: "Hip-Hop"
        },
        a8 = {
            name: "Bedroom",
            image: "",
            genre: "R&B/Soul"
        },
    },
    
]
