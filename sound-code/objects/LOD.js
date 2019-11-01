import { Vector3 } from '../math/Vector3.js';
import { Object3D } from '../core/Object3D.js';

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * @description 多细节层次 —— 在显示网格时，
 * 根据摄像机距离物体的距离，来使用更多或者更少的几何体来对其进行显示。
 * 每一个级别都和一个几何体相关联，且在渲染时，可以根据给定的距离，
 * 来在这些级别对应的几何体之间进行切换。 通常情况下，你会创建多个几何体，比如说三个，一
 * 个距离很远（低细节），一个距离适中（中等细节），还有一个距离非常近（高质量）。
 * 官网解释的很好 在这里就不过多解释了
 */
function LOD() {
	//该对象同样继承自Object3D
	Object3D.call( this );

	this.type = 'LOD';
	//定义了一个levels属性
	Object.defineProperties( this, {
		levels: {
			enumerable: true,
			value: []
		}
	} );

}

LOD.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: LOD,
	//复制方法
	copy: function ( source ) {

		Object3D.prototype.copy.call( this, source, false );

		var levels = source.levels;

		for ( var i = 0, l = levels.length; i < l; i ++ ) {

			var level = levels[ i ];

			this.addLevel( level.object.clone(), level.distance );

		}

		return this;

	},
	//添加等级，需要两个参数，分别为(object（需要添加的物体）和distance（显示的距离）)
	addLevel: function ( object, distance ) {

		if ( distance === undefined ) distance = 0;

		distance = Math.abs( distance );

		var levels = this.levels;

		for ( var l = 0; l < levels.length; l ++ ) {

			if ( distance < levels[ l ].distance ) {

				break;

			}

		}

		levels.splice( l, 0, { distance: distance, object: object } );

		this.add( object );

	},
	//根据距离获取物体
	getObjectForDistance: function ( distance ) {

		var levels = this.levels;

		for ( var i = 1, l = levels.length; i < l; i ++ ) {

			if ( distance < levels[ i ].distance ) {

				break;

			}

		}

		return levels[ i - 1 ].object;

	},
	//判断传入的射线和物体时候香蕉
	raycast: ( function () {

		var matrixPosition = new Vector3();

		return function raycast( raycaster, intersects ) {

			matrixPosition.setFromMatrixPosition( this.matrixWorld );

			var distance = raycaster.ray.origin.distanceTo( matrixPosition );

			this.getObjectForDistance( distance ).raycast( raycaster, intersects );

		};

	}() ),

	update: function () {

		var v1 = new Vector3();
		var v2 = new Vector3();

		return function update( camera ) {

			var levels = this.levels;

			if ( levels.length > 1 ) {

				v1.setFromMatrixPosition( camera.matrixWorld );
				v2.setFromMatrixPosition( this.matrixWorld );

				var distance = v1.distanceTo( v2 );

				levels[ 0 ].object.visible = true;

				for ( var i = 1, l = levels.length; i < l; i ++ ) {

					if ( distance >= levels[ i ].distance ) {

						levels[ i - 1 ].object.visible = false;
						levels[ i ].object.visible = true;

					} else {

						break;

					}

				}

				for ( ; i < l; i ++ ) {

					levels[ i ].object.visible = false;

				}

			}

		};

	}(),
	//变成json格式
	toJSON: function ( meta ) {

		var data = Object3D.prototype.toJSON.call( this, meta );

		data.object.levels = [];

		var levels = this.levels;

		for ( var i = 0, l = levels.length; i < l; i ++ ) {

			var level = levels[ i ];

			data.object.levels.push( {
				object: level.object.uuid,
				distance: level.distance
			} );

		}

		return data;

	}

} );


export { LOD };
