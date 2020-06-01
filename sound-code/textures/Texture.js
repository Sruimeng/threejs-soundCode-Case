/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

import {
	EventDispatcher
} from '../core/EventDispatcher.js';
import {
	MirroredRepeatWrapping,
	ClampToEdgeWrapping,
	RepeatWrapping,
	LinearEncoding,
	UnsignedByteType,
	RGBAFormat,
	LinearMipMapLinearFilter,
	LinearFilter,
	UVMapping
} from '../constants.js';
import {
	_Math
} from '../math/Math.js';
import {
	Vector2
} from '../math/Vector2.js';
import {
	Matrix3
} from '../math/Matrix3.js';
import {
	ImageUtils
} from '../extras/ImageUtils.js';

var textureId = 0;
/**
 * @description 该方法为
 * @date 2019-05-06
 * @param {*} image 图片
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
function Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {

	//定义一个ID，这个ID是根据创建的顺序来的
	Object.defineProperty(this, 'id', {
		value: textureId++
	});
	//定义一个ID，这个ID是唯一指定的，
	this.uuid = _Math.generateUUID();
	//设置名字
	this.name = '';
	//如果有img就设置，没有的设为undefined
	this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;
	//mipmaps数组，这个平时没啥用，但是环境光那能用到
	this.mipmaps = [];
	//这是纹理映射类型
	this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;
	/**
	 * 这些常量定义了纹理贴图的 wrapS 和 wrapT 属性，定义了水平和垂直方向上纹理的包裹方式。 
	 * 使用RepeatWrapping，纹理将简单地重复到无穷大。
	 * ClampToEdgeWrapping是默认值，纹理中的最后一个像素将延伸到网格的边缘。
	 * 使用MirroredRepeatWrapping， 纹理将重复到无穷大，在每次重复时将进行镜像。
	 */
	this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
	this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;
	/**
	 * 这些常量用于纹理的magFilter属性，它们定义了当被纹理化的像素映射到小于或者等于1纹理元素（texel）的区域时，将要使用的纹理放大函数。
	 * 
	 * NearestFilter返回与指定纹理坐标（在曼哈顿距离之内）最接近的纹理元素的值。
	 * 
	 * LinearFilter是默认值，返回距离指定的纹理坐标最近的四个纹理元素的加权平均值， 并且可以包含纹理的其他部分中，
	 * 被包裹或者被重复的项目，具体取决于 wrapS 和 wrapT 的值，and on the exact mapping。
	 * 这些常量用于纹理的minFilter属性，它们定义了当被纹理化的像素映射到大于1纹理元素（texel）的区域时，将要使用的纹理缩小函数。
	 * 
	 * 除了NearestFilter 和 LinearFilter， 下面的四个函数也可以用于缩小：
	 * 
	 * NearestMipMapNearestFilter选择与被纹理化像素的尺寸最匹配的mipmap，
	 * 并以[page:constant NearestFilter]（最靠近像素中心的纹理元素）为标准来生成纹理值。 
	 * 
	 * NearestMipMapLinearFilter选择与被纹理化像素的尺寸最接近的两个mipmap，
	 * 并以[page:constant NearestFilter]为标准来从每个mipmap中生成纹理值。最终的纹理值是这两个值的加权平均值。 
	 * 
	 * LinearMipMapNearestFilter选择与被纹理化像素的尺寸最匹配的mipmap，
	 * 并以[page:constant LinearFilter]（最靠近像素中心的四个纹理元素的加权平均值）为标准来生成纹理值。 
	 * 
	 * LinearMipMapLinearFilter是默认值，它选择与被纹理化像素的尺寸最接近的两个mipmap，
	 * 并以[page:constant LinearFilter]为标准来从每个mipmap中生成纹理值。最终的纹理值是这两个值的加权平均值。
	 */
	this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
	this.minFilter = minFilter !== undefined ? minFilter : LinearMipMapLinearFilter;
	//设置各向异性
	this.anisotropy = anisotropy !== undefined ? anisotropy : 1;
	//设置shader接收的类型 默认为RGBA四个通道 
	this.format = format !== undefined ? format : RGBAFormat;
	this.type = type !== undefined ? type : UnsignedByteType;
	//设置偏移量
	this.offset = new Vector2(0, 0);
	//设置复制的多少
	this.repeat = new Vector2(1, 1);
	//设置中心点
	this.center = new Vector2(0, 0);
	//设置是否旋转？
	this.rotation = 0;
	//自动更新矩阵
	this.matrixAutoUpdate = true;
	//新建图片自己的矩阵
	this.matrix = new Matrix3();
	//是否开启mipmap
	this.generateMipmaps = true;
	//是否预乘透明度，如果为true，像素的rgb会先乘以a在保存
	this.premultiplyAlpha = false;
	//是否需要垂直旋转
	this.flipY = true;
	//
	this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
	//设置编码格式
	// Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
	//
	// Also changing the encoding after already used by a Material will not automatically make the Material
	// update.  You need to explicitly call Material.needsUpdate to trigger it to recompile.
	this.encoding = encoding !== undefined ? encoding : LinearEncoding;

	this.version = 0;
	this.onUpdate = null;

}

Texture.DEFAULT_IMAGE = undefined;
Texture.DEFAULT_MAPPING = UVMapping;

Texture.prototype = Object.assign(Object.create(EventDispatcher.prototype), {

	constructor: Texture,

	isTexture: true,
	//更新矩阵
	updateMatrix: function () {

		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);

	},
	//克隆方法
	clone: function () {

		return new this.constructor().copy(this);

	},
	//复制方法，这应该为私有方法名吧
	copy: function (source) {

		this.name = source.name;

		this.image = source.image;
		this.mipmaps = source.mipmaps.slice(0);

		this.mapping = source.mapping;

		this.wrapS = source.wrapS;
		this.wrapT = source.wrapT;

		this.magFilter = source.magFilter;
		this.minFilter = source.minFilter;

		this.anisotropy = source.anisotropy;

		this.format = source.format;
		this.type = source.type;

		this.offset.copy(source.offset);
		this.repeat.copy(source.repeat);
		this.center.copy(source.center);
		this.rotation = source.rotation;

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrix.copy(source.matrix);

		this.generateMipmaps = source.generateMipmaps;
		this.premultiplyAlpha = source.premultiplyAlpha;
		this.flipY = source.flipY;
		this.unpackAlignment = source.unpackAlignment;
		this.encoding = source.encoding;

		return this;

	},

	toJSON: function (meta) {

		var isRootObject = (meta === undefined || typeof meta === 'string');

		if (!isRootObject && meta.textures[this.uuid] !== undefined) {

			return meta.textures[this.uuid];

		}

		var output = {

			metadata: {
				version: 4.5,
				type: 'Texture',
				generator: 'Texture.toJSON'
			},

			uuid: this.uuid,
			name: this.name,

			mapping: this.mapping,

			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,

			wrap: [this.wrapS, this.wrapT],

			format: this.format,
			type: this.type,
			encoding: this.encoding,

			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,

			flipY: this.flipY,

			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment

		};

		if (this.image !== undefined) {

			// TODO: Move to THREE.Image

			var image = this.image;

			if (image.uuid === undefined) {

				image.uuid = _Math.generateUUID(); // UGH

			}

			if (!isRootObject && meta.images[image.uuid] === undefined) {

				var url;

				if (Array.isArray(image)) {

					// process array of images e.g. CubeTexture

					url = [];

					for (var i = 0, l = image.length; i < l; i++) {

						url.push(ImageUtils.getDataURL(image[i]));

					}

				} else {

					// process single image

					url = ImageUtils.getDataURL(image);

				}

				meta.images[image.uuid] = {
					uuid: image.uuid,
					url: url
				};

			}

			output.image = image.uuid;

		}

		if (!isRootObject) {

			meta.textures[this.uuid] = output;

		}

		return output;

	},
	//隐藏
	dispose: function () {

		this.dispatchEvent({
			type: 'dispose'
		});

	},
	//纹理映射，传进来的是个二维向量，将st转换为uv
	transformUv: function (uv) {

		if (this.mapping !== UVMapping) return uv;

		uv.applyMatrix3(this.matrix);

		if (uv.x < 0 || uv.x > 1) {

			switch (this.wrapS) {

				case RepeatWrapping:

					uv.x = uv.x - Math.floor(uv.x);
					break;

				case ClampToEdgeWrapping:

					uv.x = uv.x < 0 ? 0 : 1;
					break;

				case MirroredRepeatWrapping:

					if (Math.abs(Math.floor(uv.x) % 2) === 1) {

						uv.x = Math.ceil(uv.x) - uv.x;

					} else {

						uv.x = uv.x - Math.floor(uv.x);

					}
					break;

			}

		}

		if (uv.y < 0 || uv.y > 1) {

			switch (this.wrapT) {

				case RepeatWrapping:

					uv.y = uv.y - Math.floor(uv.y);
					break;

				case ClampToEdgeWrapping:

					uv.y = uv.y < 0 ? 0 : 1;
					break;

				case MirroredRepeatWrapping:

					if (Math.abs(Math.floor(uv.y) % 2) === 1) {

						uv.y = Math.ceil(uv.y) - uv.y;

					} else {

						uv.y = uv.y - Math.floor(uv.y);

					}
					break;

			}

		}

		if (this.flipY) {

			uv.y = 1 - uv.y;

		}

		return uv;

	}

});

Object.defineProperty(Texture.prototype, "needsUpdate", {

	set: function (value) {

		if (value === true) this.version++;

	}

});


export {
	Texture
};