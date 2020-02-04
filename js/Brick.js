var Brick = function(position) {
    var p = position

    var o = {
        img : getImg('brick', p.hp),
        width: 50,
        height: 18,
        x : p.x,
        y: p.y,
        hp: p.hp,
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
        o.img = getImg('brick', o.hp)
    }

    return o
}

var getImg = function(type, hp) {
    if(hp > 0) {
        var imgName = `${type}${hp-1}.png`
        var img = imgFromPath(imgName)
    } else {
        var img = imgFromPath(`${type}0.png`)
    }
    return img
}
