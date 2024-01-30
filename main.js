import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import "/style.css";



//scene
var scene = new THREE.Scene();
const hdrEquirect = new RGBELoader()
.load('/assets/studio_02.hdr', function()
{
  hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
})
scene.environment = hdrEquirect;


//LOADER---
const loader = new GLTFLoader();
loader.load ('/assets/scene2.gltf', (s61) => {

  s61.scene.scale.set(100,100,100);
  scene.add(s61.scene);
});

//lights
const light = new THREE.AmbientLight( 0xFFFFFF, 2 );
scene.add( light );
const light2 = new THREE.PointLight( 0xFFFFFF, 500, 1000 )
light2.position.set(0, -5, -40);
scene.add( light2 );
//scene.fog = new THREE.FogExp2(0x11151c, 0.02);

//cam
const cam = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 3000 );
cam.position.set(-10, -9, 24);
cam.lookAt( 0, 0, 0 );
scene.add( cam );

const camControls =
{
  radius: 30,
  speed: 0.005,
  c_height: -9
}
let cameraAngle = 0;
const sceneCenter = new THREE.Vector3(0, 0, 0);

function camAnim()
{
    const camX = camControls.radius * Math.sin(cameraAngle);
    const camZ = camControls.radius * Math.cos(cameraAngle);
    cam.position.set(camX, camControls.c_height, camZ);
    cam.lookAt(sceneCenter);
    cameraAngle += camControls.speed;
}

//resize - cam
window.addEventListener( 'resize', onWindowResize );
function onWindowResize()
{
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

//render & effects --------------------------------------------------------------------------
const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );

//document.body.appendChild( renderer.domElement );
//const controls = new OrbitControls( cam, renderer.domElement );

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

/* SHADERS
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

let composer;
const renderScene = new RenderPass( scene, cam );
renderScene.clearAlpha = 0;

const bloomparams = {
	exposure: 1,
	bloomStrength: 0.3,
	bloomThreshold: 0.1,
	bloomRadius: 2
};

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = bloomparams.bloomThreshold;
bloomPass.strength = bloomparams.bloomStrength;
bloomPass.radius = bloomparams.bloomRadius;


composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );
*/


//animate
function animate()
{
  camAnim();

  renderer.render ( scene, cam );
  //composer.render();
  //update();
  //controls.update();
  requestAnimationFrame(animate);
  
}

requestAnimationFrame(animate);

