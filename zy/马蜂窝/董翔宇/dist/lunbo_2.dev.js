"use strict";

//获取样式
function getStyle(ele, attr) {
  return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
} //动画


function move(ele, attr, target, speed, fn) {
  clearInterval(ele.timer); //获取元素的当前位置

  var current = parseInt(getStyle(ele, attr)); //判断是正值还是负值

  if (current > target) {
    speed = -speed;
  } //定时器


  ele.timer = setInterval(function () {
    //获取元素的当前位置
    var old_left = parseInt(getStyle(ele, attr)); //元素当前位置 + 速度

    var new_left = old_left + speed; //比如：元素位置：0   目标：800  速度：10
    //10 < 0负值      20 < 800正值              10 > 0正值    20 > 负值    

    if (speed < 0 && new_left < target || speed > 0 && new_left > target) {
      new_left = target;
    }

    ele.style[attr] = new_left + 'px';

    if (new_left == target) {
      clearInterval(ele.timer);
      fn && fn();
    }
  }, 10);
} // 获取元素


var slideshow_1 = document.querySelector('.slideshow_1'),
    dl_1 = slideshow_1.querySelector('dl'),
    dt_1 = dl_1.querySelector('dt'),
    img_1 = dt_1.querySelectorAll('img'),
    // 底部按钮盒子
lb_btn_1 = slideshow_1.querySelector('ul'),
    // 底部按钮
all_btn_1 = lb_btn_1.querySelectorAll('li');
console.log(slideshow_1, dl_1, dt_1, img_1, lb_btn_1, all_btn_1); // 轮播图的总数量

var all_img_1 = img_1.length;
var node_1 = img_1[0].cloneNode(true);
dt_1.appendChild(node_1);
var b = 0;
var timer_1 = null;

function dsq_1() {
  timer_1 = setInterval(function () {
    b++;

    if (b > all_img_1) {
      dt_1.style.left = 0 + 'px';
      b = 1;
    }

    move(dt_1, 'left', b * -390, 10);
    col();
  }, 2000);
}

dsq_1(); // 鼠标移入

dl_1.onmouseover = function () {
  clearInterval(timer_1);
}; // 鼠标移除


dl_1.onmouseout = function () {
  clearInterval(timer_1);
  dsq_1();
};

for (var i = 0; i < all_btn_1.length; i++) {
  all_btn_1[i].setAttribute('num', i);
} // 颜色


function col() {
  for (var _i = 0; _i < all_btn_1.length; _i++) {
    if (b == _i) {
      all_btn_1[_i].setAttribute('id', 'liang');
    } else if (b == 3) {
      all_btn_1[0].setAttribute('id', 'liang');
      all_btn_1[2].setAttribute('id', '');
    } else {
      all_btn_1[_i].setAttribute('id', '');
    }
  }
} // 底部按钮


lb_btn_1.addEventListener('click', function (e) {
  var eve = e.event || window.event;
  var now_Element = e.target || srcElement;
  b = now_Element.getAttribute('num');
  console.log(b);

  if (now_Element.tagName = 'LI') {
    move(dt_1, 'left', b * -390, 10);
    col();
  }
});