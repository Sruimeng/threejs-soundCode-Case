import {
	TangentSpaceNormalMap
} from '../constants.js';
import {
	Material
} from './Material.js';
import {
	Vector2
} from '../math/Vector2.js';
import {
	Color
} from '../math/Color.js';

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  matcap: new THREE.Texture( <Image> ),
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalMapType: THREE.TangentSpaceNormalMap,
 *  normalScale: <Vector2>,
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */

/**
 * @description Matcap全称MaterialCapture(材质捕获)
 * 是一种把光照信息存储在纹理，从而省略大量光照计算(只需要采样一张图)，就可以实现有光的感觉。
 * 优点确实是能出效果、非常省。
 * 缺点是光照图是死的，难以使效果与环境产生交互。需要进行特定的处理，但是省资源一项就很值
 * 
 * @param {any} parameters 
 */
function MeshMatcapMaterial(parameters) {

	Material.call(this);
	//
	this.defines = {
		'MATCAP': ''
	};

	this.type = 'MeshMatcapMaterial';
	//颜色
	this.color = new Color(0xffffff); // diffuse
	//matcap的具体贴图
	this.matcap = null;
	//基础贴图
	this.map = null;
	//用于创建凹凸贴图的纹理。黑色和白色值映射到与光照相关的感知深度。
	//凹凸实际上不会影响对象的几何形状，只影响光照。如果定义了法线贴图，则将忽略该贴图。
	this.bumpMap = null;
	//凹凸贴图会对材质产生多大影响。典型范围是0-1。默认值为1。
	this.bumpScale = 1;
	//用于创建法线贴图的纹理。RGB值会影响每个像素片段的曲面法线，并更改颜色照亮的方式。
	//法线贴图不会改变曲面的实际形状，只会改变光照。
	this.normalMap = null;
	//法线贴图的类型。
	this.normalMapType = TangentSpaceNormalMap;
	//法线贴图对材质的影响程度。典型范围是0-1。默认值是Vector2设置为（1,1）。
	this.normalScale = new Vector2(1, 1);
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
	//	//alpha贴图
	this.alphaMap = null;
	//材质是否使用蒙皮。默认值为false。
	this.skinning = false;
	//是否有变形动画
	this.morphTargets = false;
	//定义是否使用morphNormals。设置为true可将morphNormal属性从Geometry传递到shader。默认值为false。
	this.morphNormals = false;
	//是否受光照的影响
	this.lights = false;

	this.setValues(parameters);

}

MeshMatcapMaterial.prototype = Object.create(Material.prototype);
MeshMatcapMaterial.prototype.constructor = MeshMatcapMaterial;

MeshMatcapMaterial.prototype.isMeshMatcapMaterial = true;

MeshMatcapMaterial.prototype.copy = function (source) {

	Material.prototype.copy.call(this, source);

	this.defines = {
		'MATCAP': ''
	};

	this.color.copy(source.color);

	this.matcap = source.matcap;

	this.map = source.map;

	this.bumpMap = source.bumpMap;
	this.bumpScale = source.bumpScale;

	this.normalMap = source.normalMap;
	this.normalMapType = source.normalMapType;
	this.normalScale.copy(source.normalScale);

	this.displacementMap = source.displacementMap;
	this.displacementScale = source.displacementScale;
	this.displacementBias = source.displacementBias;

	this.alphaMap = source.alphaMap;

	this.skinning = source.skinning;
	this.morphTargets = source.morphTargets;
	this.morphNormals = source.morphNormals;

	return this;

};


export {
	MeshMatcapMaterial
};