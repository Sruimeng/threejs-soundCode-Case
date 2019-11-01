import { Material } from './Material.js';
import { Color } from '../math/Color.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  size: <float>,
 *  sizeAttenuation: <bool>
 *
 *  morphTargets: <bool>
 * }
 */

/**
 * @description Points使用的默认材质
 * 
 * @param {any} parameters 
 */
function PointsMaterial( parameters ) {

	Material.call( this );

	this.type = 'PointsMaterial';
	//颜色
	this.color = new Color( 0xffffff );
	//基础贴图
	this.map = null;
	//点的大小
	this.size = 1;
	//指定点的大小是否因相机深度而衰减。（仅限透视摄像头。）默认为true。
	this.sizeAttenuation = true;
	//这个点是否有变形动画
	this.morphTargets = false;
	//是否受光照影响
	this.lights = false;

	this.setValues( parameters );

}

PointsMaterial.prototype = Object.create( Material.prototype );
PointsMaterial.prototype.constructor = PointsMaterial;

PointsMaterial.prototype.isPointsMaterial = true;
//复制方法
PointsMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.color.copy( source.color );

	this.map = source.map;

	this.size = source.size;
	this.sizeAttenuation = source.sizeAttenuation;

	this.morphTargets = source.morphTargets;

	return this;

};


export { PointsMaterial };
