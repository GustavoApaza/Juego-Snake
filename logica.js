document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
    const width = 20
    let currentIndex = 0 /* para el 1er div del grid */
    let appleIndex = 0 /* para el 1er div del grid */
    let currentSnake = [2, 1, 0] /* 2 es la cabeza, 1 el cuerpo y 0 la cola de la serpiente */
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
    /* Para empezar o reiniciar el juego */
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutComes, intervalTime)
    }
    /* función que se ocupa de todos los resultados de movimiento de la serpiente */
    function moveOutComes(){
        /* si la serpiente golpea el borde de la caja o asi misma */
        if(
            (currentSnake[0] + width >= (width*width) && direction === width) || /* Si la serpiente golpea la parte de abajo de la caja*/
            (currentSnake[0] % width === width -1 && direction === 1) || /* Si la serpiente golpea la parte derecha de la caja*/
            (currentSnake[0] % width === 0 && direction === -1) || /* Si la serpiente golpea la parte izquierda de la caja*/
            (currentSnake[0] - width < 0 && direction === -width) || /* Si la serpiente golpea la parte de arriba de la caja*/
            squares[currentSnake[0] + direction].classList.contains('snake') /* Si la serpiente se golpea a si misma */
        ){
            alert('Game Over \nScore: ' + score)
            return clearInterval(interval) /* Aca se limpia la variable interval porque la serpiente murio */
        }
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)
        /* cuando la serpiente se come la manzana */
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutComes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }
    /* se genera las manzanas aleatoriamente dentro de la caja */
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        }while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }
    /* asignacion de funciones para el movimiento a traves de flechas */
    function control(e){
        /* Para que la clase snake se mueva por todos los cuadrados */
        squares[currentIndex].classList.remove('snake')
        if(e.keyCode === 39){
            direction = 1 /* Si se presiona la tecla derecha entonces la serpiente ira hacia alli*/
        }else if(e.keyCode === 38){
            direction = -width /* Si se presiona la flecha arriba entonces la serpiente retrocedera 50 divs y subira */
        }
        else if(e.keyCode === 37){
            direction = -1 /* Si se presiona la flecha izquierda entonces la serpiente ira hacia alli */
        }
        else if(e.keyCode === 40){
            direction = +width /* Si se presiona la flecha abajo entonces la serpiente se movera hacia alli */
        }
    }
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})