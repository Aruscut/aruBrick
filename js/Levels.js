var levels = [
    [
        {
            x: 0,
            y: 100,
            hp: 1,
        },
        {
            x: 60,
            y: 100,
            hp: 1,
        },
        {
            x: 120,
            y: 100,
            hp: 1,
        },
    ],
    [
        {
            x: 0,
            y: 100,
            hp: 1,
        },
        {
            x: 60,
            y: 100,
            hp: 1,
        },
        {
            x: 120,
            y: 100,
            hp: 1,
        },
        {
            x: 0,
            y: 150,
            hp: 2,
        },
        {
            x: 60,
            y: 150,
            hp: 2,
        },
        {
            x: 120,
            y: 170,
            hp: 2,
        },
    ],
]

var loadLevel = function(n) {
    var bricks = []
    n = n - 1
    var p = levels[n]
    // log('levels[n].length', p.length)
    for (var i = 0; i < p.length; i++) {
        let o = Brick(p[i])
        //log(`bricks${i}`, p[i])
        bricks.push(o)
    }
    return bricks
}
