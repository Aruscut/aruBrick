var Ball = function() {
    var img = imgFromPath('ball.png')
    var o = {
        img : img,
        width : 16,
        height: 16,
        x : 60,
        y: 50,
        speed_x: -10,
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
