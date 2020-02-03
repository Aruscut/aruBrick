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
        //log('timer')
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

    o.move = function(x) {
        if(x < 0) {
            x = 0
        }
        if(x > 900 - o.img.width) {
            x = 900 - o.img.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.x -= o.speed
        o.move(o.x)
    }
    o.moveRight = function() {
        o.x += o.speed
        o.move(o.x)
    }

    log('Paddle o.width', o.width)

    o.collide = function(ball) {
        return collide(ball, o)
    }

    return o
}

var Ball = function() {
    var img = imgFromPath('ball.png')
    var o = {
        img : img,
        width : 16,
        height: 16,
        x : 0,
        y: 450,
        speed_x: 10,
        speed_y: 10,
        fired: false,
    }

    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if(o.fired) {
            if(o.x + o.img.width > 900 || o.x < 0) {
                o.speed_x = -o.speed_x
            }
            if(o.y + o.img.height > 600 || o.y < 0) {
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

var Brick = function(x, y) {
    var img = imgFromPath('brick0.png')

    var o = {
        img : img,
        width: 50,
        height: 18,
        x : x,
        y: y,
        hp: 1,
        alive: true
    }

    o.collide = function(ball) {
        return collide(ball, o) && o.alive
    }
    o.hit = function() {
        o.hp--
        if(o.hp <= 0) {
            o.hp = 0
            o.alive = false
        }
    }

    return o
}

var imgFromPath = function(name) {
    var path = 'imgs/' + name
    var img = new Image()
    img.src = path
    return img
}

var collide = function(ball, anyObject) {
    var b = ball
    var o = anyObject
    var points = [
        {
            x: b.x,
            y: b.y,
        },
        {
            x: b.x + b.img.width,
            y: b.y,
        },
        {
            x: b.x,
            y: b.y + b.img.height,
        },
        {
            x: b.x + b.img.width,
            y: b.y + b.img.height,
        },
    ]

    for (var i = 0; i < points.length; i++) {
        var inX = points[i].x >= o.x && points[i].x <= (o.x + o.img.width)
        var inY = points[i].y >= o.y && points[i].y <= (o.y + o.img.height)
        if(inX && inY) {
            log('collided!', o.width, o.height, 'points', points)
            return true
        }
    }
    return false
}

var levels = [
    [
        {
            x: 0,
            y: 100,
        },
        {
            x: 60,
            y: 100,
        },
        {
            x: 120,
            y: 100,
        },
    ],
]

var __main = function() {
    var game = Guagame()
    var paddle = Paddle()
    var ball = Ball()
    var bricks = []

    for (var i = 0; i < levels[0].length; i++) {
        let x = levels[0][i].x
        let y = levels[0][i].y
        let o = Brick(x, y)
        bricks.push(o)
    }

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
        for (var i = 0; i < bricks.length; i++) {
            var collidedb = bricks[i].collide(ball)
            if(collidedb) {
                log('update collided')
                bricks[i].hit()
                ball.reflect()
            }
        }
    }
    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < bricks.length; i++) {
            if(bricks[i].alive){
                game.drawImage(bricks[i])
            }
        }
    }
    //log('main', paddle.img, paddle.x, paddle.y)
}

__main()
