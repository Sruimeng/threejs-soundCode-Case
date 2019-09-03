import { Matrix4 } from '../math/Matrix4.js';
import { Vector2 } from '../math/Vector2.js';
import { Camera } from './../cameras/Camera.d';

/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 *	光照阴影的基类,
 *
 * @param {Camera} camera 用来生成场景的深度图的摄像机
 */
function LightShadow( camera ) {

	this.camera = camera;
	//设置阴影贴图的偏差
	this.bias = 0;
	//设置模糊值
	this.radius = 1;
	//阴影贴图的尺寸
	this.mapSize = new Vector2( 512, 512 );
	//生成的深度渲染图
	this.map = null;
	//阴影的相机空间
	this.matrix = new Matrix4();

}

Object.assign( LightShadow.prototype, {
	//复制方法
	copy: function ( source ) {

		this.camera = source.camera.clone();

		this.bias = source.bias;
		this.radius = source.radius;

		this.mapSize.copy( source.mapSize );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},
	//变成json的方法
	toJSON: function () {

		var object = {};

		if ( this.bias !== 0 ) object.bias = this.bias;
		if ( this.radius !== 1 ) object.radius = this.radius;
		if ( this.mapSize.x !== 512 || this.mapSize.y !== 512 ) object.mapSize = this.mapSize.toArray();

		object.camera = this.camera.toJSON( false ).object;
		delete object.camera.matrix;

		return object;

	}

} );


export { LightShadow };
