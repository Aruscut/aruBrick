var Guagame = function() {
    var game = {
        actions: {},
        keydowns: {},
    }

    game.fps = 30

    var canvas = e('#game')
    var context = canvas.getContext('2d')
    game.canvas = canvas
    game.context = context
    //draw
    game.drawImage = function(o) {
        game.context.drawImage(o.img, o.x, o.y)
    }
    // events
    window.addEventListener('keydown', function(event) {
        game.keydowns[event.key] = true
        log('game.keydowns', event.key)
    })
    window.addEventListener('keyup', function(event) {
        game.keydowns[event.key] = false
        //log('game.keydowns', game.keydowns)
    })
    //
    game.actionsRegister = function(key, callback) {
        game.actions[key] = callback
    }
    //timer
    setInterval(function() {
        log('timer')
        var actions = Object.keys(game.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(game.keydowns[key]) {
                game.actions[key]()
            }
        }
        game.update()
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height)
        game.draw()
    }, 1000/game.fps)

    return game
}

var Paddle = function() {
    var img = imgFromPath('paddle.png')

    var o = {
        img : img,
        width: 80,
        height: 17,
        x : 0,
        y: 500,
        speed: 10,
    }

    o.moveLeft = function() {
        o.x -= o.speed
    }
    o.moveRight = function() {
        o.x += o.speed
    }

    log('Paddle o.width', o.width)

    o.collide = function(ball) {
        var collided = ball.x >= o.x && ball.x <= (o.x + 80) && ball.y > o.y
        //log('o.collide', o.width)
        //collide check
        return collided
    }

    return o
}

var Ball = function() {
    var img = imgFromPath('ball.png')
    var o = {
        img : img,
        width : 16,
        x : 0,
        y: 450,
        speed_x: 5,
        speed_y: -5,
        fired: false,
    }

    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if(o.fired) {
            if(o.x > 900 || o.x < 0) {
                o.speed_x = -o.speed_x
            }
            if(o.y > 600 || o.y < 0) {
                o.speed_y = -o.speed_y
            }
            o.x += o.speed_x
            o.y += o.speed_y
        }
    }
    o.reflect = function() {
        o.speed_y = -o.speed_y
    }

    return o
}

var imgFromPath = function(name) {
    var path = 'imgs/' + name
    var img = new Image()
    img.src = path
    return img
}

var __main = function() {
    var game = Guagame()
    var paddle = Paddle()
    var ball = Ball()

    game.actionsRegister('d', function() {
        paddle.moveRight()
    })
    game.actionsRegister('a', function() {
        paddle.moveLeft()
    })
    game.actionsRegister('f', function() {
        ball.fire()
    })

    game.update = function() {
        ball.move()
        var collided = paddle.collide(ball)
        if(collided) {
            log('update collided')
            ball.reflect()
        }
    }
    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
    }
    //log('main', paddle.img, paddle.x, paddle.y)
}

__main()
