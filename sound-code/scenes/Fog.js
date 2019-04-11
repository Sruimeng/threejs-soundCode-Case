/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

import { Color } from '../math/Color.js';

/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/
function Fog( color, near, far ) {   
	/**
	 * 该雾为线性雾对应的还有指数雾
	 * 线性雾的意思是雾的密度是随着距离的增加线性增大的
	 * 接收三个参数分别为{
	 * 雾的颜色,
	 * 应用雾的最大距离,
	 * 应用雾的最小距离,
	 * }
	 */
	//雾对象的名称，非必选属性，默认为空
	this.name = '';
	//雾的颜色可以传六位十六进制(0x000000)或者css中的颜色样式('blue')
	this.color = new Color( color );
	//雾能出现的最小距离,缺省值为1
	this.near = ( near !== undefined ) ? near : 1;
	//雾能出现的最大距离,缺省值为1000
	this.far = ( far !== undefined ) ? far : 1000;

}

Object.assign( Fog.prototype, {

	//是否为雾
	isFog: true,

	/**
	 * 克隆方法，返回一个新的雾。
	 */
	clone: function () {

		return new Fog( this.color, this.near, this.far );

	},

	/**
	 * 转变为json格式，返回json，数据结构如下。
	 */
	toJSON: function ( /* meta */ ) {

		return {
			type: 'Fog',
			color: this.color.getHex(),
			near: this.near,
			far: this.far
		};

	}

} );

export { Fog };
