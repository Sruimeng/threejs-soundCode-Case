/**
 * Uniform Utilities
 */

/**
 * @description 克隆uniform
 * 
 * @export
 * @param {Object} src 一个数据的集合
 * @returns  
 */
export function cloneUniforms( src ) {

	var dst = {};

	for ( var u in src ) {

		dst[ u ] = {};

		for ( var p in src[ u ] ) {

			var property = src[ u ][ p ];
			//有克隆方法的直接克隆 数组的复制数组 没有的直接复制
			if ( property && ( property.isColor ||
				property.isMatrix3 || property.isMatrix4 ||
				property.isVector2 || property.isVector3 || property.isVector4 ||
				property.isTexture ) ) {

				dst[ u ][ p ] = property.clone();

			} else if ( Array.isArray( property ) ) {

				dst[ u ][ p ] = property.slice();

			} else {

				dst[ u ][ p ] = property;

			}

		}

	}

	return dst;

}

/**
 * @description 合并uniform，将传进来的object变成单个的
 * 
 * @export
 * @param {any} uniforms 
 * @returns  
 */
export function mergeUniforms( uniforms ) {

	var merged = {};

	for ( var u = 0; u < uniforms.length; u ++ ) {

		var tmp = cloneUniforms( uniforms[ u ] );

		for ( var p in tmp ) {

			merged[ p ] = tmp[ p ];

		}

	}

	return merged;

}

// Legacy

var UniformsUtils = { clone: cloneUniforms, merge: mergeUniforms };

export { UniformsUtils };
