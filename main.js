import './style.css'
import * as T from "three"
import gsap from "gsap";
import { OrbitControls, Reflector, TextGeometry, FontLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';;
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { TextureLoader } from "three";
import { DRACOLoader } from 'three/examples/jsm/Addons.js';
import RajdHani from "./RajdHani.json"

const font2 = new FontLoader().parse(RajdHani)
const scene = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
const loader = new GLTFLoader().setPath("./model/");
const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
const draco = new DRACOLoader()
draco.setDecoderPath('/examples/jsm/libs/draco/');
loader.setDRACOLoader(draco);
if (localStorage.getItem("clickCount") == null) {
    let clickCount = 5
    localStorage.setItem("clickCount", clickCount)
}


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.toneMapping = T.CineonToneMapping
// renderer.toneMappingExposure = 1.5
// renderer.outputColorSpace = T.SRGBColorSpace
renderer.domElement.classList.add("absolute")

var click = new Audio('Sounds/click.mp3');
var whoosh = new Audio("Sounds/whoosh.mp3")
var ding = new Audio("Sounds/ding.mp3")
const audio = document.querySelector("audio");
const darkMaterial = new T.MeshBasicMaterial({ color: 'black' });
const materials = {};

camera.position.set(230, 230, 500)

// let elem = document.createElement('div');
// elem.className = "flex absolute h-[100dvh] items-center justify-center md:left-[20%] md:right-[20%] left-0 right-0"
// elem.id = "wrapper"
// elem.innerHTML = `
//     <div
//       class="flex md:flex-row flex-col relative bg-[#1d1f39] z-[26] h-fit rounded-[20px] flex-wrap transition-all duration-300"
//       id="popframe">
//       <form onsubmit="start()" class="flex flex-col px-5 py-1 justify-center items-center md:text-[16px] text-[10px] w-full">
//         <label class="py-2 text-white" for="name">Name of CoffeeShop</label>
//         <input type="text" name="name" class="px-2 py-1 border-zinc-500 border-2 rounded-[5px] text-black" id="name" maxlength="11" required>
//         <button
//           class="text-[40px] text-white hover:text-violet-600" type="submit">
//           Start</button>
//       </form>
//     </div>
//     `
// document.getElementById("startSection").appendChild(elem)

document.addEventListener("DOMContentLoaded", () => {
    window.start = () => {
        // event.preventDefault();
        // const textGeometry = new TextGeometry(event.target[0].value, {
        //     font: font2,
        //     size: 3,
        //     depth: 0.6,
        // });
        // textGeometry.computeBoundingBox();
        // const textMat2 = new T.MeshStandardMaterial({ color: 0xffff00 })
        // const textMesh2 = new T.Mesh(textGeometry, textMat2)
        // textMesh2.position.set(11, 14, 10)
        // textMesh2.rotation.y = 1.55

        // scene.add(textMesh2)
        audio.setAttribute('src', "CityCrowd.mp3")
        // audio.play()
        document.querySelector("#startSection").classList.add("hidden")
        const textGeometry2 = new TextGeometry("Cafe VR", {
            font: font2,
            size: 20,
            depth: 0.6,
        });
        textGeometry2.computeBoundingBox();
        const textGeometry3 = new TextGeometry("Start", {
            font: font2,
            size: 22.5,
            depth: 0.6,
        });
        const textGeometry4 = new TextGeometry(localStorage.getItem("clickCount"), {
            font: font2,
            size: 22.5,
            depth: 0.6,
        });
        // const textGeometry5 = new TextGeometry("About US", {
        //     font: font2,
        //     size: 22.5,
        //     depth: 0.6,
        // });
        // const textGeometry6 = new TextGeometry("Contact US", {
        //     font: font2,
        //     size: 22.5,
        //     depth: 0.6,
        // });
        textGeometry2.computeBoundingBox();
        const textMat = new T.MeshStandardMaterial({ color: 0xffffff })
        const textMesh = new T.Mesh(textGeometry2, textMat)
        // const textMesh2 = new T.Mesh(textGeometry3, textMat)
        textMesh.position.set(-20, 215, -111)
        textMesh.rotation.y = 3.1;
        scene.add(textMesh)
        const textMesh2 = new T.Mesh(textGeometry3, textMat)
        textMesh2.rotation.y = 3.13;
        textMesh2.rotation.x = 1.55;
        textMesh2.position.z = -350;
        textMesh2.position.x = 0;
        textMesh2.name = "start"
        const textMesh3 = new T.Mesh(textGeometry4, textMat)
        textMesh3.rotation.y = 3.13;
        textMesh3.rotation.x = 1.55;
        textMesh3.position.z = -350;
        textMesh3.position.x = 40;
        textMesh3.name = "clickCount"
        // const textMesh4 = new T.Mesh(textGeometry5, textMat)
        // textMesh4.rotation.y = 3.13;
        // textMesh4.rotation.x = 1.55;
        // textMesh4.position.z = -350;
        // textMesh4.position.x = -80;
        // const textMesh5 = new T.Mesh(textGeometry6, textMat)
        // textMesh5.rotation.y = 3.13;
        // textMesh5.rotation.x = 1.55;
        // textMesh5.position.z = -350;
        // textMesh5.position.x = -180;

        scene.add(textMesh2)
        scene.add(textMesh3)
        // scene.add(textMesh4)
        // scene.add(textMesh5)
        gsap.to(camera.position, {
            x: 300,
            y: 50,
            z: -420,
            duration: 6,
            ease: "expo.inOut",
            onStart: () => controls.enabled = false,
            onComplete: () => controls.enabled = true,
        },)
        gsap.to(controls.target, {
            x: 0,
            y: 13,
            z: 0,
            duration: 5,
            ease: "expo.inOut",
            onStart: () => controls.enabled = false,
            onComplete: () => controls.enabled = true,
            onUpdate: function () {
                controls.update()
            }
        })
        document.getElementById("canvasHolder").appendChild(renderer.domElement);
        // click.play()
        // whoosh.play()
        // window.setTimeout(() => { ding.play() }, 1000)
        // window.setInterval(() => {
        //   scene.traverseVisible(obj => {
        //     if (obj.name == "rain") {
        //       gsap.to(obj.position, {
        //         y: 0,
        //         duration: 2,
        //         ease: "none",
        //       })
        //     }
        //   })
        //   scene.traverseVisible(obj => {
        //     if (obj.name == "rain") {
        //       const [y] = Array(1).fill().map(() => T.MathUtils.randFloatSpread(45))
        //       obj.position.y = 40 + y
        //     }
        //   })
        // }, 2005);
    }

    window.handleClicker = () => {
        scene.children.forEach(obj => {
            if (obj.name == "clickCount") {
                scene.remove(obj);
            }
        })
        let count = localStorage.getItem("clickCount");
        count++
        localStorage.setItem("clickCount", count)
        const textGeometry4 = new TextGeometry(localStorage.getItem("clickCount"), {
            font: font2,
            size: 22.5,
            depth: 0.6,
        });
        const textMat = new T.MeshStandardMaterial({ color: 0xffffff })
        const textMesh3 = new T.Mesh(textGeometry4, textMat)
        textMesh3.rotation.y = 3.13;
        textMesh3.rotation.x = 1.55;
        textMesh3.position.z = -350;
        textMesh3.position.x = 40;
        textMesh3.name = "clickCount";
        scene.add(textMesh3)
        document.getElementById('player').stop()
        document.getElementById('player').play()
    }
    start()
})

let mixer, clock;
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    finalComposer.setSize(window.innerWidth, window.innerHeight);
});

loader.load("shop design Ai 02.gltf", function (gltf) {
    var mesh = gltf.scene;
    // mesh.scale.set(0.2, 0.2, 0.2);
    // const planeGeo = new T.PlaneGeometry(450, 450)
    // const reflector = new Reflector(planeGeo, {
    //     clipBias: 0.003,
    //     textureWidth: window.innerWidth * window.devicePixelRatio,
    //     textureHeight: window.innerHeight * window.devicePixelRatio,
    //     color: 0x777777
    // });

    // console.log(mesh);
    // // reflector.position.y = 1
    // reflector.rotation.x = - Math.PI / 2;
    // scene.add(reflector);
    mesh.position.set(0, 1, 0);
    mixer = new T.AnimationMixer(mesh);
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });
    clock = new T.Clock()
    animate()
    scene.add(mesh)
    loading()
})
loader.setPath("./coin-model/")

loader.load("scene.gltf", function (gltf) {
    var mesh = gltf.scene;
    // mesh.scale.set(0.2, 0.2, 0.2);
    // const planeGeo = new T.PlaneGeometry(450, 450)
    // const reflector = new Reflector(planeGeo, {
    //     clipBias: 0.003,
    //     textureWidth: window.innerWidth * window.devicePixelRatio,
    //     textureHeight: window.innerHeight * window.devicePixelRatio,
    //     color: 0x777777
    // });

    // console.log(mesh);
    // // reflector.position.y = 1
    // reflector.rotation.x = - Math.PI / 2;
    // scene.add(reflector);
    mesh.position.set(-402, 50, -16.5);
    animate()
    scene.add(mesh)
})

// let points2
// loader.setPath("./TextModels/")
// loader.load("Text.gltf", function (gltf) {
//     const mesh = gltf.scene
//     mesh.rotation.y = 1.6
//     mesh.position.x = 90
//     mesh.scale.set(0.55, 0.55, 0.55)
//     console.log(mesh);
//     for (let i = 0; i < mesh.children.length; i++) {
//         const geo5 = mesh.children[i].children[0].geometry;
//         const posAtr = geo5.attributes.position;
//         const positions = posAtr.array; // Directly access the array
//         const vertices = [];

//         for (let i = 0; i < posAtr.count; i++) {
//             vertices.push({
//                 x: posAtr.getX(i),
//                 y: posAtr.getY(i),
//                 z: posAtr.getZ(i)
//             });
//         }

//         const pointGeometry = new T.BufferGeometry();
//         pointGeometry.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
//         const pointMaterial = new T.PointsMaterial({ color: 0xffffff, size: 0.05 });
//         points2 = new T.Points(pointGeometry, pointMaterial);
//         points2.scale.set(3, 3, 3)
//         points2.position.set(-80, 0, -250)
//         points2.rotation.y = 3.15
//         points2.layers.toggle(BLOOM_SCENE)
//         points2.name = "points" + (i + 1)
//         scene.add(points2);
//     }
// })

const BLOOM_SCENE = 1;
const bloomLayer = new T.Layers();
bloomLayer.set(BLOOM_SCENE);

const renderScene = new RenderPass(scene, camera);
const outputPass = new OutputPass();

const bloomPass = new UnrealBloomPass(new T.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0
bloomPass.strength = 0.5
bloomPass.radius = 0.2

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const mixPass = new ShaderPass(
    new T.ShaderMaterial({
        uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
    }), 'baseTexture'
);
mixPass.needsSwap = true;

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(mixPass);
finalComposer.addPass(outputPass);

const controls = new OrbitControls(camera, renderer.domElement)
// controls.enablePan = false
// controls.minPolarAngle = 1;
// controls.maxPolarAngle = 1.5;
controls.minDistance = 0;
controls.maxDistance = 1800;
controls.rotateSpeed = 0.5;
controls.update()

camera.add(new T.DirectionalLight(0xffffff, 10))
scene.add(camera)
const pl = new T.PointLight(0xffffff, 50000000)
pl.position.set(0, 2000, 0)
// scene.add(pl)


const raycaster = new T.Raycaster()

window.addEventListener('pointerdown', onMouseDown)

function onMouseDown(event) {
    camera.updateProjectionMatrix()
    controls.update()
    const coords = new T.Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
    )
    raycaster.setFromCamera(coords, camera)

    let intersections = raycaster.intersectObjects(scene.children, true);
    if (intersections.length > 0) {
        console.log(intersections[0].object);
        // intersections[0].object.layers.toggle(BLOOM_SCENE)
        // if (intersections[0].object.name == "Menu") {
        //     gsap.to(camera.position, {
        //         x: -350,
        //         y: 110,
        //         z: 20,
        //         duration: 6,
        //         ease: "expo.inOut",
        //         onStart: () => controls.enabled = false,
        //         onComplete: () => controls.enabled = true,
        //     },)
        //     gsap.to(controls.target, {
        //         x: -400,
        //         y: 0,
        //         z: 0,
        //         duration: 5,
        //         ease: "expo.inOut",
        //         onStart: () => controls.enabled = false,
        //         onComplete: () => controls.enabled = true,
        //         onUpdate: function () {
        //             controls.update()
        //         }
        //     })
        // }
        if (intersections[0].object.name == "start") {
            gsap.to(camera.position, {
                x: -392,
                y: 53,
                z: -85,
                duration: 6,
                ease: "expo.inOut",
                onStart: () => controls.enabled = false,
                onComplete: () => controls.enabled = true,
            },)
            gsap.to(controls.target, {
                x: -392,
                y: 50,
                z: -16.5,
                duration: 6,
                ease: "expo.inOut",
                onStart: () => controls.enabled = false,
                onComplete: () => controls.enabled = true,
                onUpdate: function () {
                    controls.update()
                }
            })
        }
        if (intersections[0].object.name == "Object_4") {
            intersections[0].object.scale.set(2, 2, 2)
            scene.traverse(obj => {
                if (obj.name == "Object_8") {
                    obj.scale.set(2, 2, 2)
                }
                if (obj.name == "Object_6") {
                    obj.scale.set(2, 2, 2)
                }
            })
        }
    }
}

function darkenNonBloomed(obj) {
    if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
        materials[obj.uuid] = obj.material;
        obj.material = darkMaterial;
    }
}

function restoreMaterial(obj) {
    if (materials[obj.uuid]) {
        obj.material = materials[obj.uuid];
        delete materials[obj.uuid];
    }
}

document.getElementById("loadingScreen").classList.add("z-[20]");
document.getElementById("loadingScreen").innerHTML = `<img src="images/loading.gif" class="w-auto h-[200px]">`
function loading() {
    document.getElementById("loadingScreen").classList.add("hidden")
}

let particles, pos = [], vel = [], isSnowing = false, isRaining = false, hasFlowers = false, rain, rainGeo, rainCount = 1600;
const numSnowflakes = 1600;
const maxRange = 1000, minRange = maxRange / 2;
const minHeight = 100;

const geo6 = new T.BufferGeometry();
window.addSnow = () => {
    if (isSnowing || isRaining || hasFlowers) {
        scene.remove(particles)
        pos = [];
        vel = [];
        isSnowing = false;
        isRaining = false;
        hasFlowers = false;
    } else if (!isSnowing) {
        for (let i = 0; i < numSnowflakes; i++) {
            pos.push(
                Math.floor(Math.random() * maxRange - minRange),
                Math.floor(Math.random() * minRange + minHeight),
                Math.floor(Math.random() * maxRange - minRange))

            vel.push(
                Math.floor(Math.random() * 3 - 1.5) * 0.1,
                1,
                Math.floor(Math.random() * 3 - 1.5) * 0.1)
        }
        geo6.setAttribute("position", new T.Float32BufferAttribute(pos, 3))
        geo6.setAttribute("velocity", new T.Float32BufferAttribute(vel, 3))

        const flakeMat = new T.PointsMaterial({
            size: 2,
            map: new TextureLoader().load("images/12.png"),
            blending: T.AdditiveBlending,
            depthTest: true,
            transparent: true,
            opacity: 0.7
        })
        particles = new T.Points(geo6, flakeMat);
        scene.add(particles)
        isSnowing = true;
        isRaining = false;
        hasFlowers = false;
    }
}

function updateParticles() {
    if (particles) {
        for (let i = 0; i < numSnowflakes * 3; i += 3) {
            particles.geometry.attributes.position.array[i] -= particles.geometry.attributes.velocity.array[i];
            particles.geometry.attributes.position.array[i + 1] -= particles.geometry.attributes.velocity.array[i + 1];
            particles.geometry.attributes.position.array[i + 2] -= particles.geometry.attributes.velocity.array[i + 2];
            if (particles.geometry.attributes.position.array[i + 1] < 0) {
                particles.geometry.attributes.position.array[i] = Math.floor(Math.random() * maxRange - minRange);
                particles.geometry.attributes.position.array[i + 1] = Math.floor(Math.random() * minRange + minHeight);
                particles.geometry.attributes.position.array[i + 2] = Math.floor(Math.random() * maxRange - minRange);
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }
}


window.addRain = () => {
    if (isRaining || isSnowing || hasFlowers) {
        scene.remove(particles)
        pos = [];
        vel = [];
        isRaining = false;
        isSnowing = false;
        hasFlowers = false;
    } else if (!isRaining) {
        for (let i = 0; i < rainCount; i++) {
            pos.push(
                Math.floor(Math.random() * maxRange - minRange),
                Math.floor(Math.random() * minRange + minHeight),
                Math.floor(Math.random() * maxRange - minRange))

            vel.push(
                Math.floor(Math.random() * 3 - 1.5) * 0.001,
                5,
                Math.floor(Math.random() * 3 - 1.5) * 0.001)
        }
        geo6.setAttribute("position", new T.Float32BufferAttribute(pos, 3))
        geo6.setAttribute("velocity", new T.Float32BufferAttribute(vel, 3))

        const flakeMat = new T.PointsMaterial({
            size: 1,
            map: new TextureLoader().load("images/rain.png"),
            blending: T.AdditiveBlending,
            depthTest: true,
            transparent: true,
            opacity: 0.7
        })
        particles = new T.Points(geo6, flakeMat);
        scene.add(particles)
        isRaining = true;
        isSnowing = false;
        hasFlowers = false;
    }
}

window.addFlowers = () => {
    if (isRaining || isSnowing || hasFlowers) {
        scene.remove(particles)
        pos = [];
        vel = [];
        isRaining = false;
        isSnowing = false;
        hasFlowers = false;
    } else if (!hasFlowers) {
        for (let i = 0; i < rainCount; i++) {
            pos.push(
                Math.floor(Math.random() * maxRange - minRange),
                Math.floor(Math.random() * minRange + minHeight),
                Math.floor(Math.random() * maxRange - minRange))

            vel.push(
                Math.floor(Math.random() * 3 - 1.5) * 0.001,
                1,
                Math.floor(Math.random() * 3 - 1.5) * 0.001)
        }
        geo6.setAttribute("position", new T.Float32BufferAttribute(pos, 3))
        geo6.setAttribute("velocity", new T.Float32BufferAttribute(vel, 3))

        const flakeMat = new T.PointsMaterial({
            size: 1,
            map: new TextureLoader().load("images/rain.png"),
            blending: T.AdditiveBlending,
            depthTest: true,
            transparent: true,
            opacity: 0.7
        })
        particles = new T.Points(geo6, flakeMat);
        scene.add(particles)
        isRaining = true;
        isSnowing = false;
        hasFlowers = false;
    }
}
function animate() {
    requestAnimationFrame(animate);
    // mixer.update(clock.getDelta());
    // var elapsedTime = clock.getElapsedTime();

    // Define the rotation speed
    // var rotationSpeed = 0.5; // Radians per second

    // Calculate the rotation angles for each axis
    // var angle = rotationSpeed * elapsedTime;
    // console.log(camera.position);

    // Apply the rotation to the cube
    // points.rotation.x = angle; // Rotate around X axis
    // points.rotation.y = angle; // Rotate around Y axis
    // points.rotation.z = angle;
    // console.log(camera.position);

    scene.traverseVisible(obj => {
        if (obj.name == "Obj10PIV") {
            obj.material.color.setHex("0x" + document.getElementById("color").value.slice(1))
        }
    })

    updateParticles();

    controls.update();

    scene.traverse(darkenNonBloomed);
    bloomComposer.render();
    scene.traverse(restoreMaterial);
    finalComposer.render();
    // camera.updateProjectionMatrix()
}