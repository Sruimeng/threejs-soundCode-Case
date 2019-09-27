import {
	Material
} from './Material.js';
import {
	Color
} from '../math/Color.js';

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  map: new THREE.Texture( <Image> ),
 *  rotation: <float>,
 *  sizeAttenuation: <bool>
 * }
 */

/**
 * @description 点精灵用的材质
 * 
 * @param {any} parameters 
 */
function SpriteMaterial(parameters) {

	Material.call(this);

	this.type = 'SpriteMaterial';
	//颜色
	this.color = new Color(0xffffff);
	//基础贴图
	this.map = null;
	//sprite的转动，以弧度为单位。默认值为0。
	this.rotation = 0;
	//精灵的大小是否会被相机深度衰减。（仅限透视摄像头。）默认为true。
	this.sizeAttenuation = true;
	//是否受光照影响
	this.lights = false;
	//透明默认设置为true，就是默认开启透明
	this.transparent = true;

	this.setValues(parameters);

}

SpriteMaterial.prototype = Object.create(Material.prototype);
SpriteMaterial.prototype.constructor = SpriteMaterial;
SpriteMaterial.prototype.isSpriteMaterial = true;

SpriteMaterial.prototype.copy = function (source) {

	Material.prototype.copy.call(this, source);

	this.color.copy(source.color);
	this.map = source.map;

	this.rotation = source.rotation;

	this.sizeAttenuation = source.sizeAttenuation;

	return this;

};


export {
	SpriteMaterial
};