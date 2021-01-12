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
} //获取元素


var slideshow = document.querySelector('.slideshow'),
    dl = slideshow.querySelector('dl'),
    dt = dl.querySelector('dt'),
    img = dt.querySelectorAll('img'),
    // 底部按钮盒子
lb_btn = dl.querySelector('ul'),
    // 底部按钮
all_btn = lb_btn.querySelectorAll('li'); // 轮播图的总数量

var all_img = img.length;
var node = img[0].cloneNode(true);
dt.appendChild(node);
var a = 0;
var timer = null;

function dsq() {
  timer = setInterval(function () {
    a++;

    if (a > all_img) {
      dt.style.left = 0 + 'px';
      a = 1;
    }

    move(dt, 'left', a * -390, 10);
    colo();
  }, 2000);
}

dsq(); // 鼠标悬浮其上

dl.onmouseover = function () {
  clearInterval(timer);
}; // 鼠标离开


dl.onmouseout = function () {
  clearInterval(timer);
  dsq();
};

for (var i = 0; i < all_btn.length; i++) {
  all_btn[i].setAttribute('num', i);
} //颜色


function colo() {
  for (var _i = 0; _i < all_btn.length; _i++) {
    if (_i == a) {
      all_btn[_i].setAttribute('id', 'liang');
    } else if (a == 5) {
      all_btn[0].setAttribute('id', 'liang');
      all_btn[4].setAttribute('id', '');
    } else {
      all_btn[_i].setAttribute('id', '');
    }
  }
} // 底部按钮


lb_btn.addEventListener('click', function (e) {
  var eve = e.event || window.event;
  var now_Element = e.target || srcElement;
  a = now_Element.getAttribute('num');
  console.log(a);

  if (now_Element.tagName = 'LI') {
    move(dt, 'left', a * -390, 10);
    colo();
  }
});