/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  linewidth: <float>,
 *
 *  scale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>
 * }
 */

import { LineBasicMaterial } from './LineBasicMaterial.js';

/**
 * @description 虚线材质继承自LineBasicMaterial
 * 
 * @param {any} parameters 
 */
function LineDashedMaterial( parameters ) {

	LineBasicMaterial.call( this );

	this.type = 'LineDashedMaterial';
	//线条中虚线部分的占比。默认值为 1。
	this.scale = 1;
	//虚线的大小，是指破折号和间隙之和。默认值为 3。
	this.dashSize = 3;
	//间隙的大小，默认值为 1。
	this.gapSize = 1;

	this.setValues( parameters );

}

LineDashedMaterial.prototype = Object.create( LineBasicMaterial.prototype );
LineDashedMaterial.prototype.constructor = LineDashedMaterial;

LineDashedMaterial.prototype.isLineDashedMaterial = true;
//复制方法加了一些属性
LineDashedMaterial.prototype.copy = function ( source ) {

	LineBasicMaterial.prototype.copy.call( this, source );

	this.scale = source.scale;
	this.dashSize = source.dashSize;
	this.gapSize = source.gapSize;

	return this;

};


export { LineDashedMaterial };
