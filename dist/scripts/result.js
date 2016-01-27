'use strict';

$(function() {
  FastClick.attach(document.body);
});

var dp = {
  // 背景
  bg: { x: 0, y: 0, w: 640, h: 464},
  panel: { x: 79, y: 102, w: 482, h: 362},
  xiaoma2: { x: 40, y: 324, w: 87, h: 140}
};

// 绘制SVG
var draw = SVG('riddle').size(dp.bg.w, dp.bg.h).addClass('svg');
draw.viewbox({ x: dp.bg.x, y: dp.bg.y, width: dp.bg.w, height: dp.bg.h });
// 设置背景图 var bg =
draw.image('../images/riddle/bg.png', dp.bg.w, dp.bg.h);
// 设置面板 var panel =
draw.image('../images/riddle/panel-white.png', dp.panel.w, dp.panel.h).move(dp.panel.x, dp.panel.y);
// 设置左侧小马人物 var xiaoma1 =
draw.image('../images/riddle/xiaoma2.png', dp.xiaoma2.w, dp.xiaoma2.h).move(dp.xiaoma2.x, dp.xiaoma2.y);


/*document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);*/


$('.btn-share').click(function(){
  $('.modal-share').css('display', 'block');
});

$('.modal-share').click(function(){
  $('.modal-share').css('display', 'none');
});



