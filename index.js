
let emptyCart = document.querySelector('#emptyCart')
let buttonsDiv = document.querySelector('#buttons')
let descriptionGame = document.querySelector('#gameDescription')
let numbersDiv = document.querySelector('#numbers')

let setButton = ''

let numbersArray = []
let totalArray = [0]

let buttonComplete = document.querySelector('#completeGame')
let buttonClear = document.querySelector('#clearGame')
let buttonAddToCart = document.querySelector('#addCart')
let divCardContent = document.querySelector('#cardContent')
let totalPagamento = document.querySelector('#cartPrice')

let gameSpan = document.querySelector('#gameSpan')

window.onload = function getButton() {
    getResult()

    fetch('games.json').then((res) => { return res.json() }).then((data) => {
        data.types.forEach((item, index) => {
            let myButton = document.createElement('button')
            
            myButton.classList.add('btn-loto')
            myButton.style.background = `white`
            myButton.style.color = `${item.color}`
            myButton.style.border = `3px solid ${item.color}`
            myButton.innerHTML = `${item.type}`
            
            buttonsDiv.appendChild(myButton)

            document.getElementsByClassName('btn-loto')[0].click()

            myButton.addEventListener('click', () => {
                gameSpan.innerHTML = `${item.type.toUpperCase()}`
                
                numbersArray = []
                numbersDiv.innerText = ''
                descriptionGame.innerHTML = item.description

                for (let i = 1; i <= item.range; i++) {
                    const divInside = document.createElement('button')
                    divInside.classList.add('myNumber')

                    divInside.style.background = '#808080'
                    divInside.value = i
                    
                    if(i < 10){
                        divInside.innerHTML = `0${i}`;
                    }else{
                        divInside.innerHTML = i;
                    }
                    
                    divInside.addEventListener('click', () => {
                        if (numbersArray.length < item.maxNumber && numbersArray.indexOf(divInside.value) == -1) {
                            divInside.setAttribute('clicked', 'true')
                            divInside.style.background = `${item.color}`
                            numbersArray.push(divInside.value)
                            return numbersArray
                        } else {
                            return console.log('limite atingido ou numero adicionado')
                        }
                    })

                    numbersDiv.appendChild(divInside)
                }
                setButton = index

                return setButton
            })
        })
    })
}

buttonClear.addEventListener('click', () => {
    numbersArray = []

    const allMynumbers = document.querySelectorAll('.myNumber')

    allMynumbers.forEach((item) => {
        if (item.getAttribute('clicked')) {
            item.removeAttribute('clicked')
        }
        item.style.background = '#808080'
    })
})

buttonAddToCart.addEventListener('click', () => {
    const divInsideCart = document.createElement('div')
    divInsideCart.classList.add('divInsideCart')

    fetch('games.json').then((res) => { return res.json() }).then((data) => {

        if (numbersArray.length == data.types[setButton].maxNumber) {
            divInsideCart.setAttribute(`gamePrice`, `${data.types[setButton].price}`)

            totalArray.push(parseFloat(divInsideCart.getAttribute('gamePrice')))

            divInsideCart.innerHTML = `
                <span onclick="deleteRow()">
                    <img src="https://image.flaticon.com/icons/png/512/2782/2782872.png" width="20" height="20">
                </span>
                
                <div id="sideCartDiv" style="border-left: 4px solid ${data.types[setButton].color};">
                    <div> ${numbersArray}</div>
                    <div class="divClassSpan">
                        <span style="color:${data.types[setButton].color};">${data.types[setButton].type}</span>
                        <span>R$${data.types[setButton].price.toFixed(2).replace('.', ',')}</span>
                    <div>
                </div>
                `
            divCardContent.appendChild(divInsideCart)

            getResult()

            divInsideCartClass = document.querySelectorAll('.divInsideCart')

            divInsideCartClass.forEach((item) => {
                item.addEventListener('click', () => {
                    item.setAttribute('marked', 'true')
                    return console.log(item)
                })
            })
        }

        if (numbersArray.length == data.types[setButton].maxNumber) {
            document.querySelector('#clearGame').click()
        }

    })
})

function deleteRow() {
    divInsideCartClass.forEach((item) => {
        item.addEventListener('click', () => {
            if (item.getAttribute('marked')) {
                item.parentNode.removeChild(item);
                totalArray.splice(totalArray.indexOf(parseFloat(item.getAttribute('gamePrice'))), 1)
            }
            getResult()
        })
    })
}

function getResult() {
    if (divCardContent.children.length == 0) {
        emptyCart.style.display = 'inline-block'
    } else {
        emptyCart.style.display = 'none'
    }

    const myResult = totalArray.reduce((acumulado, atual) => {
        return acumulado + atual
    })

    totalPagamento.innerHTML = `${myResult.toFixed(2).replace('.', ',')}`

    if (totalArray.length == 0) {
        totalPagamento.innerHTML = `0,00`
    }
}

buttonComplete.addEventListener('click', () => {
    fetch('games.json').then((res) => { return res.json() }).then((data) => {

        const allMynumbers = document.querySelectorAll('.myNumber')

        while (numbersArray.length < data.types[setButton].maxNumber) {
            let match = Math.ceil(Math.random() * (data.types[setButton].range - 0) + 1)

            allMynumbers.forEach((item) => {
                if (match == item.value && !item.getAttribute('clicked')) {
                    item.setAttribute('clicked', 'true')
                    item.style.background = `${data.types[setButton].color}`
                    numbersArray.push(item.value)
                    return numbersArray
                }
            })
        }
    })
    return numbersArray
})