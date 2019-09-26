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
function Material() {
	//记录当前材质在当前场景中的id，记录了本material在当前场景中是第几个
	Object.defineProperty(this, 'id', {
		value: materialId++
	});
	//uuid唯一的
	this.uuid = _Math.generateUUID();

	this.name = '';
	this.type = 'Material';

	this.fog = true;
	this.lights = true;
	//混合模式
	this.blending = NormalBlending;
	this.side = FrontSide;
	this.flatShading = false;
	this.vertexTangents = false;
	// 是否使用顶点着色。默认值为THREE.NoColors。 其他选项有THREE.VertexColors 和 THREE.FaceColors。
	this.vertexColors = NoColors; // THREE.NoColors, THREE.VertexColors, THREE.FaceColors


	// 透明度的值，1为完全不透明，0为完全透明
	this.opacity = 1;
	// 	定义此材质是否透明。这对渲染有影响，因为透明对象需要特殊处理，并在非透明对象之后渲染。
	// 设置为true时，通过设置材质的opacity属性来控制材质透明的程度。
	// 默认值为false。
	this.transparent = false;

	this.blendSrc = SrcAlphaFactor;
	this.blendDst = OneMinusSrcAlphaFactor;
	this.blendEquation = AddEquation;
	this.blendSrcAlpha = null;
	this.blendDstAlpha = null;
	this.blendEquationAlpha = null;

	this.depthFunc = LessEqualDepth;
	this.depthTest = true;
	this.depthWrite = true;

	this.clippingPlanes = null;
	this.clipIntersection = false;
	this.clipShadows = false;

	this.shadowSide = null;

	this.colorWrite = true;

	this.precision = null; // override the renderer's default precision for this material

	this.polygonOffset = false;
	this.polygonOffsetFactor = 0;
	this.polygonOffsetUnits = 0;

	this.dithering = false;
	//设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。
	this.alphaTest = 0;
	this.premultipliedAlpha = false;

	this.visible = true;

	this.userData = {};
	//指定需要重新编译材质。
	//实例化新材质时，此属性自动设置为true。
	this.needsUpdate = true;

}

Material.prototype = Object.assign(Object.create(EventDispatcher.prototype), {

	constructor: Material,

	isMaterial: true,

	onBeforeCompile: function () {},

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

	clone: function () {

		return new this.constructor().copy(this);

	},

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

	dispose: function () {

		this.dispatchEvent({
			type: 'dispose'
		});

	}

});


export {
	Material
};