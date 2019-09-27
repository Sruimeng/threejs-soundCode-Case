import {
	EventDispatcher
} from '../core/EventDispatcher.js';
import {
	NoColors,
	FrontSide,
	FlatShading,
	NormalBlending,
	LessEqualDepth,
	AddEquation,
	OneMinusSrcAlphaFactor,
	SrcAlphaFactor
} from '../constants.js';
import {
	_Math
} from '../math/Math.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

var materialId = 0;

/**
 * @description 材质的抽象基类。直接从官网复制了
 * 材质描述了对象objects的外观。它们的定义方式与渲染器无关， 因此，如果您决定使用不同的渲染器，不必重写材质。
 * 所有其他材质类型都继承了以下属性和方法（尽管它们可能具有不同的默认值）。
 * 
 */
/**
 * @description 
 * 
 */
function Material() {
	//记录当前材质在当前场景中的id，记录了本material在当前场景中是第几个
	Object.defineProperty(this, 'id', {
		value: materialId++
	});
	//uuid唯一的
	this.uuid = _Math.generateUUID();
	//材质名称
	this.name = '';
	//材质类型
	this.type = 'Material';
	//材质是否受雾影响。默认为true。
	this.fog = true;
	//材质是否受光照影响，默认为true
	this.lights = true;
	//混合模式
	this.blending = NormalBlending;
	//定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide和THREE.DoubleSide。
	this.side = FrontSide;
	//定义材质是否使用平面着色进行渲染。默认值为false。？？？
	this.flatShading = false;
	//定义是否使用必须在vec4“切线”属性中提供的预先计算的顶点切线。 禁用时，切线将自动导出。 在某些情况下，例如使用镜像UV，使用预先计算的切线将提供更准确的法线贴图细节。 默认为false。
	this.vertexTangents = false;
	// 是否使用顶点着色。默认值为THREE.NoColors。 其他选项有THREE.VertexColors 和 THREE.FaceColors。
	this.vertexColors = NoColors; // THREE.NoColors, THREE.VertexColors, THREE.FaceColors


	// 透明度的值，1为完全不透明，0为完全透明
	this.opacity = 1;
	// 	定义此材质是否透明。这对渲染有影响，因为透明对象需要特殊处理，并在非透明对象之后渲染。
	// 设置为true时，通过设置材质的opacity属性来控制材质透明的程度。
	// 默认值为false。
	this.transparent = false;
	//混合源。默认值为SrcAlphaFactor。 源因子所有可能的取值请参阅constants。
	//必须将材质的blending设置为CustomBlending才能生效。
	this.blendSrc = SrcAlphaFactor;
	//混合目标。默认值为OneMinusSrcAlphaFactor。 目标因子所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效。
	this.blendDst = OneMinusSrcAlphaFactor;
	//使用混合时所采用的混合方程式。默认值为AddEquation。 混合方程式所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效。
	this.blendEquation = AddEquation;
	//blendSrc的透明度。 默认值为 null.
	this.blendSrcAlpha = null;
	//.blendDst的透明度。 默认值为 null.
	this.blendDstAlpha = null;
	//blendEquation 的透明度. 默认值为 null.
	this.blendEquationAlpha = null;
	//使用何种深度函数。默认为LessEqualDepth。 深度模式所有可能的取值请查阅constants。
	this.depthFunc = LessEqualDepth;
	//是否在渲染此材质时启用深度测试。默认为 true。
	this.depthTest = true;
	//是否允许深度写入
	this.depthWrite = true;
	/**
	 * 用户定义的剪裁平面，在世界空间中指定为THREE.Plane对象。这些平面适用于所有使用此材质的对象。
	 * 空间中与平面的有符号距离为负的点被剪裁（未渲染）。 这需要WebGLRenderer.localClippingEnabled为true。 
	 * 示例请参阅WebGL / clipping /intersection。默认值为 null。
	 */
	this.clippingPlanes = null;
	this.clipIntersection = false;
	//定义是否根据此材质上指定的剪裁平面剪切阴影。默认值为 false。
	this.clipShadows = false;
	//定义投影的面。设置时，可以是THREE.FrontSide, THREE.BackSide, 或Materials。默认值为 null。
	this.shadowSide = null;
	//颜色是否可以写入
	this.colorWrite = true;

	this.precision = null; // override the renderer's default precision for this material

	this.polygonOffset = false;
	this.polygonOffsetFactor = 0;
	this.polygonOffsetUnits = 0;
	//是否对颜色应用抖动以消除条带的外观。默认值为 false。
	this.dithering = false;
	//设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。
	this.alphaTest = 0;
	//是否预乘alpha（透明度）值。有关差异的示例，请参阅WebGL / Materials / Transparency。 默认值为false。
	this.premultipliedAlpha = false;
	//是否可见
	this.visible = true;
	//一个对象，可用于存储有关Material的自定义数据。它不应该包含对函数的引用，因为这些函数不会被克隆。
	this.userData = {};
	//指定需要重新编译材质。
	//实例化新材质时，此属性自动设置为true。
	this.needsUpdate = true;

}

Material.prototype = Object.assign(Object.create(EventDispatcher.prototype), {

	constructor: Material,

	isMaterial: true,

	onBeforeCompile: function () {},
	//设置value值，主要包含是否为平面着色，和其他的属性，但是设计到这里其实并不是很好，应该有一个对应的材质注册啥的来处理这些东西
	//这就是three.js缺点，只是一个3D库
	setValues: function (values) {

		if (values === undefined) return;

		for (var key in values) {

			var newValue = values[key];

			if (newValue === undefined) {

				console.warn("THREE.Material: '" + key + "' parameter is undefined.");
				continue;

			}

			// for backward compatability if shading is set in the constructor
			if (key === 'shading') {

				console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
				this.flatShading = (newValue === FlatShading) ? true : false;
				continue;

			}

			var currentValue = this[key];

			if (currentValue === undefined) {

				console.warn("THREE." + this.type + ": '" + key + "' is not a property of this material.");
				continue;

			}

			if (currentValue && currentValue.isColor) {

				currentValue.set(newValue);

			} else if ((currentValue && currentValue.isVector3) && (newValue && newValue.isVector3)) {

				currentValue.copy(newValue);

			} else {

				this[key] = newValue;

			}

		}

	},
	//变成json格式
	toJSON: function (meta) {

		var isRoot = (meta === undefined || typeof meta === 'string');

		if (isRoot) {

			meta = {
				textures: {},
				images: {}
			};

		}

		var data = {
			metadata: {
				version: 4.5,
				type: 'Material',
				generator: 'Material.toJSON'
			}
		};

		// standard Material serialization
		data.uuid = this.uuid;
		data.type = this.type;

		if (this.name !== '') data.name = this.name;

		if (this.color && this.color.isColor) data.color = this.color.getHex();

		if (this.roughness !== undefined) data.roughness = this.roughness;
		if (this.metalness !== undefined) data.metalness = this.metalness;

		if (this.emissive && this.emissive.isColor) data.emissive = this.emissive.getHex();
		if (this.emissiveIntensity !== 1) data.emissiveIntensity = this.emissiveIntensity;

		if (this.specular && this.specular.isColor) data.specular = this.specular.getHex();
		if (this.shininess !== undefined) data.shininess = this.shininess;
		if (this.clearCoat !== undefined) data.clearCoat = this.clearCoat;
		if (this.clearCoatRoughness !== undefined) data.clearCoatRoughness = this.clearCoatRoughness;

		if (this.map && this.map.isTexture) data.map = this.map.toJSON(meta).uuid;
		if (this.alphaMap && this.alphaMap.isTexture) data.alphaMap = this.alphaMap.toJSON(meta).uuid;
		if (this.lightMap && this.lightMap.isTexture) data.lightMap = this.lightMap.toJSON(meta).uuid;

		if (this.aoMap && this.aoMap.isTexture) {

			data.aoMap = this.aoMap.toJSON(meta).uuid;
			data.aoMapIntensity = this.aoMapIntensity;

		}

		if (this.bumpMap && this.bumpMap.isTexture) {

			data.bumpMap = this.bumpMap.toJSON(meta).uuid;
			data.bumpScale = this.bumpScale;

		}

		if (this.normalMap && this.normalMap.isTexture) {

			data.normalMap = this.normalMap.toJSON(meta).uuid;
			data.normalMapType = this.normalMapType;
			data.normalScale = this.normalScale.toArray();

		}

		if (this.displacementMap && this.displacementMap.isTexture) {

			data.displacementMap = this.displacementMap.toJSON(meta).uuid;
			data.displacementScale = this.displacementScale;
			data.displacementBias = this.displacementBias;

		}

		if (this.roughnessMap && this.roughnessMap.isTexture) data.roughnessMap = this.roughnessMap.toJSON(meta).uuid;
		if (this.metalnessMap && this.metalnessMap.isTexture) data.metalnessMap = this.metalnessMap.toJSON(meta).uuid;

		if (this.emissiveMap && this.emissiveMap.isTexture) data.emissiveMap = this.emissiveMap.toJSON(meta).uuid;
		if (this.specularMap && this.specularMap.isTexture) data.specularMap = this.specularMap.toJSON(meta).uuid;

		if (this.envMap && this.envMap.isTexture) {

			data.envMap = this.envMap.toJSON(meta).uuid;
			data.reflectivity = this.reflectivity; // Scale behind envMap

			if (this.combine !== undefined) data.combine = this.combine;
			if (this.envMapIntensity !== undefined) data.envMapIntensity = this.envMapIntensity;

		}

		if (this.gradientMap && this.gradientMap.isTexture) {

			data.gradientMap = this.gradientMap.toJSON(meta).uuid;

		}

		if (this.size !== undefined) data.size = this.size;
		if (this.sizeAttenuation !== undefined) data.sizeAttenuation = this.sizeAttenuation;

		if (this.blending !== NormalBlending) data.blending = this.blending;
		if (this.flatShading === true) data.flatShading = this.flatShading;
		if (this.side !== FrontSide) data.side = this.side;
		if (this.vertexColors !== NoColors) data.vertexColors = this.vertexColors;

		if (this.opacity < 1) data.opacity = this.opacity;
		if (this.transparent === true) data.transparent = this.transparent;

		data.depthFunc = this.depthFunc;
		data.depthTest = this.depthTest;
		data.depthWrite = this.depthWrite;

		// rotation (SpriteMaterial)
		if (this.rotation !== 0) data.rotation = this.rotation;

		if (this.polygonOffset === true) data.polygonOffset = true;
		if (this.polygonOffsetFactor !== 0) data.polygonOffsetFactor = this.polygonOffsetFactor;
		if (this.polygonOffsetUnits !== 0) data.polygonOffsetUnits = this.polygonOffsetUnits;

		if (this.linewidth !== 1) data.linewidth = this.linewidth;
		if (this.dashSize !== undefined) data.dashSize = this.dashSize;
		if (this.gapSize !== undefined) data.gapSize = this.gapSize;
		if (this.scale !== undefined) data.scale = this.scale;

		if (this.dithering === true) data.dithering = true;

		if (this.alphaTest > 0) data.alphaTest = this.alphaTest;
		if (this.premultipliedAlpha === true) data.premultipliedAlpha = this.premultipliedAlpha;

		if (this.wireframe === true) data.wireframe = this.wireframe;
		if (this.wireframeLinewidth > 1) data.wireframeLinewidth = this.wireframeLinewidth;
		if (this.wireframeLinecap !== 'round') data.wireframeLinecap = this.wireframeLinecap;
		if (this.wireframeLinejoin !== 'round') data.wireframeLinejoin = this.wireframeLinejoin;

		if (this.morphTargets === true) data.morphTargets = true;
		if (this.skinning === true) data.skinning = true;

		if (this.visible === false) data.visible = false;
		if (JSON.stringify(this.userData) !== '{}') data.userData = this.userData;

		// TODO: Copied from Object3D.toJSON

		function extractFromCache(cache) {

			var values = [];

			for (var key in cache) {

				var data = cache[key];
				delete data.metadata;
				values.push(data);

			}

			return values;

		}

		if (isRoot) {

			var textures = extractFromCache(meta.textures);
			var images = extractFromCache(meta.images);

			if (textures.length > 0) data.textures = textures;
			if (images.length > 0) data.images = images;

		}

		return data;

	},
	//克隆方法
	clone: function () {

		return new this.constructor().copy(this);

	},
	//复制方法
	copy: function (source) {

		this.name = source.name;

		this.fog = source.fog;
		this.lights = source.lights;

		this.blending = source.blending;
		this.side = source.side;
		this.flatShading = source.flatShading;
		this.vertexColors = source.vertexColors;

		this.opacity = source.opacity;
		this.transparent = source.transparent;

		this.blendSrc = source.blendSrc;
		this.blendDst = source.blendDst;
		this.blendEquation = source.blendEquation;
		this.blendSrcAlpha = source.blendSrcAlpha;
		this.blendDstAlpha = source.blendDstAlpha;
		this.blendEquationAlpha = source.blendEquationAlpha;

		this.depthFunc = source.depthFunc;
		this.depthTest = source.depthTest;
		this.depthWrite = source.depthWrite;

		this.colorWrite = source.colorWrite;

		this.precision = source.precision;

		this.polygonOffset = source.polygonOffset;
		this.polygonOffsetFactor = source.polygonOffsetFactor;
		this.polygonOffsetUnits = source.polygonOffsetUnits;

		this.dithering = source.dithering;

		this.alphaTest = source.alphaTest;
		this.premultipliedAlpha = source.premultipliedAlpha;

		this.visible = source.visible;
		this.userData = JSON.parse(JSON.stringify(source.userData));

		this.clipShadows = source.clipShadows;
		this.clipIntersection = source.clipIntersection;

		var srcPlanes = source.clippingPlanes,
			dstPlanes = null;

		if (srcPlanes !== null) {

			var n = srcPlanes.length;
			dstPlanes = new Array(n);

			for (var i = 0; i !== n; ++i)
				dstPlanes[i] = srcPlanes[i].clone();

		}

		this.clippingPlanes = dstPlanes;

		this.shadowSide = source.shadowSide;

		return this;

	},
	//隐藏方法
	dispose: function () {

		this.dispatchEvent({
			type: 'dispose'
		});

	}

});


export {
	Material
};