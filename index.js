
//vars
let buttonLotofacil = document.querySelector('#lotofacil')
let buttonMega = document.querySelector('#mega')
let buttonLotomania = document.querySelector('#lotomania')


let buttonsDiv = document.querySelector('#buttons')

let descriptionGame = document.querySelector('#gameDescription')

let numbersDiv = document.querySelector('#numbers')

let setButton = ''

let numbersArray = []

let buttonClear = document.querySelector('#clearGame')

let buttonAddToCart = document.querySelector('#addCart')
let divCardContent = document.querySelector('#cardContent')
let totalPagamento = document.querySelector('#cartPrice')




window.onload = function getButton() {
    getResult()

    fetch('games.json').then((res) => { return res.json() }).then((data) => {
        data.types.forEach((item, index) => {
            let myButton = document.createElement('button')
            myButton.classList.add('btn-loto')
            myButton.style.background = `${item.color}`
            myButton.innerHTML = `${item.type}`
            buttonsDiv.appendChild(myButton)

            document.getElementsByClassName('btn-loto')[0].click()

            myButton.addEventListener('click', () => {
                numbersArray = []
                numbersDiv.innerText = ''
                descriptionGame.innerHTML = data.types[index].description

                for (let i = 1; i <= data.types[index].range; i++) {

                    const divInside = document.createElement('button')
                    divInside.classList.add('myNumber')
                    divInside.style.background = '#808080'
                    divInside.value = i
                    divInside.innerHTML = i;

                    divInside.addEventListener('click', () => {
                        if (numbersArray.length < data.types[index].maxNumber) {
                            divInside.style.background = `${data.types[index].color}`
                            numbersArray.push(divInside.value)
                            return numbersArray
                        } else {
                            return console.log('limite de 6 números')
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

    allMynumbers.forEach((item) => { return item.style.background = '#808080' })
})

let totalArray = [0]

buttonAddToCart.addEventListener('click', () => {
    const divInsideCart = document.createElement('div')
    divInsideCart.classList.add('divInsideCart')

    fetch('games.json').then((res) => { return res.json() }).then((data) => {

        if (numbersArray.length == data.types[setButton].maxNumber) {
            divInsideCart.setAttribute(`gamePrice`, `${data.types[setButton].price}`)

            totalArray.push(parseFloat(divInsideCart.getAttribute('gamePrice')))

            divInsideCart.innerHTML = `<div> ${numbersArray}</div>
                <div class="divClassSpan"><span style="color:${data.types[setButton].color};">${data.types[setButton].type}</span>
                <span>R$${data.types[setButton].price}</span>
                <span onclick="deleteRow()"><img src="https://image.flaticon.com/icons/png/512/2782/2782872.png" width="20" height="20"></span>
                 <div>`

            divCardContent.appendChild(divInsideCart)

            getResult()

            divInsideCartClass = document.querySelectorAll('.divInsideCart')

            divInsideCartClass.forEach((item) => {
                item.addEventListener('click', () => {
                    item.setAttribute('toBeRemoved', `${data.types[setButton].type}`)
                    item.setAttribute('marked', 'true')
                    return console.log(item)
                })
            })
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

let emptyCart = document.querySelector('#emptyCart')

function getResult() {
    if(divCardContent.children.length == 0){
        emptyCart.style.display = 'inline-block'
    }else{
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





























//get description, create buttons and select
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

                buttonComplete.addEventListener('click', () => {
                    if (setButton == 'lotofacil') {
                        let divInsideClass = document.querySelectorAll('.myNumber')
                        divInsideClass.forEach((item, index) => {
                            if (item.style.background !== '#808080' && numbersArray.length < 15) {
                                divInside.value = Math.ceil(Math.random() * (25 - 0) + 1)

                                numbersArray.push(divInside.value)
                            }
                            if ((index + 1) == numbersArray[0] || (index + 1) == (numbersArray[1])
                                || (index + 1) == numbersArray[2] || (index + 1) == numbersArray[3]
                                || (index + 1) == numbersArray[4] || (index + 1) == numbersArray[5]
                                || (index + 1) == numbersArray[6] || (index + 1) == (numbersArray[7])
                                || (index + 1) == numbersArray[8] || (index + 1) == numbersArray[9]
                                || (index + 1) == numbersArray[10] || (index + 1) == numbersArray[11]
                                || (index + 1) == numbersArray[12] || (index + 1) == (numbersArray[13])
                                || (index + 1) == numbersArray[14]) {

                                item.style.background = '#808080'
                            }
                            return numbersArray
                        })
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

                buttonComplete.addEventListener('click', () => {
                    if (setButton == 'mega') {
                        let divInsideClass = document.querySelectorAll('.myNumber')
                        divInsideClass.forEach((item, index) => {
                            if (item.style.background !== '#808080' && numbersArray.length < 6) {
                                divInside.value = Math.ceil(Math.random() * (60 - 0) + 1)

                                numbersArray.push(divInside.value)
                            }
                            if ((index + 1) == numbersArray[0] || (index + 1) == (numbersArray[1])
                                || (index + 1) == numbersArray[2] || (index + 1) == numbersArray[3]
                                || (index + 1) == numbersArray[4] || (index + 1) == numbersArray[5]) {
                                item.style.background = '#808080'
                            }
                            return numbersArray
                        })
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

                buttonComplete.addEventListener('click', () => {
                    if (setButton == 'lotomania') {
                        let divInsideClass = document.querySelectorAll('.myNumber')
                        divInsideClass.forEach((item, index) => {
                            if (item.style.background !== '#808080' && numbersArray.length < 5) {
                                divInside.value = Math.ceil(Math.random() * (80 - 0) + 1)

                                numbersArray.push(divInside.value)
                            }
                            if ((index + 1) == numbersArray[0] || (index + 1) == (numbersArray[1]) || (index + 1) == numbersArray[2] || (index + 1) == numbersArray[3] || (index + 1) == numbersArray[4]) {
                                item.style.background = '#808080'
                            }
                            return numbersArray
                        })
                    }
                })

                numbersDiv.appendChild(divInside)

            }

            return setButton = 'lotomania'
        })
})
let buttonComplete = document.querySelector('#completeGame')

//cart functions and vars

//add item ao carrinho
/*
buttonAddToCart.addEventListener('click', () => {
    const divInsideCart = document.createElement('div')
    divInsideCart.classList.add('divInsideCart')

    fetch('games.json').then((res) => { return res.json() }).then((data) => {
        data.types.forEach((item, index) => {
            return divInsideCart.innerHTML = `<div> ${numbersArray}</div>
                     <div class="divClassSpan"><span style="color:${data.types[index].color};">${data.types[index].type}</span>
                     <span>R$${data.types[index].price}</span>
                     <span onclick="deleteRow()"><img src="https://image.flaticon.com/icons/png/512/2782/2782872.png" width="20" height="20"></span>
                     <div>`
        })
    })

       switch (setButton) {

           case 'lotofacil':
               divInsideCart.setAttribute('gameType', 'lotofacil')
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
               divInsideCart.setAttribute('gameType', 'mega')
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
               divInsideCart.setAttribute('gameType', 'lotomania')
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

    divInsideCartClass = document.querySelectorAll('.divInsideCart')

    divInsideCartClass.forEach((item) => {
        item.addEventListener('click', () => {
            item.setAttribute('marked', 'true')
            return console.log(item)
        })
    })

    getResult()
})
*/


