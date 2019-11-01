import {
	Material
} from './Material.js';
import {
	BasicDepthPacking
} from '../constants.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author bhouston / https://clara.io
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */

/**
 * @description 深度网格材质
 * 一种按深度绘制几何体的材质。深度基于相机远近平面。白色最近，黑色最远。
 * 
 * @param {any} parameters 
 */
function MeshDepthMaterial(parameters) {
	//继承自Material
	Material.call(this);

	this.type = 'MeshDepthMaterial';
	//depth packing的编码。默认为BasicDepthPacking。
	this.depthPacking = BasicDepthPacking;
	//是否使用蒙皮
	this.skinning = false;
	//是否有变形动画
	this.morphTargets = false;
	//基础材质
	this.map = null;
	//alpha贴图
	this.alphaMap = null;
	/**
	 * 位移贴图会影响网格顶点的位置，与仅影响材质的光照和阴影的其他贴图不同，
	 * 移位的顶点可以投射阴影，阻挡其他对象，以及充当真实的几何体。
	 *  位移纹理是指：网格的所有顶点被映射为图像中每个像素的值（白色是最高的），并且被重定位。
	 */
	this.displacementMap = null;
	//位移贴图对网格的影响程度（黑色是无位移，白色是最大位移）。如果没有设置位移贴图，则不会应用此值。默认值为1。
	this.displacementScale = 1;
	//位移贴图在网格顶点上的偏移量。如果没有设置位移贴图，则不会应用此值。默认值为0。
	this.displacementBias = 0;
	//是否启用网格材质
	this.wireframe = false;
	//网格线的宽度
	this.wireframeLinewidth = 1;
	//是否受雾的影响
	this.fog = false;
	//是否受光照的影响
	this.lights = false;

	this.setValues(parameters);

}

MeshDepthMaterial.prototype = Object.create(Material.prototype);
MeshDepthMaterial.prototype.constructor = MeshDepthMaterial;

MeshDepthMaterial.prototype.isMeshDepthMaterial = true;
//更新复制方法
MeshDepthMaterial.prototype.copy = function (source) {

	Material.prototype.copy.call(this, source);

	this.depthPacking = source.depthPacking;

	this.skinning = source.skinning;
	this.morphTargets = source.morphTargets;

	this.map = source.map;

	this.alphaMap = source.alphaMap;

	this.displacementMap = source.displacementMap;
	this.displacementScale = source.displacementScale;
	this.displacementBias = source.displacementBias;

	this.wireframe = source.wireframe;
	this.wireframeLinewidth = source.wireframeLinewidth;

	return this;

};


export {
	MeshDepthMaterial
};