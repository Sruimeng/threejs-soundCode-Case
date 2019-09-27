import { ShaderMaterial } from './ShaderMaterial.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * @description 此类的工作方式与ShaderMaterial类似，
 * 不同之处在于内置的uniforms和attributes的定义不会自动添加到GLSL shader代码中。
 * 纯纯的shader材质不包含three内置的东西，所以啥也没有就是传个着色器
 * @param {any} parameters 
 */
function RawShaderMaterial( parameters ) {

	ShaderMaterial.call( this, parameters );

	this.type = 'RawShaderMaterial';

}

RawShaderMaterial.prototype = Object.create( ShaderMaterial.prototype );
RawShaderMaterial.prototype.constructor = RawShaderMaterial;

RawShaderMaterial.prototype.isRawShaderMaterial = true;


export { RawShaderMaterial };
