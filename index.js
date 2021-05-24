
//vars
 let buttonLotofacil = document.querySelector('#lotofacil')
 let buttonMega = document.querySelector('#mega')
 let buttonLotomania = document.querySelector('#lotomania')

 let descriptionGame = document.querySelector('#gameDescription')

 let numbersDiv = document.querySelector('#numbers')

 let setButton = ''

 let numbersArray = []

 //get description
 buttonLotofacil.addEventListener('click', ()=>{
    numbersDiv.innerText = ''

     fetch('games.json', {method: 'GET'}).then((res)=>{return res.json()})
     .then((data)=>{
         descriptionGame.innerHTML = data.types[0].description


        for(let i = 1; i <= data.types[0].range; i++){
            const divInside = document.createElement('button')
            divInside.classList.add('myNumber')
            divInside.style.background = `${data.types[0].color}`
            divInside.innerHTML = i;

            numbersArray.push(divInside)

            numbersDiv.appendChild(divInside)
        }

        return setButton = 'lotofacil'
     })
 })

 buttonMega.addEventListener('click', ()=>{
    numbersDiv.innerText = ''

    fetch('games.json', {method: 'GET'}).then((res)=>{return res.json()})
    .then((data)=>{
        
        descriptionGame.innerHTML = data.types[1].description

        for(let i = 1; i <= data.types[1].range; i++){
            const divInside = document.createElement('button')
            divInside.classList.add('myNumber')
            divInside.style.background = `${data.types[1].color}`
            divInside.innerHTML = i;
            
            numbersArray.push(divInside)

            numbersDiv.appendChild(divInside)
        }
        return setButton = 'mega'
    })
})

buttonLotomania.addEventListener('click', ()=>{
    numbersDiv.innerText = ''
    
    fetch('games.json', {method: 'GET'}).then((res)=>{return res.json()})
    .then((data)=>{
        descriptionGame.innerHTML = data.types[2].description

        for(let i = 1; i <= data.types[2].range; i++){
            const divInside = document.createElement('button')
            divInside.classList.add('myNumber')
            divInside.style.background = `${data.types[2].color}`
            divInside.innerHTML = i;

            numbersArray.push(divInside)

            numbersDiv.appendChild(divInside)
        }

        return setButton = 'lotomania'
    })
})
