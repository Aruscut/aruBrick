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
            //log('collided!', o.width, o.height, 'points', points)
            return true
        }
    }
    return false
}

var debugModeEnable = function(enable) {
    if(!enable) {
        return
    }
    window.addEventListener('keydown', function(event) {
        if(event.key === 'p') {
            Pause = !Pause
        }
        if (event.key === '1') {
            bricks = loadLevel(1)
        }
        if (event.key === '2') {
            bricks = loadLevel(2)
        }
    })

    //监听fps
    var inputSpeed = e('#input-speed')
    inputSpeed.addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
        //log('inputSpeed', window.fps)
    })
}
