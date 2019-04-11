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
	Object3D.call( this );
//类型为Scene类型
	this.type = 'Scene';
//scene背景
	this.background = null;
	this.fog = null;
	this.overrideMaterial = null;

	this.autoUpdate = true; // checked by the renderer

}

Scene.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Scene,

	isScene: true,

	copy: function ( source, recursive ) {

		Object3D.prototype.copy.call( this, source, recursive );

		if ( source.background !== null ) this.background = source.background.clone();
		if ( source.fog !== null ) this.fog = source.fog.clone();
		if ( source.overrideMaterial !== null ) this.overrideMaterial = source.overrideMaterial.clone();

		this.autoUpdate = source.autoUpdate;
		this.matrixAutoUpdate = source.matrixAutoUpdate;

		return this;

	},

	toJSON: function ( meta ) {

		var data = Object3D.prototype.toJSON.call( this, meta );

		if ( this.background !== null ) data.object.background = this.background.toJSON( meta );
		if ( this.fog !== null ) data.object.fog = this.fog.toJSON();

		return data;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

} );



export { Scene };
