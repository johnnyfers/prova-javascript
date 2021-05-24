
//vars
let buttonLotofacil = document.querySelector('#lotofacil')
let buttonMega = document.querySelector('#mega')
let buttonLotomania = document.querySelector('#lotomania')

let descriptionGame = document.querySelector('#gameDescription')

let numbersDiv = document.querySelector('#numbers')

let setButton = ''

let numbersArray = []

//get description
buttonLotofacil.addEventListener('click', () => {
    numbersDiv.innerText = ''
    numbersArray = []

    fetch('games.json', { method: 'GET' }).then((res) => { return res.json() })
        .then((data) => {
            descriptionGame.innerHTML = data.types[0].description


            for (let i = 1; i <= data.types[0].range; i++) {
                const divInside = document.createElement('button')
                divInside.classList.add('myNumber')
                divInside.style.background = `${data.types[0].color}`
                divInside.value = i
                divInside.innerHTML = i;

                divInside.addEventListener('click', () => {
                    if (numbersArray.length < 15) {
                        divInside.style.background = '#808080'
                        numbersArray.push(divInside.value)
                        return numbersArray
                    } else {
                        return console.log('limite de 6 números')
                    }
                })

                numbersDiv.appendChild(divInside)
            }

            return setButton = 'lotofacil'
        })
})

buttonMega.addEventListener('click', () => {
    numbersDiv.innerText = ''
    numbersArray = []

    fetch('games.json', { method: 'GET' }).then((res) => { return res.json() })
        .then((data) => {

            descriptionGame.innerHTML = data.types[1].description

            for (let i = 1; i <= data.types[1].range; i++) {
                const divInside = document.createElement('button')
                divInside.classList.add('myNumber')
                divInside.style.background = `${data.types[1].color}`
                divInside.value = i
                divInside.innerHTML = i;

                divInside.addEventListener('click', () => {
                    if (numbersArray.length < 6) {
                        divInside.style.background = '#808080'
                        numbersArray.push(divInside.value)
                        return numbersArray
                    } else {
                        return console.log('limite de 6 números')
                    }
                })

                numbersDiv.appendChild(divInside)
            }
            return setButton = 'mega'
        })
})

buttonLotomania.addEventListener('click', () => {
    numbersDiv.innerText = ''
    numbersArray = []

    fetch('games.json', { method: 'GET' }).then((res) => { return res.json() })
        .then((data) => {
            descriptionGame.innerHTML = data.types[2].description

            for (let i = 1; i <= data.types[2].range; i++) {
                const divInside = document.createElement('button')
                divInside.classList.add('myNumber')
                divInside.style.background = `${data.types[2].color}`
                divInside.value = i
                divInside.innerHTML = i;

                divInside.addEventListener('click', () => {
                    if (numbersArray.length < 5) {
                        divInside.style.background = '#808080'
                        numbersArray.push(divInside.value)
                        return numbersArray
                    } else {
                        return console.log('limite de 6 números')
                    }
                })

                numbersDiv.appendChild(divInside)
            }

            return setButton = 'lotomania'
        })
})

//cart functions and vars

let buttonClear = document.querySelector('#clearGame')
let buttonAddToCart = document.querySelector('#addCart')
let divCardContent = document.querySelector('#cardContent')
let totalPagamento = document.querySelector('#cartPrice')

buttonClear.addEventListener('click', () => {
    numbersArray = []

    const allMynumbers = document.querySelectorAll('.myNumber')

    switch (setButton) {

        case 'lotofacil':
            fetch('games.json').then((res) => { return res.json() }).then((data) => {
                allMynumbers.forEach((item) => {
                    return item.style.background = data.types[0].color
                })
            })
            break;
        case 'mega':
            fetch('games.json').then((res) => { return res.json() }).then((data) => {
                allMynumbers.forEach((item) => {
                    return item.style.background = data.types[1].color
                })
            })
            break;
        case 'lotomania':
            fetch('games.json').then((res) => { return res.json() }).then((data) => {
                allMynumbers.forEach((item) => {
                    return item.style.background = data.types[2].color
                })
            })
            break;
        default:
            break;
    }
})


const arrayLotofacil = []
const arrayMega = []
const arrayLotomania = []

//add item ao carrinho
buttonAddToCart.addEventListener('click', () => {
    const divInsideCart = document.createElement('div')
    divInsideCart.classList.add('divInsideCart')

    switch (setButton) {

        case 'lotofacil':
            fetch('games.json').then((res) => { return res.json() }).then((data) => {
                arrayLotofacil.push('.')
                return divInsideCart.innerHTML = `<div> ${numbersArray}</div>
                     <div class="divClassSpan"><span style="color:${data.types[0].color};">${data.types[0].type}</span>
                     <span>R$${data.types[0].price}</span>
                     <span onclick="deleteRow()"><img src="https://image.flaticon.com/icons/png/512/2782/2782872.png" width="20" height="20"></span>
                     <div>`
            })
            break;
        case 'mega':
            fetch('games.json').then((res) => { return res.json() }).then((data) => {
                arrayMega.push('')
                return divInsideCart.innerHTML = `<div> ${numbersArray}</div>
                 <div class="divClassSpan"><span style="color:${data.types[1].color};">${data.types[1].type}</span>
                 <span>R$${data.types[1].price}</span>
                 <span onclick="deleteRow()"> <img src="https://image.flaticon.com/icons/png/512/2782/2782872.png" width="20" height="20"> </span>
                 <div>`
            })
            break;
        case 'lotomania':
            fetch('games.json').then((res) => { return res.json() }).then((data) => {
                arrayLotomania.push('.')
                return divInsideCart.innerHTML = `<div> ${numbersArray}</div>
                 <div class="divClassSpan"><span style="color:${data.types[2].color};">${data.types[2].type}</span>
                 <span>R$${data.types[2].price}</span> 
                <span onclick="deleteRow()"><img src="https://image.flaticon.com/icons/png/512/2782/2782872.png" width="20" height="20"></span>
                <div>`
            })
            break;
        default:
            break;
    }

    divCardContent.appendChild(divInsideCart)

    getResult()
})

function getResult() {
    fetch('games.json').then((res) => { return res.json() }).then((data) => {
        return totalPagamento.innerHTML = `
            ${(arrayLotofacil.length * data.types[0].price) +
            (arrayMega.length * data.types[1].price) +
            (arrayLotomania.length * data.types[2].price)}
        `
    })
}

