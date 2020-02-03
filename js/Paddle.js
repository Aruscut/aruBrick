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
