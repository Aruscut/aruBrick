var Brick = function(x, y) {
    var img = imgFromPath('brick0.png')

    var o = {
        img : img,
        width: 50,
        height: 18,
        x : x,
        y: y,
        hp: 1,
        alive: true
    }

    o.collide = function(ball) {
        return collide(ball, o) && o.alive
    }
    o.hit = function() {
        o.hp--
        if(o.hp <= 0) {
            o.hp = 0
            o.alive = false
        }
    }

    return o
}
