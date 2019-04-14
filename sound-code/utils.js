/**
 * @author mrdoob / http://mrdoob.com/
 */
/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/
function arrayMin(array) {
	/**
	 * 返回数组中最小值
	 */
	//如果数组长度为0 返回正无穷大
	if (array.length === 0) return Infinity;
	//先定义最小值为第一个元素
	var min = array[0];
	//寻找最小值
	for (var i = 1, l = array.length; i < l; ++i) {

		if (array[i] < min) min = array[i];

	}
	//返回最小值
	return min;

}

function arrayMax(array) {
	/**
	 * 返回数组最大值
	 */
	//如果数组长度为0 返回负无穷大
	if (array.length === 0) return - Infinity;
	//先定义最大值为第一个元素
	var max = array[0];
	//寻找最大值
	for (var i = 1, l = array.length; i < l; ++i) {

		if (array[i] > max) max = array[i];

	}
	//返回最大值
	return max;

}

export { arrayMin, arrayMax };
