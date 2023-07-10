// Stylesheets
import './styles/Tutorial.css';
// Components
import Game from './Game';
import TutorialMessageBubble from './TutorialMessageBubble';
// Libraries
import { useState, useEffect, useRef } from 'react';

function Tutorial() {

    const tutorialStates = [
        {
            "boards": {
                "you": {
                    "points": 0,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [{type: "maindeck", value: 10}]
                },
                "opponent": {
                    "sidedeckSize": 4,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [{type: "maindeck", value: 7}]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": "Welcome to Pazaak! To get started, end your turn!"
            },
            "highlightClass": "highlightEndTurn",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 0,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 10}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 4,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7}, 
                        {type: "maindeck", value: 10}
                    ]
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 0,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 10},
                        {type: "maindeck", value: 8}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 4,
                    "points": 0,
                    "standing": true,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7}, 
                        {type: "maindeck", value: 10}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 0,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 10},
                        {type: "maindeck", value: 8}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 4,
                    "points": 0,
                    "standing": true,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7}, 
                        {type: "maindeck", value: 10}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": "The goal of the game is to beat your opponent's score without going over 20. Right now, your opponent has stood, which locks in their score for the rest of the round. That means if you can beat that score without going over 20, and also stand, you will win the round. Luckily you already have, so simply stand and you'll gain a point!"
            },
            "highlightClass": "highlightStand",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 0,
                    "standing": true,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 10},
                        {type: "maindeck", value: 8}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 4,
                    "points": 0,
                    "standing": true,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7}, 
                        {type: "maindeck", value: 10}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 1,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 4,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 4}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": "At the beginning of each turn, you are dealt a card valued between 1 and 10. If you end your turn without standing, you will recieve another card on your next turn."
            },
            "highlightClass": "highlightEndTurn",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 1,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 4,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 9}
                    ]
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 1,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": true,
                    "board": [
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 9},
                        {type: "sidedeck", value: 6}
                    ]
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 1,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": true,
                    "sidedeckCardPlayed": true,
                    "board": [
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 9},
                        {type: "sidedeck", value: 6}
                    ]
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 1,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 3},
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 10}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": true,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 9},
                        {type: "sidedeck", value: 6}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": "Your opponent has played a card from their side deck. The side deck is a selection of four cards that you can play once per turn to modify your score. You only get four cards per game, so you should typically only play them when you are sure it will win you the round. In this case, you have a card you can play that will bring your score to exactly 20."
            },
            "highlightClass": "highlight1stCard",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 1,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": true,
                    "board": [
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 10},
                        {type: "sidedeck", value: 3}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": true,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 9},
                        {type: "sidedeck", value: 6}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 1,
                    "standing": true,
                    "sidedeck": [
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 10},
                        {type: "sidedeck", value: 3}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": true,
                    "sidedeckCardPlayed": true,
                    "board": [
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 9},
                        {type: "sidedeck", value: 6}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": "As 20 is the highest possible score, you will automatically stand whenever you reach it. Lastly, let's cover busting. Keep ending your turn until your score is above 20."
            },
            "highlightClass": "highlightEndTurn",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2}
                    ]
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5},
                        {type: "maindeck", value: 7}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "highlightEndTurn",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5},
                        {type: "maindeck", value: 7}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 4}
                    ]
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 3}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 4}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "highlightEndTurn",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 3}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 7}
                    ]
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: -4},
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 8}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 7}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": "If you end your turn now, you will automatically lose the round. However, you can still use side deck cards to bring your score back below 20 before the end of your turn."
            },
            "highlightClass": "highlight1stCard",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": false,
                    "sidedeck": [
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 8},
                        {type: "sidedeck", value: -4}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 7}
                    ]
                }
            },
            "turn": "you",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": "Although you're not at 20, this would be a good time to stand. The chances of you busting again are high, but the odds that your opponent beats a 19 are low."
            },
            "highlightClass": "highlightStand",
            "next": () => {}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": true,
                    "sidedeck": [
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 8},
                        {type: "sidedeck", value: -4}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 2}
                    ]
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 2,
                    "standing": true,
                    "sidedeck": [
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 8},
                        {type: "sidedeck", value: -4}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 9}
                    ]
                }
            },
            "turn": "opponent",
            "finished": false,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {NextState()}
        },
        {
            "boards": {
                "you": {
                    "points": 3,
                    "standing": true,
                    "sidedeck": [
                        {type: "sidedeck", value: 6},
                        {type: "sidedeck", value: -2}
                    ],
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 5},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 8},
                        {type: "sidedeck", value: -4}
                    ]
                },
                "opponent": {
                    "sidedeckSize": 3,
                    "points": 0,
                    "standing": false,
                    "sidedeckCardPlayed": false,
                    "board": [
                        {type: "maindeck", value: 3},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 4},
                        {type: "maindeck", value: 7},
                        {type: "maindeck", value: 2},
                        {type: "maindeck", value: 9}
                    ]
                }
            },
            "turn": "opponent",
            "finished": true,
            "playerCount": 2,
            "role": "Player 1",
            "bubble": {
                "message": ""
            },
            "highlightClass": "",
            "next": () => {}
        }
    ]

    const [currentState, setCurrentState] = useState(0);
    const [displayedState, setDisplayedState] = useState(tutorialStates[currentState]);

    const timedQueue = useRef((function () {
        var API;
        const queue = [];
        var task = null;
        var tHandle;

        function next() {
            if (task !== null) {
                task.func();
                task = null;
            }
            if (queue.length > 0) {
                task = queue.shift();
                tHandle = setTimeout(next, task.time)
            }
            else {
                API.done = true;
            }
        }

        return API = {
            add: function (func, time) {
                queue.push({ func: func, time: time });
            },
            start: function () {
                if (queue.length > 0 && API.done) {
                    API.done = false;
                    tHandle = setTimeout(next, 0);
                }
            },
            clear: function () {
                task = null;
                queue.length = 0;
                clearTimeout(tHandle);
                API.done = true;
            },
            done: true,
        }
    })());

    const NextState = () => {
        if (currentState == tutorialStates.length - 1) {
            return;
        }
        setCurrentState(currentState + 1);
    };

    useEffect(() => {
        timedQueue.current.add(() => {
            setDisplayedState(tutorialStates[currentState]);
            tutorialStates[currentState]["next"]();
        }, 0);
        timedQueue.current.add(() => {}, 1000);
        timedQueue.current.start();
    }, [currentState]);

    return (
        <div className={`Tutorial ${displayedState["highlightClass"]}`}>
            <Game gameState={tutorialStates[currentState]}
            opponentsUsername={"Whoever the guy is who gives the tutorial (temp)"} 
            endTurn={NextState} stand={NextState} 
            newGame={NextState} playCard={NextState}
            updateDelay={900}/>
            <TutorialMessageBubble>{displayedState["bubble"]["message"]}</TutorialMessageBubble>
        </div>
    )
}

export default Tutorial