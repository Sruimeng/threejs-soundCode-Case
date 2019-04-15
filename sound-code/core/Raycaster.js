import { Ray } from '../math/Ray.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author bhouston / http://clara.io/
 * @author stephomi / http://stephaneginier.com/
 */
/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/
function Raycaster(origin, direction, near, far) {
	/**
	 * 该方法为射线拾取的方法
	 */
	// 新建一个Ray对象，ray方法接受两个参数{
	// 	射线的起点，
	// 	射线的方向
	// }
	this.ray = new Ray(origin, direction);
	// direction is assumed to be normalized (for accurate distance calculations)
	//near的默认值为0
	this.near = near || 0;
	//far的默认值为无穷大
	this.far = far || Infinity;
	//新建一个参数对象，参数对象内容为可接受的物体类型
	this.params = {
		Mesh: {},
		Line: {},
		LOD: {},
		Points: { threshold: 1 },
		Sprite: {}
	};
	//该方法为向对象添加参数
	Object.defineProperties(this.params, {
		PointCloud: {
			get: function () {
				//该参数已经被改成了params.Points参数
				console.warn('THREE.Raycaster: params.PointCloud has been renamed to params.Points.');
				return this.Points;

			}
		}
	});

}

//或者距离的方法
function ascSort(a, b) {

	return a.distance - b.distance;

}
/**
 * 判断和物体是否交叉的方法 接收四个参数{
 * 		需要判断的物体
 * 		射线变量
 * 		后代的集合
 * 		是否判断后代也相交
 * }
 */
function intersectObject(object, raycaster, intersects, recursive) {
	//如果物体不可见则返回
	if (object.visible === false) return;
	//设置raycast
	object.raycast(raycaster, intersects);
	//判断是否遍历后代
	if (recursive === true) {
		//获得物体的后代
		var children = object.children;
		//如果长度不为0，递归
		for (var i = 0, l = children.length; i < l; i++) {

			intersectObject(children[i], raycaster, intersects, true);

		}

	}

}

Object.assign(Raycaster.prototype, {

	//设置与line相交时的精度
	linePrecision: 1,
	//set方法
	set: function (origin, direction) {

		// direction is assumed to be normalized (for accurate distance calculations)

		this.ray.set(origin, direction);

	},
	//
	setFromCamera: function (coords, camera) {

		if ((camera && camera.isPerspectiveCamera)) {

			this.ray.origin.setFromMatrixPosition(camera.matrixWorld);
			this.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(this.ray.origin).normalize();

		} else if ((camera && camera.isOrthographicCamera)) {

			this.ray.origin.set(coords.x, coords.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera); // set origin in plane of camera
			this.ray.direction.set(0, 0, - 1).transformDirection(camera.matrixWorld);

		} else {

			console.error('THREE.Raycaster: Unsupported camera type.');

		}

	},

	intersectObject: function (object, recursive, optionalTarget) {

		var intersects = optionalTarget || [];

		intersectObject(object, this, intersects, recursive);

		intersects.sort(ascSort);

		return intersects;

	},

	/**
	 * @description
	 * @date 2019-04-15
	 * @param {*	} objects
	 * @param {*} recursive
	 * @param {*} optionalTarget
	 * @returns 
	 */
	intersectObjects: f unction (objects, recursive, optionalTarget) {

		var intersects = optionalTarget || [];

		if (Array.isArray(objects) === false) {

			console.warn('THREE.Raycaster.intersectObjects: objects is not an Array.');
			return intersects;

		}

		for (var i = 0, l = objects.length; i < l; i++) {

			intersectObject(objects[i], this, intersects, recursive);

		}

		intersects.sort(ascSort);

		return intersects;

	}

});


export { Raycaster };
