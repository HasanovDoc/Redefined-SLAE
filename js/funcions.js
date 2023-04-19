let iter = 0;
Points = [];

function addPoints(arr, cp1X, cp1Y, cp2X, cp2Y) {
    arr.push({
        Points: {
            cp1x: cp1X,
            cp1y: cp1Y,
            cp2x: cp2X,
            cp2y: cp2Y
        }
    })
}


function drawBezie(event) {
    iter++;
    mX = event.offsetX;
    mY = event.offsetY;

    ctx.moveTo(mX, mY);

    ctx.bezierCurveTo(530, 330, 350, 600, 550, 800);
    ctx.stroke();

    filStyle('blue');
    ctx.fillRect(530, 330, 10, 10);

    filStyle('red');
    ctx.fillRect(350, 600, 10, 10);

    filStyle('yellow');
    ctx.fillRect(550, 800, 10, 10);

    if (iter == 3) {

    }

    switch (iter) {
        case 1:
            ctx.moveTo(mX, mY);

            filStyle('blue');
            ctx.fillRect(mX, mY, 5, 5);

        case 3:
            iter = 0;

            filStyle('yellow');
            ctx.fillRect(mX, mY, 5, 5);

            filStyle('black');
            ctx.bezierCurveTo(530, 330, 350, 600, mX, mY);
            ctx.stroke();

            break;

        default:
            //iter = 0
            break;
    }
};

function filStyle(style) {
    ctx.fillStyle = style;
}