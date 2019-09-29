import { Light } from './Light.js';
import { Color } from '../math/Color.js';

/**
 * @author abelnation / http://github.com/abelnation
 */

/**
 *	平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源。
 *	接受四个参数分别为光的颜色，强度，光的宽和高
 * 	不支持阴影。	只支持 MeshStandardMaterial 和 MeshPhysicalMaterial 两种材质。
 *	你必须在你的场景中加入 RectAreaLightUniformsLib ，并调用init()。
 * @param {Color} color 光源颜色
 * @param {Number} intensity 光源强度
 * @param {Number} width 光源的宽
 * @param {Number} height 光源的高
 */
function RectAreaLight( color, intensity, width, height ) {

	Light.call( this, color, intensity );

	this.type = 'RectAreaLight';
	//设置宽高默认为10
	this.width = ( width !== undefined ) ? width : 10;
	this.height = ( height !== undefined ) ? height : 10;

}

RectAreaLight.prototype = Object.assign( Object.create( Light.prototype ), {

	constructor: RectAreaLight,

	isRectAreaLight: true,
	//复制方法
	copy: function ( source ) {

		Light.prototype.copy.call( this, source );

		this.width = source.width;
		this.height = source.height;

		return this;

	},

	toJSON: function ( meta ) {

		var data = Light.prototype.toJSON.call( this, meta );

		data.object.width = this.width;
		data.object.height = this.height;

		return data;

	}

} );

export { RectAreaLight };
