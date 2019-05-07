/**
 * @author mrdoob / http://mrdoob.com/
 */

import { Texture } from './Texture.js';
/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/
/**
 * @description canvas贴图，基本跟texture一样
 * @date 2019-05-06
 * @param {*} canvas canvas
 * @param {Number} mapping 纹理映射模式
 * @param {Number} wrapS	S轴即U的展示方式
 * @param {Number} wrapT	T轴即V的展示方式
 * @param {Number} magFilter	最大值滤波器
 * @param {Number} minFilter	最小值滤波器
 * @param {Number} format	读取的类型
 * @param {Number} type	
 * @param {Number} anisotropy	各向异性
 */
function CanvasTexture( canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	Texture.call( this, canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );
	//将自动更新设为true
	this.needsUpdate = true;

}

CanvasTexture.prototype = Object.create( Texture.prototype );
CanvasTexture.prototype.constructor = CanvasTexture;
CanvasTexture.prototype.isCanvasTexture = true;

export { CanvasTexture };
