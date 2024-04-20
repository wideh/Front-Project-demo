import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入动画库
import gsap from 'gsap';
// 导入dat.gui
import * as dat from 'dat.gui';
// 导入RGBELoader
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// 加载hdr环境图
const rgbeLoader = new RGBELoader();
// 由于hdr图片很大，用异步加载;
rgbeLoader.loadAsync('./textures/hdr/002.hdr').then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scence.background = texture;
})

// 1. 创建场景
const scence = new THREE.Scene();

// 2. 创建透视相机
const camear = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
camear.position.set(0, 0, 10);
// 把相机添加到场景中
scence.add(camear);

// 添加灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scence.add(light);
// 设置直接光，平行光，常用来模拟太阳光
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// 需要设置位置
directionalLight.position.set(10, 10, 10);
scence.add(directionalLight);

const div = document.createElement('div');
div.style.width = '200px';
div.style.height = '200px';
div.style.position = 'fixed';
div.style.top = 0;
div.style.right = 0;
div.style.color = '#fff';
document.body.appendChild(div);
// 单张纹理图的加载
const onLoad = function () {
  console.log('图片加载完成');
}
const onProgress = function (url, num, total) {
  console.log('图片加载进度', url, num, total);
  console.log('图片加载进度百分比：', ((num / total) * 100).toFixed(2) + '%');
  let progressPercent = ((num / total) * 100).toFixed(2) + '%';
  div.innerHTML = progressPercent;
}
const onError = function (e) {
  console.log('图片加载出现错误', e);
}

// 设置加载管理器
const loadingManager = new THREE.LoadingManager(onLoad, onProgress, onError);

// 3.添加物体
// 创建几何体
// 导入纹理
const textureLoader = new THREE.TextureLoader(loadingManager);
const doorTexture = textureLoader.load('./textures/door/color.jpg', onLoad, onProgress, onError);
// 导入透明纹理
const alphaTexture = textureLoader.load('./textures/door/alpha.jpg');
// 导入环境遮挡
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg');
// 导入置换贴图
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg');
// 导入粗糙度贴图
const roughnessTetuer = textureLoader.load('./textures/door/roughness.jpg');
// 导入金属贴图
const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg');
// 导入法线贴图
const normalTexture = textureLoader.load('./textures/door/normal.jpg');

doorTexture.magFilter = THREE.LinearFilter;

// 设置cube纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load([
  "./textures/environmentMaps/1/px.jpg", // px正方向的x轴
  "./textures/environmentMaps/1/nx.jpg", // nx负方向的x轴
  "./textures/environmentMaps/1/py.jpg",
  "./textures/environmentMaps/1/ny.jpg",
  "./textures/environmentMaps/1/pz.jpg",
  "./textures/environmentMaps/1/nz.jpg",
]);

// 创建球体
const spherGeometry = new THREE.SphereGeometry(1, 20, 20);
const meterial = new THREE.MeshStandardMaterial({
  metalness: 0.7,
  roughness: 0.1,
  envMap: envMapTexture,
})
const sphere = new THREE.Mesh(spherGeometry, meterial);
scence.add(sphere);

// 给环境添加背景
// scence.background = envMapTexture;
// 给场景所有物体添加默认的环境贴图
// scence.environment = envMapTexture;

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200);
const material = new THREE.MeshStandardMaterial({
  color: '#ffff00',
  map: doorTexture,
  alphaMap: alphaTexture, // 透明贴图
  transparent: true, // 想要实现透明效果，此属性必须设置为true
  aoMap: doorAoTexture, // 遮挡贴图
  aoMapIntensity: 1, // 遮挡强度，默认为1
  displacementMap: doorHeightTexture, // 置换贴图, 为了实现凸出，需要设置顶点
  displacementScale: 0.05, // 设置凸出的幅度，默认为1
  roughnessMap: roughnessTetuer, // 设置粗糙度贴图
  roughness: 0, // 设置粗糙度，0就是特别细腻，可以反射光，1就是特别粗糙
  metalness: 1, // 设置金属度，1就是完全金属
  metalnessMap: metalnessTexture, // 设置金属贴图
  normalMap: normalTexture, // 设置法线贴图
  side: THREE.DoubleSide, // 为了渲染性能，默认只展示前面，可以设置展示前面和背面
})
const cube = new THREE.Mesh(cubeGeometry, material);
cubeGeometry.setAttribute('uv2', new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))
scence.add(cube);

// 添加平面，后两位就是设置更多的顶点
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = 2;
// 给平面设置第二组uv
planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))
scence.add(plane);

// 4.初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将WebGL渲染的canvas内容添加到body上
document.body.appendChild(renderer.domElement);

// 5.使用渲染器，通过相机将场景渲染进来
renderer.render(scence, camear);

// 6.创建轨道控制器
const controls = new OrbitControls(camear, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果，必须在动画循环里面调用update()
controls.enableDamping = true;

// 7.添加坐标辅助器
const axis = new THREE.AxesHelper(5);
// 添加到场景
scence.add(axis);

// 8.设置时钟
const clock = new THREE.Clock();

// 用Gsap设置动画, 要设置动画的对象为物体的位置, x表示位置的属性x变到5,
// duration表示时间为5秒
// const animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   repeat: -1, // 设置重复次数，无限次循环-1
//   yoyo: true, // 往返运动
//   delay: 2, // 延迟2秒
//   onComplete: () => {
//     console.log('动画完成');
//   },
//   onStart: () => {
//     console.log('动画开始');
//   }
// });
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5 });

window.addEventListener('dblclick', () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    // 让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    // 退出全屏，使用document对象
    document.exitFullscreen();
  }
})

// 设置渲染函数
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scence, camear);
}
animate();

// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头比例
  camear.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像头的投影矩阵
  camear.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
})