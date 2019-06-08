import Hilo from 'Hilo';   //引入hilo
import Stage from './stage';   //引入舞台js

var stage = new Stage({   //实例化舞台
    renderType:'canvas',   // 渲染类型 可以是canvas || div
    container: document.getElementById('game-container'),  //父容器
    width: document.documentElement.clientWidth, //舞台宽度，这里也可以写固定值
    height: document.documentElement.clientHeight  //舞台高度，这里也可以写固定值
});