import { Object3D } from '../core/Object3D.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/
function Scene() {
	//object3D回调该方法
	Object3D.call(this);
	//类型为Scene类型
	this.type = 'Scene';
	//scene背景，默认为null
	this.background = null;
	//场景雾，默认为null
	this.fog = null;
	//场景覆盖纹理，意思就是如果不为空且为正确纹理 那么场景中的物体都将使用这个纹理
	this.overrideMaterial = null;
	//场景自动更新，默认为trueF
	this.autoUpdate = true; // checked by the renderer

}

Scene.prototype = Object.assign(Object.create(Object3D.prototype), {

	constructor: Scene,

	isScene: true,

	//场景克隆方法
	copy: function (source, recursive) {
		
		Object3D.prototype.copy.call(this, source, recursive);

		if (source.background !== null) this.background = source.background.clone();
		if (source.fog !== null) this.fog = source.fog.clone();
		if (source.overrideMaterial !== null) this.overrideMaterial = source.overrideMaterial.clone();

		this.autoUpdate = source.autoUpdate;
		this.matrixAutoUpdate = source.matrixAutoUpdate;

		return this;

	},
	//场景输出为json
	toJSON: function (meta) {

		var data = Object3D.prototype.toJSON.call(this, meta);

		if (this.background !== null) data.object.background = this.background.toJSON(meta);
		if (this.fog !== null) data.object.fog = this.fog.toJSON();

		return data;

	},
	//清除在render中的缓冲
	dispose: function () {

		this.dispatchEvent({ type: 'dispose' });

	}

});



export { Scene };
