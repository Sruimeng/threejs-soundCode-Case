/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/

import { Matrix4 } from '../math/Matrix4.js';
import { Object3D } from '../core/Object3D.js';
import { Vector3 } from '../math/Vector3.js';

/**
 * @description 摄像机的基类，在three中分为两种摄像机，分别为正交摄像机和透视射线机
 * 其他的摄像机便不是在Camera基类基础上继承的得来的，和这两种摄像机有着明显的区别
 * 
 */
function Camera() {
	//和其他基类一样，也是继承的Object3D对象
	Object3D.call( this );
	//类型
	this.type = 'Camera';
	//摄像机世界矩阵的逆矩阵
	this.matrixWorldInverse = new Matrix4();
	//投影矩阵
	this.projectionMatrix = new Matrix4();
	//投影矩阵的逆矩阵
	this.projectionMatrixInverse = new Matrix4();

}

Camera.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Camera,

	isCamera: true,
	//复制方法
	copy: function ( source, recursive ) {

		Object3D.prototype.copy.call( this, source, recursive );

		this.matrixWorldInverse.copy( source.matrixWorldInverse );

		this.projectionMatrix.copy( source.projectionMatrix );
		this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

		return this;

	},
	//获得世界方向,就是当前摄像机的正对着目标的标准化向量
	getWorldDirection: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Camera: .getWorldDirection() target is now required' );
			target = new Vector3();

		}

		this.updateMatrixWorld( true );

		var e = this.matrixWorld.elements;

		return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

	},
	//是否更新世界矩阵，穿一个bool值
	updateMatrixWorld: function ( force ) {

		Object3D.prototype.updateMatrixWorld.call( this, force );

		this.matrixWorldInverse.getInverse( this.matrixWorld );

	},
	//克隆方法
	clone: function () {

		return new this.constructor().copy( this );

	}

} );

export { Camera };
