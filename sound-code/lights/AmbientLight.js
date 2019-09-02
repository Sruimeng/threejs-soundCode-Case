import { Light } from './Light.js';
import { Color } from '../math/Color.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * 全局光对象，继承自light基类，接受两个参数，灯光的颜色和强度
 *
 * @param {Color} color
 * @param {Number} intensity
 */
function AmbientLight( color, intensity ) {

	Light.call( this, color, intensity );

	this.type = 'AmbientLight';

	this.castShadow = undefined;

}
//全局光基本上跟基类差不多，没有啥其他的东西了
AmbientLight.prototype = Object.assign( Object.create( Light.prototype ), {

	constructor: AmbientLight,

	isAmbientLight: true

} );


export { AmbientLight };
