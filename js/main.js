var Pause = false

var loadLevel = function(n) {
    var bricks = []
    n = n - 1
    log('levels[n].length', levels[n].length)
    for (var i = 0; i < levels[n].length; i++) {
        let x = levels[n][i].x
        let y = levels[n][i].y
        let o = Brick(x, y)
        bricks.push(o)
    }
    return bricks
}

var __main = function() {
    var game = Guagame()
    var paddle = Paddle()
    var ball = Ball()
    var bricks = loadLevel(2)

    game.actionsRegister('d', function() {
        paddle.moveRight()
    })
    game.actionsRegister('a', function() {
        paddle.moveLeft()
    })
    game.actionsRegister('f', function() {
        ball.fire()
    })

    window.addEventListener('keydown', function(event) {
        if(event.key === 'p') {
            Pause = !Pause
        }
    })

    game.update = function() {
        ball.move()
        var collided = paddle.collide(ball)
        if(collided) {
            log('update collided')
            ball.reflect()
        }
        for (var i = 0; i < bricks.length; i++) {
            var hitted = bricks[i].collide(ball)
            if(hitted) {
                log('update hitted bricks', i)
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
