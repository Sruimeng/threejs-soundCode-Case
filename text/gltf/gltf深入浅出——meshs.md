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
### primitives
#### 属性表
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**attributes**|`object`|A dictionary object, where each key corresponds to mesh attribute semantic and each value is the index of the accessor containing attribute's data.| :white_check_mark: Yes|
|**indices**|`integer`|The index of the accessor that contains the indices.|No|
|**material**|`integer`|The index of the material to apply to this primitive when rendering.|No|
|**mode**|`integer`|The type of primitives to render.|No, default: `4`|
|**targets**|`object` `[1-*]`|An array of Morph Targets, each  Morph Target is a dictionary mapping attributes (only `POSITION`, `NORMAL`, and `TANGENT` supported) to their deviations in the Morph Target.|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|
