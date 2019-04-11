# 源码翻译
```javascript
/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

import { Color } from '../math/Color.js';
/*
* 本文档为Three.js翻译文档，如有任何疑问请联系:
* pygmalioneffect@aliyun.com
*/
function FogExp2(color, density) {
	/**
	 * 该雾为指数雾对应的还有线性雾
	 * 线性雾的意思是雾的密度是随着指数的增加而增大的
	 * 接收三个参数分别为{
	 * 雾的颜色,
	 * 应用雾的最大距离,
	 * 应用雾的最小距离,
	 * }
	 */
	//雾对象的名称，非必选属性，默认为空
	this.name = '';
	//雾的颜色可以传六位十六进制(0x000000)或者css中的颜色样式('blue')
	this.color = new Color(color);
	//雾的指数强度，缺省值为0.00025
	this.density = (density !== undefined) ? density : 0.00025;

}

Object.assign(FogExp2.prototype, {
	//是否为雾
	isFogExp2: true,

	/**
	 * 克隆方法，返回一个新的雾。
	 */
	clone: function () {

		return new FogExp2(this.color, this.density);

	},
	
	/**
	 * 转变为json格式，返回json，数据结构如下。
	 */
	toJSON: function ( /* meta */) {

		return {
			type: 'FogExp2',
			color: this.color.getHex(),
			density: this.density
		};

	}

});

export { FogExp2 };

```
# 案例地址
- 缩略图  
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411234246471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0MjA1OTMy,size_16,color_FFFFFF,t_70)
- 暂时博客还没搭起来以后再加
