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
 *  roughness: <float>,
 *  metalness: <float>,
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
 *  roughnessMap: new THREE.Texture( <Image> ),
 *
 *  metalnessMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
 *  envMapIntensity: <float>
 *
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
 * @description 一种基于物理的标准材质，使用Metallic-Roughness工作流程。
 * 基于物理的渲染（PBR）最近已成为许多3D应用程序的标准，例如Unity， Unreal和 3D Studio Max。
 * 这种方法与旧方法的不同之处在于，不使用近似值来表示光与表面的相互作用，而是使用物理上正确的模型。
 *  我们的想法是，不是在特定照明下调整材质以使其看起来很好，而是可以创建一种材质，能够“正确”地应对所有光照场景。
 * 在实践中，该材质提供了比MeshLambertMaterial 或MeshPhongMaterial 更精确和逼真的结果，代价是计算成本更高。
 * 计算着色的方式与MeshPhongMaterial相同，都使用Phong着色模型， 
 * 这会计算每个像素的阴影（即在fragment shader， AKA pixel shader中）， 
 * 与MeshLambertMaterial使用的Gouraud模型相比，该模型的结果更准确，但代价是牺牲一些性能。
 * 
 * @param {any} parameters 
 */
function MeshStandardMaterial(parameters) {

	Material.call(this);

	this.defines = {
		'STANDARD': ''
	};

	this.type = 'MeshStandardMaterial';
	//颜色
	this.color = new Color(0xffffff); // diffuse
	//材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为0.5。
	//如果还提供roughnessMap，则两个值相乘。
	this.roughness = 0.5;
	// 材质与金属的相似度。非金属材质，如木材或石材，使用0.0，金属使用1.0，通常没有中间值。 
	// 默认值为0.5。0.0到1.0之间的值可用于生锈金属的外观。
	// 如果还提供了metalnessMap，则两个值相乘。
	this.metalness = 0.5;
	//基础贴图
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
	//该纹理的绿色通道用于改变材质的粗糙度。
	this.roughnessMap = null;
	//该纹理的蓝色通道用于改变材质的金属度。
	this.metalnessMap = null;
	/**
	 * alpha贴图是一种灰度纹理，用于控制整个表面的不透明度（黑色：完全透明;白色：完全不透明）。默认值为null。
	 * 仅使用纹理的颜色，忽略alpha通道（如果存在）。对于RGB和RGBA纹理，WebGL渲染器在采样此纹理时将使用绿色通道，
	 *  因为在DXT压缩和未压缩RGB 565格式中为绿色提供了额外的精度。Luminance-only以及luminance/alpha纹理也仍然有效。
	 */
	this.alphaMap = null;
	//环境贴图
	this.envMap = null;
	//环境贴图的光的强度
	this.envMapIntensity = 1.0;
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

MeshStandardMaterial.prototype = Object.create(Material.prototype);
MeshStandardMaterial.prototype.constructor = MeshStandardMaterial;

MeshStandardMaterial.prototype.isMeshStandardMaterial = true;
//复制方法
MeshStandardMaterial.prototype.copy = function (source) {

	Material.prototype.copy.call(this, source);

	this.defines = {
		'STANDARD': ''
	};

	this.color.copy(source.color);
	this.roughness = source.roughness;
	this.metalness = source.metalness;

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

	this.roughnessMap = source.roughnessMap;

	this.metalnessMap = source.metalnessMap;

	this.alphaMap = source.alphaMap;

	this.envMap = source.envMap;
	this.envMapIntensity = source.envMapIntensity;

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
	MeshStandardMaterial
};