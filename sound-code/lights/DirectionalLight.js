import { Light } from './Light.js';
import { DirectionalLightShadow } from './DirectionalLightShadow.js';
import { Object3D } from '../core/Object3D.js';
import { Color } from '../math/Color.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

/**
 * 方向光对象，继承自light基类，接受两个参数分别为灯光的颜色和强度
 *
 * @param {Color} color
 * @param {Number} intensity
 */
function DirectionalLight( color, intensity ) {

	Light.call( this, color, intensity );

	this.type = 'DirectionalLight';
	//复制位置信息
	this.position.copy( Object3D.DefaultUp );
	//更新矩阵
	this.updateMatrix();
	//设置方向光的朝向
	this.target = new Object3D();
	//设置阴影
	this.shadow = new DirectionalLightShadow();

}
//也是只有一个copy方法，但是不同的是复制的信息不一样
DirectionalLight.prototype = Object.assign( Object.create( Light.prototype ), {

	constructor: DirectionalLight,

	isDirectionalLight: true,

	copy: function ( source ) {

		Light.prototype.copy.call( this, source );

		this.target = source.target.clone();

		this.shadow = source.shadow.clone();

		return this;

	}

} );


export { DirectionalLight };
