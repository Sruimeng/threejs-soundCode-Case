/**
 * @author alteredq / http://alteredqualia.com/
 */

import { Texture } from './Texture.js';
import { NearestFilter } from '../constants.js';
/**
 * @description 数据纹理 根据传进来的数据，表示出纹理
 * @date 2019-05-07
 * @param {*} data	数据
 * @param {Number} width	图片宽度
 * @param {Number} height	图片高度
 * @param {Number} format	接收的format
 * @param {Number} type		和format对应
 * @param {Number} mapping	纹理映射方式
 * @param {Number} wrapS	S轴的表示
 * @param {Number} wrapT	T轴的表示
 * @param {Number} magFilter	滤波器
 * @param {Number} minFilter
 * @param {Number} anisotropy	各向异性
 * @param {Number} encoding		编码方式
 */
function DataTexture( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding ) {

	Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );
	//新建图片
	this.image = { data: data, width: width, height: height };
	//设置最大/最小值滤波器的样式
	this.magFilter = magFilter !== undefined ? magFilter : NearestFilter;
	this.minFilter = minFilter !== undefined ? minFilter : NearestFilter;
	//没有mipmap
	this.generateMipmaps = false;
	//不能旋转
	this.flipY = false;
	//设置对齐方式为字节对齐
	this.unpackAlignment = 1;

}

DataTexture.prototype = Object.create( Texture.prototype );
DataTexture.prototype.constructor = DataTexture;

DataTexture.prototype.isDataTexture = true;


export { DataTexture };
