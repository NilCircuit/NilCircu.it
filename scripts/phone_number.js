// const myConsole = new CustomConsole();
// myConsole.create(600, 15, '255, 255, 255', '70, 70, 70', 15, 400, 250, 'testConsole');
// setTimeout(() => {myConsole.startChroma()}, 1000)
// myConsole.log('Hello, custom console!');


function sendNumber(input){






    // Send info back to console and site
    for (const card of document.getElementsByClassName('card-block')) {
        cnsl.log(`Name: ${card.getElementsByClassName('larger')[0].innerText}`)
        cnsl.log(`City / State: ${card.getElementsByClassName('grey')[0].innerText}`)
        cnsl.log(`Address: ${card.getElementsByTagName('div')[0].outerText}`)
        for (const i of card.getElementsByTagName('a')) {
            if (i.title.startsWith('Search people with phone number')){
                cnsl.log(`Possible number: ${i.innerText}`)
            }
        }
    }
}

