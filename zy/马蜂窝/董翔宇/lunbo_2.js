//获取样式
function getStyle(ele,attr){
    return ele.currentStyle?ele.currentStyle[attr]:getComputedStyle(ele,null)[attr];
}
//动画
function move(ele,attr,target,speed,fn){
    clearInterval(ele.timer);
    //获取元素的当前位置
    let current = parseInt(getStyle(ele,attr));
    //判断是正值还是负值
    if(current > target){
        speed = -speed;
    }
    //定时器
    ele.timer = setInterval(function(){
        //获取元素的当前位置
        let old_left = parseInt(getStyle(ele,attr));
        //元素当前位置 + 速度
        let new_left = old_left + speed;
        //比如：元素位置：0   目标：800  速度：10
        //10 < 0负值      20 < 800正值              10 > 0正值    20 > 负值    
        if((speed < 0 && new_left < target) || (speed > 0 && new_left > target)){
            new_left = target;
        }
        ele.style[attr] = new_left + 'px';
        if(new_left == target){
            clearInterval(ele.timer);
            fn && fn()
        }
    },10)
}
// 获取元素
let slideshow_1 = document.querySelector('.slideshow_1'),
dl_1 = slideshow_1.querySelector('dl'),
dt_1 = dl_1.querySelector('dt'),
img_1 = dt_1.querySelectorAll('img'),
// 底部按钮盒子
lb_btn_1 = slideshow_1.querySelector('ul'),
// 底部按钮
all_btn_1 = lb_btn_1.querySelectorAll('li');
console.log(slideshow_1,dl_1,dt_1,img_1,lb_btn_1,all_btn_1);

// 轮播图的总数量
let all_img_1 = img_1.length;
let node_1 = img_1[0].cloneNode(true);
dt_1.appendChild(node_1);
let b = 0;
let timer_1 = null;
function dsq_1(){
    timer_1 = setInterval(()=>{
        b++;
        if(b>all_img_1){
            dt_1.style.left = 0 + 'px';
            b = 1;
        }
        move(dt_1,'left',b * - 390,10);
        col();
    },2000)
}dsq_1();
// 鼠标移入
dl_1.onmouseover = ()=>{
    clearInterval(timer_1);
}
// 鼠标移除
dl_1.onmouseout = ()=>{
    clearInterval(timer_1);
    dsq_1();
}
for(let i=0;i<all_btn_1.length;i++){
    all_btn_1[i].setAttribute('num',i);
}
// 颜色
function col(){
    for(let i=0;i<all_btn_1.length;i++){
        if(b == i){
            all_btn_1[i].setAttribute('id','liang');
        }else if(b == 3){
            all_btn_1[0].setAttribute('id','liang');
            all_btn_1[2].setAttribute('id','');
        }else{
            all_btn_1[i].setAttribute('id','');
        }
    }
}
// 底部按钮
lb_btn_1.addEventListener('click',(e)=>{
    let eve = e.event || window.event;
    let now_Element = e.target || srcElement;
    b = now_Element.getAttribute('num');
    console.log(b);
    if(now_Element.tagName = 'LI'){
        move(dt_1,'left',b*-390,10);
        col();
    }
});

