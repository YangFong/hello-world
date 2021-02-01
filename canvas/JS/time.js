let ticker;
//记录小球
const bolls=[];
//记录时间参数
let h,m,s;
let quantity=7;
let bool=null;
let w=2;
let plugging=0;

$(()=>{
    ticker= setInterval(()=>{
        empty();
        time();
        go();
        if(plugging){
            d.font="bold 30px 微软雅黑"
            d.fillText("你好，开发者",210,50);
        }
    },50);
});
$(window).keydown((i)=>{
    if(i.key==="F12"){
        plugging++;
    }
    return false;
})
$("canvas").hover((i)=>{
    const x=i.offsetX;//50浮动 300为中
    const y=i.offsetY;
    if(i.offsetX>=250&&i.offsetX<=350||i.offsetY>=250&&i.offsetY<=350){
        w=10;
    }
},()=>{
    w=2;
});
const time=()=>{
    //获取本地时间
    const time=new Date();
    const h_one=time.getHours()%10;
    const h_two=(time.getHours()-h_one)/10;
    const m_one=time.getMinutes()%10;
    const m_two=(time.getMinutes()-m_one)/10;
    const s_one=time.getSeconds()%10;
    const s_two=(time.getSeconds()-s_one)/10;

    d.beginPath()
    d.fillStyle="#000";
    d.fillRect(0,0,d.canvas.width,d.canvas.height);
    d.fill();
    d.closePath();
    //改变样式
    if (time.getSeconds()!==s){
        bool=1;
        if (time.getHours()!==h){
            quantity=1
            if(parseInt(time.getHours()/10)!==parseInt(h/10)){
                quantity=0;
            }
        } else if (time.getMinutes()!==m){
            quantity=4
            if(parseInt(time.getMinutes()/10)!==parseInt(m/10)){
                quantity=3;
            }
        } else if(parseInt(time.getSeconds()/10)!==parseInt(s/10)){
            quantity=6;
        }
    }
    h=time.getHours();
    m=time.getMinutes();
    s=time.getSeconds();
    f(h_two);
    f(h_one, 1);
    f(10, 2);
    f(m_two, 3);
    f(m_one, 4);
    f(10, 5);
    f(s_two, 6);
    f(s_one, 7);
    laugh();
    rainbow();
};

const f=(a,i=0,j=1)=>{
    for (let y=1;y<=7;y++){
        for (let x=1;x<=5;x++){
            if(digit[a][y-1][x-1]){
                if(i>=quantity&&bool&&a!==10){
                    bolls.push([10*x+75*i+8,10*y+70*j,Math.random()*3-2,Math.random()*10,Math.random()*3,Math.random()*-1,`hsl(${Math.random()*360},100%,50%)`]);
                }
                d.beginPath();
                d.arc(10*x+75*i+8,10*y+70*j,4,0,360*p,);
                d.fillStyle="#0af112"
                d.fill();
            }
        }
    }
    if(i===7){
        bool=0;
        quantity=7;
    }
}
const laugh=()=>{
    d.strokeStyle="#4CC9F0";
    d.fillStyle="#4CC9F0";
    d.lineWidth=w;
    d.beginPath();
    d.arc(300,300,50,0,p*360);
    d.stroke();
    d.beginPath();
    d.arc(275,280,5,0,p*360);
    d.fill();
    d.beginPath();
    d.arc(325,280,5,0,p*360);
    d.fill();
    d.beginPath();
    d.arc(300,315,20,0,p*180);
    d.stroke();
}
const rainbow=()=>{
    d.lineWidth=10;
    d.beginPath();
    d.arc(0,d.canvas.height,100,0,p*360);
    d.fillStyle="#fff"
    d.fill()
    d.beginPath();
    d.arc(0,d.canvas.height,100,p*270,p*360);
    d.strokeStyle=`red`;
    d.stroke();
    d.beginPath();
    d.arc(0,d.canvas.height,110,p*270,p*360);
    d.strokeStyle=`blue`;
    d.stroke();
    d.beginPath();
    d.arc(0,d.canvas.height,120,p*270,p*360);
    d.strokeStyle=`green`;
    d.stroke();
    d.beginPath();
    d.arc(0,d.canvas.height,130,p*270,p*360);
    d.strokeStyle=`rgb(255,255,0)`;
    d.stroke();
    d.beginPath();
    d.arc(0,d.canvas.height,140,p*270,p*360);
    d.strokeStyle=`rgb(255,0,255)`;
    d.stroke();
    d.beginPath();
    d.arc(0,d.canvas.height,150,p*270,p*360);
    d.strokeStyle=`rgb(255,125,0)`;
    d.stroke();
}
const go=()=>{
    let j=0;
    $.each(bolls,(i)=>{
        if(bolls[i-j][0]<0||bolls[i-j][0]>d.canvas.width){
            bolls.splice(i,1);
            j++;
            return
        }else {
            i-=j;
        }
        const color=bolls[i][6];
        d.beginPath();
        d.fillStyle=color;
        d.arc(bolls[i][0],bolls[i][1],4,0,360*p);
        d.fill();
        bolls[i][0]+=bolls[i][2];
        bolls[i][1]+=bolls[i][3];
        bolls[i][3]+=bolls[i][4];
        if(bolls[i][1]>=d.canvas.height-4){
            bolls[i][1]=d.canvas.height-4;
            bolls[i][3]*=bolls[i][5];
        }
    });
}

