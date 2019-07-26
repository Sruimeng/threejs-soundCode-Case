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
|   |类型|描述|是否必须|
|----------------|----------|------------------|----------|
| **copyright**  | `string` | 版权信息         | No       |
| **generator**  | `string` | 生成该资源的工具 | No       |
| **version**    | `string` | 当前版本         | Yes      |
| **minVersion** | `string` | 最下的目标版本   | No       |
| **extensions** | `object` | 属性拓展         | No       |
| **extras**     | `any`    | 附加信息         | No       |
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
|                | 类型              | 描述       | 是否必须 |
|----------------|-------------------|------------|----------|
| **nodes**      | `integer` `[1-*]` | 节点的下标 |          |
| **name**       | `string`          | 名字       | No       |
| **extensions** | `object`          | 属性拓展   | No       |
| **extras**     | `any`             | 附加信息   | No       |
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
上述便是一个典型的nodes的结构，可以看到`nodes`具有典型的父子结构。当该节点没有父节点时，该节点被称为根节点，并使用"**children**"来表示该节点的子节点。
- tips:一个节点可以有多个子节点，但是只能有一个父节点。
### 转换
任何节点都支持使用矩阵（mat4），或者旋转（vec4）、平移（vec3）和缩放（vec3）来定义空间的变换。公式为：

$$ M=T*R*S(均为矩阵状态) $$

首先来看一个以TRS来表示的案例
````javascript
{
    "nodes": [
        {
            "name": "Box",
            "rotation": [
                0.1,
                0.2,
                0.2,
                0.3
            ],
            "scale": [
                1,
                1,
                1
            ],
            "translation": [
                -17.7082,
                -11.4156,
                2.0922
            ]
        }
    ]
}
````
然后分别把他们转换成对应的矩阵形态：
四元数----->旋转矩阵
$$
  R=\begin{Bmatrix}
   0.84 & -0.08 & 0.16 & 0\\
   0.16 & 0.9 & 0.02 & 0\\
   0.04 & 0.14 & 0.9 & 0\\
   0 & 0 & 0  & 1\\
  \end{Bmatrix}\\ \tag{旋转矩阵}
$$
缩放------>缩放矩阵
$$
  S=\begin{Bmatrix}
   1 & 0 & 0 & 0\\
   0 & 1 & 0 & 0\\
   0 & 0 & 1 & 0\\
   0 & 0 & 0 & 1\\
  \end{Bmatrix}\\ \tag{缩放矩阵}
$$
位置------>位置矩阵
$$
  T=\begin{Bmatrix}
   1 & 0 & 0 & -17.7082\\
   0 & 1 & 0 & -11.4156\\
   0 & 0 & 1 &  2.0922\\
   0 & 0 & 0 & 1\\
  \end{Bmatrix}\\ \tag{位置矩阵}
$$
根据公式可以得到：
$$
    M=\begin{Bmatrix}
    0.84 & -0.08 & 0.16 & -17.7082\\
   0.16 & 0.9 & 0.02 & -11.4156\\
   -0.04 & 0.14 & 0.9 &  2.0922\\
   0 & 0 & 0 & 1\\
    \end{Bmatrix} \\ \tag{总矩阵}
$$
经过变换后就可以写成矩阵的形式如下所示(举个例子，并不是上述矩阵)：
````javascript
{
    "nodes": [
        {
            "name": "node-camera",
            "camera": 1,
            "matrix": [
                -0.99975,
                -0.00679829,
                0.0213218,
                0,
                0.00167596,
                0.927325,
                0.374254,
                0,
                -0.0223165,
                0.374196,
                -0.927081,
                0,
                -0.0115543,
                0.194711,
                -0.478297,
                1
            ]
        }
    ]
}
````
- tips：在动画中即`animation.channel.target`只能使用TRS表示，无法使用矩阵表示。
### 属性表

|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**camera**|`integer`|摄像机节点，跟着摄像机矩阵。|No|
|**children**|`integer` `[1-*]`|子节点列表|No|
|**skin**|`integer`|蒙皮节点|No|
|**matrix**|`number` `[16]`|矩阵|No, default: `[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]`|
|**mesh**|`integer`|物体节点|No|
|**rotation**|`number` `[4]`|四元数旋转|No, default: `[0,0,0,1]`|
|**scale**|`number` `[3]`|缩放比|No, default: `[1,1,1]`|
|**translation**|`number` `[3]`|位置信息|No, default: `[0,0,0]`| 
|**weights**|`number` `[1-*]`|mesh的权重数组|No| 
|**name**|`string`|名字|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|



