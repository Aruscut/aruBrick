

var Paddle = function() {
    var img = imgFromPath('paddle.png')

    var o = {
        img : img,
        x : 0,
        y: 500,
        speed: 10,
    }

    // o.img.onload = function() {
    //     context.drawImage(o.img, o.x, o.y)
    // }
    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
    }

    return o
}

var Guagame = function() {
    var canvas = e('#game')
    var context = canvas.getContext('2d')
    var game = {
        canvas: canvas,
        context: context,
        fps: 30,
    }

    setInterval(function() {
        log('timer')
        game.update()
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height)
        game.draw()
    }, 1000/game.fps)

    return game
}

var imgFromPath = function(name) {
    var path = 'imgs/' + name
    var img = new Image()
    img.src = path
    return img
}

var __main = function() {
    var paddle = Paddle()
    var game = Guagame()

    var move_right = false
    var move_left = false

    window.addEventListener('keydown', function(event) {
        if(event.key === 'd') {
            move_right = true
            log('keydown', event.key, move_right)
        }
        if(event.key === 'a') {
            move_left = true
            log('keydown', event.key, move_left)
        }
    })
    window.addEventListener('keyup', function(event) {
        if(event.key === 'd') {
            move_right = false
            log('keyup', event.key, move_right)
        }
        if(event.key === 'a') {
            move_left = false
            log('keyup', event.key, move_left)
        }
    })

    game.update = function() {
        if(move_right) {
            paddle.moveRight()
        }
        if(move_left) {
            paddle.moveLeft()
        }
    }

    game.draw = function() {
        game.context.drawImage(paddle.img, paddle.x, paddle.y)
    }
    log('main', paddle.img, paddle.x, paddle.y)

}

__main()
