var move_right = false

var move_left = false

var speed = 10

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

var fps = 30

var p = paddle()

p.draw()

setInterval(function() {
  log('timer')
  if(move_right === true) {
    p.x += p.speed
    log('timer paddle.x', paddle.x, speed)
    p.draw()
  }
  if(move_left === true) {
    p.x -= p.speed
    p.draw()
  }
}, 1000/fps)

var __main = function() {
  var canvas = e('#game')
  var ctx = canvas.getContext('2d')
  log(ctx)

  var paddle = function() {
    var img = new Image()
    img.src = 'imgs/paddle.png'

    var o = {
      img : img,
      x : 0,
      y: 500,
      speed: 10,
    }

    o.draw = function() {
      ctx.drawImage(o.img, o.x, o.y)
    }

    return o
    // img.onload = function() {
    //   ctx.drawImage(paddle, 0, 500)
    // }
  }

}
