import AttractiveForce from './lib/index.js';

const container = document.querySelector('body');
const opts = {
    count: 100,
    color: '0, 0, 0'
}
const AF = new AttractiveForce(container, opts);