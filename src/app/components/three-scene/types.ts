import * as THREE from "three";

export interface ThreeSceneConfig {
    particleCount?: number;
    gridSize?: number;
    gridDivisions?: number;
    cameraZ?: number;
}

export interface MousePosition {
    x: number;
    y: number;
}

export interface SceneObjects {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particleSystem: THREE.Points;
    gridHelper: THREE.GridHelper;
    sphereGeometry: THREE.SphereGeometry;
    particleMaterial: THREE.PointsMaterial;
    lineMaterial: THREE.LineBasicMaterial;
}
