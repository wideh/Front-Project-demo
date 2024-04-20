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
  30
);
// 设置相机位置
camear.position.set(0, 0, 40);
// 把相机添加到场景中
scence.add(camear);

// 3.添加物体
// 创建一个普通物体，顶点随机生成
function createPoints(url, size = 0.5) {
  const particlesGeometry = new THREE.BufferGeometry();
  const count = 5000;
  
  // 声明缓冲区数组
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  // 设置顶点
  for (let i = 0; i < count*3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
    colors[i] = Math.random();
  }
  // 给普通物体设置位置属性
  particlesGeometry.setAttribute(
    'position', 
    new THREE.BufferAttribute(positions, 3)
  )
  // 给普通物体每个顶点单独设置颜色
  // 注意，需要给点材质设置启用顶点颜色，pointMeterial.vertexColors = true;
  particlesGeometry.setAttribute(
    'color', 
    new THREE.BufferAttribute(colors, 3)
  )
  
  // 创建点材质
  const pointMeterial = new THREE.PointsMaterial({
    size: size, // 设置点的大小
    color: 0xfff000,
  });
  // 设置是否深度而衰减，默认为true，近大远小
  pointMeterial.sizeAttenuation = true;
  
  // 载入纹理
  const textureLoader = new THREE.TextureLoader();
  const textTrue = textureLoader.load(`./textures/particles/${url}.png`);
  // 设置点材质纹理
  pointMeterial.map = textTrue;
  // 设置透明纹理，让后面的物体不被前面的边缘遮挡
  pointMeterial.alphaMap = textTrue;
  pointMeterial.transparent = true;
  // 是否对深度缓冲区有影响，关闭，解决前边物体影响后面的物体
  pointMeterial.depthWrite = false;
  // 设置叠加，解决前后点重合时，外层物体有黑点
  pointMeterial.blending = THREE.AdditiveBlending;
  // 设置启用顶点颜色
  pointMeterial.vertexColors = true;
  
  // 创建点
  const points = new THREE.Points(particlesGeometry, pointMeterial);
  scence.add(points);
  return points;
}

const points = createPoints('zs2');
const points2 = createPoints('xh', 1);

// 4.初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 设置渲染器开启阴影的计算
renderer.shadowMap.enabled = true;
// renderer.physicallyCorrectLights = true;
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
  points.rotation.x = time * 0.3;
  points2.rotation.x = time * 0.2;
  points2.rotation.y = time * 0.05;
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