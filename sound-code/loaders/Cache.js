/**
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * 一个简单的缓存系统
 * 要在所有使用FileLoader的加载器上启用缓存， 需设置
 * THREE.Cache.enabled = true.
 * 一个Map然后key是字符串，value为文件
 */
var Cache = {

	enabled: false,

	files: {},
	// 使用key为引用文件增加一个缓存入口。如果该key已持有一个文件，则会被覆盖。
	add: function ( key, file ) {

		if ( this.enabled === false ) return;

		// console.log( 'THREE.Cache', 'Adding key:', key );

		this.files[ key ] = file;

	},
	//获得该key的值。 如果该key不存在，则以undefined被返回。
	get: function ( key ) {

		if ( this.enabled === false ) return;

		// console.log( 'THREE.Cache', 'Checking key:', key );

		return this.files[ key ];

	},
	//使用key来删除相应的缓存文件。
	remove: function ( key ) {

		delete this.files[ key ];

	},
	//清除所有缓存中的值。
	clear: function () {

		this.files = {};

	}

};


export { Cache };
