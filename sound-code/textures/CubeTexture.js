/**
 * @author mrdoob / http://mrdoob.com/
 */
/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/
import { Texture } from './Texture.js';
import { CubeReflectionMapping, RGBFormat } from '../constants.js';
/**
 * @description 天空盒纹理
 * @date 2019-05-06
 * @param {*} images 六张图片数组
 * @param {Number} mapping 纹理映射模式
 * @param {Number} wrapS	S轴即U的展示方式
 * @param {Number} wrapT	T轴即V的展示方式
 * @param {Number} magFilter	最大值滤波器
 * @param {Number} minFilter	最小值滤波器
 * @param {Number} format	读取的类型
 * @param {Number} type	
 * @param {Number} anisotropy	各向异性
 * @param {Number} encoding		编码方式
 */
function CubeTexture( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {
	//设置图片数组
	images = images !== undefined ? images : [];
	//设置纹理映射为正方体反射映射
	mapping = mapping !== undefined ? mapping : CubeReflectionMapping;
	//设置没有A通道的RGB方式
	format = format !== undefined ? format : RGBFormat;

	Texture.call( this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );
	//立方体纹理没有旋转
	this.flipY = false;

}

CubeTexture.prototype = Object.create( Texture.prototype );
CubeTexture.prototype.constructor = CubeTexture;

CubeTexture.prototype.isCubeTexture = true;

Object.defineProperty( CubeTexture.prototype, 'images', {
	//获得图片
	get: function () {

		return this.image;

	},
	//设置图片
	set: function ( value ) {

		this.image = value;

	}

} );


export { CubeTexture };
