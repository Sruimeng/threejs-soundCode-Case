/**
 * @author mrdoob / http://mrdoob.com/
 */
/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/
function Uniform( value ) {

	/**
	 * 该方法为Uniform方法 主要作用为向shader传参
	 */
	//判断value的类型是否为string类型
	if ( typeof value === 'string' ) {
		//抛出警告，为什么抛出警告存疑，可能是该方法在以后的版本中会删除掉
		console.warn( 'THREE.Uniform: Type parameter is no longer needed.' );
		value = arguments[ 1 ];

	}
	//保存value值
	this.value = value;

}

//原型方法中的复制方法
Uniform.prototype.clone = function () {
	
	return new Uniform( this.value.clone === undefined ? this.value : this.value.clone() );

};

export { Uniform };
