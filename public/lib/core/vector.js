export class Vector {
    constructor (x , y) {
        this.x = x;
        this.y = y;
    }

    isColinear(otherVector) {
        //if Cross-product is zero.
        return (this.x * otherVector.y - this.y * otherVector.x) === 0;
    }
}