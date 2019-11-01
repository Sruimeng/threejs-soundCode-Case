import { Material } from './Material.js';
import { MultiplyOperation } from '../constants.js';
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
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
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
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>
 * }
 */

/**
 * @description 网格的基础材质，继承自Material，有什么属性上面都有了
 * 
 * @param {any} parameters 
 */
function MeshBasicMaterial( parameters ) {

	Material.call( this );

	this.type = 'MeshBasicMaterial';
	//颜色
	this.color = new Color( 0xffffff ); // emissive
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

MeshBasicMaterial.prototype = Object.create( Material.prototype );
MeshBasicMaterial.prototype.constructor = MeshBasicMaterial;

MeshBasicMaterial.prototype.isMeshBasicMaterial = true;
//修改下复制的参数啥的
MeshBasicMaterial.prototype.copy = function ( source ) {

	Material.prototype.copy.call( this, source );

	this.color.copy( source.color );

	this.map = source.map;

	this.lightMap = source.lightMap;
	this.lightMapIntensity = source.lightMapIntensity;

	this.aoMap = source.aoMap;
	this.aoMapIntensity = source.aoMapIntensity;

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

	return this;

};


export { MeshBasicMaterial };
