import {
    GroupDrawArrowSocket,
    GroupDrawCircleSocket,
    GroupClearCanvasSocket,
    GroupRemoveArrowSocket
} from "../sockets/GroupSockets";

const NUM_SQUARES = 8;

export default class ChessboardArrows {

    private resFactor: number;
    private colour: string;
    private drawCanvas: any;
    private drawContext: any;
    private primaryCanvas: any;
    private primaryContext: any;
    private groupId: string
    private userRole: string
    private globalMode: boolean
    private resolution: number
    private arrows: Map<string, boolean>;

    private initialPoint: any;
    private finalPoint: any;
    private arrowWidth: number;
    private mouseDown: boolean;
    private isTestUser: boolean;

    ChessboardArrows(id, groupId: string, userRole: string, globalMode: boolean, resFactor: number = 2, colour: string = 'rgb(21, 120, 27)', arrows = new Map, isTestUser = false) {
        this.resFactor = resFactor;
        this.colour = colour;
        this.groupId = groupId;
        this.userRole = userRole;
        this.globalMode = globalMode;
        this.initialPoint = {x: null, y: null};
        this.finalPoint = {x: null, y: null};
        this.arrowWidth = 18;
        this.mouseDown = false;
        this.arrows = new Map();
        this.isTestUser = isTestUser;

        // drawing canvas
        this.drawCanvas = document.getElementById('drawing_canvas');
        this.drawContext = this.setResolution(this.drawCanvas, resFactor);
        this.setContextStyle(this.drawContext);

        // primary canvas
        this.primaryCanvas = document.getElementById('primary_canvas');
        this.primaryContext = this.setResolution(this.primaryCanvas, resFactor);
        this.setContextStyle(this.primaryContext);

        // setup mouse event callbacks
        var board = document.getElementById(id);
        board.addEventListener("mousedown", (event) => this.onMouseDown(event));
        board.addEventListener("mouseup", (event) => this.onMouseUp(event));
        board.addEventListener("mousemove", (event) => this.onMouseMove(event));
        board.addEventListener('contextmenu', (event) => event.preventDefault(), false);

        window.addEventListener('resize', () => {
            this.drawCanvas = document.getElementById('drawing_canvas');
            this.drawContext = this.setResolution(this.drawCanvas, resFactor);
            this.setContextStyle(this.drawContext);

            this.primaryCanvas = document.getElementById('primary_canvas');
            this.primaryContext = this.setResolution(this.primaryCanvas, resFactor);
            this.setContextStyle(this.primaryContext);
        })
    }

    // source: https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
    private drawArrow(context: any, fromx: number, fromy: number, tox: number, toy: number, r: number): void {
        const x_center = tox;
        const y_center = toy;
        let angle: number, x: number, y: number;

        context.beginPath();

        angle = Math.atan2(toy - fromy, tox - fromx)
        x = r * Math.cos(angle) + x_center;
        y = r * Math.sin(angle) + y_center;

        context.moveTo(x, y);

        angle += (1 / 3) * (2 * Math.PI)
        x = r * Math.cos(angle) + x_center;
        y = r * Math.sin(angle) + y_center;

        context.lineTo(x, y);

        angle += (1 / 3) * (2 * Math.PI)
        x = r * Math.cos(angle) + x_center;
        y = r * Math.sin(angle) + y_center;

        context.lineTo(x, y);
        context.closePath();
        context.fill();
    }

    private getMousePos(canvas: any, evt: any): any {
        const rect = canvas.getBoundingClientRect();
        return {
            x: this.Q(evt.clientX - rect.left),
            y: this.Q(evt.clientY - rect.top)
        };
    }

    private setContextStyle(context: any): void {
        context.strokeStyle = context.fillStyle = 'rgb(21, 120, 27)';

        let altKeyPressed = false;
        let shiftKeyPressed = false;

        const updateColor = () => {
            if (altKeyPressed && shiftKeyPressed) {
                context.strokeStyle = context.fillStyle = 'rgb(230, 143, 0)';
            } else if (shiftKeyPressed) {
                context.strokeStyle = context.fillStyle = 'rgb(136, 32, 32)';
            } else if (altKeyPressed) {
                context.strokeStyle = context.fillStyle = 'rgb(0, 48, 136)';
            } else {
                context.strokeStyle = context.fillStyle = 'rgb(21, 120, 27)';
            }
        };

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Shift') {
                shiftKeyPressed = true;
            } else if (event.key === 'Alt') {
                altKeyPressed = true;
            }
            updateColor();
        });

        window.addEventListener('keyup', (event) => {
            if (event.key === 'Shift') {
                shiftKeyPressed = false;
            } else if (event.key === 'Alt') {
                altKeyPressed = false;
            }
            updateColor();
        });

        context.lineJoin = 'butt';
    }

    private onMouseDown(event: any): void {
        if (event.which == 3) { // right click
            this.mouseDown = true;
            this.initialPoint = this.finalPoint = this.getMousePos(this.drawCanvas, event);
            this.drawCircle(this.drawContext, this.initialPoint.x, this.initialPoint.y, this.primaryCanvas.width / (this.resFactor * NUM_SQUARES * 2) - 3);
        }
    }

    private onMouseUp(event: any): void {
        if (event.which === 3) { // right click
            this.mouseDown = false;

            if (this.initialPoint.x === this.finalPoint.x && this.initialPoint.y === this.finalPoint.y) {
                if ((this.userRole !== 'STUDENT' && !this.isTestUser) || this.globalMode) {
                    this.drawCircle(this.primaryContext, this.initialPoint.x, this.initialPoint.y, this.primaryCanvas.width / (this.resFactor * NUM_SQUARES * 2) - 3);
                    GroupDrawCircleSocket({
                        room: this.groupId,
                        info: {
                            x: this.initialPoint.x,
                            y: this.initialPoint.y,
                            color: this.drawContext.strokeStyle,
                            resolution: this.resolution
                        }
                    });
                }
            } else {
                const arrowKey = `${this.initialPoint.x},${this.initialPoint.y},${this.finalPoint.x},${this.finalPoint.y}`;
                const reverseArrowKey = `${this.finalPoint.x},${this.finalPoint.y},${this.initialPoint.x},${this.initialPoint.y}`;

                if (this.arrows.has(arrowKey) || this.arrows.has(reverseArrowKey)) {
                    this.removeExactArrow(this.initialPoint.x, this.initialPoint.y, this.finalPoint.x, this.finalPoint.y);
                } else {
                    this.arrows.set(arrowKey, true);
                    if ((this.userRole !== 'STUDENT' && !this.isTestUser) || this.globalMode) {
                        this.drawArrowToCanvas(this.primaryContext);
                        GroupDrawArrowSocket({
                            room: this.groupId,
                            info: {
                                fromx: this.initialPoint.x,
                                fromy: this.initialPoint.y,
                                tox: this.finalPoint.x,
                                toy: this.finalPoint.y,
                                color: this.drawContext.strokeStyle,
                                resolution: this.resolution
                            }
                        });
                    }
                }
            }

            this.drawContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        } else if (event.which === 1) { // left click
            this.clearCanvas();
            if ((this.userRole !== 'STUDENT' && !this.isTestUser) || this.globalMode) {
                GroupClearCanvasSocket({room: this.groupId});
            }
        }
    }

    public clearCanvas(): void {
        // clear canvases
        this.arrows.clear();
        this.drawContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.primaryContext.clearRect(0, 0, this.primaryCanvas.width, this.primaryCanvas.height);
    }

    public setGlobalMode(bool: boolean): void {
        this.globalMode = bool;
    }

    private onMouseMove(event: any): void {
        this.finalPoint = this.getMousePos(this.drawCanvas, event);

        if (!this.mouseDown) return;
        if (this.initialPoint.x == this.finalPoint.x && this.initialPoint.y == this.finalPoint.y) return;

        this.drawContext.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
        this.drawArrowToCanvas(this.drawContext);
    }

    private drawArrowToCanvas(context: any): void {
        if ((this.userRole !== 'STUDENT' && !this.isTestUser) || this.globalMode) {
            let xFactor, yFactor;
            if (this.finalPoint.x == this.initialPoint.x) {
                yFactor = Math.sign(this.finalPoint.y - this.initialPoint.y) * this.arrowWidth;
                xFactor = 0
            } else if (this.finalPoint.y == this.initialPoint.y) {
                xFactor = Math.sign(this.finalPoint.x - this.initialPoint.x) * this.arrowWidth;
                yFactor = 0;
            } else {
                const slope_mag = Math.abs((this.finalPoint.y - this.initialPoint.y) / (this.finalPoint.x - this.initialPoint.x));
                xFactor = Math.sign(this.finalPoint.x - this.initialPoint.x) * this.arrowWidth / Math.sqrt(1 + Math.pow(slope_mag, 2));
                yFactor = Math.sign(this.finalPoint.y - this.initialPoint.y) * Math.abs(xFactor) * slope_mag;
            }

            context.beginPath();
            context.lineCap = "round";
            context.lineWidth = 12;
            context.moveTo(this.initialPoint.x, this.initialPoint.y);
            context.lineTo(this.finalPoint.x - xFactor, this.finalPoint.y - yFactor);
            context.stroke();

            this.drawArrow(context, this.initialPoint.x, this.initialPoint.y, this.finalPoint.x - xFactor, this.finalPoint.y - yFactor, this.arrowWidth);
        }
    }

    public socketDrawArrowToCanvas(fromx, fromy, tox, toy, color, resolution): void {
        this.primaryContext.strokeStyle = this.primaryContext.fillStyle = color;

        //context.strokeStyle = context.fillStyle = 'rgb(230, 143, 0)';

        this.primaryContext.beginPath();
        this.primaryContext.lineCap = "round";
        this.primaryContext.lineWidth = 12;
        this.primaryContext.moveTo(this.resolution / resolution * fromx, this.resolution / resolution * fromy);
        this.primaryContext.lineTo(this.resolution / resolution * tox, this.resolution / resolution * toy);
        this.primaryContext.stroke();

        this.drawArrow(this.primaryContext, this.resolution / resolution * fromx, this.resolution / resolution * fromy, this.resolution / resolution * tox, this.resolution / resolution * toy, this.arrowWidth);
    }

    private Q(x: number): number {  // mid-tread quantiser
        const d = this.primaryCanvas.width / (this.resFactor * NUM_SQUARES);
        return d * (Math.floor(x / d) + 0.5);
    }

    private drawCircle(context: any, x: any, y: any, r: number): void {
        if ((this.userRole !== 'STUDENT' && !this.isTestUser) || this.globalMode) {
            context.beginPath();
            context.lineWidth = 5;
            context.arc(x, y, r, 0, 2 * Math.PI);
            context.stroke();
        }
    }

    private redrawAllArrows(): void {
        this.clearCanvas();
        for (let arrowKey of this.arrows.keys()) {
            const [fromx, fromy, tox, toy] = arrowKey.split(',').map(Number);
            this.primaryContext.strokeStyle = this.primaryContext.fillStyle = 'rgb(21, 120, 27)';
            this.primaryContext.beginPath();
            this.primaryContext.lineCap = "round";
            this.primaryContext.lineWidth = 12;
            this.primaryContext.moveTo(fromx, fromy);
            this.primaryContext.lineTo(tox, toy);
            this.primaryContext.stroke();
            this.drawArrow(this.primaryContext, fromx, fromy, tox, toy, this.arrowWidth);
        }
    }

    public drawCircleSocket(x: string, y: string, color: string, resolution: number): void {
        this.primaryContext.strokeStyle = this.primaryContext.fillStyle = color;

        this.primaryContext.beginPath();
        this.primaryContext.lineWidth = 5;
        this.primaryContext.arc(this.resolution / resolution * x, this.resolution / resolution * y, this.primaryCanvas.width / (this.resFactor * NUM_SQUARES * 2) - 1, 0, 2 * Math.PI);
        this.primaryContext.stroke();
    }

    public removeExactArrow(fromx: number, fromy: number, tox: number, toy: number, isSocket: boolean = false): void {
        const arrowKey = `${fromx},${fromy},${tox},${toy}`;
        const reverseArrowKey = `${tox},${toy},${fromx},${fromy}`;
        if (this.arrows.has(arrowKey) || this.arrows.has(reverseArrowKey)) {
            this.arrows.delete(arrowKey);
            this.arrows.delete(reverseArrowKey);
            this.redrawAllArrows();
            if (!isSocket) {
                GroupRemoveArrowSocket({room: this.groupId, info: {fromx, fromy, tox, toy}});
            }
        }
    }


    // source: https://stackoverflow.com/questions/14488849/higher-dpi-graphics-with-html5-canvas
    public setResolution(canvas: any, scaleFactor: number): any {
        // set up CSS size

        //canvas.style.width = canvas.style.width || canvas.width + 'px';
        //canvas.style.height = canvas.style.height || canvas.height + 'px';

        // resize canvas and scale future draws
        canvas.width = Math.ceil(canvas?.offsetWidth * scaleFactor);
        canvas.height = Math.ceil(canvas?.offsetHeight * scaleFactor);
        this.resolution = canvas?.width;
        const ctx = canvas?.getContext('2d');
        ctx?.scale(scaleFactor, scaleFactor);
        return ctx;
    }
}
