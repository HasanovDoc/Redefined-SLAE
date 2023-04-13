const canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    wrapper = document.querySelector('.wrapper');

canvas.width = wrapper.offsetWidth;
canvas.height = window.innerHeight;

//ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

ctx.beginPath();
ctx.moveTo(50, 20);
ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
ctx.stroke();

ctx.fillStyle = 'red';
ctx.fillRect(230, 30, 10, 10); // первая контрольная точка
ctx.fillRect(150, 70, 10, 10); // вторая контрольная точка

ctx.fillStyle = 'blue';
ctx.fillRect(50, 20, 10, 10); // начальная точка
ctx.fillRect(50, 100, 10, 10); // конечная точка

canvas.addEventListener('click', )