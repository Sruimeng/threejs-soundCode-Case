# gltf深入浅出——asset、scenes&nodes

## asset
`asset`属性是每一个gltf资源的必要属性，也是区分json和gltf的关键属性。
### 案例
````javascript
{
    "asset": {
        "version": "2.0",
        "generator": "collada2gltf@f356b99aef8868f74877c7ca545f2cd206b9d3b7",
        "copyright": "2017 (c) Khronos Group"
    }
}
````
可以看到`asset`有很多的参数，其中最重要也是唯一要求有的参数便是"version"，作用是指定gltf资源的版本。其他的可选参数如"minVersion"作用是指定最小的版本，虽然在现在没太大用，能用的只有第二版即gltf2.0，以后可能有用。然后还有其他的一些参数如版权生产工具等。
### 表格
|   |Type|Description|Required|
|---|----|-----------|--------|
|**copyright**|`string`|版权信息|No|
|**generator**|`string`|生成该资源的工具|No|
|**version**|`string`|当前版本|Yes|
|**minVersion**|`string`|最下的目标版本|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|
## scenes&nodes
### 结构图
每个scene可以有一个或者多个node，同时每个node也可以有多个node。
### 例子
````javascript
{
    "nodes": [
        {
            "name": "singleNode"
        }
    ],
    "scenes": [
        {
            "name": "singleScene",
            "nodes": [
                0
            ]
        }
    ],
    "scene": 0
}
````
上述为一个单个node和scene的gltf结构，当"**`scene`**"没有定义时，运行不需要加载任何的东西。gltf同时也允许出现一个或者多个scene（场景）。
- `tips`："**`scenes`**"中的"**`nodes`**"参数，必须为根节点。
### scenes
#### 参数表格
|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**nodes**|`integer` `[1-*]`|节点的下标|
|**name**|`string`|名字|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|
### nodes
#### 例子
````javascript
{
    "nodes": [
        {
            "name": "Car",
            "children": [1, 2, 3, 4]
        },
        {
            "name": "wheel_1"
        },
        {
            "name": "wheel_2"
        },
        {
            "name": "wheel_3"
        },
        {
            "name": "wheel_4"
        }        
    ]
}
````
上述便是一个典型的nodes的结构，可以看到`nodes`具有典型的父子结构，






