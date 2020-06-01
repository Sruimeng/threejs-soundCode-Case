/**
 * @author alteredq / http://alteredqualia.com/
 */
import { Texture } from './Texture.js';
/**
 * @description 压缩贴图
 * @date 2019-05-06
 * @param {*} mipmaps mipmaps数组
 * @param {Number} width 图片的宽度
 * @param {Number} height 图片的高度
 * @param {Number} mapping 纹理映射模式
 * @param {Number} wrapS	S轴即U的展示方式
 * @param {Number} wrapT	T轴即V的展示方式
 * @param {Number} magFilter	最大值滤波器
 * @param {Number} minFilter	最小值滤波器
 * @param {Number} format	读取的类型
 * @param {Number} type	
 * @param {Number} anisotropy	各向异性
 */
function CompressedTexture( mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, encoding ) {

	Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding );
	//设置图片的宽高
	this.image = { width: width, height: height };
	this.mipmaps = mipmaps;

	// no flipping for cube textures
	// (also flipping doesn't work for compressed textures )
	//旋转对于压缩纹理是不起作用的，所以为false
	this.flipY = false;

	// can't generate mipmaps for compressed textures
	// mips must be embedded in DDS files
	//压缩纹理没有mipmap，所以mips必须从DDS导入
	this.generateMipmaps = false;

}

CompressedTexture.prototype = Object.create( Texture.prototype );
CompressedTexture.prototype.constructor = CompressedTexture;

CompressedTexture.prototype.isCompressedTexture = true;


export { CompressedTexture };
