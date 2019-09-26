import { Matrix4 } from '../math/Matrix4.js';

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author michael guerrero / http://realitymeltdown.com
 * @author ikerr / http://verold.com
 */

/**
 * @description 骨架对象，就是动画中的骨骼动画的包裹对象
 * 
 * @param {Array} bones  包含有一组bone的数组，默认值是一个空数组。
 * @param {Array} boneInverses （可选） 包含Matrix4的数组。
 */
function Skeleton( bones, boneInverses ) {

	// copy the bone array
	bones = bones || [];

	this.bones = bones.slice( 0 );
	this.boneMatrices = new Float32Array( this.bones.length * 16 );

	// use the supplied bone inverses or calculate the inverses
	//判断有没有逆bone，如果没有先创建boneInverses，然后再进行相关处理
	if ( boneInverses === undefined ) {

		this.calculateInverses();

	} else {
		//先判断bone和逆bone的长度是否相等
		if ( this.bones.length === boneInverses.length ) {

			this.boneInverses = boneInverses.slice( 0 );

		} else {

			console.warn( 'THREE.Skeleton boneInverses is the wrong length.' );

			this.boneInverses = [];

			for ( var i = 0, il = this.bones.length; i < il; i ++ ) {

				this.boneInverses.push( new Matrix4() );

			}

		}

	}

}

Object.assign( Skeleton.prototype, {
	//生成boneInverses数组
	calculateInverses: function () {

		this.boneInverses = [];

		for ( var i = 0, il = this.bones.length; i < il; i ++ ) {

			var inverse = new Matrix4();

			if ( this.bones[ i ] ) {

				inverse.getInverse( this.bones[ i ].matrixWorld );

			}

			this.boneInverses.push( inverse );

		}

	},
	//返回骨架的基本姿势
	pose: function () {

		var bone, i, il;

		// recover the bind-time world matrices
		//恢复到绑定的那个时间点的世界矩阵
		for ( i = 0, il = this.bones.length; i < il; i ++ ) {

			bone = this.bones[ i ];

			if ( bone ) {

				bone.matrixWorld.getInverse( this.boneInverses[ i ] );

			}

		}

		// compute the local matrices, positions, rotations and scales
		//计算本地的矩阵，位置，旋转和缩放
		for ( i = 0, il = this.bones.length; i < il; i ++ ) {

			bone = this.bones[ i ];

			if ( bone ) {

				if ( bone.parent && bone.parent.isBone ) {

					bone.matrix.getInverse( bone.parent.matrixWorld );
					bone.matrix.multiply( bone.matrixWorld );

				} else {

					bone.matrix.copy( bone.matrixWorld );

				}

				bone.matrix.decompose( bone.position, bone.quaternion, bone.scale );

			}

		}

	},
	//更新方法
	update: ( function () {

		var offsetMatrix = new Matrix4();
		var identityMatrix = new Matrix4();

		return function update() {

			var bones = this.bones;
			var boneInverses = this.boneInverses;
			var boneMatrices = this.boneMatrices;
			var boneTexture = this.boneTexture;

			// flatten bone matrices to array
			//这应该是播放骨架动画
			for ( var i = 0, il = bones.length; i < il; i ++ ) {

				// compute the offset between the current and the original transform
				//计算当前和原始变换之间的偏移量
				var matrix = bones[ i ] ? bones[ i ].matrixWorld : identityMatrix;

				offsetMatrix.multiplyMatrices( matrix, boneInverses[ i ] );
				offsetMatrix.toArray( boneMatrices, i * 16 );

			}

			if ( boneTexture !== undefined ) {

				boneTexture.needsUpdate = true;

			}

		};

	} )(),
	//克隆方法
	clone: function () {

		return new Skeleton( this.bones, this.boneInverses );

	},
	//通过名字获得bone 这种设计很好，可以抄
	getBoneByName: function ( name ) {

		for ( var i = 0, il = this.bones.length; i < il; i ++ ) {

			var bone = this.bones[ i ];

			if ( bone.name === name ) {

				return bone;

			}

		}

		return undefined;

	}

} );


export { Skeleton };
