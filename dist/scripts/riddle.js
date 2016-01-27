'use strict';

$(function() {
  FastClick.attach(document.body);
});

var dp = {
  // 背景
  bg: { x: 0, y: 0, w: 640, h: 464},
  panel: { x: 79, y: 102, w: 482, h: 362},
  xiaoma1: { x: 470, y: 335, w: 158, h: 127}
};

// 绘制SVG
var draw = SVG('riddle').size(dp.bg.w, dp.bg.h).addClass('svg');
draw.viewbox({ x: dp.bg.x, y: dp.bg.y, width: dp.bg.w, height: dp.bg.h });
// 设置背景图 var bg =
draw.image('../images/riddle/bg.png', dp.bg.w, dp.bg.h);
// 设置面板 var panel =
draw.image('../images/riddle/panel-buff.png', dp.panel.w, dp.panel.h).move(dp.panel.x, dp.panel.y);
// 设置左侧小马人物 var xiaoma1 =
draw.image('../images/riddle/xiaoma1.png', dp.xiaoma1.w, dp.xiaoma1.h).move(dp.xiaoma1.x, dp.xiaoma1.y);


/*document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);*/

$('input[name="answer-radio"]').click(function(event) {
  var target = event.currentTarget;
  console.log(target);
  $('input[name="answer-radio"]').not(this).parent().removeClass('checked');
  $(this).parent().addClass('checked');
});


$('.btn-abord').click(function(){
  $('.modal-alert').css('display', 'block');
});

$('.modal-alert .modal-close').click(function(){
  $('.modal-alert').css('display', 'none');
});



