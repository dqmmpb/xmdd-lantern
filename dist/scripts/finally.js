'use strict';

$(function() {
  FastClick.attach(document.body);
});

var dp = {
  // 背景
  bg: { x: 0, y: 0, w: 640, h: 744}
};

// 绘制SVG
var draw = SVG('riddle').size(dp.bg.w, dp.bg.h).addClass('svg');
draw.viewbox({ x: dp.bg.x, y: dp.bg.y, width: dp.bg.w, height: dp.bg.h });
// 设置背景图 var bg =
draw.image('../images/finally/finally.png', dp.bg.w, dp.bg.h);




