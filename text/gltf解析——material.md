# materials
glTF的材质部分，使用的是一组参数来定义材质。这些参数为`PBR`的各种参数，包括金属性和粗糙性等参数。
## 结构图
结构图中展示了`meshs`到`materials`再到`textures`之间的过程。
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
上述为加上图片的`material`的数据结构，可以看到在`pbrMetallicRoughness`中有`metallicRoughnessTexture`和`baseColorTexture`贴图，但是在一些引擎中分为`metallic`和`metallic`贴图，这样直接两个对应那张`metallicRoughnessTexture`就可以了。对于`baseColorTexture`来说，主要是对应了引擎中的基础纹理。除了上述贴图之外，一个`material`中还有`normalTexture`、`occlusionTexture`及`emissiveTexture`这三个结构类似，在**texture**中会详细解释。

### 其他属性
````javascript
{
    "materials": [
        {
            "name": "Material0",
            "pbrMetallicRoughness": {
                "baseColorFactor": [ 0.5, 0.5, 0.5, 1.0 ],
                "metallicFactor": 1,
                "roughnessFactor": 1,
            },
            "doubleSided": true,
            "alphaMode": "OPAQUE"
            "emissiveFactor": [ 0.2, 0.1, 0.0 ]
        }
    ]
}
````
其他属性中主要有`alphaMode`和`doubleSided`,`alphaMode`又有三种模式:

- "OPAQUE":默认模式，完全不透明，忽略任何的alpha值
- "MASK":与另一个属性`alphaCutoff`，如果小于`alphaCutoff`的值则为完全透明，否则为完全不透明。`alphaCutoff`值只有在"MASK"模式中生效，其他模式忽略该值。
- "BLEND":混合模式，该模式的显示效果取决于各个引擎对该属性的支持。

`doubleSided`属性，是否为双面贴图。
### 杂项——点和线的material
上述的属性定义的都是三角片面下的各种情况，当物体为一个点或者一条线时。glTF官方没有给出相关的约束和规范。但是官方也给出了在不同情境的一般处理分为三种情况：
- 有TANRENT和NORMAL的情况下，按照正常的光照模型和法线贴图进行渲染。
- 没有TANGENT的情况下，没有法线贴图。
- 没有NORMAL的情况下，只输出颜色值，不计算光照。
## 相关参数
### material
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**name**|`string`|材质名|No|
|**extensions**|`object`|材质拓展（draco）用|No|
|**extras**|`any`|其他的补充信息|No|
|**pbrMetallicRoughness**|`object`|pbr流程的相关参数 |No|
|**normalTexture**|`object`|法线贴图|No|
|**occlusionTexture**|`object`|遮蔽贴图对应着AO图|No|
|**emissiveTexture**|`object`|自发光贴图|No|
|**emissiveFactor**|`number` `[3]`|自发光强度|No, default: `[0,0,0]`|
|**alphaMode**|`string`|alpha模式|No, default: `"OPAQUE"`|
|**alphaCutoff**|`number`|alpha模式中的"MASK"使用|No, default: `0.5`|
|**doubleSided**|`boolean`|是否为双面材质|No, default: `false`|
### pbrMetallicRoughness
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**baseColorFactor**|`number` `[4]`|基础颜色|No, default: `[1,1,1,1]`|
|**baseColorTexture**|`object`|基础的map的图片路径|No|
|**metallicFactor**|`number`|金属感强度|No, default: `1`|
|**roughnessFactor**|`number`|粗糙感强度|No, default: `1`|
|**metallicRoughnessTexture**|`object`|金属或者粗糙度的图片|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加属性|No|

### normalTexture
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**index**|`integer`|图片的下标| Yes|
|**texCoord**|`integer`|在primitives.attributes中的位置，如果是0则为TEXCOORD_0|No, default: `0`|
|**scale**|`number`|缩放比例，按照`scaledNormal = normalize((<sampled normal texture value> * 2.0 - 1.0) * vec3(<normal scale>, <normal scale>, 1.0))`来设置|No, default: `1`|
|**extensions**|`object`|拓展的属性|No|
|**extras**|`any`|附加信息|No|

### occlusionTextureInfo
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**index**|`integer`|图片的下标| Yes|
|**texCoord**|`integer`|在primitives.attributes中的位置，如果是0则为TEXCOORD_0|No, default: `0`|
|**strength**|`number`|遮蔽强度|No, default: `1`|
|**extensions**|`object`|拓展的属性|No|
|**extras**|`any`|附加信息|No|

## 结束
关于各个的属性的schema，太多了就不贴上来了，想了解具体的直接去官网看就行。
传送门：https://github.com/KhronosGroup/glTF/tree/master/specification/2.0
