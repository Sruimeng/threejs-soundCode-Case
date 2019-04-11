var application;
application = (function () {
    function application() { };
    var _params = {
        _renderer: undefined,
        _scene: undefined,
        _camera: undefined,
        _controls: undefined,
        _helper: undefined,
        _light: undefined,
    };
    application.prototype = {
        init: function () {
            _params._scene = new THREE.Scene(); //新建场景
            _params._scene.background = new THREE.Color(0xffffff);

            _params._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
            _params._camera.position.set(0, 100, 150);
            _params._scene.add(_params._camera);

            _params._light = new THREE.HemisphereLight(0xffffff, 0x444444);
            _params._light.position.set(0, 200, 0);
            _params._scene.add(_params._light);

            _params._light = new THREE.DirectionalLight(0xffffff);
            _params._light.position.set(0, 200, 100);
            _params._light.castShadow = true;
            _params._light.shadow.camera.top = 180;
            _params._light.shadow.camera.bottom = - 100;
            _params._light.shadow.camera.left = - 120;
            _params._light.shadow.camera.right = 120;
            _params._scene.add(_params._light);

            _params._controls = new THREE.OrbitControls(_params._camera); //参数选择
            _params._controls.enableRotate = true; //开启旋转
            _params._controls.rotateSpeed = 0.1; //旋转速度
            _params._controls.enableZoom = true; //开启旋转
            _params._controls.zoomSpeed = 0.5; //旋转速度
            _params._controls.enableDamping = true; //开启阻尼效果
            _params._controls.dampingFactor = 0.1;
            _params._controls.autoRotate = false; //关闭自动旋转
            _params._controls.enablePan = true; //右键拖拽
            _params._controls.minPolarAngle = Math.PI / 18; //设置最小视角1
            _params._controls.maxPolarAngle = Math.PI / 2; //设置最大视角
            // _params._controls.maxDistance = 200; //最大最小缩放距离
            // _params._controls.minDistance = 20;

            _params._renderer = new THREE.WebGLRenderer({
                antialias: true, //开启抗锯齿
                alphe: true, //开始混合
            });
            _params._renderer.setPixelRatio(window.devicePixelRatio); //设置像素比率
            _params._renderer.setSize(window.innerWidth, window.innerHeight);

            _params._helper = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
            _params._helper.material.opacity = 0.2;
            _params._helper.material.transparent = true;
            _params._scene.add(_params._helper);

            return _params;
        },
        mesh: function (scene) {
            var matStdObjects = new THREE.MeshPhongMaterial({ color: 0xA00000});
            var geoBox = new THREE.BoxBufferGeometry(Math.PI, Math.sqrt(2), Math.E);
            var mshStdBox = new THREE.Mesh(geoBox, matStdObjects);
            mshStdBox.position.set(0, 30, 0);
            mshStdBox.rotation.set(0, Math.PI / 2.0, 0);
            mshStdBox.scale.set(5,5,5);
            mshStdBox.castShadow = true;
            mshStdBox.receiveShadow = true;
            scene.add(mshStdBox);
            var geoSphere = new THREE.SphereBufferGeometry(1.5, 32, 32);
            var mshStdSphere = new THREE.Mesh(geoSphere, matStdObjects);
            mshStdSphere.position.set(- 50, 30, 0);
            mshStdSphere.scale.set(5, 5, 5);
            mshStdSphere.castShadow = true;
            mshStdSphere.receiveShadow = true;
            scene.add(mshStdSphere);
            var geoKnot = new THREE.TorusKnotBufferGeometry(1.5, 0.5, 100, 16);
            var mshStdKnot = new THREE.Mesh(geoKnot, matStdObjects);
            mshStdKnot.position.set(50, 30, 0);
            mshStdKnot.scale.set(5, 5, 5);
            mshStdKnot.castShadow = true;
            mshStdKnot.receiveShadow = true;
            scene.add(mshStdKnot);
        },
        startRender: function (params) {
            (function render() {
                "use strict";
                params._controls.update();
                params._renderer.render(params._scene, params._camera);
                window.requestAnimationFrame(render);
            })();
        },
    }
    return application;
})();