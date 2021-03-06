import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

const gltfLoader = new GLTFLoader()

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// UPT
gltfLoader.load('UPT.gltf', (gltf) => {

    gltf.scene.scale.set(0.3, 0.3, 0.3)
    scene.add(gltf.scene)

    gui.add(gltf.scene.rotation, 'x').min(0).max(9)
    gui.add(gltf.scene.rotation, 'y').min(0).max(9)
    gui.add(gltf.scene.rotation, 'z').min(0).max(9)
})

// Objects


// Materials


// Mesh


// Lights

const pointLight = new THREE.PointLight(0x9090c3, 2)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight.position.set(0.5, 2.2, 1.9)
pointLight.intensssity = 100

scene.add(pointLight)

const light = gui.addFolder('Light')

light.add(pointLight.position, 'x')
light.add(pointLight.position, 'y')
light.add(pointLight.position, 'z')
light.add(pointLight, 'intensity')

const lightColor = {
    color: 0x7e7eca
}

light.addColor(lightColor, 'color')
    .onChange(() => {
        pointLight.color.set(lightColor.color)
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()