import { Light } from './Light.js';
import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js';
import { LightShadow } from './LightShadow.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

 
/**
 * point光和spot光的区别在于point是向四周发射光，而spot则是类似一个椎体的光
 * 从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。 
 * @param {*} color
 * @param {*} intensity
 * @param {*} distance
 * @param {*} decay
 */
function PointLight( color, intensity, distance, decay ) {

	Light.call( this, color, intensity );

	this.type = 'PointLight';
	//新加了一个power属性，power数值根据传入的强度数值来设置的
	Object.defineProperty( this, 'power', {
		get: function () {

			// intensity = power per solid angle.
			// ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
			return this.intensity * 4 * Math.PI;

		},
		set: function ( power ) {

			// intensity = power per solid angle.
			// ref: equation (15) from https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
			this.intensity = power / ( 4 * Math.PI );

		}
	} );

	this.distance = ( distance !== undefined ) ? distance : 0;
	//沿着光照距离的衰退量
	this.decay = ( decay !== undefined ) ? decay : 1;	// for physically correct lights, should be 2.

	this.shadow = new LightShadow( new PerspectiveCamera( 90, 1, 0.5, 500 ) );

}

PointLight.prototype = Object.assign( Object.create( Light.prototype ), {

	constructor: PointLight,

	isPointLight: true,

	copy: function ( source ) {

		Light.prototype.copy.call( this, source );

		this.distance = source.distance;
		this.decay = source.decay;

		this.shadow = source.shadow.clone();

		return this;

	}

} );


export { PointLight };
