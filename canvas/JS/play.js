/*
 * @Author: your name
 * @Date: 2020-12-13 19:28:00
 * @LastEditTime: 2020-12-21 23:06:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \canvas\JS\play.js
 */

//初始化
$("canvas").attr("width",600).attr("height",600);
const canvas=document.querySelector("canvas");
const d=canvas.getContext("2d");
const p=Math.PI/180;
//清空画布
const empty=()=>d.clearRect(0,0,d.canvas.width,d.canvas.height);

let delay=100;
//记录下子次数
let c=1;
//确定当前游戏是否结束
let over=0;
//记录悔棋数据
let regret=[];
//记录棋盘已下子位置
const chess=[];
//统计所有赢法
let wins=0;
const winWay=[];
//黑棋赢法数组
const blackWin=[];
//白棋赢法数组
const whiteWin=[];
//初始化
for (let i=0;i<15;i++){
    winWay[i]=[];
    chess[i]=[];
    for (let j=0;j<15;j++){
        winWay[i][j]=[];
        chess[i][j]=[];
    }
}
//竖轴
for (let y=0;y<15;y++){
    for (let x=0;x<11;x++){
        for (let k=0;k<5;k++){
            winWay[y][x+k][wins]=1;
            chess[y][x+k]=0;
        }
        wins++;
    }
}
//横轴
for (let y=0;y<15;y++){
    for (let x=0;x<11;x++){
        for (let k=0;k<5;k++){
            winWay[x+k][y][wins]=1;
        }
        wins++;
    }
}
for (let y=0;y<11;y++){
    for (let x=0;x<11;x++){
        for (let k=0;k<5;k++){
            winWay[y+k][x+k][wins]=1;
        }
        wins++;
    }
}
for (let y=14;y>3;y--){
    for (let x=10;x>=0;x--){
        for (let k=0;k<5;k++){
            winWay[y-k][x+k][wins]=1;
        }
        wins++;
    }
}
//统计数组初始
for (let i=0;i<wins;i++){
    blackWin[i]=0;
    whiteWin[i]=0;
}
//绘制棋盘
const chessboard=()=>{
    d.lineWidth=2;
    d.lineCap="round";
    d.strokeStyle="#000";
    d.beginPath();
    for(let i=0;i<15;i++){
        d.moveTo(40*i+20,20);
        d.lineTo(40*i+20,580);
        d.moveTo(20,40*i+20);
        d.lineTo(580,40*i+20);
    }
    d.stroke();
    spot(300,300);
    spot(140,140);
    spot(460,460);
    spot(460,140);
    spot(140,460);
}
//绘画小黑点方法
const spot=(x,y)=>{
    d.beginPath();
    d.fillStyle="#000";
    d.arc(x,y,5,0,p*360);
    d.fill();
}
//上一次点击地点显示
const frame=(x,y)=>{
    if (c>=2&&$("button:eq(2)").css("display")==="block"){
        const x=regret[0];
        const y=regret[1];
        if(chess[x][y]===0)return
        d.clearRect(x*40,y*40,40,40);
        d.beginPath();
        d.lineWidth=2;
        d.strokeStyle="#000";
        //九大情况修补线条
        //Y轴为0
        if(y===0){
            //左上
            if(x===0){
                //横线修补
                d.moveTo(x*40+20,y*40+20);
                d.lineTo(x*40+40,y*40+20);
            }
            //右上
            else if(x===14){
                //横线修补
                d.moveTo(x*40,y*40+20);
                d.lineTo(x*40+20,y*40+20);
            }
            //在顶层中心
            else {
                //横线修补
                d.moveTo(x*40,y*40+20);
                d.lineTo(x*40+40,y*40+20);
            }
            //竖线修补
            d.moveTo(x*40+20,y*40+20);
            d.lineTo(x*40+20,y*40+40);
        }
        //Y轴为14
        else if(y===14){
            //左下
            if(x===0){
                //横线修补
                d.moveTo(x*40+20,y*40+20);
                d.lineTo(x*40+40,y*40+20);
            }
            //右下
            else if(x===14){
                //横线修补
                d.moveTo(x*40,y*40+20);
                d.lineTo(x*40+20,y*40+20);
            }
            //中心
            else {
                //横线修补
                d.moveTo(x*40,y*40+20);
                d.lineTo(x*40+40,y*40+20);
            }
            //竖线修补
            d.moveTo(x*40+20,y*40);
            d.lineTo(x*40+20,y*40+20);
        }else {
            if(x===0){
                //右
                //横线修补
                d.moveTo(x*40+20,y*40+20);
                d.lineTo(x*40+40,y*40+20);
                //竖线修补
                d.moveTo(x*40+20,y*40);
                d.lineTo(x*40+20,y*40+40);
            }
            else if(x===14){
                //右
                //横线修补
                d.moveTo(x*40,y*40+20);
                d.lineTo(x*40+20,y*40+20);
                //竖线修补
                d.moveTo(x*40+20,y*40);
                d.lineTo(x*40+20,y*40+40);
            }
            else{
                //十字
                //竖线修补
                d.moveTo(x*40+20,y*40);
                d.lineTo(x*40+20,y*40+40);
                //横线修补
                d.moveTo(x*40,y*40+20);
                d.lineTo(x*40+40,y*40+20);
            }
        }
        d.stroke();
        //如果处于黑点位置，则修复黑点
        if (x===7&&y===7){
            spot(300,300);
        }
        else if(x===3&&y===3){
            spot(140,140);
        }
        else if(x===11&&y===3){
            spot(460,140);
        }
        else if(x===11&&y===11){
            spot(460,460);
        }
        else if(x===3&&y===11){
            spot(140,460);
        }
        d.beginPath();
        d.arc(x*40+20,y*40+20,18,0,p*360);
        const color=d.createRadialGradient(x*40+20+4,y*40+20-4,0.1,x*40+20,y*40+20,18);
        if(c%2===0){
            color.addColorStop(0,"#636766");
            color.addColorStop(1,"#0a0a0a");
        } else{
            color.addColorStop(0,"#F9F9F9");
            color.addColorStop(1,"#D1D1D1");
        }
        d.fillStyle=color;
        d.fill();
    }
    d.beginPath();
    d.strokeStyle='red';
    d.lineWidth=2;
    d.moveTo(x*40+15+1,y*40+1);
    d.lineTo(x*40+1,y*40+1);
    d.lineTo(x*40+1,y*40+15+1);
    d.moveTo(x*40+25-1,y*40+1);
    d.lineTo(x*40+40-1,y*40+1);
    d.lineTo(x*40+40-1,y*40+15+1);
    d.moveTo(x*40+1,y*40+25-1);
    d.lineTo(x*40+1,y*40+40-1);
    d.lineTo(x*40+15+1,y*40+40-1);
    d.moveTo(x*40+40-1,y*40+25-1);
    d.lineTo(x*40+40-1,y*40+40-1);
    d.lineTo(x*40+25-1,y*40+40-1);
    d.stroke();
}
const linellae=(i)=>{
    let j=0;
    d.beginPath();
    d.strokeStyle="#0ff";
    d.lineWidth=4;
    for (let y=0;y<15;y++){
        for (let x=0;x<15;x++){
            if(winWay[x][y][i]&&j===0){
                d.moveTo(x*40+20,y*40+20);
                j++;
            }
            else if(winWay[x][y][i]&&j===1){
                d.lineTo(x*40+20,y*40+20);
                j++;
            }
            else if(winWay[x][y][i]&&j===2){
                d.lineTo(x*40+20,y*40+20);
                j++;
            }
            else if(winWay[x][y][i]&&j===3){
                d.lineTo(x*40+20,y*40+20);
                j++;
            }
            else if(winWay[x][y][i]&&j===4){
                d.lineTo(x*40+20,y*40+20);
            }
        }
    }
    d.stroke();
}
//触发方法
$("canvas").click((a)=>{
    const x=Math.floor(a.offsetX/40);
    const y=Math.floor(a.offsetY/40);
    if(chess[x][y]!==0||!shift){
        return
    }
    frame(x,y);
    regret=[x,y];
    d.beginPath();
    d.arc(x*40+20,y*40+20,18,0,p*360);
    const color=d.createRadialGradient(x*40+20+4,y*40+20-4,0.1,x*40+20,y*40+20,18);
    if(c%2===0){
        color.addColorStop(0,"#F9F9F9");
        color.addColorStop(1,"#D1D1D1");
        chess[x][y]=2;
    }
    else{
        color.addColorStop(0,"#636766");
        color.addColorStop(1,"#0a0a0a");
        chess[x][y]=1;
    }
    d.fillStyle=color;
    d.fill();
    for (let i=0;i<wins;i++){
        if(winWay[x][y][i]&&c%2===0){
            whiteWin[i]++;
            blackWin[i]=6;
            regret.push(i);
            if(whiteWin[i]===5){
                $("canvas").off();
                setTimeout(()=>{
                    alert("白棋胜");
                },100);
                over=1;
                linellae(i);
                break;
            }
        } else if(winWay[x][y][i]){
            blackWin[i]++;
            whiteWin[i]=6;
            regret.push(i);
            if(blackWin[i]===5){
                $("canvas").off();
                setTimeout(()=>{
                    alert("黑棋胜");
                },100);
                over=1;
                linellae(i);
                break;
            }
        }
    }
    $("button:eq(2)").slideDown(500);
    c++;
    if(!over){
        setTimeout(computer,delay);
    }
});

const computer=()=>{
    if(shift!==2){
        return;
    }
    delay+=100;
    let a=[];
    let b=[];
    let max=0;
    //如果让先，则下中间
    let v=7;
    let z=7;
    for (let i=0;i<15;i++){
        a[i]=[];
        b[i]=[];
        for (let j=0;j<15;j++){
            a[i][j]=0;
            b[i][j]=0;
        }
    }
    for (let i=0;i<15;i++){
        for (let j=0;j<15;j++){
            if(chess[i][j]===0){
                for (let k=0;k<wins;k++){
                    if(winWay[i][j][k]){
                        if (blackWin[k]===1){
                            a[i][j]+=100;
                        } if (blackWin[k]===2){
                            a[i][j]+=300;
                        } if (blackWin[k]===3){
                            a[i][j]+=1000;
                        } if (blackWin[k]===4){
                            a[i][j]+=10000;
                        }
                        if (whiteWin[i]===1){
                            b[i][j]+=100;
                        } if (whiteWin[k]===2){
                            b[i][j]+=300;
                        } if (whiteWin[k]===3){
                            b[i][j]+=1000;
                        } if (whiteWin[k]===4){
                            b[i][j]+=10000;
                        }
                    }
                }
                if(a[i][j]>max){
                    max=a[i][j];
                    v=i;
                    z=j;
                }
                if(b[i][j]>max){
                    max=b[i][j];
                    v=i;
                    z=j;
                }
            }
        }
    }
    const x=v;
    const y=z;
    frame(x,y);
    regret=[x,y];
    if(chess[x][y]!==0){
        return
    }
    d.beginPath();
    d.arc(x*40+20,y*40+20,18,0,p*360);
    const color=d.createRadialGradient(x*40+20+4,y*40+20-4,0.1,x*40+20,y*40+20,18);
    if(c%2===0){
        color.addColorStop(0,"#F9F9F9");
        color.addColorStop(1,"#D1D1D1");
        chess[x][y]=2;
    } else{
        color.addColorStop(0,"#636766");
        color.addColorStop(1,"#0a0a0a");
        chess[x][y]=1;
    }
    d.fillStyle=color;
    d.fill();
    for (let i=0;i<wins;i++){
        if(winWay[x][y][i]&&c%2===0){
            whiteWin[i]++;
            blackWin[i]=6;
            if(whiteWin[i]===5){
                $("canvas").off();
                setTimeout(()=>{
                    alert("白棋胜");
                },100);
                over=1;
                linellae(i);
                break;
            }
        } else if(winWay[x][y][i]){
            blackWin[i]++;
            whiteWin[i]=6;
            if(blackWin[i]===5){
                $("canvas").off();
                setTimeout(()=>{
                    alert("黑棋胜");
                },100);
                over=1;
                linellae(i);
                break;
            }
        }
    }
    c++;
    //只有在未下子前可使用
    $("button:eq(4)").slideUp(500);
};

//模式选择
let shift=null;
//双人
$("button:eq(0)").click(()=>{
    $("canvas").css(`transform`,`rotateY(90deg)`);
    setTimeout(()=>{
        $("canvas").removeAttr("style");
        clearInterval(ticker);
        empty();
        chessboard();
    },1000);
    $("button").slideToggle(500);
    $("button:eq(4)").slideUp();
    shift=1;
});
//人机
$("button:eq(1)").click(()=>{
    $("canvas").css(`transform`,`rotateY(90deg)`);
    setTimeout(()=>{
        $("canvas").removeAttr("style");
        clearInterval(ticker);
        empty();
        chessboard();
    },1000);
    $("button").slideToggle(500);
    shift=2;
});
//悔棋按钮
$("button:eq(2)").click(()=>{
    //如果已经结束则拦截
    if(over || c===1 ||shift===2)return;
    $("button:eq(2)").slideUp(500);
    const x=regret[0];
    const y=regret[1];
    d.clearRect(x*40,y*40,40,40);
    d.beginPath();
    d.lineWidth=2;
    d.strokeStyle="#000";
    //九大情况修补线条
    //Y轴为0
    if(y===0){
        //左上
        if(x===0){
            //横线修补
            d.moveTo(x*40+20,y*40+20);
            d.lineTo(x*40+40,y*40+20);
        }
        //右上
        else if(x===14){
            //横线修补
            d.moveTo(x*40,y*40+20);
            d.lineTo(x*40+20,y*40+20);
        }
        //在顶层中心
        else {
            //横线修补
            d.moveTo(x*40,y*40+20);
            d.lineTo(x*40+40,y*40+20);
        }
        //竖线修补
        d.moveTo(x*40+20,y*40+20);
        d.lineTo(x*40+20,y*40+40);
    }
    //Y轴为14
    else if(y===14){
        //左下
        if(x===0){
            //横线修补
            d.moveTo(x*40+20,y*40+20);
            d.lineTo(x*40+40,y*40+20);
        }
        //右下
        else if(x===14){
            //横线修补
            d.moveTo(x*40,y*40+20);
            d.lineTo(x*40+20,y*40+20);
        }
        //中心
        else {
            //横线修补
            d.moveTo(x*40,y*40+20);
            d.lineTo(x*40+40,y*40+20);
        }
        //竖线修补
        d.moveTo(x*40+20,y*40);
        d.lineTo(x*40+20,y*40+20);
    }else {
        if(x===0){
            //右
            //横线修补
            d.moveTo(x*40+20,y*40+20);
            d.lineTo(x*40+40,y*40+20);
            //竖线修补
            d.moveTo(x*40+20,y*40);
            d.lineTo(x*40+20,y*40+40);
        }
        else if(x===14){
            //右
            //横线修补
            d.moveTo(x*40,y*40+20);
            d.lineTo(x*40+20,y*40+20);
            //竖线修补
            d.moveTo(x*40+20,y*40);
            d.lineTo(x*40+20,y*40+40);
        }
        else{
            //十字
            //竖线修补
            d.moveTo(x*40+20,y*40);
            d.lineTo(x*40+20,y*40+40);
            //横线修补
            d.moveTo(x*40,y*40+20);
            d.lineTo(x*40+40,y*40+20);
        }
    }
    d.stroke();
    //如果处于黑点位置，则修复黑点
    if (x===7&&y===7){
        spot(300,300);
    }
    else if(x===3&&y===3){
        spot(140,140);
    }
    else if(x===11&&y===3){
        spot(460,140);
    }
    else if(x===11&&y===11){
        spot(460,460);
    }
    else if(x===3&&y===11){
        spot(140,460);
    }
    chess[x][y]=0;
    //将胜利数组进行删减
    for (let i=2;i<regret.length;i++){
        if (c%2===0){
            blackWin[regret[i]]--;
        }else {
            whiteWin[regret[i]]--;
        }
    }
    c--;
});
//回溯按钮
$("button:eq(3)").click(()=>{
    if(over||$("button:eq(2)").css("display")==="block")return
    const x=regret[0];
    const y=regret[1];
    frame(x,y);
    d.beginPath();
    d.arc(x*40+20,y*40+20,18,0,p*360);
    const color=d.createRadialGradient(x*40+20+4,y*40+20-4,0.1,x*40+20,y*40+20,18);
    if(c%2===0){
        color.addColorStop(0,"#F9F9F9");
        color.addColorStop(1,"#D1D1D1");
        chess[x][y]=2;
    } else{
        color.addColorStop(0,"#636766");
        color.addColorStop(1,"#0a0a0a");
        chess[x][y]=1;
    }
    d.fillStyle=color;
    d.fill();
    //将胜利数组回增
    for (let i=2;i<regret.length;i++){
        if (c%2===0){
            whiteWin[regret[i]]++;
        }else {
            blackWin[regret[i]]++;
        }
    }
    c++;
    $("button:eq(2)").slideDown(500);
});
//让先按钮
$("button:eq(4)").click(()=>{
    computer();
    $("button:eq(4)").slideUp(500);
});
$("input").click(()=>{
    if(!$("input").attr('checked')){
        $("body").css("backgroundColor","#031628");
        $("label").css({backgroundColor: "#fff",color:"#031628"});
        $("svg").attr("fill","#fff");
        $("input").attr('checked',"checked");
    }else{
        $("body").css("backgroundColor","#fff");
        $("label").css({backgroundColor: "#031628",color:"#fff"});
        $("svg").attr("fill","#031628");
        $("input").removeAttr('checked');
    }
});
//根据时间修改背景色
$(()=>{
    const time=new Date();
    const h=time.getHours();
    if(h>=18||h<6){
        $("body").css("backgroundColor","#031628");
        $("label").css({backgroundColor: "#fff",color:"#031628"});
        $("input").attr('checked',"checked");
        $("svg").attr("fill","#fff");
    }
});
$("label").hover(()=>{
    $("label").css('transform','translate(0)')
},()=>{
    $("label").css('transform','translate(-120px)')
});
$(()=>{
    console.error("我可能是一个假报错>.<")
    console.log("%c继续远航！去他丫的BUG","color:red");
    console.log("留言于2020/12/19");
})

