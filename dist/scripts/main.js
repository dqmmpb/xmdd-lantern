'use strict';

$(function() {
  FastClick.attach(document.body);
});

var defaultColor = 'rgba(0,0,0,0.2)';
var dp = {
  // 背景
  bg: { x: 0, y: 0, w: 640, h: 722 },
  // 月亮
  moon: { x: 412, y: 0, w: 228, h: 128 },
  // 梅花
  tree: { x: 0, y: 0, w: 341, h: 119 },
  // 灯的大小
  ls: { x: 0, y: 0, w: 138, h: 172 },
  // 线 from:初始位置 to:结束位置 during:动画时间
  lines: [
    {
      from: 'M36.000,-45.000 C36.000,-45.000 198.075,126.097 341.000,97.000 C506.390,63.330 590.000,-29.000 590.000,-29.000 ',
      to: 'M30.000,-41.000 C30.000,-41.000 205.179,113.114 360.000,97.000 C479.429,84.570 595.000,-29.000 595.000,-29.000 ',
      during: 2000,
      color: defaultColor
    },
    {
      from: 'M-52.000,17.000 C-52.000,17.000 31.117,180.149 191.000,233.000 C191.000,233.000 314.408,280.639 403.000,225.000 C491.592,169.361 663.000,173.000 663.000,173.000 ',
      to: 'M-52.000,28.000 C-52.000,28.000 44.496,187.136 228.000,244.000 C228.000,244.000 313.581,269.025 419.000,222.000 C545.755,165.458 680.000,174.000 680.000,174.000 ',
      during: 3000,
      color: defaultColor
    },
    {
      from: 'M-16.094,294.000 C-16.094,294.000 171.776,394.946 321.000,393.000 C456.324,391.235 448.381,330.704 626.805,324.627 C805.230,318.551 779.781,331.249 779.781,331.249 ',
      to: 'M-4.000,300.000 C-4.000,300.000 221.367,394.000 346.000,394.000 C468.093,394.000 464.381,330.704 642.805,324.627 C821.230,318.551 795.781,331.249 795.781,331.249 ',
      during: 2500,
      color: defaultColor
    }
  ],
  // 灯 t:类型, l:所在线, x:x位移, y: y位移, dur: 闪烁, del: 闪烁延时, a: 摆动幅度, ex: 摆动后x位移, ey: 摆动后y位移
  lms: [
    { t: 1, l: 0, x: 88, y: 46, dur: 1800, del: 0, a: 5, ex: 92, ey: 44},
    { t: 2, l: 0, x: 235, y: 95, dur: 1800, del: 0, a: -2, ex: 239, ey: 91},
    { t: 1, l: 0, x: 380, y: 58, dur: 1800, del: 0, a: -3, ex: 378, ey: 64},
    { t: 2, l: 1, x: 30, y: 182, dur: 1800, del: 0, a: -3, ex: 34, ey: 174},
    { t: 1, l: 1, x: 150, y: 236, dur: 1800, del: 0, a: 4, ex: 152, ey: 236},
    { t: 2, l: 1, x: 322, y: 226, dur: 1800, del: 0, a: 2, ex: 320, ey: 228},
    { t: 1, l: 1, x: 476, y: 175, dur: 1800, del: 0, a: -5, ex: 478, ey: 180},
    { t: 1, l: 2, x: 66, y: 352, dur: 1800, del: 0, a: -4, ex: 70, ey: 346},
    { t: 2, l: 2, x: 230, y: 387, dur: 1800, del: 0, a: 3, ex: 230, ey: 386},
    { t: 1, l: 2, x: 403, y: 349, dur: 1800, del: 0, a: -5, ex: 404, ey: 355}
  ]
};

// 绘制SVG
var draw = SVG('index').size(dp.bg.w, dp.bg.h).addClass('svg');
draw.viewbox({ x: dp.bg.x, y: dp.bg.y, width: dp.bg.w, height: dp.bg.h });
// 设置背景图 var bg =
draw.image('../images/index/bg.png', dp.bg.w, dp.bg.h);

var paths = draw.group();
for(var i = 0; i < dp.lines.length; i++) {
  var path = draw.path(dp.lines[i].from).fill('none').attr({
    stroke: dp.lines[i].color
  });
  paths.add(path);
  path.animate(dp.lines[i].during).plot(dp.lines[i].to).loop();
}

// 绘制月亮 var moon =
draw.image('../images/index/moon.png', dp.moon.width, dp.moon.height).move(dp.moon.x, dp.moon.y);

// 绘制灯笼
var lanterns = draw.group();

// 灯笼点击事件
var click = function() {
  var type = this.data('type');
  var id = this.data('id');
  this.get(1).attr({ href: '../images/index/lantern' + type + '-text.png'});
  location.href = 'riddle.html?id=' + id;
  this.get(2).stop().attr({
    opacity: 0
  });
};

// 灯笼动画效果
var lanternAnimate = function(pos) {
  var ind = lanterns.index(this);
  this.rotate(0).move(dp.lms[ind].x + (dp.lms[ind].ex - dp.lms[ind].x) * pos, dp.lms[ind].y + (dp.lms[ind].ey - dp.lms[ind].y) * pos).rotate(-dp.lms[ind].a + (dp.lms[ind].a + dp.lms[ind].a) * pos, dp.ls.w / 2, 0);
};

for(var j = 0; j < dp.lms.length; j++) {

  var lt = draw.group().data({
    type: dp.lms[j].t,
    id: j
  });
  lt.add(draw.image('../images/index/lantern' + dp.lms[j].t + '.png', dp.ls.w, dp.ls.h));
  lt.add(draw.image('../images/index/lantern' + dp.lms[j].t + '-light.png', dp.ls.w, dp.ls.h));
  lt.add(draw.image('../images/index/light.png', dp.ls.w, dp.ls.h).attr({
    opacity: 1
  }));
  lt.move(dp.lms[j].x, dp.lms[j].y).rotate(-dp.lms[j].a, dp.ls.w / 2, 0);

  lanterns.add(lt);

  // 使用线的动画周期
  lt.animate(dp.lines[dp.lms[j].l].during).during(lanternAnimate).loop(true, true);

  // 灯闪烁效果
/*  lt.get(2).animate(dp.lms[i][2], '-', dp.lms[i][3]).attr({
    opacity: 0.5
  }).loop(true,true);*/

  lt.on('click', click);

}

// 绘制梅花 var tree =
draw.image('../images/index/tree.png', dp.tree.width, dp.tree.height).move(dp.tree.x, dp.tree.y);


/*document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);*/


$('.btn-rule').click(function(){
  $('.modal-rule').css('display', 'block');
});

$('.modal-rule .modal-close').click(function(){
  $('.modal-rule').css('display', 'none');
});



$('.btn-alert').click(function(){
  $('.modal-alert').css('display', 'block');
});

$('.modal-alert .modal-close').click(function(){
  $('.modal-alert').css('display', 'none');
});
