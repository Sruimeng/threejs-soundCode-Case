import {
	Material
} from './Material.js';
import {
	Color
} from '../math/Color.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round"
 * }
 */

/**
 * @description 线的基础材质，继承自Material方法
 * 
 * @param {any} parameters 
 */
function LineBasicMaterial(parameters) {
	//回调Material
	Material.call(this);

	this.type = 'LineBasicMaterial';
	//设置颜色
	this.color = new Color(0xffffff);
	//线的宽度，但是受限于Webgl的限制，只能为1
	this.linewidth = 1;
	//定义线两端的样式。可选值为 'butt', 'round' 和 'square'。默认值为 'round'。

	//该属性对应2D Canvas lineCap属性， 并且会被WebGL渲染器忽略。
	this.linecap = 'round';
	// 	定义线连接节点的样式。可选值为 'round', 'bevel' 和 'miter'。默认值为 'round'。

	// 该属性对应2D Canvas lineJoin属性， 并且会被WebGL渲染器忽略。
	this.linejoin = 'round';
	//不接受光照信息
	this.lights = false;
	//设置其他参数
	this.setValues(parameters);

}

LineBasicMaterial.prototype = Object.create(Material.prototype);
LineBasicMaterial.prototype.constructor = LineBasicMaterial;

LineBasicMaterial.prototype.isLineBasicMaterial = true;
//复制方法
LineBasicMaterial.prototype.copy = function (source) {

	Material.prototype.copy.call(this, source);

	this.color.copy(source.color);

	this.linewidth = source.linewidth;
	this.linecap = source.linecap;
	this.linejoin = source.linejoin;

	return this;

};


export {
	LineBasicMaterial
};