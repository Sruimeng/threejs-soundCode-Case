import { _Math } from './Math.js';

/**
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 *
 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
 *
 * The polar angle (phi) is measured from the positive y-axis. The positive y-axis is up.
 * The azimuthal angle (theta) is measured from the positive z-axiz.
 */

/**
 * @description 球体坐标系作为一个球体的结构模型，对应的点在球上，phi的0在在球的正上方，theta的0在球的正面的中心
 * 
 * @param {any} radius 半径
 * @param {any} phi 俯仰角
 * @param {any} theta 方位角
 * @returns  
 */
function Spherical( radius, phi, theta ) {

	this.radius = ( radius !== undefined ) ? radius : 1.0;
	this.phi = ( phi !== undefined ) ? phi : 0; // polar angle
	this.theta = ( theta !== undefined ) ? theta : 0; // azimuthal angle

	return this;

}

Object.assign( Spherical.prototype, {
	//设置球体坐标系的数值
	set: function ( radius, phi, theta ) {

		this.radius = radius;
		this.phi = phi;
		this.theta = theta;

		return this;

	},
	//克隆方法
	clone: function () {

		return new this.constructor().copy( this );

	},
	//复制
	copy: function ( other ) {

		this.radius = other.radius;
		this.phi = other.phi;
		this.theta = other.theta;

		return this;

	},
	// 判断查询phi的精度
	// restrict phi to be betwee EPS and PI-EPS
	makeSafe: function () {

		var EPS = 0.000001;
		this.phi = Math.max( EPS, Math.min( Math.PI - EPS, this.phi ) );

		return this;

	},
	//从一个三维坐标设置球体坐标系
	setFromVector3: function ( v ) {

		return this.setFromCartesianCoords( v.x, v.y, v.z );

	},
	//从一个三维坐标设置球体坐标系
	setFromCartesianCoords: function ( x, y, z ) {

		this.radius = Math.sqrt( x * x + y * y + z * z );
		//如果半径为0的话，其他数据也为0
		if ( this.radius === 0 ) {

			this.theta = 0;
			this.phi = 0;

		} else {

			this.theta = Math.atan2( x, z );
			this.phi = Math.acos( _Math.clamp( y / this.radius, - 1, 1 ) );

		}

		return this;

	}

} );


export { Spherical };
