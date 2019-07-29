# gltf深入浅出——cameras
## 导言
gltf中的摄像机也是分为两种，一种是正交摄像机，一种是透视摄像机。
## 案例
````javascript
{
    "cameras": [
        {
            "name": "Finite perspective camera",
            "type": "perspective",
            "perspective": {
                "aspectRatio": 1.5,
                "yfov": 0.660593,
                "zfar": 100,
                "znear": 0.01
            }      
        },
        {
            "name": "Infinite perspective camera",
            "type": "perspective",
            "perspective": {
                "aspectRatio": 1.5,
                "yfov": 0.660593,
                "znear": 0.01
            }
        },
        {
            "name": "Orthographic camera",
            "type": "orthographic",
            "perspective": {
                "xmag": 1.0,
                "ymag": 1.0,
                "znear": 0.01,
                "zfar": 100.0,
            }
        }
    ]
}
````
上述一共有三种摄像机，分别为有限视野的透视摄像机、无限视野的透视摄像机、正交摄像机。这其中只有一个属性是必要的就是摄像机的类型（`type`）。下面分别介绍这三种摄像机的投影矩阵如下：
$$
  R=\begin{Bmatrix}
   \frac{1}{a*tan(0.5*y)} & 0 & 0 & 0\\
   0 & \frac{1}{tan(0.5*y)} & 0 & 0\\
   0 & 0 & -1 & -2n\\
   0 & 0 & -1  & 0\\
  \end{Bmatrix}$$
**a**   等同于 `camera.perspective.aspectRatio`;
**y**  等同于 `camera.perspective.yfov`;
**n**  等同于 `camera.perspective.znear`.
$$
  R=\begin{Bmatrix}
   \frac{1}{a*tan(0.5*y)} & 0 & 0 & 0\\
   0 & \frac{1}{tan(0.5*y)} & 0 & 0\\
   0 & 0 & \frac{f+n}{n-f} & \frac{2*f*n}{n-f}\\
   0 & 0 & -1  & 0\\
  \end{Bmatrix}$$
**a**  等同于 `camera.perspective.aspectRatio`;
**y**  等同于 `camera.perspective.yfov`;
**f**  等同于 `camera.perspective.zfar`;
**n**  等同于 `camera.perspective.znear`.
$$
  R=\begin{Bmatrix}
   \frac{1}{r} & 0 & 0 & 0\\
   0 & \frac{1}{t} & 0 & 0\\
   0 & 0 & \frac{2}{n-f} & \frac{f+n}{n-f}\\
   0 & 0 & 0  & 1\\
  \end{Bmatrix}$$
**r** 等同于 `camera.orthographic.xmag`;
**t** 等同于 `camera.orthographic.ymag`;
**f** 等同于 `camera.orthographic.zfar`;
**n** 等同于 `camera.orthographic.znear`.(**以上来自于官方文档**)
## 属性表
### camera

|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**orthographic**|`object`|正交相机|No|
|**perspective**|`object`|透视相机|No|
|**type**|`string`|相机类型，为必要条件| :white_check_mark: Yes|
|**name**|`string`|名字|No|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|

### orthographic

|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**xmag**|`number`|横向的最大值,浮点数，类似于`windows.innerWidth`。| :white_check_mark: Yes|
|**ymag**|`number`|纵向的最大值，浮点数，类似于`windows.innerHeight`。| :white_check_mark: Yes|
|**zfar**|`number`|最远距离，浮点数，`zfar`必须必`znear`大.| :white_check_mark: Yes|
|**znear**|`number`|最近距离，浮点数。| :white_check_mark: Yes|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|

### perspective

|   |类型|描述|是否必须|
|---|----|-----------|--------|
|**aspectRatio**|`number`|宽高比，浮点数。|No|
|**yfov**|`number`|视角，浮点数。| :white_check_mark: Yes|
|**zfar**|`number`|最远距离，浮点数。|No|
|**znear**|`number`|最近距离，浮点数。| :white_check_mark: Yes|
|**extensions**|`object`|属性拓展|No|
|**extras**|`any`|附加信息|No|