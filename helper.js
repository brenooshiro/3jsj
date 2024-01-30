import * as THREE from 'three'
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from '/three/examples/jsm/loaders/FBXLoader';

const scenePath = 'assets/scene.glft';

export const LoadGLTFByPath = (scene) => {
    return new Promise((resolve, reject) => {
      // Create a loader
      const loader = new GLTFLoader();
  
      // Load the OBJ file
      loader.load(scenePath, (OBJ) => {

        scene.add(OBJ.scene);

        resolve();
      }, undefined, (error) => {
        reject(error);
      });
    });
};