# Pure Pazaak
Pure Pazaak is a web app made so that you can play the galaxy's premier competitive blackjack game in a browser with your friends! First created for the 2003 RPG Star Wars: Knights of the Old Republic, Pazaak is a game in which two players try to get as close to 20 as possible without going over. To that end, each player is given a side deck of four modifier cards which can adjust a player's score and potentially turn a bust into a victory if played correctly.

While the original minigame was fun, being in an exclusively single player RPG means that you could never see what it was like to play against another person. So, I decided to make this to find out. To be honest, I've mostly just played Pazaak with myself while testing it, so I'm not sure how much of the original question I actually answered, but I certainly learned a lot of other things while making it.

### How to play:
<img src="https://github.com/LinkWentz/pure-pazaak/assets/22262374/78a14548-7861-46d9-bb9f-8339350396eb" width="480" style="{display: block}"/>
<img src="https://github.com/LinkWentz/pure-pazaak/assets/22262374/4c9a22c9-3daa-4171-b853-e6fb28fb4585" width="480" style="{display: block}"/><br/>
The app itself manages games using a room system. Once you open the app you can put in a 4 character alphanumeric room code and hit join and you will be placed in a room and given a link to send to a friend. Or to put in a new tab if you too would like to play Pazaak with yourself. Your friend can also join the same way you did if you would prefer.<br/><br/>
<img src="https://github.com/LinkWentz/pure-pazaak/assets/22262374/e6311dbc-9a92-4f90-8a06-1eec9eaea754" width="480"/><br/>
Once the game has started you can play it just like you would the real thing. Your turn begins when you are dealt a card, and from there you can choose to play one card from your side deck or simply end your turn or stand on your current cards. The player who stands on the highest score under 21 wins and then it's on to the next round. First to win 3 rounds wins the game.<br/><br/>
<img src="https://github.com/LinkWentz/pure-pazaak/assets/22262374/17c336cb-4156-4c52-b38f-02a03102842b" width="480"/><br/>
Once the game is over you can choose to start another match in the same room or head back to the main menu.

### Things I Like About This App:
- You could have a friend join, leave, join again, leave again, have his friend join, then have them leave, and then you could open another window and join and finish the game out by yourself. It's only when both spaces of a game are unnocupied that the game is destroyed.
- You can implement the version of Pazaak I've written here into all sorts of things, for instance: Pazaak by mail! Though probably not, because somehow I think the magic of a game of chance is lost when you have a few hours or days between moves. 
- The SVGs for the cards. I traced them from a screenshot I took in game so the proportions are all correct and I just think they look really good.

### Planned Improvements:
- Improve user feedback. As of right now the app doesn't have much feedback to offer, especially not audio wise.
- Create a mobile layout.

Dependencies:
- [Star Jedi Font](https://www.dafont.com/star-jedi.font)
- [React 18.2.0](https://react.dev/)
- [React Router 6.11.0](https://reactrouter.com/en/main)
- [Socket.io 4.6.0](https://socket.io/get-started/chat)
- [Vite 4.1.0](https://vitejs.dev/guide/)
- [Node 18.14.0](https://nodejs.org/en/download)
