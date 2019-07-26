let matrix = [16];

function queToMatrix(x, y, z, w) {
    matrix[0] = 1 - 2 * (y * y + y * y);
    matrix[1] = 2 * (x * y + w * z);
    matrix[2] = 2 * (x * z - z * y);
    matrix[3] = 0;
    matrix[4] = 2 * (x * y - w * z);
    matrix[5] = 1 - 2 * (x * x + z * z);
    matrix[6] = 2 * (w * x + y * z);
    matrix[7] = 0;
    matrix[8] = 2 * (y * w + x * z);
    matrix[9] = 2 * (y * z - w * x);
    matrix[10] = 1 - 2 * (x * x + y * y);
    matrix[11] = 0;
    matrix[12] = 0;
    matrix[13] = 0;
    matrix[14] = 0;
    matrix[15] = 1;
    return matrix;
}

function Matrixcheng(ae, be) {
    let te = [16];
    var a11 = ae[0],
        a12 = ae[4],
        a13 = ae[8],
        a14 = ae[12];
    var a21 = ae[1],
        a22 = ae[5],
        a23 = ae[9],
        a24 = ae[13];
    var a31 = ae[2],
        a32 = ae[6],
        a33 = ae[10],
        a34 = ae[14];
    var a41 = ae[3],
        a42 = ae[7],
        a43 = ae[11],
        a44 = ae[15];

    var b11 = be[0],
        b12 = be[4],
        b13 = be[8],
        b14 = be[12];
    var b21 = be[1],
        b22 = be[5],
        b23 = be[9],
        b24 = be[13];
    var b31 = be[2],
        b32 = be[6],
        b33 = be[10],
        b34 = be[14];
    var b41 = be[3],
        b42 = be[7],
        b43 = be[11],
        b44 = be[15];

    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    return te;
}

function matrixToLaTeX(m) {
    let str=`$$
    M=\\begin{Bmatrix}
    ${m[0]}  &  ${m[4]}  &  ${m[8]}   &  ${m[12]} \\\\
    ${m[1]}  &  ${m[5]}  &  ${m[9]}   &  ${m[13]} \\\\
    ${m[2]}  &  ${m[6]}  &  ${m[10]}  &  ${m[14]} \\\\
    ${m[3]}  &  ${m[7]}  &  ${m[11]}  &  ${m[15]} \\\\
    \\end{Bmatrix} \\\\ \\tag{附加信息}
    $$`
    return str
    
}