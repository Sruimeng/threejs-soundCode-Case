# gltf 
* `material`
   * `normalTextureInfo`
   * `occlusionTextureInfo`
   * `pbrMetallicRoughness`     

## material ##

|   |Type|Description|Required|
|---|----|-----------|--------|
|**name**|`string`|材质名|No|
|**extensions**|`object`|材质拓展（draco）用|No|
|**extras**|`any`|其他的补充信息|No|
|**pbrMetallicRoughness**|`object`|pbr流程的相关参数 |No|
|**normalTexture**|`object`|The normal map texture.|No|
|**occlusionTexture**|`object`|The occlusion map texture.|No|
|**emissiveTexture**|`object`|The emissive map texture.|No|
|**emissiveFactor**|`number` `[3]`|The emissive color of the material.|No, default: `[0,0,0]`|
|**alphaMode**|`string`|The alpha rendering mode of the material.|No, default: `"OPAQUE"`|
|**alphaCutoff**|`number`|alpha模式中的"MASK"使用|No, default: `0.5`|
|**doubleSided**|`boolean`|是否双面渲染|No, default: `false`|

**pbrMetallicRoughness**
|   |Type|Description|Required|
|---|----|-----------|--------|
|**baseColorFactor**|`number` `[4]`|基础颜色|No, default: `[1,1,1,1]`|
|**baseColorTexture**|`object`|基础的map的图片路径|No|
|**metallicFactor**|`number`|金属感强度|No, default: `1`|
|**roughnessFactor**|`number`|粗糙感强度|No, default: `1`|
|**metallicRoughnessTexture**|`object`|金属或者粗糙度的图片|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|Application-specific data.|No|

**normalTexture**
| |Type|Description|Required|
|---|----|-----------|--------|
|**index**|`integer`|图片的下标| Yes|
|**texCoord**|`integer`|在primitives.attributes中的位置，如果是0则为TEXCOORD_0|No, default: `0`|
|**scale**|`number`|缩放比例，按照`scaledNormal = normalize((<sampled normal texture value> * 2.0 - 1.0) * vec3(<normal scale>, <normal scale>, 1.0))`来设置|No, default: `1`|
|**extensions**|`object`|Dictionary object with extension-specific objects.|No|
|**extras**|`any`|Application-specific data.|No|Additional properties are allowed.

**occlusionTextureInfo**

|   |Type|Description|Required|
|---|----|-----------|--------|
|**index**|`integer`|The index of the texture.| :white_check_mark: Yes|
|**texCoord**|`integer`|The set index of texture's TEXCOORD attribute used for texture coordinate mapping.|No, default: `0`|
|**strength**|`number`|遮蔽强度|No, default: `1`|
|**extensions**|`object`|Dictionary object with extension-specific objects.|No|
|**extras**|`any`|Application-specific data.|No|