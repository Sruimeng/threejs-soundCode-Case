import { LightShadow } from './LightShadow.js';
import { OrthographicCamera } from '../cameras/OrthographicCamera.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * 方向光的阴影，基本上就是传了一个正交摄像机
 *
 */
function DirectionalLightShadow( ) {

	LightShadow.call( this, new OrthographicCamera( - 5, 5, 5, - 5, 0.5, 500 ) );

}

DirectionalLightShadow.prototype = Object.assign( Object.create( LightShadow.prototype ), {

	constructor: DirectionalLightShadow

} );


export { DirectionalLightShadow };
