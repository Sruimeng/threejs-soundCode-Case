import { LightShadow } from './LightShadow.js';
import { _Math } from '../math/Math.js';
import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

function SpotLightShadow() {

	LightShadow.call( this, new PerspectiveCamera( 50, 1, 0.5, 500 ) );

}

SpotLightShadow.prototype = Object.assign( Object.create( LightShadow.prototype ), {

	constructor: SpotLightShadow,

	isSpotLightShadow: true,
	//点光源和方向光源阴影不同有，点光源使用了透视摄像机，并且重写了update方法
	update: function ( light ) {

		//只是对透视相机做的一般处理，因为阴影的基类使用的是正交投影
		var camera = this.camera;

		var fov = _Math.RAD2DEG * 2 * light.angle;
		var aspect = this.mapSize.width / this.mapSize.height;
		var far = light.distance || camera.far;

		if ( fov !== camera.fov || aspect !== camera.aspect || far !== camera.far ) {

			camera.fov = fov;
			camera.aspect = aspect;
			camera.far = far;
			camera.updateProjectionMatrix();

		}

	}

} );


export { SpotLightShadow };
