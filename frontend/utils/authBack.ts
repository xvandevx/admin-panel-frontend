export default function init() {
    const {
        abs,
        cos,
        PI,
        random,
        sin,
    } = Math;
    const TAU = 2 * PI;
    const rand = (n: number) => n * random();
    const randIn = (_min: number, _max: number) => rand(_max - _min) + _min;
    const fadeInOut = (t: number, m: number) => {
        let hm = 0.5 * m;
        return abs(((t + hm) % m) - hm) / hm;
    };
    const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b;


    // @ts-ignore
    Array.prototype.lerp = function (t = [], a = 0) {
        this.forEach((n, i) => (this[i] = lerp(n, t[i], a)));
    };
    // @ts-ignore
    Float32Array.prototype.get = function (i = 0, n = 0) {
        return this.slice(i, i + n);
    };

    function createOffscreenCanvas(width: string | number, height: string | number) {
        let _canvas;

        if (typeof OffscreenCanvas !== "undefined") {
            // @ts-ignore
            _canvas = new OffscreenCanvas(parseFloat(width), parseFloat(height));
        } else {
            // @ts-ignore
            _canvas = createCanvas(width, height);
        }

        return _canvas;
    }

    function createCanvas(width: number, height: number) {
        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        return canvas;
    }

    function createContext2D(
        width = innerWidth,
        height = innerHeight,
        contextAttributes: { alpha: boolean; desynchronized: boolean; }
    ) {
        return createCanvas(width, height).getContext("2d", contextAttributes);
    }

    function createOffscreenContext2D(
        width = innerWidth,
        height = innerHeight,
        contextAttributes: { alpha: boolean; desynchronized: boolean; }
    ) {
        return createOffscreenCanvas(width, height).getContext(
            "2d",
            contextAttributes
        );
    }

    function createRenderingContext(width: number | undefined, height: number | undefined) {
        const contextAttributes = {
            alpha: true,
            desynchronized: true,
        };

        const ctx = createContext2D(width, height, contextAttributes);
        const buffer = createOffscreenContext2D(width, height, contextAttributes);
        // @ts-ignore
        ctx.canvas.style.position = "absolute";ctx.canvas.style.top = "0";ctx.canvas.style.left = "0";

        // @ts-ignore
        document.body.appendChild(ctx.canvas);

        return {
            buffer,
            ctx,
        };
    }

    "use strict";

    const particleCount = 2000;
    const particlePropCount = 9;
    const particlePropsLength = particleCount * particlePropCount;
    const spawnRadius = rand(150) + 150;
    const noiseSteps = 6;
    // @ts-ignore
    const { buffer, ctx } = createRenderingContext()

    let center: number[];
    let tick: number;
    let simplex: { noise3D: (arg0: number, arg1: number, arg2: number) => number; };
    let particleProps: Float32Array;

    function setup() {
        tick = 0;
        center = [];
        resize();
        createParticles();
        draw();
    }

    function createParticles() {
        // @ts-ignore
        simplex = new SimplexNoise();
        particleProps = new Float32Array(particleCount * particlePropCount);

        let i;

        for (i = 0; i < particlePropsLength; i += particlePropCount) {
            initParticle(i);
        }
    }

    function initParticle(i: number | undefined) {
        let iy, ih, rd, rt, cx, sy, x, y, s, rv, vx, vy, t, h, w, l, ttl;

        rd = rand(spawnRadius);
        rt = rand(TAU);
        cx = cos(rt);
        sy = sin(rt);
        x = center[0] + cx * rd;
        y = center[1] + sy * rd;
        rv = randIn(0.1, 1);
        s = randIn(1, 8);
        vx = rv * cx * 0.1;
        vy = rv * sy * 0.1;
        w = randIn(0.1, 2);
        h = randIn(160,260);
        l = 0;
        ttl = randIn(50, 200);

        particleProps.set([x, y, vx, vy, s, h, w, l, ttl], i);
    }

    function drawParticle(i: number | undefined) {
        let n, dx, dy, dl, c;
        // @ts-ignore
        let [x, y, vx, vy, s, h, w, l, ttl] = particleProps.get(i, particlePropCount);

        n = simplex.noise3D(x * 0.0025, y * 0.0025, tick * 0.0005) * TAU * noiseSteps;
        vx = lerp(vx, cos(n), 0.05);
        vy = lerp(vy, sin(n), 0.05);
        dx = x + vx * s;
        dy = y + vy * s;
        dl = fadeInOut(l, ttl);
        c = `hsla(${h},50%,60%,${dl})`;

        l++;

        // @ts-ignore
        buffer.save();buffer.lineWidth = dl * w + 1;buffer.strokeStyle = c;buffer.beginPath();buffer.moveTo(x, y);buffer.lineTo(dx, dy);buffer.stroke();buffer.closePath();buffer.restore();

        particleProps.set([dx, dy, vx, vy, s, h, w, l, ttl], i);

        (checkBounds(x, y) || l > ttl) && initParticle(i);
    }

    function checkBounds(x: number, y: number) {
        // @ts-ignore
        return(x > buffer.canvas.width || x < 0 || y > buffer.canvas.height || y < 0);
    }

    function resize() {
        // @ts-ignore
        buffer.canvas.width = innerWidth;buffer.canvas.height = innerHeight;buffer.drawImage(ctx.canvas, 0, 0);
        // @ts-ignore
        ctx.canvas.width = innerWidth;ctx.canvas.height = innerHeight;ctx.drawImage(buffer.canvas, 0, 0);

        center[0] = 0.5 * innerWidth;
        center[1] = 0.5 * innerHeight;
    }

    function draw() {
        tick++;
        // @ts-ignore
        buffer.clearRect(0,0,buffer.canvas.width,buffer.canvas.height);

        // @ts-ignore
        ctx.fillStyle = 'rgba(0,0,0,0.1)';ctx.fillRect(0,0,buffer.canvas.width,buffer.canvas.height);

        let i = 0;

        for (; i < particlePropsLength; i += particlePropCount) {
            drawParticle(i);
        }

        // @ts-ignore
        ctx.save();ctx.filter = 'blur(8px)';ctx.globalCompositeOperation = 'lighten';ctx.drawImage(buffer.canvas, 0, 0);ctx.restore();

        // @ts-ignore
        ctx.save();ctx.globalCompositeOperation = 'lighter';ctx.drawImage(buffer.canvas, 0, 0);ctx.restore();

        window.requestAnimationFrame(draw);
    }

    window.addEventListener("load", setup);
    window.addEventListener("resize", resize);
}

