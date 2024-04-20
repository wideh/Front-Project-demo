import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入dat.gui
import * as dat from 'dat.gui';

/**
 * 1.材质要满足对光照有反应
 * 2.设置渲染器开启阴影的计算:renderer.shadowMap.enabled = true;
 * 3.设置光照投射阴影:directionalLight.castShadow = true;
 * 4.设置物体投射阴影:sphere.castShadow = true;
 * 5.设置物体接收阴影:plane.receiveShadow = true;
 */

// 创建GUI
const gui = new dat.GUI();

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
directionalLight.castShadow = true;

// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20;
// 设置阴影贴图分辨率
directionalLight.shadow.mapSize.set(2048, 2048);
// 设置平行光投射相机属性，设置阴影计算范围，只有在这个范围内的物体才有阴影
directionalLight.shadow.camera.near = 0.5; // 近端
directionalLight.shadow.camera.far = 500; // 远端
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
scence.add(directionalLight);

// 添加设置项，需要设置的对象及其属性
gui.add(directionalLight.shadow.camera, "near")
.min(0)
.max(20)
.step(0.1)
.name('设置近端')
.onChange(() => {
  // 相机属性值改变后，需要调用updateProjectionMatrix，才能生效
  directionalLight.shadow.camera.updateProjectionMatrix();
})

// 3.添加物体
// 创建球体
const spherGeometry = new THREE.SphereGeometry(1, 20, 20);
const meterial = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(spherGeometry, meterial);
// 球投射阴影
sphere.castShadow = true;
scence.add(sphere);

// 添加平面，后两位就是设置更多的顶点
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const plane = new THREE.Mesh(planeGeometry, meterial);
plane.position.set(0, -1, 0)
plane.rotation.x = -Math.PI / 2;
// 平面接收阴影
plane.receiveShadow = true;
scence.add(plane);

// 4.初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置渲染器开启阴影的计算
renderer.shadowMap.enabled = true;
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