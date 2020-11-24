const style = `
<style>
    :host {
        --size-unit: 3rem;
        --full-size: calc(var(--size) * var(--size-unit));
        --half-size: calc(var(--size) * var(--size-unit) / 2);
        animation: 10s rotate infinite;
        transform-style: preserve-3d;
    }
    .side {
        width: var(--full-size);
        height: var(--full-size);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
    }

    @keyframes rotate {
        from { transform: rotate3d(1,1,1,0deg); }
        to { transform: rotate3d(1,1,1,720deg); }
    }

    .side:nth-of-type(1) {
        background: red;
        transform: translateZ(var(--half-size));
    }

    .side:nth-of-type(2) {
        background: blue;
        transform: rotateY(90deg) translateZ(var(--half-size));
    }

    .side:nth-of-type(3) {
        background: green;
        transform: rotateX(90deg) translateZ(var(--half-size));
    }

    .side:nth-of-type(4) {
        background: purple;
        transform: rotateX(90deg) translateZ(calc(var(--half-size) * -1));
    }

    .side:nth-of-type(5) {
        background: gray;
        transform: rotateY(90deg) translateZ(calc(var(--half-size) * -1));
    }

    .side:nth-of-type(6) {
        background: yellow;
        transform: translateZ(calc(var(--half-size) * -1)) rotateY(180deg);
    }
</style>
`;

export default style;
