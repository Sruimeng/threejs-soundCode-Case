import { Line } from './Line.js';
import { Vector3 } from '../math/Vector3.js';
import { Float32BufferAttribute } from '../core/BufferAttribute.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * @description  LineSegments方法继承的是Line的基类，它绘制的是一个一个的线段
 * 用的是gl.LINES，每两个点组成一个线段，然后再去渲染
 * 
 * @param {any} geometry 
 * @param {any} material 
 */
function LineSegments( geometry, material ) {

	Line.call( this, geometry, material );

	this.type = 'LineSegments';

}

LineSegments.prototype = Object.assign( Object.create( Line.prototype ), {

	constructor: LineSegments,

	isLineSegments: true,
	//计算线段的总长度，因为gl.LINES是一段一段渲染的，所以求得是一段一段的距离
	computeLineDistances: ( function () {

		var start = new Vector3();
		var end = new Vector3();

		return function computeLineDistances() {

			var geometry = this.geometry;

			if ( geometry.isBufferGeometry ) {

				// we assume non-indexed geometry

				if ( geometry.index === null ) {

					var positionAttribute = geometry.attributes.position;
					var lineDistances = [];

					for ( var i = 0, l = positionAttribute.count; i < l; i += 2 ) {

						start.fromBufferAttribute( positionAttribute, i );
						end.fromBufferAttribute( positionAttribute, i + 1 );

						lineDistances[ i ] = ( i === 0 ) ? 0 : lineDistances[ i - 1 ];
						lineDistances[ i + 1 ] = lineDistances[ i ] + start.distanceTo( end );

					}

					geometry.addAttribute( 'lineDistance', new Float32BufferAttribute( lineDistances, 1 ) );

				} else {

					console.warn( 'THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.' );

				}

			} else if ( geometry.isGeometry ) {

				var vertices = geometry.vertices;
				var lineDistances = geometry.lineDistances;

				for ( var i = 0, l = vertices.length; i < l; i += 2 ) {

					start.copy( vertices[ i ] );
					end.copy( vertices[ i + 1 ] );

					lineDistances[ i ] = ( i === 0 ) ? 0 : lineDistances[ i - 1 ];
					lineDistances[ i + 1 ] = lineDistances[ i ] + start.distanceTo( end );

				}

			}

			return this;

		};

	}() )

} );


export { LineSegments };
