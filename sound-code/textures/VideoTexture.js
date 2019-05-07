/**
 * @author mrdoob / http://mrdoob.com/
 */

import { RGBFormat, LinearFilter } from '../constants.js';
import { Texture } from './Texture.js';
/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/

/**
 * @description 视频贴图
 * @date 2019-05-06
 * @param {*} video 视频
 * @param {Number} mapping 纹理映射模式
 * @param {Number} wrapS	S轴即U的展示方式
 * @param {Number} wrapT	T轴即V的展示方式
 * @param {Number} magFilter	最大值滤波器
 * @param {Number} minFilter	最小值滤波器
 * @param {Number} format	读取的类型
 * @param {Number} type	
 * @param {Number} anisotropy	各向异性
 */
function VideoTexture( video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {
	//回调贴图
	Texture.call( this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );
	//默认的接收方式为RGB的
	this.format = format !== undefined ? format : RGBFormat;
	//默认的滤波器均为线性滤波
	this.minFilter = minFilter !== undefined ? minFilter : LinearFilter;
	this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
	//没有mipmap
	this.generateMipmaps = false;

}

VideoTexture.prototype = Object.assign( Object.create( Texture.prototype ), {

	constructor: VideoTexture,

	isVideoTexture: true,
	//更新方法，如果视频的状态比当前数据多就会更新
	update: function () {

		var video = this.image;

		if ( video.readyState >= video.HAVE_CURRENT_DATA ) {

			this.needsUpdate = true;

		}

	}

} );


export { VideoTexture };
