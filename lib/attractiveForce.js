export default class AttractiveForce {
    
    constructor (container, opts) {
        this.container = container;
        this.config = {
            zIndex: -1,
            opacity: 1,
            color: '0, 0, 0',
            count: 200,
            max: 6000
        }
        this.canvas = this.initCanvas();
        this.canvasCtx = this.canvas.getContext('2d');
        this.points = this.generatePoints();
        
        requestAnimationFrame(() => {
            this.fireCancas();
        });
    }

    initCanvas() {
        this.container.style.position = 'relative'

        let canvas = document.createElement('canvas');
        canvas.style.cssText =   `display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:${this.config.zIndex};opacity:${this.config.opacity}`;
        // 这里宽高不能用百分比，不然就坏了，画布会随着页面的resize被压缩
        canvas.width = this.container.clientWidth;
        canvas.height = this.container.clientHeight;

        this.container.appendChild(canvas);
        return canvas;
    }

    generatePoints() {
        let length = this.config.count;
        let array = Array(length).fill(0);
        return array.map((item) => {
            item = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                xDirection: 10, // 方向，也是速度
                yDirection: 2 * Math.random() -1,
                max: this.config.max
            }
            return item;
        });
    }

    fireCancas() {
        const ctx = this.canvasCtx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        const points = this.points;

        ctx.clearRect(0, 0, width, height);

        let i, e, xDistance, yDistance, totalDistance;

        points.forEach((item, index) => {
            item.x += item.xDirection;
            item.y += item.yDirection;
            
            if (item.x > width || item.x < 0) {
                item.xDirection *= -1;
            }
            if (item.y > height || item.y < 0) {
                item.yDirection *= -1;
            }
            ctx.fillRect(item.x, item.y, 10, 10);
        });
        requestAnimationFrame(() => {
            this.fireCancas();
        });
    }
}