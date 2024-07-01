// Basic setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Adding lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);
spotLight.castShadow = true;
scene.add(spotLight);

// Marshmallow geometry
const marshmallowGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const marshmallowMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const marshmallows = [];

for (let i = 0; i < 10; i++) {
    const marshmallow = new THREE.Mesh(marshmallowGeometry, marshmallowMaterial);
    marshmallow.position.set(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
    );
    scene.add(marshmallow);
    marshmallows.push(marshmallow);
}

// Dance animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    marshmallows.forEach(marshmallow => {
        marshmallow.rotation.x += delta;
        marshmallow.rotation.y += delta;
        marshmallow.position.y += Math.sin(clock.elapsedTime * 3) * delta;
    });

    renderer.render(scene, camera);
}

camera.position.z = 5;
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
