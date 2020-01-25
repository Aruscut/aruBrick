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


var Paddle = function() {
    var img = imgFromPath('paddle.png')

    var o = {
        img : img,
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
    return o
}

var Guagame = function() {

}

var imgFromPath = function(name) {
    var path = 'imgs/' + name
    var img = new Image()
    img.src = path
    return img
}

var __main = function() {
    var canvas = e('#game')
    var contex = canvas.getContext('2d')
    log(contex, canvas)

    var p = Paddle()
    p.img.onload = function() {
        contex.drawImage(p.img, p.x, p.y)
    }
    log('main',p.img, p.x, p.y)
    var fps = 30
    setInterval(function() {
        log('timer')
        if(move_right === true) {
            //contex.clearRect()
            p.moveLeft()
        }
        if(move_left === true) {
            p.moveRight()
        }
    }, 1000/fps)
}

__main()
