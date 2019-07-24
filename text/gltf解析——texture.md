# texture
## 结构图
上述结构图展示了`texture`层和`images`层、`sampleres`层之间的关系。下面将分别解释各个层之间的具体属性。
## texture
### 例子
````javascript
{
    "textures": [
        {
            "name":"image1",
            "sampler": 0,
            "source": 2
        }
    ]
}
````
上面是一个简单的texture的例子，其中主要包括"**name**","**sampler**"和"**source**"三个属性，"**name**"表示该图片的名字，"**sampler**"表示该图片的采样器如过滤器的设置平铺方式等，"**source**"表示图片的路径或者图片资源的位置。
- 需要注意的是glTF2.0即当前版本仅支持2D的图片资源！
### 属性表
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**sampler**|`integer`|采样器的下标，如果没有定义的话需要设置默认的过滤器和其他属性|No|
|**source**|`integer`|图片资源的下标，如果没有定义拓展需要有备用的图片资源，如果都没有则为*undefined*|No|
|**name**|`string`|名字|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|
## images
### 例子
````JavaScript
{
    "images": [
        {
            "uri": "duckCM.png"
        },
        {
            "bufferView": 14,
            "mimeType": "image/jpeg" 
        }
    ]
}
````
`images`的表示分为两种，一种是以url的形式，直接指明指向的图片，一种是以base64的uri来储存数据图片。当以后者储存的时候，需要指明数据在哪（`bufferView`）及数据类型（`mimeType`）。
- 这么做的原因是因为，buffer存储的为base64编码的数据，没有前面的类型啥的，**data:image/jpeg;base64,`iVBORw0KG.......`**但是在实际项目中没这么用过。
### 属性表
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**uri**|`string`|uri|No|
|**mimeType**|`string`|类型|No|
|**bufferView**|`integer`|包含图像数据的bufferView下标|No|
|**name**|`string`|名字|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|
## samplers
### 例子
````javascript
{
    "samplers": [
        {
            "magFilter": 9729,
            "minFilter": 9987,
            "wrapS": 10497,
            "wrapT": 10497
        }
    ]
}
````
`samplers`中主要为过滤器和repeat属性。数字分别代表为：
- magFilter||minFilter
    - 9728: NearestFilter,
	- 9729: LinearFilter,
	- 9984: NearestNearestFilter,
	- 9985: LinearNearestFilter,
	- 9986: NearestLinearFilter,
	- 9987: LinearLinearFilter
- warpS||warpT 
    - 	33071: ClampToEdgeWrapping,
	-	33648: MirroredRepeatWrapping,
	-	10497: RepeatWrapping

上述具体的意思可能新开坑讲吧。 这里的数字是因为在OpenGL或者webgl内部是这么代表的，所以是这几个数字。   
- 还有需要注意的是在webgl中需要图片的尺寸为2的n次幂，但是gltf是不限制尺寸的，如果自己写的话需要改变图片的尺寸。
### 属性表
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**magFilter**|`integer`|放大过滤器|No|
|**minFilter**|`integer`|缩小过滤器|No|
|**wrapS**|`integer`|s的卷绕模式|No, default: `10497`|
|**wrapT**|`integer`|t的卷绕模式|No, default: `10497`|
|**name**|`string`|名字|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|
## 结语
- samplers在动画中也是存在的，注意区分。
