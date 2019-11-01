/**
 * @author mrdoob / http://mrdoob.com/
 */

import { PerspectiveCamera } from './PerspectiveCamera.js';


/**
 * @description 摄像机数组，采用多个透视摄像机，传入一个摄像机的数组，个人感觉用处不大，使用场景也比较小
 * 
 * @param {any} array 
 */
function ArrayCamera( array ) {

	PerspectiveCamera.call( this );

	this.cameras = array || [];

}

ArrayCamera.prototype = Object.assign( Object.create( PerspectiveCamera.prototype ), {

	constructor: ArrayCamera,

	isArrayCamera: true

} );


export { ArrayCamera };
