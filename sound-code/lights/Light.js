import { Object3D } from '../core/Object3D.js';
import { Color } from '../math/Color.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

/**
 *	three 灯光的基类，该基类也是继承自object3d对象
 *	该对象接受两个参数分别为灯光的强度和灯光的颜色
 * @param {Color} color
 * @param {Number} intensity
 */
function Light( color, intensity ) {

	Object3D.call( this );
	//设置类型
	this.type = 'Light';

	this.color = new Color( color );
	this.intensity = intensity !== undefined ? intensity : 1;
	//接受阴影设置为undefined，灯光不接受阴影，只能产生阴影
	this.receiveShadow = undefined;

}
//灯光的方法
Light.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Light,
	//是否为灯光类
	isLight: true,
	//复制方法，接受一个灯光对象，
	copy: function ( source ) {

		Object3D.prototype.copy.call( this, source );

		this.color.copy( source.color );
		this.intensity = source.intensity;

		return this;

	},
	//变成json的方法，接受的也是一个灯光对象
	toJSON: function ( meta ) {

		var data = Object3D.prototype.toJSON.call( this, meta );

		data.object.color = this.color.getHex();
		data.object.intensity = this.intensity;

		if ( this.groundColor !== undefined ) data.object.groundColor = this.groundColor.getHex();

		if ( this.distance !== undefined ) data.object.distance = this.distance;
		if ( this.angle !== undefined ) data.object.angle = this.angle;
		if ( this.decay !== undefined ) data.object.decay = this.decay;
		if ( this.penumbra !== undefined ) data.object.penumbra = this.penumbra;

		if ( this.shadow !== undefined ) data.object.shadow = this.shadow.toJSON();

		return data;

	}

} );


export { Light };
