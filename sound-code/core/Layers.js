/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 *	层级的概念其实是很重要的，比如在第一层放一些东西，然后在其他层放了一些东西，这样通过换层级来控制模型或者
 *	其他东西的显隐，在构建一些复杂的功能的时候是很重要的
 */
function Layers() {
	//默认层级为1
	this.mask = 1 | 0;

}
//原型方法
Object.assign( Layers.prototype, {
	
	/**
	 * 设置层级
	 * @param {*} channel 
	 */
	set: function ( channel ) {

		this.mask = 1 << channel | 0;

	},
	//设置层级的数字 与disable配合使用
	enable: function ( channel ) {

		this.mask |= 1 << channel | 0;

	},
	//控制层级的显隐
	toggle: function ( channel ) {

		this.mask ^= 1 << channel | 0;

	},
	//取消设置层级的数字
	disable: function ( channel ) {

		this.mask &= ~ ( 1 << channel | 0 );

	},
	//判断两个层级是否相同
	test: function ( layers ) {

		return ( this.mask & layers.mask ) !== 0;

	}

} );


export { Layers };
