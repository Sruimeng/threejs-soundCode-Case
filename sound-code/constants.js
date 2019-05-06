//版本号
export var REVISION = '103dev';

//鼠标的三个按键
export var MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};

/**
 * 上面的几个属性为剪裁，变量分别对应
 * 都不剪裁
 * 背面剪裁
 * 正面剪裁
 * 正反面剪裁
 * 字面的意思，直接看英文就行
 */
export var CullFaceNone = 0;
export var CullFaceBack = 1;
export var CullFaceFront = 2;
export var CullFaceFrontBack = 3;
/**
 * 指定是顺时针拼接顶点还是逆时针分别对应
 * 逆时针
 * 顺时针
 */
export var FrontFaceDirectionCW = 0;
export var FrontFaceDirectionCCW = 1;
/**
 * 下面是三种阴影模式分别为
 * 默认模式
 * PCF算法
 * 柔化的阴影
 */
export var BasicShadowMap = 0;
export var PCFShadowMap = 1;
export var PCFSoftShadowMap = 2;
/**
 * 下面是面的展示
 * 显示正面
 * 显示背面
 * 双面显示
 */
export var FrontSide = 0;
export var BackSide = 1;
export var DoubleSide = 2;
/**
 * 下面是着色方式
 * 平面着色
 * 平滑着色
 */
export var FlatShading = 1;
export var SmoothShading = 2;
/**
 * 颜色设置
 * 无颜色
 * 面颜色
 * 顶点颜色
 */
export var NoColors = 0;
export var FaceColors = 1;
export var VertexColors = 2;
/**
 * 混合模式：
 * 无混合 透明度无效
 * 正常混合 透明有效
 * 加法混合 透明有效
 * 减法混合 透明有效
 * 乘法混合 透明有效 案例：https://threejs.org/examples/?q=Blending#webgl_materials_blending
 * 自定义混合 透明有效 就是可以将混合因子自定义混合 案例：https://threejs.org/examples/?q=Blending#webgl_materials_blending_custom
 */
export var NoBlending = 0;
export var NormalBlending = 1;
export var AdditiveBlending = 2;
export var SubtractiveBlending = 3;
export var MultiplyBlending = 4;
export var CustomBlending = 5;
/**
 * 混合公式：
 * GL_FUNC_ADD 加法
 * GL_FUNC_SUBTRACT 减法
 * GL_FUNC_RESERSE_SUBTRACT 反向减法
 * GL_MIN   最小方程
 * GL_MAX   最大房产
 */
export var AddEquation = 100;
export var SubtractEquation = 101;
export var ReverseSubtractEquation = 102;
export var MinEquation = 103;
export var MaxEquation = 104;
/**
 * 下面是混合因子，分别为
 * GL_ZERO
 * GL_ONE
 * GL_SRC_COLOR
 * GL_ONE_MINUS_SRC_COLOR
 * GL_SRC_ALPHA
 * GL_ONE_MINUS_SRC_ALPHA
 * GL_DST_ALPHA
 * GL_ONE_MINUS_DST_ALPHA
 * GL_DST_COLOR
 * GL_ONE_MINUS_DST_COLOR
 * GL_SRC_ALPHA_SATURATE
 */
export var ZeroFactor = 200;
export var OneFactor = 201;
export var SrcColorFactor = 202;
export var OneMinusSrcColorFactor = 203;
export var SrcAlphaFactor = 204;
export var OneMinusSrcAlphaFactor = 205;
export var DstAlphaFactor = 206;
export var OneMinusDstAlphaFactor = 207;
export var DstColorFactor = 208;
export var OneMinusDstColorFactor = 209;
export var SrcAlphaSaturateFactor = 210;
/**
 * 深度模式：
 * gl.NEVER（永不通过）
 * gl.ALWAYS（总是通过）
 * gl.LESS（如果传入值小于深度缓冲值，则通过）
 * gl.EQUAL（如果传入值等于深度缓冲区值，则通过）
 * gl.LEQUAL（如果传入值小于或等于深度缓冲区值，则通过）
 * gl.GREATER（如果传入值大于深度缓冲区值，则通过）
 * gl.NOTEQUAL（如果传入的值不等于深度缓冲区值，则通过）
 * gl.GEQUAL（如果传入值大于或等于深度缓冲区值，则通过）
 */
export var NeverDepth = 0;
export var AlwaysDepth = 1;
export var LessDepth = 2;
export var LessEqualDepth = 3;
export var EqualDepth = 4;
export var GreaterEqualDepth = 5;
export var GreaterDepth = 6;
export var NotEqualDepth = 7;
/**
 * 环境贴图和颜色混合的方式：
 * 乘法
 * 混合
 * 加法模式
 */
export var MultiplyOperation = 0;
export var MixOperation = 1;
export var AddOperation = 2;
/**
 * ToneMapping的几种算法：
 * 没有ToneMapping
 * 线性ToneMapping
 * Reinhard算法的ToneMapping
 * 剩下的仨没查到具体的算法，但是最后一种效果是最好的
 */
`#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
uniform float toneMappingWhitePoint;
vec3 LinearToneMapping( vec3 color ) 
{
    return toneMappingExposure * color;
}
    vec3 ReinhardToneMapping( vec3 color ) {
        color *= toneMappingExposure;
        return saturate( color / ( vec3( 1.0 ) + color ) )
        }
        #define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )   
        vec3 Uncharted2ToneMapping( vec3 color ) {   
            color *= toneMappingExposure;   
            return saturate( Uncharted2Helper( color ) 
            Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );   }   vec3 OptimizedCineonToneMapping( vec3 color ) {   \tcolor *= toneMappingExposure;   \tcolor = max( vec3( 0.0 ), color - 0.004 );   \treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );   }   vec3 ACESFilmicToneMapping( vec3 color ) {   \tcolor *= toneMappingExposure;   \treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );
    }`
export var NoToneMapping = 0;
export var LinearToneMapping = 1;
export var ReinhardToneMapping = 2;
export var Uncharted2ToneMapping = 3;
export var CineonToneMapping = 4;
export var ACESFilmicToneMapping = 5;
/**
 * 这些常量定义了纹理贴图的映射模式。
 * UVMapping是默认值，纹理使用网格的坐标来进行映射。
 * 其它的值定义了环境映射的类型。
 * CubeReflectionMapping 和 CubeRefractionMapping 用于 CubeTexture —— 由6个纹理组合而成，
 * 每个纹理都是立方体的一个面。 对于CubeTexture来说，CubeReflectionMapping是其默认值。
 * EquirectangularReflectionMapping 和 EquirectangularRefractionMapping 用于等距圆柱投影的环境贴图，
 * 也被叫做经纬线映射贴图。等距圆柱投影贴图表示沿着其水平中线360°的视角，以及沿着其垂直轴向180°的视角。
 * 贴图顶部和底部的边缘分别对应于它所映射的球体的北极和南极。 
 * SphericalReflectionMapping 用球形反射贴图，例如它可以通过剪裁镜面球的照片来获得。
 *  无论摄像机相对于立方贴图对象或者表面的位置时怎样的，球形贴图被渲染时将会“面朝”摄像机。
 */
export var UVMapping = 300;
export var CubeReflectionMapping = 301;
export var CubeRefractionMapping = 302;
export var EquirectangularReflectionMapping = 303;
export var EquirectangularRefractionMapping = 304;
export var SphericalReflectionMapping = 305;
export var CubeUVReflectionMapping = 306;
export var CubeUVRefractionMapping = 307;
/**
 * 这些常量定义了纹理贴图的 wrapS 和 wrapT 属性，定义了水平和垂直方向上纹理的包裹方式。 
 * 
 * 使用RepeatWrapping，纹理将简单地重复到无穷大。 With RepeatWrapping the texture will simply repeat to infinity.
 * 
 * ClampToEdgeWrapping是默认值，纹理中的最后一个像素将延伸到网格的边缘。
 * 
 * 使用MirroredRepeatWrapping， 纹理将重复到无穷大，在每次重复时将进行镜像。
 * 
 */
export var RepeatWrapping = 1000;
export var ClampToEdgeWrapping = 1001;
export var MirroredRepeatWrapping = 1002;
/**
 * 这些常量用于纹理的magFilter属性，它们定义了当被纹理化的像素映射到小于或者等于1纹理元素（texel）的区域时，将要使用的纹理放大函数。
 * 
 * NearestFilter返回与指定纹理坐标（在曼哈顿距离之内）最接近的纹理元素的值。
 * 
 * LinearFilter是默认值，返回距离指定的纹理坐标最近的四个纹理元素的加权平均值， 并且可以包含纹理的其他部分中，
 * 被包裹或者被重复的项目，具体取决于 wrapS 和 wrapT 的值，and on the exact mapping。
 * 这些常量用于纹理的minFilter属性，它们定义了当被纹理化的像素映射到大于1纹理元素（texel）的区域时，将要使用的纹理缩小函数。
 * 
 * 除了NearestFilter 和 LinearFilter， 下面的四个函数也可以用于缩小：
 * 
 * NearestMipMapNearestFilter选择与被纹理化像素的尺寸最匹配的mipmap，
 * 并以[page:constant NearestFilter]（最靠近像素中心的纹理元素）为标准来生成纹理值。 
 * 
 * NearestMipMapLinearFilter选择与被纹理化像素的尺寸最接近的两个mipmap，
 * 并以[page:constant NearestFilter]为标准来从每个mipmap中生成纹理值。最终的纹理值是这两个值的加权平均值。 
 * 
 * LinearMipMapNearestFilter选择与被纹理化像素的尺寸最匹配的mipmap，
 * 并以[page:constant LinearFilter]（最靠近像素中心的四个纹理元素的加权平均值）为标准来生成纹理值。 
 * 
 * LinearMipMapLinearFilter是默认值，它选择与被纹理化像素的尺寸最接近的两个mipmap，
 * 并以[page:constant LinearFilter]为标准来从每个mipmap中生成纹理值。最终的纹理值是这两个值的加权平均值。
 */
export var NearestFilter = 1003;
export var NearestMipMapNearestFilter = 1004;
export var NearestMipMapLinearFilter = 1005;
export var LinearFilter = 1006;
export var LinearMipMapNearestFilter = 1007;
export var LinearMipMapLinearFilter = 1008;

export var UnsignedByteType = 1009;
export var ByteType = 1010;
export var ShortType = 1011;
export var UnsignedShortType = 1012;
export var IntType = 1013;
export var UnsignedIntType = 1014;
export var FloatType = 1015;
export var HalfFloatType = 1016;
export var UnsignedShort4444Type = 1017;
export var UnsignedShort5551Type = 1018;
export var UnsignedShort565Type = 1019;
export var UnsignedInt248Type = 1020;
export var AlphaFormat = 1021;
export var RGBFormat = 1022;
export var RGBAFormat = 1023;
export var LuminanceFormat = 1024;
export var LuminanceAlphaFormat = 1025;
export var RGBEFormat = RGBAFormat;
export var DepthFormat = 1026;
export var DepthStencilFormat = 1027;
export var RedFormat = 1028;
export var RGB_S3TC_DXT1_Format = 33776;
export var RGBA_S3TC_DXT1_Format = 33777;
export var RGBA_S3TC_DXT3_Format = 33778;
export var RGBA_S3TC_DXT5_Format = 33779;
export var RGB_PVRTC_4BPPV1_Format = 35840;
export var RGB_PVRTC_2BPPV1_Format = 35841;
export var RGBA_PVRTC_4BPPV1_Format = 35842;
export var RGBA_PVRTC_2BPPV1_Format = 35843;
export var RGB_ETC1_Format = 36196;
export var RGBA_ASTC_4x4_Format = 37808;
export var RGBA_ASTC_5x4_Format = 37809;
export var RGBA_ASTC_5x5_Format = 37810;
export var RGBA_ASTC_6x5_Format = 37811;
export var RGBA_ASTC_6x6_Format = 37812;
export var RGBA_ASTC_8x5_Format = 37813;
export var RGBA_ASTC_8x6_Format = 37814;
export var RGBA_ASTC_8x8_Format = 37815;
export var RGBA_ASTC_10x5_Format = 37816;
export var RGBA_ASTC_10x6_Format = 37817;
export var RGBA_ASTC_10x8_Format = 37818;
export var RGBA_ASTC_10x10_Format = 37819;
export var RGBA_ASTC_12x10_Format = 37820;
export var RGBA_ASTC_12x12_Format = 37821;
export var LoopOnce = 2200;
export var LoopRepeat = 2201;
export var LoopPingPong = 2202;
export var InterpolateDiscrete = 2300;
export var InterpolateLinear = 2301;
export var InterpolateSmooth = 2302;
export var ZeroCurvatureEnding = 2400;
export var ZeroSlopeEnding = 2401;
export var WrapAroundEnding = 2402;
export var TrianglesDrawMode = 0;
export var TriangleStripDrawMode = 1;
export var TriangleFanDrawMode = 2;
export var LinearEncoding = 3000;
export var sRGBEncoding = 3001;
export var GammaEncoding = 3007;
export var RGBEEncoding = 3002;
export var LogLuvEncoding = 3003;
export var RGBM7Encoding = 3004;
export var RGBM16Encoding = 3005;
export var RGBDEncoding = 3006;
export var BasicDepthPacking = 3200;
export var RGBADepthPacking = 3201;
/**
 * 切线空间
 * 物体空间
 */
export var TangentSpaceNormalMap = 0;
export var ObjectSpaceNormalMap = 1;