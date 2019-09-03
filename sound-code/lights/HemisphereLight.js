import { Light } from './Light.js';
import { Color } from '../math/Color.js';
import { Object3D } from '../core/Object3D.js';

/**
 * @author alteredq / http://alteredqualia.com/
 */

/**
 *  半球光，模拟的室外的日光照射情况，看到这俩属性忽然想起来写VRML的时候的天空盒的设置了，O(∩_∩)O哈哈~
 *	从代码中可以看出，天空颜色是作为灯光的颜色传递的，但是地面颜色就是在渲染的时候另外做设置的了
 * @param {*} skyColor  天空的颜色
 * @param {*} groundColor 地面的颜色
 * @param {*} intensity 光照强度
 */
function HemisphereLight( skyColor, groundColor, intensity ) {
	//继承灯光基类
	Light.call( this, skyColor, intensity );

	this.type = 'HemisphereLight';

	this.castShadow = undefined;

	this.position.copy( Object3D.DefaultUp );
	this.updateMatrix();
	//上面的和方向光的设置一样，不一样的只是多了个地面颜色
	this.groundColor = new Color( groundColor );

}

HemisphereLight.prototype = Object.assign( Object.create( Light.prototype ), {

	constructor: HemisphereLight,

	isHemisphereLight: true,
	//复制方法
	copy: function ( source ) {

		Light.prototype.copy.call( this, source );

		this.groundColor.copy( source.groundColor );

		return this;

	}

} );


export { HemisphereLight };
