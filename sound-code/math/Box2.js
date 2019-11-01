import {
	Vector2
} from './Vector2.js';

/**
 * @author bhouston / http://clara.io
 */

/**
 * @description  2D包围盒
 * @date 2019-05-23
 * @param {Number} min
 * @param {Number} max
 */
function Box2(min, max) {
	//下边界默认为无穷大，上边界默认为负无穷大
	this.min = (min !== undefined) ? min : new Vector2(+Infinity, +Infinity);
	this.max = (max !== undefined) ? max : new Vector2(-Infinity, -Infinity);

}


Object.assign(Box2.prototype, {


	/**
	 * @description 设置上下边界
	 * @date 2019-05-24
	 * @param {Vector2} min
	 * @param {Vector2} max
	 * @returns 返回包围盒
	 */
	set: function (min, max) {

		this.min.copy(min);
		this.max.copy(max);

		return this;

	},
	/**
	 * @description 从获取的二维数组点中获得
	 * @date 2019-05-24
	 * @param {Array} points
	 * @returns 返回包围盒
	 */
	setFromPoints: function (points) {

		this.makeEmpty();

		for (var i = 0, il = points.length; i < il; i++) {

			this.expandByPoint(points[i]);

		}

		return this;

	},
	/**
	 * @description 从中心点和包围盒的大小形成包围盒
	 * @date 2019-05-24
	 * @returns 返回包围盒方法
	 */
	setFromCenterAndSize: function () {

		var v1 = new Vector2();

		return function setFromCenterAndSize(center, size) {

			var halfSize = v1.copy(size).multiplyScalar(0.5);
			this.min.copy(center).sub(halfSize);
			this.max.copy(center).add(halfSize);

			return this;

		};

	}(),
	/**
	 * @description 克隆方法
	 * @date 2019-05-24
	 * @returns 返回本包围盒
	 */
	clone: function () {

		return new this.constructor().copy(this);

	},
	/**
	 * @description 从另一个包围盒创建一个相等的包围盒
	 * @param {Box2} box 
	 * @date 2019-05-24
	 * @returns 返回本包围盒
	 */
	copy: function (box) {

		this.min.copy(box.min);
		this.max.copy(box.max);

		return this;

	},
	/**
	 * @description 置空方法，将当前包围盒设置为默认状态
	 * @date 2019-05-24
	 * @returns 返回本包围盒
	 */
	makeEmpty: function () {

		this.min.x = this.min.y = +Infinity;
		this.max.x = this.max.y = -Infinity;

		return this;

	},
	/**
	 * @description 判断是否为空包围盒，判断依据为
	 * @date 2019-05-24
	 * @returns 返回本包围盒
	 */
	isEmpty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return (this.max.x < this.min.x) || (this.max.y < this.min.y);

	},
	/**
	 * @description 获得中心点
	 * @date 2019-05-24
	 * @returns 返回本包围盒
	 */
	getCenter: function (target) {

		if (target === undefined) {

			console.warn('THREE.Box2: .getCenter() target is now required');
			target = new Vector2();

		}
		//如果中心点
		return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);

	},

	getSize: function (target) {

		if (target === undefined) {

			console.warn('THREE.Box2: .getSize() target is now required');
			target = new Vector2();

		}

		return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);

	},

	expandByPoint: function (point) {

		this.min.min(point);
		this.max.max(point);

		return this;

	},

	expandByVector: function (vector) {

		this.min.sub(vector);
		this.max.add(vector);

		return this;

	},

	expandByScalar: function (scalar) {

		this.min.addScalar(-scalar);
		this.max.addScalar(scalar);

		return this;

	},

	containsPoint: function (point) {

		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ? false : true;

	},

	containsBox: function (box) {

		return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y;

	},

	getParameter: function (point, target) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		if (target === undefined) {

			console.warn('THREE.Box2: .getParameter() target is now required');
			target = new Vector2();

		}

		return target.set(
			(point.x - this.min.x) / (this.max.x - this.min.x),
			(point.y - this.min.y) / (this.max.y - this.min.y)
		);

	},

	intersectsBox: function (box) {

		// using 4 splitting planes to rule out intersections

		return box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ? false : true;

	},

	clampPoint: function (point, target) {

		if (target === undefined) {

			console.warn('THREE.Box2: .clampPoint() target is now required');
			target = new Vector2();

		}

		return target.copy(point).clamp(this.min, this.max);

	},

	distanceToPoint: function () {

		var v1 = new Vector2();

		return function distanceToPoint(point) {

			var clampedPoint = v1.copy(point).clamp(this.min, this.max);
			return clampedPoint.sub(point).length();

		};

	}(),

	intersect: function (box) {

		this.min.max(box.min);
		this.max.min(box.max);

		return this;

	},

	union: function (box) {

		this.min.min(box.min);
		this.max.max(box.max);

		return this;

	},

	translate: function (offset) {

		this.min.add(offset);
		this.max.add(offset);

		return this;

	},

	equals: function (box) {

		return box.min.equals(this.min) && box.max.equals(this.max);

	}

});


export {
	Box2
};