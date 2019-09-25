import { Line } from './Line.js';

/**
 * @author mgreter / http://github.com/mgreter
 */

/**
 * @description LineLoop方法继承的是Line的基类，它绘制一条直线到下一个顶点，并将最后一个顶点连回第一个顶点。
 * 用的是gl.LINE_LOOP。
 * 
 * @param {any} geometry 
 * @param {any} material 
 */
function LineLoop( geometry, material ) {

	Line.call( this, geometry, material );

	this.type = 'LineLoop';

}

LineLoop.prototype = Object.assign( Object.create( Line.prototype ), {

	constructor: LineLoop,

	isLineLoop: true,

} );


export { LineLoop };
