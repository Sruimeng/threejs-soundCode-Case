import { Object3D } from '../core/Object3D.js';

/**
 * @author mrdoob / http://mrdoob.com/
 */

/**
 * @description 组对象，组的概念在很多地方都有，在three中组用来表示多个物体的总称，比如几个物体组合成一个组，这样在添加
 * 或者删除的时候直接删除这个组就行，不必再一个一个的操作了。
 * 
 */
function Group() {

	Object3D.call( this );

	this.type = 'Group';

}

Group.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Group,

	isGroup: true

} );


export { Group };
