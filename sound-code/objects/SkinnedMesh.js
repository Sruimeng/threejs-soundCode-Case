/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */

import { Mesh } from './Mesh.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Vector4 } from '../math/Vector4.js';
import { Geometry } from '../core/Geometry.js';
import { Material } from '../materials/Material.js';

/**
 * @description 蒙皮对象，继承自Mesh基类 具有Skeleton（骨架）和bones（骨骼）的网格，可用于给几何体上的顶点添加动画。 
 * 其材质必须支持蒙皮，并且已经启用了蒙皮
 * 
 * @param {Geometry} geometry 
 * @param {Material} material 
 */
function SkinnedMesh( geometry, material ) {
	//判断geometry类型
	if ( geometry && geometry.isGeometry ) {

		console.error( 'THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

	}
	//继承自mesh
	Mesh.call( this, geometry, material );

	this.type = 'SkinnedMesh';
	/**
	 * “attached”（附加）或者“detached”（分离）。“attached”使用SkinnedMesh.matrixWorld 
	 * 属性作为对骨骼的基本变换矩阵，
	 * “detached”则使用SkinnedMesh.bindMatrix。 默认值是“attached”。
	 */
	this.bindMode = 'attached';
	//该基础矩阵用于绑定骨骼的变换。
	this.bindMatrix = new Matrix4();
	//该基础矩阵用于重置绑定骨骼的变换。
	this.bindMatrixInverse = new Matrix4();

}

SkinnedMesh.prototype = Object.assign( Object.create( Mesh.prototype ), {

	constructor: SkinnedMesh,

	isSkinnedMesh: true,
	//绑定方法，传入骨架对象和绑定矩阵			
	bind: function ( skeleton, bindMatrix ) {

		this.skeleton = skeleton;
		//如果绑定矩阵未定义的话
		if ( bindMatrix === undefined ) {
			//更新矩阵
			this.updateMatrixWorld( true );

			this.skeleton.calculateInverses();

			bindMatrix = this.matrixWorld;

		}

		this.bindMatrix.copy( bindMatrix );
		this.bindMatrixInverse.getInverse( bindMatrix );

	},

	pose: function () {

		this.skeleton.pose();

	},

	normalizeSkinWeights: function () {

		var vector = new Vector4();

		var skinWeight = this.geometry.attributes.skinWeight;

		for ( var i = 0, l = skinWeight.count; i < l; i ++ ) {

			vector.x = skinWeight.getX( i );
			vector.y = skinWeight.getY( i );
			vector.z = skinWeight.getZ( i );
			vector.w = skinWeight.getW( i );

			var scale = 1.0 / vector.manhattanLength();

			if ( scale !== Infinity ) {

				vector.multiplyScalar( scale );

			} else {

				vector.set( 1, 0, 0, 0 ); // do something reasonable

			}

			skinWeight.setXYZW( i, vector.x, vector.y, vector.z, vector.w );

		}

	},
	//更新世界矩阵
	updateMatrixWorld: function ( force ) {
		//直接调用Mesh的相关方法，但是该方法会根据是attached或者detached来确定使用不同的矩阵
		Mesh.prototype.updateMatrixWorld.call( this, force );

		if ( this.bindMode === 'attached' ) {

			this.bindMatrixInverse.getInverse( this.matrixWorld );

		} else if ( this.bindMode === 'detached' ) {

			this.bindMatrixInverse.getInverse( this.bindMatrix );

		} else {

			console.warn( 'THREE.SkinnedMesh: Unrecognized bindMode: ' + this.bindMode );

		}

	},
	//克隆方法
	clone: function () {

		return new this.constructor( this.geometry, this.material ).copy( this );

	}

} );


export { SkinnedMesh };
