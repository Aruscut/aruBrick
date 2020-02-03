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
        {
            x: 0,
            y: 150,
        },
        {
            x: 60,
            y: 150,
        },
        {
            x: 120,
            y: 170,
        },
    ],
]
