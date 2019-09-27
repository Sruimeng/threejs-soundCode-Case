import { MeshPhongMaterial } from './MeshPhongMaterial.js';

/**
 * @author takahirox / http://github.com/takahirox
 *
 * parameters = {
 *  gradientMap: new THREE.Texture( <Image> )
 * }
 */

/**
 * @description MeshPhongMaterial卡通着色的扩展。
 * 
 * @param {any} parameters 
 */
function MeshToonMaterial( parameters ) {

	MeshPhongMaterial.call( this );
	//告诉渲染器用TOON着色器
	this.defines = { 'TOON': '' };

	this.type = 'MeshToonMaterial';
	//卡通着色的渐变贴图，默认值为null。
	this.gradientMap = null;

	this.setValues( parameters );

}

MeshToonMaterial.prototype = Object.create( MeshPhongMaterial.prototype );
MeshToonMaterial.prototype.constructor = MeshToonMaterial;

MeshToonMaterial.prototype.isMeshToonMaterial = true;
//重写复制方法
MeshToonMaterial.prototype.copy = function ( source ) {

	MeshPhongMaterial.prototype.copy.call( this, source );

	this.gradientMap = source.gradientMap;

	return this;

};


export { MeshToonMaterial };
