import {
	MeshStandardMaterial
} from './MeshStandardMaterial.js';

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *  reflectivity: <float>
 *  clearCoat: <float>
 *  clearCoatRoughness: <float>
 * }
 */

/**
 * @description PBR渲染的材质的补充，主要是能更改反射率了，继承自MeshStandardMaterial对象
 * 请注意，为了获得最佳效果，您在使用此材质时应始终指定环境贴图。
 * 
 * @param {any} parameters 
 */
function MeshPhysicalMaterial(parameters) {

	MeshStandardMaterial.call(this);
	//shader用这个来选择着色器
	this.defines = {
		'PHYSICAL': ''
	};

	this.type = 'MeshPhysicalMaterial';
	//反射度，从0.0到1.0。默认值为0.5。
	//这模拟了非金属材质的反射率。当MeshStandardMaterial为1.0时，此属性无效。
	this.reflectivity = 0.5; // maps to F0 = 0.04
	//Clearcoat级别，从0.0到1.0。默认值为0.0。
	this.clearCoat = 0.0;
	//clearcoat看起来的粗糙程度，从0.0到1.0。默认值为0.0。
	this.clearCoatRoughness = 0.0;

	this.setValues(parameters);

}

MeshPhysicalMaterial.prototype = Object.create(MeshStandardMaterial.prototype);
MeshPhysicalMaterial.prototype.constructor = MeshPhysicalMaterial;

MeshPhysicalMaterial.prototype.isMeshPhysicalMaterial = true;
//重写复制方法
MeshPhysicalMaterial.prototype.copy = function (source) {

	MeshStandardMaterial.prototype.copy.call(this, source);

	this.defines = {
		'PHYSICAL': ''
	};

	this.reflectivity = source.reflectivity;

	this.clearCoat = source.clearCoat;
	this.clearCoatRoughness = source.clearCoatRoughness;

	return this;

};


export {
	MeshPhysicalMaterial
};