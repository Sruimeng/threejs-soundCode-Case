import { Material } from './Material.js';
import { Vector3 } from '../math/Vector3.js';

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *
 *  referencePosition: <float>,
 *  nearDistance: <float>,
 *  farDistance: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>
 *
 * }
 */

/**
 * @description MeshDistanceMaterial内部用于通过PointLights实现阴影映射。
 * 通过将MeshDistanceMaterial的实例分配给Object3D.customDistanceMaterial，
 * 还可以用于自定义对象的阴影投射。
 * 
 * @param {any} parameters 
 */
function MeshDistanceMaterial( parameters ) {

	Material.call( this );
	//类型
	this.type = 'MeshDistanceMaterial';
	//阴影产生的位置？
	this.referencePosition = new Vector3();
	//产生阴影的最近/最远距离
	this.nearDistance = 1;
	this.farDistance = 1000;
	//是否启用蒙皮
	this.skinning = false;
	//是否为变形动画
	this.morphTargets = false;
	//基础贴图
	this.map = null;
	//alpha贴图
	this.alphaMap = null;
	/**
	 * 位移贴图会影响网格顶点的位置，与仅影响材质的光照和阴影的其他贴图不同，
	 * 移位的顶点可以投射阴影，阻挡其他对象，以及充当真实的几何体。 
	 * 位移纹理是指：网格的所有顶点被映射为图像中每个像素的值（白色是最高的），并且被重定位。
	 */
	this.displacementMap = null;
	this.displacementScale = 1;
	this.displacementBias = 0;
	//是否受雾的影响
	this.fog = false;
	//是否受光照的影响
	this.lights = false;

	this.setValues( parameters );

}

MeshDistanceMaterial.prototype = Object.create( Material.prototype );
MeshDistanceMaterial.prototype.constructor = MeshDistanceMaterial;

MeshDistanceMaterial.prototype.isMeshDistanceMaterial = true;
//复制方法
MeshDistanceMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.referencePosition.copy( source.referencePosition );
	this.nearDistance = source.nearDistance;
	this.farDistance = source.farDistance;

	this.skinning = source.skinning;
	this.morphTargets = source.morphTargets;

	this.map = source.map;

	this.alphaMap = source.alphaMap;

	this.displacementMap = source.displacementMap;
	this.displacementScale = source.displacementScale;
	this.displacementBias = source.displacementBias;

	return this;

};


export { MeshDistanceMaterial };
