var Guagame = function() {
    var game = {
        actions: {},
        keydowns: {},
    }

    var canvas = e('#game')
    var context = canvas.getContext('2d')
    game.canvas = canvas
    game.context = context
    //draw
    game.drawImage = function(o) {
        game.context.drawImage(o.img, o.x, o.y)
    }

    game.drawScore = function(score) {
        var temp = `得分 ：${score}`
        game.context.font = "20px sans-serif"
        game.context.fillText(temp, 0, 30, )
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
    window.fps = 30

    var runLoop = function () {
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
        setTimeout(function() {
            runLoop()
        }, 1000/window.fps)
    }
    setTimeout(function() {
        runLoop()
    }, 1000/window.fps)

    // setInterval(function() {
    //     //log('timer')
    //     var actions = Object.keys(game.actions)
    //     for (var i = 0; i < actions.length; i++) {
    //         var key = actions[i]
    //         if(game.keydowns[key]) {
    //             game.actions[key]()
    //         }
    //     }
    //     if(Pause) {
    //         return
    //     }
    //     game.update()
    //     game.context.clearRect(0, 0, game.canvas.width, game.canvas.height)
    //     game.draw()
    // }, 1000/game.fps)

    return game
}
