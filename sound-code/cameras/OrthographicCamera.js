import { Camera } from './Camera.js';
import { Object3D } from '../core/Object3D.js';

/**
 * @author alteredq / http://alteredqualia.com/
 * @author arose / http://github.com/arose
 */

/**
 * @description 正交摄像机，采用了正交投影，继承自Camera基类，正交投影的大概意思就是，他投出来的影无论物体与摄像机
 * 的距离远近，最后渲染出的图的大小都是不变的
 * 
 * @param {Number} left  摄像机视锥体左侧面。
 * @param {Number} right 摄像机视锥体右侧面。
 * @param {Number} top 摄像机视锥体上侧面。
 * @param {Number} bottom  摄像机视锥体下侧面。
 * @param {Number} near 摄像机视锥体近端面。
 * @param {Number} far 摄像机视锥体远端面。
 */
function OrthographicCamera( left, right, top, bottom, near, far ) {
	//继承Camrea基类
	Camera.call( this );
	//设置类型
	this.type = 'OrthographicCamera';
	//缩放倍数
	this.zoom = 1;
	//视口的属性，在没有设置前为null
	this.view = null;

	this.left = ( left !== undefined ) ? left : - 1;
	this.right = ( right !== undefined ) ? right : 1;
	this.top = ( top !== undefined ) ? top : 1;
	this.bottom = ( bottom !== undefined ) ? bottom : - 1;
	this.near = ( near !== undefined ) ? near : 0.1;
	this.far = ( far !== undefined ) ? far : 2000;
	//更新投影矩阵
	this.updateProjectionMatrix();

}

OrthographicCamera.prototype = Object.assign( Object.create( Camera.prototype ), {

	constructor: OrthographicCamera,

	isOrthographicCamera: true,
	//复制方法
	copy: function ( source, recursive ) {

		Camera.prototype.copy.call( this, source, recursive );

		this.left = source.left;
		this.right = source.right;
		this.top = source.top;
		this.bottom = source.bottom;
		this.near = source.near;
		this.far = source.far;

		this.zoom = source.zoom;
		this.view = source.view === null ? null : Object.assign( {}, source.view );

		return this;

	},
	//设置视口，但是没有什么案例，看起来和视锥体相关
	setViewOffset: function ( fullWidth, fullHeight, x, y, width, height ) {

		if ( this.view === null ) {

			this.view = {
				enabled: true,
				fullWidth: 1,
				fullHeight: 1,
				offsetX: 0,
				offsetY: 0,
				width: 1,
				height: 1
			};

		}

		this.view.enabled = true;
		this.view.fullWidth = fullWidth;
		this.view.fullHeight = fullHeight;
		this.view.offsetX = x;
		this.view.offsetY = y;
		this.view.width = width;
		this.view.height = height;

		this.updateProjectionMatrix();

	},

	clearViewOffset: function () {

		if ( this.view !== null ) {

			this.view.enabled = false;

		}

		this.updateProjectionMatrix();

	},
	//更新投影矩阵
	updateProjectionMatrix: function () {

		var dx = ( this.right - this.left ) / ( 2 * this.zoom );
		var dy = ( this.top - this.bottom ) / ( 2 * this.zoom );
		var cx = ( this.right + this.left ) / 2;
		var cy = ( this.top + this.bottom ) / 2;

		var left = cx - dx;
		var right = cx + dx;
		var top = cy + dy;
		var bottom = cy - dy;

		if ( this.view !== null && this.view.enabled ) {

			var zoomW = this.zoom / ( this.view.width / this.view.fullWidth );
			var zoomH = this.zoom / ( this.view.height / this.view.fullHeight );
			var scaleW = ( this.right - this.left ) / this.view.width;
			var scaleH = ( this.top - this.bottom ) / this.view.height;

			left += scaleW * ( this.view.offsetX / zoomW );
			right = left + scaleW * ( this.view.width / zoomW );
			top -= scaleH * ( this.view.offsetY / zoomH );
			bottom = top - scaleH * ( this.view.height / zoomH );

		}

		this.projectionMatrix.makeOrthographic( left, right, top, bottom, this.near, this.far );

		this.projectionMatrixInverse.getInverse( this.projectionMatrix );

	},
	//编程json格式
	toJSON: function ( meta ) {

		var data = Object3D.prototype.toJSON.call( this, meta );

		data.object.zoom = this.zoom;
		data.object.left = this.left;
		data.object.right = this.right;
		data.object.top = this.top;
		data.object.bottom = this.bottom;
		data.object.near = this.near;
		data.object.far = this.far;

		if ( this.view !== null ) data.object.view = Object.assign( {}, this.view );

		return data;

	}

} );


export { OrthographicCamera };
