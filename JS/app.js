

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

        App.$.squares.forEach((square) => { 
            square.addEventListener("click", (event) => { 
                console.log(`${event.target.id}`);
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