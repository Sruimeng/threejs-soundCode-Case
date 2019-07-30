# gltf深入浅出——meshs
meshs的结构相对来说算是简单的，难的点就是顶点，法线等属性的具体作用。
## 属性表
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**primitives**|primitive `[1-*]`|`primitives`（中文具体该叫什么我也不知道）定义了该几何体的形状| :white_check_mark: Yes|
|**weights**|`number` `[1-*]`|在蒙皮中的权重数组|No|
|**name**|`string`|名字|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|
## 例子
````JavaScript
{
    "meshes": [
        {
            "primitives": [
                {
                    "attributes": {
                        "NORMAL": 23,
                        "POSITION": 22,
                        "TANGENT": 24,
                        "TEXCOORD_0": 25
                    },
                    "indices": 21,
                    "material": 3,
                    "mode": 4
                }
            ]
        }
    ]
}
````
从上述的例子中可以看出`meshs`中最重要的便是`primitives`属性，下面将着重介绍`primitives`属性。
- tips：类似于`TEXCOORD_0`这种属性中间必须以下划线（**_**）分隔。
### primitives
#### 属性表
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**attributes**|`object`|描述mesh的各种属性| :white_check_mark: Yes|
|**indices**|`integer`|accessor的下标|No|
|**material**|`integer`|纹理的下标|No|
|**mode**|`integer`|渲染的模式，默认为三角片面渲染|No, default: `4`|
|**targets**|`object` `[1-*]`|可变节点数组 (只支持 `POSITION`, `NORMAL`, `TANGENT`三种属性) |No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|
#### attributes
##### 属性表
|名字|Accessor类型(s)|Component类型(s)|描述|
|----|----------------|-----------------|-----------|
|`POSITION`|`"VEC3"`|`5126`&nbsp;(FLOAT)|位置|
|`NORMAL`|`"VEC3"`|`5126`&nbsp;(FLOAT)|法线|
|`TANGENT`|`"VEC4"`|`5126`&nbsp;(FLOAT)|顶点切线|
|`TEXCOORD_0`|`"VEC2"`|`5126`&nbsp;(FLOAT)<br>`5121`&nbsp;(UNSIGNED_BYTE)&nbsp;normalized<br>`5123`&nbsp;(UNSIGNED_SHORT)&nbsp;normalized|首个UV描述|
|`TEXCOORD_1`|`"VEC2"`|`5126`&nbsp;(FLOAT)<br>`5121`&nbsp;(UNSIGNED_BYTE)&nbsp;normalized<br>`5123`&nbsp;(UNSIGNED_SHORT)&nbsp;normalized|第二个UV描述|
|`COLOR_0`|`"VEC3"`<br>`"VEC4"`|`5126`&nbsp;(FLOAT)<br>`5121`&nbsp;(UNSIGNED_BYTE)&nbsp;normalized<br>`5123`&nbsp;(UNSIGNED_SHORT)&nbsp;normalized|RGB或者RGBA颜色|
|`JOINTS_0`|`"VEC4"`|`5121`&nbsp;(UNSIGNED_BYTE)<br>`5123`&nbsp;(UNSIGNED_SHORT)|蒙皮顶点|
|`WEIGHTS_0`|`"VEC4"`|`5126`&nbsp;(FLOAT)<br>`5121`&nbsp;(UNSIGNED_BYTE)&nbsp;normalized<br>`5123`&nbsp;(UNSIGNED_SHORT)&nbsp;normalized|蒙皮节点的权重|
#### mode 渲染方式
* `0` POINTS 点
* `1` LINES 线
* `2` LINE_LOOP 
* `3` LINE_STRIP
* `4` TRIANGLES 三角面
* `5` TRIANGLE_STRIP
* `6` TRIANGLE_FAN




