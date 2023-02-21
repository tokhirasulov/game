const character = {
    hero: {
        name: "Wizard",
        avatar: "img/wizard.png",
        health: 60,
        diceCount: 3,
        currentDiceScore: []
    },
    orc: {
        name: "Orc",
        avatar: "img/orc.png",
        health: 30,
        diceCount: 1,
        currentDiceScore: []
    },
    demon: {
        name: "Demon",
        avatar: "img/demon.png",
        health: 25,
        diceCount: 2,
        currentDiceScore: []
    },
    goblin: {
        name: "Goblin",
        avatar: "img/goblin.png",
        health: 20,
        diceCount: 3,
        currentDiceScore: []
    }
}

let isWaiting = false

let monsterArray = ['orc',"demon", "goblin"]

function getNewMonster(){
    const newMonster = character[monsterArray.shift()]
    return newMonster ? new Character(newMonster) : {}
}

function attack(){
    if(!isWaiting){
        wizard.getDiceHtml()
        monster.getDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
    
        if(wizard.dead){
            endGame()
        } 
        else if(monster.dead){
            isWaiting = true
            if(monsterArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
                
            } 
            else {
                endGame()
            }
            
        }
}}

function endGame(){
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ?
    "No victors - all creatures are dead" :
    wizard.health > 0 ? "The Wizard Wins" :
        `The Orc is Victorious`

    const endEmoji = wizard.health > 0 ? '🔮' : '☠️'
    
    setTimeout(()=>{document.body.innerHTML = `
    <div class="end-game">
            <h2>Game Over</h2> 
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>
    `},1500)
    
    }

const getPercentage = (remainingHealth, maxHealth) => (100 * remainingHealth) / maxHealth

function getDiceRoll(diceCount){
    return new Array(diceCount).fill(0).map(function(){
        return Math.floor(Math.random()*6)+1
    })
}

function getPlaceHolder(diceCount) {
    return new Array(diceCount).fill(0).map(function(){
        return `<div class="placeholder-dice"></div>`
    }).join('')
} 


function Character(data){
    Object.assign(this, data)

    this.maxHealth = this.health

    this.getHealthBar = function(){
        const percent = getPercentage(this.health, this.maxHealth)
        return ` 
        <div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 26 ? "danger" : ""} " 
            style="width: ${percent}%;">
            </div>
        </div>`
    }

    this.getDiceHtml = function () {
        this.currentDiceScore = getDiceRoll(this.diceCount)
        this.diceArray = this.currentDiceScore.map((num) =>
            `<div class="dice">${num}</div>`).join("")
    }

    this.takeDamage = function(attackScore){
        const totalAttack = attackScore.reduce((total,num)=>total + num)
        this.health -= totalAttack
        if(this.health <= 0){
            this.dead = true
            this.health = 0
        }
    }

    this.diceArray = getPlaceHolder(this.diceCount)
    
    this.getCharacterHtml = function(){
    const {name, avatar, health, diceCount, diceArray} = this;
    const healthBar = this.getHealthBar()
    

    return `
    <div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${avatar}" />
            <div class="health">health: <b> ${health} </b></div>
            ${healthBar}
            <div class="dice-container">
            ${diceArray}
        </div>
        </div>`
}
}

function render(){
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()

}

const attackBtn = document.getElementById('attack-button').addEventListener('click',attack)

const wizard = new Character(character.hero)
let monster = getNewMonster()

render()