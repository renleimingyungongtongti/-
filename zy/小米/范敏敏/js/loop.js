//获取DOM元素
function $(className){
    return document.getElementsByClassName(className)[0]
}
let loop = $("loop"),
    ul = $("ul"),
    imgs = ul.querySelectorAll("img"),
    left = $("left"),
    right = $("right"),
    circle = $("circle"),
    list = circle.children,
    index = 0
    // console.log(list);
//克隆第一张图片
ul.appendChild(imgs[0].cloneNode(true))
ul.lastChild.width = 940
ul.lastChild.height = 420
//动画函数
function animation(ele,targetPX){
    clearInterval(ele.time)
    ele.time = setInterval(() => {
        let step = ele.offsetLeft > targetPX ? -20:20;
        let plusPX = targetPX - ele.offsetLeft;
        if(Math.abs(plusPX) > Math.abs(step)){
            ele.style.left = ele.offsetLeft + step +"px";
        }else{
            ele.style.left = targetPX +"px"
            clearInterval(ele.time)
        }
    }, 20);
}
//设置定时器
let time;
clearInterval(time);
time = setInterval(() => {
    goLeft()
}, 4000);
//小圆点初始化
let dian = 0;
list[0].className = "turn"

//左
function goLeft(){
    index++;
    if(index > imgs.length){
        index = 1
        ul.style.left =  0+"px";
    }
    animation(ul,-index*940)
    
    dian++
    if(dian >= imgs.length){
        dian = 0
    }
    for(let i in list){
        list[i].className =""
    }
    list[dian].className = "turn"
}
right.onclick = ()=>{
    goLeft()
}
//右
function goRight(){
    if(index == 0){ index = 4 }
    ul.style.left = -index*940+"px"
    index--;
    animation(ul,-index*940)

    dian--;
    if(dian < 0){
        dian = list.length-1
    }
    for(let i in list){
        list[i].className =""
    }
    list[dian].className = "turn"
}
left.onclick = ()=>{
    goRight()
}
//鼠标移入
loop.onmouseover = ()=>{
    clearInterval(time)
}
//鼠标移出
loop.onmouseleave = ()=>{
    time = setInterval(() => {
        goLeft()
    }, 4000);
}

//点击小圆点
for(let i in list){
    list[i].value = i
}
circle.addEventListener("click",(e)=>{
    for(let i in list){
        list[i].className = ""
    }
    index = dian = e.target.value;
    animation(ul,-index*940)
    list[dian].className="turn"
})