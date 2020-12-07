let questions = [
    {
        q: "Bach or Drake?",
        answers: [
            {
                name: "Bach",
                image: "assets/bach.jpg",
                genre: "classical" 
            }, 
            {
                name: "Drake",
                image: "assets/drake.jpg",
                genre: "hiphop"
            }
        ]
    },
    {
        q: "Pick a meme song!", 
        answers: [
            {
                name: "Gangnam Style by PSY",
                image: "assets/gangnam-style.png",
                genre: "pop"
            },
            {
                name: "What Does the Fox Say by Ylvis",
                image: "assets/what-does-the-fox-say.jpg",
                genre: "pop"
            },
            {
                name: "Sandstorm by Darude",
                image: "assets/darude-sandstorm.jpg",
                genre: "electronic"
            },
            {
                name: "Beethoven's 5th",
                image: "assets/beethovens-fifth.jpg",
                genre: "classical"
            }
        ]  
    },
    {
        q: "Which version of 'Baby' is your favorite?",
        answers: [
            {
                name: "Baby by Justin Bieber",
                image: "baby.jpg",
                genre: "pop"
            },
            {
                name: "Babysitter by Dababy",
                image: "baby-sitter.jpg",
                genre: "hiphop"
            },
            {
                name: "Babydoll by Dominic Fike",
                image: "babydoll.jpg",
                genre: "rock"
            },
            {
                name: "Baby its Cold Outside by Frank Sinatra",
                image: "baby-its-cold-outside.jpg",
                genre: "jazz"
            }
        ]
    },
    {
        q: "Old Taylor Swift or New Taylor Swift?",
        answers: [
            {
                name: "Old Taylor",
                image: "old-taylor.jpg",
                genre: "country"
            },
            {
                name: "New Taylor",
                image: "new-taylor.jpg",
                genre: "pop"
            }
        ]
    },
    {
        q: "Pick a geographic location.",
        answers: [
            {
                name: "Californiacation by The Red Hot Chilli Peppers",
                image: "californiacation.jpg",
                genre: "rock"
            },
            {
                name: "Sweet Home Alabama by Lynyrd Skynyrd",
                image: "sweet-home-alabama.jpg",
                genre: "country"
            },
            {
                name: "Empire State of Mind by Alecia Keys",
                image: "empire-state-of-mind.png",
                genre: "randb"
            },
            {
                name: "Paris by the Chainsmokers",
                image: "paris.png",
                genre: "electronic"
            }
        ]
        
    },
    {
        q: "Stay?", 
        answers: [
            {
                name: "Should I Stay or Should I Go by the Clash",
                image: "should-i-stay-or-should-i-go.jpg",
                genre: "rock"
            },
            {
                name: "Stay by Rihanna",
                image: "stay.png",
                genre: "randb"
            },
            {
                name: "Stay by Zedd & Alessia Cara",
                image: "stay-zedd.jpg",
                genre: "electronic"
            },
            {
                name: "Lets Stay Together by Al Green",
                image: "lets-stay-together.jpg",
                genre: "jazz"
            }
        ]
        
    },
    {
        q: "Ya like jazz?", 
        answers: [
            {
                name: "I love jazz!",
                image: "i-love-jazz.jpg",
                genre: "jazz"
            },
            {
                name: "I hate jazz.",
                image: "i-hate-jazz.jpg",
                genre: "electronic"
            },
            {
                name: "I love the Bee Movie",
                image: "bee-movie-png",
                genre: "pop"
            },
            {
                name: "Oh that's from that movie my kids made me watch",
                image: "ya-like-jazz.png",
                genre: "classical"
            }
        ]
        
    },
    {
        q: "How do you like your USA?",
        answers: [
            {
                name: "American Idiot by Greenday",
                image: "american-idiot.jpg",
                genre: "rock"
            },
            {
                name: "This is America by Childish Gambino",
                image: "this-is-america.jpg",
                genre: "hiphop"
            },
            {
                name: "Party in the USA Miley Cyrus?",
                image: "party-in-the-usa.jpg",
                genre: "pop"
            },
            {
                name: "American Boy Estelle",
                image: "american-boy.jpg",
                genre: "randb"
            }
        ]
    },
    {
        q: "Bodies but like, only in a weird way if you make it weird.",
        answers: [
            {
                name: "Body by Loud Luxury",
                image: "body.png",
                genre: "electronic"
            },
            {
                name: "Touch my Body by Maria Carey",
                image: "touch-my-body.jpg",
                genre: "randb"
            },
            {
                name: "Talking Body by Tove Lo",
                image: "talking-body.jpg",
                genre: "pop"
            },
            {
                name: "Somebody to Love by Queen",
                image: "somebody-to-love.jpg",
                genre: "rock"
            }
        ]  
    },
    {
        q: "Pick an accessory.",
        answers: [
            {
                name: "Cowboy Boots",
                image: "cowboy.boots.jpg",
                genre: "country"
            },
            {
                name: "Rave Kandi Bracelet",
                image: "rave-kandi-bracelet.jpg",
                genre: "electronic"
            },
            {
                name: "Healing Crystals",
                image: "healing-crystals.jpg",
                genre: "randb"
            },
            {
                name: "Fedora",
                image: "fedora.jpg",
                genre: "jazz"
            }
        ] 
    },
    {
        q: "Pick a vibey space.",
        answers: [
            {
                name: "Music Festival",
                image: "festival.jpg",
                genre: "pop"
            },
            {
                name: "Underground Bar",
                image: "underground-bar.jpg",
                genre: "rock"
            },
            {
                name: "County Fair",
                image: "",
                genre: "country"
            },
            {
                name: "Coffee Shop",
                image: "coffee-stop.jpg",
                genre: "jazz"
            },
            {
                name: "Symphony Hall",
                image: "symphony-hall.jpg",
                genre: "classical"
            },
            {
                name: "Rave",
                image: "rave.jpg",
                genre: "electronic"
            },
            {
                name: "Driving with the Windows Down",
                image: "car-radio.jpg",
                genre: "hiphop"
            },
            {
                name: "Bedroom",
                image: "",
                genre: "randb"
            }
        ]
    }
]    


answers = []
for(let i = 0; i < questions.length; ++i) {
    survey_div = $("#survey-div")
    let to_append = $("<div class='question-outer-div'></div>")
    let a = $("<h3 class='question-h3'>" + questions[i].q + "</h3>")
    to_append.append(a)
    let question_wrapper = $("<div class='answers-div'></div>")
    for(let j = 0; j < questions[i].answers.length; ++j) {
        let an_answer = $("<h5 class='option-h5'>" + questions[i].answers[j].name +"</h5>")
        let ans_img = $("<img alt='" + questions[i].answers[j].name + "' src='" + questions[i].answers[j].image + "'>")
        an_answer.append(ans_img)
        an_answer.click(()=>{
            answers[i] = j
            question_wrapper.children().removeClass("selected")
            //$(question_wrapper + "h5").removeClass("selected")
            an_answer.addClass("selected")
            //console.log(an_answer)
            //console.log(answers[i])
        })
        question_wrapper.append(an_answer)
    }
    to_append.append(question_wrapper)
    // if(questions[i].answers == 2) {
    //     to_append = $("<div class='question-outer-div><h3 class='question-h3'>" + questions[i].q + "</h3><div class='answers-div'><h5 class='option-h5'>" + questions[i].a1.name + "</h5><img alt='" + questions[i].a1.name + "' src='" + questions[i].a1.image + "'><h5 class='option-h5'>" + questions[i].a2.name + "</h5><img alt='" + questions[i].a2.name + "' src='" + questions[i].a2.image + "'></div></div>")

    // }
    // else if(questions[i].answers == 4) {
    //     to_append = $("<div class='question-outer-div><h3 class='question-h3'>" + questions[i].q + "</h3><div class='answers-div'><h5 class='option-h5'>" + questions[i].a1.name + "</h5><img alt='" + questions[i].a1.name + "' src='" + questions[i].a1.image + "'><h5 class='option-h5'>" + questions[i].a2.name + "</h5><img alt='" + questions[i].a2.name + "' src='" + questions[i].a2.image + "'><h5 class='option-h5'>" + questions[i].a3.name + "</h5><img alt='" + questions[i].a3.name + "' src='" + questions[i].a3.image + "'><h5 class='option-h5'>" + questions[i].a4.name + "</h5><img alt='" + questions[i].a4.name + "' src='" + questions[i].a4.image + "'></div></div>")
    // }
    answers.push(0)
    survey_div.append(to_append)
}
$("#match-me-button").click((event)=>{
    event.preventDefault
    scoresDict = {
        "pop": 0,
        "rock": 0,
        "hiphop": 0,
        "electronic": 0,
        "country": 0,
        "classical": 0,
        "jazz": 0,
        "randb": 0
    }

    for(let i = 0; i < answers.length; ++i) {
        scoresDict[questions[i].answers[answers[i]].genre] += 1;
    }
    console.log(scoresDict)
})

//when a thing is clicked, then change answers[i] --> #
//for all answers to that question, remove class "selected", add class "selected" for answer clicked

