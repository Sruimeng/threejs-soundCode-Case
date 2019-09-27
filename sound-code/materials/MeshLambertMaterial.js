import {
	Material
} from './Material.js';
import {
	MultiplyOperation
} from '../constants.js';
import {
	Color
} from '../math/Color.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>
 * }
 */

/**
 * @description 一种非光泽表面的材质，没有镜面高光。
 * 该材质使用基于非物理的Lambertian模型来计算反射率。 这可以很好地模拟一些表面（例如未经处理的木材或石材），
 * 但不能模拟具有镜面高光的光泽表面（例如涂漆木材）。
 * 使用Gouraud着色模型计算着色。这将计算每个顶点的着色 （即在vertex shader中）并在多边形的面上插入结果。
 * 由于反射率和光照模型的简单性，MeshPhongMaterial，MeshStandardMaterial或者MeshPhysicalMaterial 
 * 上使用这种材质时会以一些图形精度为代价，得到更高的性能。
 * 
 * @param {any} parameters 
 */
function MeshLambertMaterial(parameters) {

	Material.call(this);

	this.type = 'MeshLambertMaterial';
	//颜色
	this.color = new Color(0xffffff); // diffuse
	//基础纹理
	this.map = null;
	//光照贴图
	this.lightMap = null;
	//光照贴图强度
	this.lightMapIntensity = 1.0;
	//该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UVs，因此将忽略repeat和offset属性。
	this.aoMap = null;
	//环境遮蔽贴图强度
	this.aoMapIntensity = 1.0;
	//自发光颜色
	this.emissive = new Color(0x000000);
	//自发光强度
	this.emissiveIntensity = 1.0;
	//自发光贴图
	this.emissiveMap = null;
	//材质使用的高光贴图。默认值为null。
	this.specularMap = null;
	/**
	 * alpha贴图是一种灰度纹理，用于控制整个表面的不透明度（黑色：完全透明;白色：完全不透明）。默认值为null。
	 * 仅使用纹理的颜色，忽略alpha通道（如果存在）。对于RGB和RGBA纹理，WebGL渲染器在采样此纹理时将使用绿色通道，
	 *  因为在DXT压缩和未压缩RGB 565格式中为绿色提供了额外的精度。Luminance-only以及luminance/alpha纹理也仍然有效。
	 */
	this.alphaMap = null;
	//环境贴图
	this.envMap = null;
	//如何将表面颜色的结果与环境贴图（如果有）结合起来，有加法减法混合
	this.combine = MultiplyOperation;
	//环境贴图对表面的影响程度; 见.combine。默认值为1，有效范围介于0（无反射）和1（完全反射）之间。
	this.reflectivity = 1;
	//空气的折射率（IOR）（约为1）除以材质的折射率。它与环境映射模式THREE.CubeRefractionMapping 
	//和THREE.EquirectangularRefractionMapping一起使用。 折射率不应超过1。默认值为0.98。
	this.refractionRatio = 0.98;
	//是否呈现网格形式
	this.wireframe = false;
	//网格线的宽度
	this.wireframeLinewidth = 1;
	//线两端的样式
	this.wireframeLinecap = 'round';
	//线段之间的样式
	this.wireframeLinejoin = 'round';
	//材质是否使用蒙皮。默认值为false。
	this.skinning = false;
	//是否有变形动画
	this.morphTargets = false;
	//是否受光照影响
	this.lights = false;
	//设置属性
	this.setValues( parameters );

}

MeshLambertMaterial.prototype = Object.create(Material.prototype);
MeshLambertMaterial.prototype.constructor = MeshLambertMaterial;

MeshLambertMaterial.prototype.isMeshLambertMaterial = true;

MeshLambertMaterial.prototype.copy = function (source) {

	Material.prototype.copy.call(this, source);

	this.color.copy(source.color);

	this.map = source.map;

	this.lightMap = source.lightMap;
	this.lightMapIntensity = source.lightMapIntensity;

	this.aoMap = source.aoMap;
	this.aoMapIntensity = source.aoMapIntensity;

	this.emissive.copy(source.emissive);
	this.emissiveMap = source.emissiveMap;
	this.emissiveIntensity = source.emissiveIntensity;

	this.specularMap = source.specularMap;

	this.alphaMap = source.alphaMap;

	this.envMap = source.envMap;
	this.combine = source.combine;
	this.reflectivity = source.reflectivity;
	this.refractionRatio = source.refractionRatio;

	this.wireframe = source.wireframe;
	this.wireframeLinewidth = source.wireframeLinewidth;
	this.wireframeLinecap = source.wireframeLinecap;
	this.wireframeLinejoin = source.wireframeLinejoin;

	this.skinning = source.skinning;
	this.morphTargets = source.morphTargets;
	this.morphNormals = source.morphNormals;

	return this;

};


export {
	MeshLambertMaterial
};