var Pause = false

var bricks = []

var __main = function() {
    var game = Guagame()
    var paddle = Paddle()
    var ball = Ball()
    bricks = loadLevel(1)
    //计分
    var score = 0

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
        if(Pause) {
            return
        }
        ball.move()
        //hit paddle
        if(paddle.collide(ball)) {
            log('update collided')
            ball.reflect()
        }
        //hit bricks
        for (var i = 0; i < bricks.length; i++) {
            if(bricks[i].collide(ball)) {
                log('update hitted bricks', i)
                bricks[i].hit()
                ball.reflect()
                //计分
                score += 100
                //log('window.score', window.score)
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
        // log('game.draw', bricks)
        game.drawScore(score)
    }

    //debug模式
    debugModeEnable(true)
    //log('main', paddle.img, paddle.x, paddle.y)
}

__main()
