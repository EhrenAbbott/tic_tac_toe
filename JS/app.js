

// Start by identifying the elemnts we need to select; one of them will be the drop-
// down menu 

// In the "naive approach" we would do the following in  order to target the 
// drop-menu (by establishing a JS variable and  setting its value with .querySelector 
// with the class name as the argument):

//****** */
// const menu = document.querySelector('.menu'); 
//****** */

// Next, we add an event listener to the newly created variable that will do somehting 
// when clicked 
//In other words, the section below is saying: we are giving the 'menu' const the ability 
//to check for events (as set by menu.addEventListener, which could apply to anyhtig in 
// the div with the class of menu); that specific event is a click 
// (as set by the first argument); what will happen (as defined by the event callback, which
// is the second argument), is that the 'event.target' element (which is the clickable HTML portion)
// will be printed to the console.

//****** */
// menu.addEventListener('click', event => { 
//     console.log(event.target)
// })
//****** */
//So in the console we would see: <button class="menu-btn">

//In order  to target the options that will get displayed when you click the .menu botton, 
// you would use:  

//****** */
// const menuItems = menu.querySelector(".items"); 
//****** */

//So this is saying: within the div with a class of "menu," this const will refer to the 
// child element with a class of "items" 

//****** */
// menu.addEventListener("click", (event) => { 
//     menuItems.classList.toggle('hidden')
// });
//****** */
//In other words: for the const menuItems, we will be doign something with one of 
//its classes (.classList), and this action will be to essentially turn the class on 
// or off (.toggle); specifically, that class that whe want to turn on/off is  called 'hidden', 
// which we have defined in the CSS file

//Defining a variable called menu, as above, might get tricky if the app expands and 
// as multiple JS files are linked bc if there is another globally defined menu var in another 
//linked JS file, it will not necessarily reference the correct one. To avoid this you would
// create an object and store the other variable names in an object with the same name as the file: 
//****** */
// const App = { 
//     $: { 
//         menu: document.querySelector('.menu'), 
//         menuItems: document.querySelector('.items')
//     }
// }
//****** */
// It is standard practice to nest these inside another object where the '$' is used as the property name
// So the menu variable would no be referenced as: App.$.menu
//The word 'App' here is what's called a namespace.

//So now to add the toggle feature we would use: 
//****** */
// App.$.menu.addEventListener("click", (event) => { 
//     App.$.menuItems.classList.toggle("hidden");
// }) 
//****** */

//But there is a way to make this even more efficient, which is to make the above event listener 
// a part of an anonymous function in the App object: 
//****** */
const App = { 
    $: { 
        menu: document.querySelector('[data-id="menu"]'), 
        menuItems: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        squares: document.querySelectorAll('[data-id="square"]'),
    }, 

    state: { 
        moves: [], 
    },
    
    init() { 
        App.registerEventListeners()
    }, 

    registerEventListeners() { 
        //DONE
        App.$.menu.addEventListener("click", (event) => { 
            App.$.menuItems.classList.toggle("hidden");
        });  

        //TODO
        App.$.resetBtn.addEventListener("click", (event) => { 
            console.log('Reset the game');
        });

        //TODO
        App.$.newRoundBtn.addEventListener("click", (event) => { 
            console.log('Add a new round');
        });

       //TODO
        App.$.squares.forEach((square) => { 
            square.addEventListener("click", (event) => { 
                console.log(`${event.target.id}`);  
                //Check if there is already a plan; if there is, return early.
                const hasMove = (squareId) => { 
                    const existingMove = App.state.moves.find(move => move.squareId === squareId)
                    return existingMove !== undefined
                }   

                
                if (hasMove(+square.id)){ 
                    return;
                }

                //Determine which player icon gets added to the square
                const lastMove = App.state.moves.at(-1);
                const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
                const currentPlayer = 
                    App.state.moves.length === 0 
                        ? 1 
                        : getOppositePlayer(lastMove.playerId);

                const icon = document.createElement("i");

                if(currentPlayer === 1) { 
                    icon.classList.add("fa-solid", "fa-x", "yellow");
                } else { 
                    icon.classList.add("fa-solid", "fa-o", "turquoise");
                }

                App.state.moves.push({ 
                    squareId: +square.id, 
                    playerId: currentPlayer
                })
                

                square.replaceChildren(icon);

                //Check if a player has won or if the game has ended in a tie
                const winningPatterns = [
                    [1, 2, 3],
                    [1, 5, 9],
                    [1, 4, 7],
                    [2, 5, 8],
                    [3, 5, 7],
                    [3, 6, 9],
                    [4, 5, 6],
                    [7, 8, 9],
                  ];
            });
        });
    }
}; 
//****** */
//NOTE: the .querySelector arg was changed from '.menu' to '[data-id="menu"]' (menuITems was also changed) to select based on class
// which is more stable when using a data-id. This is because if we were selecting it based on its class, 
// and we change the class in order to modify the styling with CSS, the that functionality would be broken.
// So this is a way of uncoupling classes that contribute style from classes that are responsible for functionality. 
//Here the init method, is a function property on an object written in ES6

//As it is above, this would still not do anyhting; you would need to call the init() method 
//to allow the specified event to take place: 
//****** */
// window.addEventListener("load", () => App.init()); 
//****** */
//Note that the speciic event listener "load" cannot be used with "document", so it has to be applied 
// to 'window'. 
//The above is saying: after all of the HTML elements of the window finish fully loading, run the init() method in
// the App object. It is good to have the occur with a 'load' event listener so that you don't 
//run the risk of the JS elements running before the HTML has fully loaded

//And a more concise way to write the above is: 
window.addEventListener("load", App.init);  


//Now we will add the reset button and new round button to the App object above so we can use them as well: 

//And a reset button event listneer will be added WITHIN the init() method. A new round button will also be added. 

//Now we will add the following selector to App object: 
//****** */ 
// squares: document.querySelectorAll('[data-id="square"]')
//****** */ 
//Notice that here we are using querySelectorAll to chose EVERYTHING with that attribute/value, not just a single element

//Now add we need to add functionality to each of the game board buttons: 
///****** */ 
// App.$.squares.forEach((square) => { 
//     square.addEventListener('click', (event) => { 
//         console.log(${event.target.id});
//     })
// })
//****** */ 
//Here we are saying: we are starting with the variable App.$.squares, but since this variable could refer to anything with the 
//data-id of 'square' that could be multiple element, and we want to target them all-- forEach.(square). After we target them, 
// we will be adding an event listener that activates with a click. this click will result in printing the event target's own id.

//Now we will add all of the method into another method just to get the init method clean. This is just for organizational purposes.


//Now to add functionality to the sqaure buttons, so that they display an icon when clicked.
//First start by creating the icon element itself (the 'X' and 'O' that wull get displayed when clicked): 
//****** */
// const icon = document.createElement("i");
//****** */ 
// The "i" is an HTML element that represent a visual icon (like the kind FontAwesome is used for). So here we are just creating it
//but not putting it anywhere or defining it in any way. 

//Here is where we will give it some classes, some of which are from FontAwesome and one of which we have defined ourselves in the CSS document.
//****** */ 
// icon.classList.add("fa-solid", "fa-x", "yellow");
//****** */

//So now that the element has been created, we need to add it into the target that was clicked. Because remember that right now it just exists, 
// it is not actually being used. 
//****** */
// square.replaceChildren(icon);
//****** */
//As of now, when you click the squares, the X will appear, but you can keep clicking any given square to add multiple X's, which is not what we want.

//This is a good time to talk about the difference between 'client state' and 'server state'
// CLIENT STATE would be a state that we have within the DOM that does not need to change anything that is persistent long term. So for example the 
//action menu opening and closing would be a client side state change because if you were to refresh the page after clicking the dropdown
//menu, the menu would not stay down but it would be refreshed with the options hidden. It is a temporary change. 
// SERVER STATE would remain after browser refreshes, so in the case of this game it would include things like,  which player has the current move, the game 
// score, and game history.

//So to start handling state change we will have to first define what sates we will need to keep track of: 
//****** */
// state: { 
//     currentPlayer: 1
// }
//****** */ 

//So in our method that runs when we click a square we will add: 
//****** */
// const currentPlayer = App.state.currentPlayer;
//****** */
//This is just creating a variable and assigning it to the value of the state, so that it can be used in  the  click square function

// Now link the state, which tracks which player's turn it is, to the icon  appearance. We'll use an if statemtent:
///****** */
// if(currentPlayer === 1) { 
//     icon.classList.add("fa-solid", "fa-x", "yellow");
// } else { 
//     icon.classList.add("fa-solid", "fa-o", "turquoise");
// } 
//****** */
//Because the const that creates the icon element exists outside (and before) the if statment, we can just assign different classes 
//to the element based on which player has the current turn; we don't have to create two seperate icon variable for each different player; 
// we just have to systematically alter the one icon's appearance using class variables that we have defined in the css file.
//Note that this doesn't actually make the icon appear(!); it is just saying that the icon, whenever it get displayed, which is still tbd, 
//will look like this. Make makes it appear is the subsequent line of code: square.replaceChildren(icon);

//After the make it so the correct icon can appear for each player, we need to update the state so the first player does not just 
// get infinite consecutive turns: 
//****** */
// App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1
//****** */
// The ternary operator after the '===' is saying: if the current player is to to 1, then it will become 2; 
// otherwise (if it is not set to 1),  it will become 1. This functions as a toggle to swap turns between players.

//So right now it will successfully alternate beween X's and O's; however the problem where multiple icons get displayed  in the same 
// square still persists. To do this we need to write an if statement checking to see if the square getting clicked already has a child
// node/element, which in this case would be the X or O we are checking for: 
//****** */ 
// if (square.hasChildNodes()) { 
//     return;
// }
//****** */

//Now we add the winningPatterns const just so we have a set list of moves that we know woudl result in a winning game

//Instead of checking th scorboard and looping through the list of wining moves every time a player has completed their turn, it would be 
// much more efficient to create a state that essentially logs the moves each player has made: 
//****** */
// moves: [], 
//****** */ 

//Now to make it so the player and their move gets recorded to the new state as an object with two properties: 
//****** */
// App.state.moves.push({ 
//     squareId: +square.id, 
//     playerId: currentPlayer
// }) 
//****** */
//Notice that this has to happen BEFORE the line with the ternary operator that changes the current player, or else the wrong player would be recorded
//(The plus operator is to ensure that that value is added a number and not a steing)
//This means that our currentPlayer state is now redundant, so we can delete it. 

//To begin determining which player icon gets added to the square, we need to create a variable to check 
// the moves state in order to extract the last element of the array (to see who moved last, since that would have gotten pushed to the state): 
//****** */
// const lastMove = App.state.moves.at(-1)
//****** */
//The .at(-1) is just a concise JS way of grabbing the last element of an array (instead of finding the length  of the list and subtracting 1, which)
// would be much longer. Keep in mind this could turn out to be unfedined if there is nothing in the array.

//Now to check the lastMove variable and use it to set the currentPlayer. We will start by 
//making a variable to determine the player that ISN'T the one that took the last move:
//****** */
// const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
//****** */
//^This way way are sitting a variable to a anonymous function where we are passing in playerId. Then we are saying, 
// if playerId is 1 then the opposite player is the only other number (and vice versa)

//****** */
// const currentPlayer = 
//     App.state.moves.length === 0 
//         ? 1 
//         : getOppositePlayer(lastMove.playerId);
//****** */
//What this is dong is first checking to see if any moves have been made. 
//Essentially it can be read as: if the moves state array is empty (so, if the length is zero), then we know that no moves 
//have been made and we can set the current player to player 1. However, if a move has been made (which we would deduce from the length 
// of the moves state being greater than 0), then we will refer to the getOppositePlayer variable/method to derive the currentPlayer; 
// getOppositePlayer  variable/method will look at the lastMove const, which will be referencing the last value in the moves array. 
// Depending on what this value is, the getOpposite function will set this to either 2 or 1.
// We can also now get rid of the previous line of code that determined th current player bc it is no longer needed. 

//Now that we are tracking the game moves, we dont need to block fo code that checks to see is the square being
//clicked has any child nodes (with the if statement). This relies on the DOM itself and it would better to just check 
// express what we are attempting to do verify the state of the game. So for this we will create a helper method. 
//****** */ 
// const hasMove = (squareId) => { 
//     const existingMove = App.state.moves.find(move => move.squareId === squareId)
//     return existingMove !== undefined
// } 
//****** */
//Here we are making a function that takes a squareId (a number). Then we are making a variable that is equal to App.state.moves, 
// and then we will look for the squareId in that array by using .find. Here, find will take the move and check if its squareId matches 
// the squareId that we are passing into the hasMove function.

//Now we can replace the square.hasChildNodes part with the fuction we just wrote: 
//****** */ 
// if (hasMove(+square.id)){ 
//     return;
// }
//****** */

//It's important to note that whenever you are tracking state within an application, it should be kept  as simple as possible 
// This is bc whenever you track something in state you will be updating it somewhere, and the more thing
//you track the more updates you will have to keep tabs on; if there are too many things to keep track of, things can start 
//to slip through the cracks and this will result in errors. 

//The next part will be to determine if a player has won the game or if there is a tie. 
//We will do this with a utility function: 
//****** */
getGameStatus(moves) {  

    const p1Moves = moves.filter(move => move.playerId === 1)
    const p2Moves = moves.filter(move => move.playerId === 2)

    const winningPatterns = [
        [1, 2, 3],
        [1, 5, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 5, 7],
        [3, 6, 9],
        [4, 5, 6],
        [7, 8, 9],
      ];

    return { 
        status: 'in-progress', //in-progress | complete
        winner: 1 // 1 | 2 | null
    }
}
//****** */
//This function will take in an array of moves from state. We start by making the return statement where we
// will keep track of if the game has been completed or if it's ongoing. We will also track which player is the winner (or if it has tied) 
// We will then get player1 moves bc filterig the moves array according to the playerId. We will do the same for player2. 
// Next we will copy and paste our winningPatterns const into this method, and we will look through these patterns to see 
//if they match up with ay of the filtered player move arrays. So we start by making a winner variable, which is automatically 
// set to null.

//2:35:37