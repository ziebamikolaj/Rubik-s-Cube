import * as THREE from "./libs/three.module.js";
import { OrbitControls } from "./libs/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
	alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 0, 0);

for (let x = 1; x <= 3; x++) {
	for (let y = 1; y <= 3; y++) {
		for (let z = 1; z <= 3; z++) {
			const material = new THREE.MeshBasicMaterial({
				color: 0x00ff00,
			});
			const geometry = new THREE.BoxBufferGeometry(x, y, z);
			const cube = new THREE.Mesh(geometry, material);
			scene.add(cube);
		}
	}
}
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, 0);
animate();

window.addEventListener("resize", function onWindowResize() {
	const aspectRatio = window.innerWidth / window.innerHeight;
	camera.aspect = aspectRatio;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
});

function animate() {
	requestAnimationFrame(animate);
	render();
}
function render() {
	controls.update();
	renderer.render(scene, camera);
}
