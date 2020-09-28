'use strict'
window.addEventListener('load', function load (event) {
    window.removeEventListener('load', load, false)

    const cardElements = document.getElementsByClassName('game-card')
    const cardElementsArray = [...cardElements]
    const imgElementsArray = []
    const closeAlertWindow = document.getElementById('closeAlert')
    const buttonNewGame = document.getElementById('restartButton')
    const buttonPlayAgain = document.getElementById('playAgain')
    const totalGameTriesElement = document.getElementById('totalGameTries')
    const totalGameTimeElement = document.getElementById('totalGameTime')
    const gameOverAlertElement = document.getElementById('gameOverAlert')
    const timer = document.getElementById('timer')
    const counter = document.getElementById('tryCounter')
    const buttonExit = document.getElementById('exit')
    let openedCards = []
    let matchedCards = []
    let totalGameTime
    let isNewGame = 0
    let nameImg = 1
    let tries = 0
    let second = 0
    let minute = 0
    let interval

    cardElementsArray.forEach(element => {
        imgElementsArray.push(createdImage('img/' + numberImg(nameImg) + '.jpg', element))
        nameImg++
    })
    function numberImg (numero) {
        if (numero % 9 === 0) {
            return 1
        }
        if (numero >= 9) {
            return numero % 9 + 1
        }
        return numero % 9
    }
    function createdImage (imgSource, aAgregar) {
        const img = document.createElement('img')
        img.src = imgSource
        img.classList.add('game-card-img')
        img.alt = imgSource
        aAgregar.appendChild(img)
        return img
    }
    // melanger les cartes
    function shuffle (array) {
        let currentIndex = array.length
        let temporaryValue
        let randomIndex

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }
    buttonNewGame.addEventListener('click', startGame)
    // function pour commencer a jouer
    function startGame () {
        // changment le nom du button
        if (buttonNewGame.value === 'New Game') {
            buttonNewGame.value = 'Restart'
            if (isNewGame === 0) {
                isNewGame = 1
            }
        }
        // shuffle cards
        const shuffledImages = shuffle(imgElementsArray)
        for (let i = 0; i < shuffledImages.length; i++) {
        // supprimer toutes les images des jeux précédents de chaque carte (le cas échéant)
            cardElements[i].innerHTML = ''

            // ajouter les images mélangées à chaque carte
            cardElements[i].appendChild(shuffledImages[i])
            cardElements[i].type = shuffledImages[i].alt

            // supprimer toutes les classes supplémentaires pour le jeu
            cardElements[i].classList.remove('show', 'open', 'match', 'disabled')
            cardElements[i].children[0].classList.remove('show-img')
        }
        // écouter les événements sur les cartes
        for (let i = 0; i < cardElementsArray.length; i++) {
            cardElementsArray[i].addEventListener('click', displayCard)
        }
        // lorsque le jeu commence, montrez toutes les cartes pendant une fraction de seconde
        flashCards()
        // réinitialiser les mouvements
        tries = 0
        counter.innerText = tries

        // Réinitialiser le minuteur lors de la réinitialisation du jeu
        timer.innerHTML = '0 mins 0 secs'
        clearInterval(interval)
    }
    // montrer les cartes avant de commencer a jouer
    function flashCards () {
        for (let i = 0; i < cardElements.length; i++) {
            cardElements[i].children[0].classList.add('show-img')
        }
        setTimeout(function () {
            for (let i = 0; i < cardElements.length; i++) {
                cardElements[i].children[0].classList.remove('show-img')
            }
        }, 5000)
    }

    function displayCard () {
        this.children[0].classList.toggle('show-img')
        this.classList.toggle('open')
        this.classList.toggle('show')
        this.classList.toggle('disabled')
        cardOpen(this)
    }

    function cardOpen (card) {
        openedCards.push(card)
        const len = openedCards.length
        if (len === 2) {
            tryCounter()
            if (openedCards[0].type === openedCards[1].type) {
                matched()
            } else {
                unmatched()
            }
        }
    }

    function matched () {
        openedCards[0].classList.add('match')
        openedCards[1].classList.add('match')
        openedCards[0].classList.remove('show', 'open')
        openedCards[1].classList.remove('show', 'open')
        matchedCards.push(openedCards[0])
        matchedCards.push(openedCards[1])
        openedCards = []
        if (matchedCards.length === 16) {
            endGame()
        }
    }

    function unmatched () {
        openedCards[0].classList.add('unmatched')
        openedCards[1].classList.add('unmatched')
        disable()
        setTimeout(function () {
            openedCards[0].classList.remove('show', 'open', 'unmatched')
            openedCards[1].classList.remove('show', 'open', 'unmatched')
            openedCards[0].children[0].classList.remove('show-img')
            openedCards[1].children[0].classList.remove('show-img')
            enable()
            openedCards = []
        }, 1100)
    }

    function disable () {
        cardElementsArray.filter((card, i) => {
            card.classList.add('disabled')
        })
    }

    function enable () {
        cardElementsArray.filter((card, i) => {
            card.classList.remove('disabled')
            for (let i = 0; i < matchedCards.length; i++) {
                matchedCards[i].classList.add('disabled')
            }
        })
    }
    function tryCounter () {
        tries++
        counter.innerHTML = 'Tries : ' + tries

        if (tries === 1) {
            second = 0
            minute = 0
            startTimer()
        }
    }
    function startTimer () {
        interval = setInterval(function () {
            timer.innerHTML = 'Time : ' + `${minute} mins ${second} secs`
            second++
            if (second === 60) {
                minute++
                second = 0
            }
            if (minute === 60) {
                minute = 0
            }
        }, 1000)
    }

    function endGame () {
        clearInterval(interval)
        totalGameTime = timer.innerHTML
        // afficher le alert à la fin du jeu
        gameOverAlertElement.classList.add('show-modal')

        // afficher totalGameTime, coups et finalStarRating dans alert
        totalGameTimeElement.innerHTML = totalGameTime
        totalGameTriesElement.innerHTML = tries
        matchedCards = []
        closeAlert()
    }

    function closeAlert () {
        closeAlertWindow.addEventListener('click', function () {
            gameOverAlertElement.classList.remove('show-modal')
            startGame()
        })
    }

    buttonPlayAgain.addEventListener('click', playAgain)
    function playAgain () {
        gameOverAlertElement.classList.remove('show-modal')
        startGame()
    }
    buttonExit.addEventListener('click', exitGame)
    function exitGame () {
        close()
    }
}, false)
