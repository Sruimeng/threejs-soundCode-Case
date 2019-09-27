import {
	TangentSpaceNormalMap
} from '../constants.js';
import {
	Material
} from './Material.js';
import {
	Vector2
} from '../math/Vector2.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *  opacity: <float>,
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
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */

/**
 * @description 法向量贴图
 * 
 * @param {any} parameters 
 */
function MeshNormalMaterial(parameters) {

	Material.call(this);

	this.type = 'MeshNormalMaterial';

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
	//是否呈现网格形式
	this.wireframe = false;
	//网格线的宽度
	this.wireframeLinewidth = 1;
	//是否受雾的影响
	this.fog = false;
	//是否受光照的影响
	this.lights = false;
	//材质是否使用蒙皮。默认值为false。
	this.skinning = false;
	//是否有变形动画
	this.morphTargets = false;
	//定义是否使用morphNormals。设置为true可将morphNormal属性从Geometry传递到shader。默认值为false。
	this.morphNormals = false;
	this.setValues(parameters);

}

MeshNormalMaterial.prototype = Object.create(Material.prototype);
MeshNormalMaterial.prototype.constructor = MeshNormalMaterial;

MeshNormalMaterial.prototype.isMeshNormalMaterial = true;

MeshNormalMaterial.prototype.copy = function (source) {

	Material.prototype.copy.call(this, source);

	this.bumpMap = source.bumpMap;
	this.bumpScale = source.bumpScale;

	this.normalMap = source.normalMap;
	this.normalMapType = source.normalMapType;
	this.normalScale.copy(source.normalScale);

	this.displacementMap = source.displacementMap;
	this.displacementScale = source.displacementScale;
	this.displacementBias = source.displacementBias;

	this.wireframe = source.wireframe;
	this.wireframeLinewidth = source.wireframeLinewidth;

	this.skinning = source.skinning;
	this.morphTargets = source.morphTargets;
	this.morphNormals = source.morphNormals;

	return this;

};


export {
	MeshNormalMaterial
};