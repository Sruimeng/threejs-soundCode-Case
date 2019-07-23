# materials
glTF的材质部分，使用的是一组参数来定义材质。这些参数为`PBR`的各种参数，包括金属性和粗糙性等参数。
## 例子
### 最简单的例子
````javascript
{
    "materials": [
        {
            "name": "gold",
            "pbrMetallicRoughness": {
                "baseColorFactor": [ 1.000, 0.766, 0.336, 1.0 ],
                "metallicFactor": 1.0,
                "roughnessFactor": 0.0
            }
        }
    ]
}
````
上述的代码为最简单的gltf材质的例子，其中包括了材质的名称，和PBR的相关参数。`pbrMetallicRoughness`中的`baseColorFactor`为RGBA颜色，`metallicFactor`和`roughnessFactor`为0到1之间的float值。关于这两个值如何影响材质的就不展开了，可能会写PBR的相关文章。
### 加上纹理的例子
````javascript
{
    "materials": [
        {
            "name": "Material0",
            "pbrMetallicRoughness": {
                "baseColorFactor": [ 0.5, 0.5, 0.5, 1.0 ],
                "baseColorTexture": {
                    "index": 1,
                    "texCoord": 1
                },
                "metallicFactor": 1,
                "roughnessFactor": 1,
                "metallicRoughnessTexture": {
                    "index": 2,
                    "texCoord": 1
                }
            },
            "normalTexture": {
                "scale": 2,
                "index": 3,
                "texCoord": 1
            },
            "emissiveFactor": [ 0.2, 0.1, 0.0 ]
        }
    ]
}
````


