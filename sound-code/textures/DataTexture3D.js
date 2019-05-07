/**
 * @author Artur Trzesiok
 */

import { Texture } from './Texture.js';
import { ClampToEdgeWrapping, NearestFilter } from '../constants.js';
/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/
/**
 * @description 3D数据纹理
 * @date 2019-05-07
 * @param {*} data
 * @param {Number} width
 * @param {Number} height
 * @param {Number} depth
 */
function DataTexture3D( data, width, height, depth ) {

	// We're going to add .setXXX() methods for setting properties later.
	// Users can still set in DataTexture3D directly.
	//
	//	var texture = new THREE.DataTexture3D( data, width, height, depth );
	// 	texture.anisotropy = 16;
	//
	// See #14839

	Texture.call( this, null );
	//多了一个depth
	this.image = { data: data, width: width, height: height, depth: depth };
	//最大值最小值滤波器
	this.magFilter = NearestFilter;
	this.minFilter = NearestFilter;
	//？
	this.wrapR = ClampToEdgeWrapping;
	//没有mipmap
	this.generateMipmaps = false;
	//没有旋转
	this.flipY = false;

}

DataTexture3D.prototype = Object.create( Texture.prototype );
DataTexture3D.prototype.constructor = DataTexture3D;
DataTexture3D.prototype.isDataTexture3D = true;

export { DataTexture3D };
