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
        if(Pause) {
            return
        }
        game.update()
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height)
        game.draw()
    }, 1000/game.fps)

    return game
}
