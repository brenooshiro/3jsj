import studio from '@theatre/studio';
import { getProject } from '@theatre/core';
import ext from '@theatre/r3f/dist/extension';

//THEATER -----
const project = getProject('THREE.js x Theatre.js');
const sheet = project.sheet('Animated scene');

studio.extend(ext);
studio.initialize();
