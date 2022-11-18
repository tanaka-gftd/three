/* 描画する3Dオブジェクトの設定を行うファイル */



/* 3D空間の設定 */

//シーン（3D空間）を作成
//シーンに3Dオブジェクトや光源などを置いていく
const scene = new THREE.Scene();

//カメラを設定
/* 
  three.jsにはさまざまな種類のカメラがあるが、ここではPerspectiveCameraを使用 
  PerspectiveCameraは「透視投影」という投影法に基づいて、3D空間の様子を2次元の画面に表現するカメラ
  PerspectiveCameraは人間の目に見える方法を模倣した設計なので、3Dに使用される最も一般的な投影モード 

  第一引数...視野角（参考：人間の視野の範囲は150~160度ぐらいで、その中でフォカースが合うのは60度程度）
  第二引数...アスペクト比。これを設定しておくことで、表示するスクリーンのサイズが変わっても綺麗に表示される
  第三引数...クリッピング時の近位。この値より手前は3D空間では表示されない。
  第四引数...クリッピング時の遠位。この値より奥は3D空間では表示されない。
*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//カメラに位置
//ここではz軸に5だけ移動させることで、少しだけカメラの位置を手前に持ってきている
//z軸は手前に向かっているので、指定した値が0より大きいと、手前への移動となる
camera.position.z = 5;

//レンダラーインスタンスの作成
const renderer = new THREE.WebGLRenderer();

//レンダラーにアプリケーションのレンダリングに必要なサイズを設定（パフォーマンスを重視するなら、小さい値を渡すのもあり）
/* 
  アプリケーションのサイズを維持したいが、より低い解像度でレンダリングしたい場合は、
  第三引数にfalseを指定して、setSizeをupdateStyleとして呼び出すようにする
*/
renderer.setSize(window.innerWidth, window.innerHeight);

//レンダラー要素をHTMLドキュメントに追加
//レンダラーがシーンを表示するために使用するのは<canvas>というタグ
document.body.appendChild(renderer.domElement);



/* シーンに描画する立方体オブジェクトの作成 */

//立方体を作成するために、BoxGeometryを使用
//BoxGeometry...キューブのすべての頂点と塗りつぶし面のデータを持つオブジェクト
const geometry = new THREE.BoxGeometry(1,1,1);

//MeshBasicMaterialで色を設定
const material = new THREE.MeshBasicMaterial({color:0x00ff00});  //青色

//Mesh...ジオメトリを取得し、それにマテリアルを適用し、シーンに挿入して自由に移動させることのできるオブジェクト
const cube = new THREE.Mesh(geometry, material);

//シーンに追加
scene.add(cube);



/* シーンに追加した立方体オブジェクトをレンダリング */

//スクリーンがリフレッシュされるたびに、レンダラーがシーンを描画するループを作成
function animate(){
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;  //立方体オブジェクトをx軸で回転
  cube.rotation.y += 0.01;  //立方体オブジェクトをy軸で回転

  renderer.render(scene, camera);
}
animate();
