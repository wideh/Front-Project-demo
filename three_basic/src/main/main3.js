import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

// 添加灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5);
scence.add(light);
// 创建小球
const smallBall = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
smallBall.position.set(2,2,2);
// 添加点光源
const pointLight = new THREE.PointLight( 0xff0000, 1 );
// 需要设置位置
pointLight.position.set(2, 2, 2);
// 开启投射阴影
pointLight.castShadow = true;

// 设置阴影贴图模糊度
pointLight.shadow.radius = 20;
// 设置阴影贴图分辨率
pointLight.shadow.mapSize.set(2048, 2048);
// 小球添加点光源
smallBall.add(pointLight);
scence.add(smallBall);

// 4.初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置渲染器开启阴影的计算
renderer.shadowMap.enabled = true;
// renderer.physicallyCorrectLights = true;
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

// 设置时钟
const clock = new THREE.Clock();

// 设置渲染函数
function animate() {
  let time = clock.getElapsedTime();
  smallBall.position.x = Math.sin(time) * 5;
  smallBall.position.z = Math.cos(time) * 5;
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