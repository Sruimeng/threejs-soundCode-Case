import {
	MultiplyOperation,
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
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
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
 * @description 一种用于具有镜面高光的光泽表面的材质。
 * 该材质使用非物理的Blinn-Phong模型来计算反射率。 与MeshLambertMaterial中使用的Lambertian模型不同，
 * 该材质可以模拟具有镜面高光的光泽表面（例如涂漆木材）。使用Phong着色模型计算着色时，会计算每个像素的阴影
 * （在fragment shader， AKA pixel shader中），与MeshLambertMaterial使用的Gouraud模型相比，
 * 该模型的结果更准确，但代价是牺牲一些性能。
 *  MeshStandardMaterial和MeshPhysicalMaterial也使用这个着色模型。
 * 在MeshStandardMaterial或MeshPhysicalMaterial上使用此材质时，
 * 性能通常会更高 ，但会牺牲一些图形精度。
 * 
 * @param {any} parameters 
 */
function MeshPhongMaterial(parameters) {

	Material.call(this);

	this.type = 'MeshPhongMaterial';
	//颜色
	this.color = new Color(0xffffff); // diffuse
	//材质的高光颜色。默认值为0x111111（深灰色）的颜色Color。
	//这定义了材质的光泽度和光泽的颜色。
	this.specular = new Color(0x111111);
	//.specular高亮的程度，越高的值越闪亮。默认值为 30。
	this.shininess = 30;
	//纹理
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
	//定义是否使用morphNormals。设置为true可将morphNormal属性从Geometry传递到shader。默认值为false。
	this.morphNormals = false;

	this.setValues(parameters);

}

MeshPhongMaterial.prototype = Object.create(Material.prototype);
MeshPhongMaterial.prototype.constructor = MeshPhongMaterial;

MeshPhongMaterial.prototype.isMeshPhongMaterial = true;
//重写复制方法
MeshPhongMaterial.prototype.copy = function (source) {

	Material.prototype.copy.call(this, source);

	this.color.copy(source.color);
	this.specular.copy(source.specular);
	this.shininess = source.shininess;

	this.map = source.map;

	this.lightMap = source.lightMap;
	this.lightMapIntensity = source.lightMapIntensity;

	this.aoMap = source.aoMap;
	this.aoMapIntensity = source.aoMapIntensity;

	this.emissive.copy(source.emissive);
	this.emissiveMap = source.emissiveMap;
	this.emissiveIntensity = source.emissiveIntensity;

	this.bumpMap = source.bumpMap;
	this.bumpScale = source.bumpScale;

	this.normalMap = source.normalMap;
	this.normalMapType = source.normalMapType;
	this.normalScale.copy(source.normalScale);

	this.displacementMap = source.displacementMap;
	this.displacementScale = source.displacementScale;
	this.displacementBias = source.displacementBias;

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
	MeshPhongMaterial
};