export default class AttractiveForce {
    
    constructor (container, opts) {
        this.container = container || document.querySelector('body');
        this.config = {
            zIndex: -100,
            opacity: .5,
            color: '255, 125, 125',
            count: 100,
            max: 10000,
        }
        Object.assign(this.config, opts);
        this.current = {
            x: null,
            y: null,
            max: this.config.max
        }
        this.canvas = this.initCanvas();
        this.canvasCtx = this.canvas.getContext('2d');
        this.points = this.generatePoints();
        this.all = this.points.concat([this.current]);

        this.bindEvents();

        
        requestAnimationFrame(() => {
            this.fireCancas();
        });
    }

    initCanvas() {
        this.container.style.position = 'relative';
        let canvas = document.createElement('canvas');
        canvas.style.cssText = `display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:${this.config.zIndex};opacity:${this.config.opacity}`;
        // 这里宽高不能用百分比，不然就坏了，画布会随着页面的resize被压缩
        canvas.width = this.container.clientWidth;
        canvas.height = this.container.clientHeight;

        this.container.appendChild(canvas);
        return canvas;
    }

    generatePoints() {
        let length = this.config.count;
        let array = Array(length).fill(0).map((item) => {
            item = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                xDirection: 2 * Math.random() -1, // 方向，也是速度
                yDirection: 2 * Math.random() -1,
                max: this.config.max
            }
            return item;
        });
        return array;
    }

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.current.x = e.clientX - this.container.offsetLeft;
            this.current.y = e.clientY - this.container.offsetTop;
        });
        window.addEventListener('resize', (e) => {
            this.canvas.width = this.container.clientWidth;
            this.canvas.height = this.container.clientHeight;
        });

    }

    fireCancas() {
        const ctx = this.canvasCtx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const points = this.points;
        const all = this.all;

        ctx.clearRect(0, 0, width, height);

        let i, e, d, xDistance, yDistance, totalDistance;

        points.forEach((item, index) => {
            item.x += item.xDirection || 0;
            item.y += item.yDirection || 0;
            
            if (item.x > width || item.x < 0) {
                item.xDirection *= -1;
            }
            if (item.y > height || item.y < 0) {
                item.yDirection *= -1;
            }
            ctx.fillRect(item.x, item.y, 1, 1);

            for (i = index + 1; i < all.length; i++) {
                e = all[i];
                if (e.x && e.y) {
                    xDistance = item.x - e.x;
                    yDistance = item.y - e.y;
                    totalDistance = xDistance * xDistance + yDistance * yDistance;

                    if (totalDistance < e.max) {
                        if (e === this.current && totalDistance >= e.max / 2) {
                            item.x -= 0.03 * xDistance; 
                            item.y -= 0.03 * yDistance;
                        }
                        d = (e.max - totalDistance) / e.max;
                        ctx.beginPath();
                        ctx.lineWidth = d / 2;
                        ctx.strokeStyle = `rgba(${this.config.color}, ${d + 0.2})`;
                        ctx.moveTo(item.x, item.y);
                        ctx.lineTo(e.x, e.y);
                        ctx.stroke();
                    }
                }
            }
        });
        requestAnimationFrame(() => {
            this.fireCancas();
        });
    }
}