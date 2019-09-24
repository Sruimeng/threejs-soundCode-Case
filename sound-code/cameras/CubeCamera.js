import { Object3D } from '../core/Object3D.js';
import { WebGLRenderTargetCube } from '../renderers/WebGLRenderTargetCube.js';
import { LinearFilter, RGBFormat } from '../constants.js';
import { Vector3 } from '../math/Vector3.js';
import { PerspectiveCamera } from './PerspectiveCamera.js';

/**
 * Camera for rendering cube maps
 *	- renders scene into axis-aligned cube
 *
 * @author alteredq / http://alteredqualia.com/
 */

/**
 * @description CubeCamera就是创建六个摄像机，通过摄像机中拍摄中的东西放到WebGLRenderTargetCube，然后这个可以
 * 当做纹理放到一个物体上以模拟真实的镜像效果
 * 
 * @param {Number} near 近剪裁面的距离
 * @param {Number} far 远剪裁面的距离
 * @param {Number} cubeResolution 设置立方体边缘的长度
 * @param {any} options 参数，主要包括过滤器及颜色编码啥的
 */
function CubeCamera( near, far, cubeResolution, options ) {

	Object3D.call( this );

	this.type = 'CubeCamera';

	var fov = 90, aspect = 1;

	var cameraPX = new PerspectiveCamera( fov, aspect, near, far );
	cameraPX.up.set( 0, - 1, 0 );
	cameraPX.lookAt( new Vector3( 1, 0, 0 ) );
	this.add( cameraPX );

	var cameraNX = new PerspectiveCamera( fov, aspect, near, far );
	cameraNX.up.set( 0, - 1, 0 );
	cameraNX.lookAt( new Vector3( - 1, 0, 0 ) );
	this.add( cameraNX );

	var cameraPY = new PerspectiveCamera( fov, aspect, near, far );
	cameraPY.up.set( 0, 0, 1 );
	cameraPY.lookAt( new Vector3( 0, 1, 0 ) );
	this.add( cameraPY );

	var cameraNY = new PerspectiveCamera( fov, aspect, near, far );
	cameraNY.up.set( 0, 0, - 1 );
	cameraNY.lookAt( new Vector3( 0, - 1, 0 ) );
	this.add( cameraNY );

	var cameraPZ = new PerspectiveCamera( fov, aspect, near, far );
	cameraPZ.up.set( 0, - 1, 0 );
	cameraPZ.lookAt( new Vector3( 0, 0, 1 ) );
	this.add( cameraPZ );

	var cameraNZ = new PerspectiveCamera( fov, aspect, near, far );
	cameraNZ.up.set( 0, - 1, 0 );
	cameraNZ.lookAt( new Vector3( 0, 0, - 1 ) );
	this.add( cameraNZ );

	options = options || { format: RGBFormat, magFilter: LinearFilter, minFilter: LinearFilter };
	//this.renderTarget.texture可以用来给其他物体做贴图
	this.renderTarget = new WebGLRenderTargetCube( cubeResolution, cubeResolution, options );
	this.renderTarget.texture.name = "CubeCamera";
	//更新方法
	this.update = function ( renderer, scene ) {

		if ( this.parent === null ) this.updateMatrixWorld();

		var currentRenderTarget = renderer.getRenderTarget();

		var renderTarget = this.renderTarget;
		var generateMipmaps = renderTarget.texture.generateMipmaps;

		renderTarget.texture.generateMipmaps = false;

		renderer.setRenderTarget( renderTarget, 0 );
		renderer.render( scene, cameraPX );

		renderer.setRenderTarget( renderTarget, 1 );
		renderer.render( scene, cameraNX );

		renderer.setRenderTarget( renderTarget, 2 );
		renderer.render( scene, cameraPY );

		renderer.setRenderTarget( renderTarget, 3 );
		renderer.render( scene, cameraNY );

		renderer.setRenderTarget( renderTarget, 4 );
		renderer.render( scene, cameraPZ );

		renderTarget.texture.generateMipmaps = generateMipmaps;

		renderer.setRenderTarget( renderTarget, 5 );
		renderer.render( scene, cameraNZ );

		renderer.setRenderTarget( currentRenderTarget );

	};
	//清空方法
	this.clear = function ( renderer, color, depth, stencil ) {

		var currentRenderTarget = renderer.getRenderTarget();

		var renderTarget = this.renderTarget;

		for ( var i = 0; i < 6; i ++ ) {

			renderer.setRenderTarget( renderTarget, i );

			renderer.clear( color, depth, stencil );

		}

		renderer.setRenderTarget( currentRenderTarget );

	};

}

CubeCamera.prototype = Object.create( Object3D.prototype );
CubeCamera.prototype.constructor = CubeCamera;


export { CubeCamera };
