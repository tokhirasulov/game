const character = {
    hero: {
        name: "Wizard",
        avatar: "img/wizard.png",
        health: 60,
        diceCount: 3,
        currentDiceScore: []
    },
    monster: {
        name: "Orc",
        avatar: "img/orc.png",
        health: 30,
        diceCount: 1,
        currentDiceScore: []
    }
}


export  {character}



`<div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${avatar}" />
            <div class="health">health: <b> ${health} </b></div>
            <div class="dice-container">
                ${diceHtml}
            </div>
        </div>`