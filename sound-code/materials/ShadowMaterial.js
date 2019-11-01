/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  color: <THREE.Color>
 * }
 */

import { Material } from './Material.js';
import { Color } from '../math/Color.js';

/**
 * @description 阴影材质，此材质可以接收阴影，但在其他方面完全透明。
 * 
 * @param {any} parameters 
 */
function ShadowMaterial( parameters ) {

	Material.call( this );

	this.type = 'ShadowMaterial';

	this.color = new Color( 0x000000 );
	//透明默认有效
	this.transparent = true;

	this.setValues( parameters );

}

ShadowMaterial.prototype = Object.create( Material.prototype );
ShadowMaterial.prototype.constructor = ShadowMaterial;

ShadowMaterial.prototype.isShadowMaterial = true;
//重写复制方法
ShadowMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.color.copy( source.color );

	return this;

};


export { ShadowMaterial };
