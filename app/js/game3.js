var fapaizt=0;
function allfapai(data){
        fapaizt=1;
        $('#userfp').html('');
        $('.isReady').hide();
        for(var i=0;i<data.user.length;i++){
            var user=data['user'][i];
            var indexuser=user.index-index-(-1);
            var html='';
            if(indexuser<=0){
                indexuser=indexuser-(-6);
            }
            if(data.allcard && indexuser!=1){
                var card=data.allcard;
                html=html+'<div class="cardss cards card'+indexuser+'" style="display: none;" data="'+indexuser+'">'
                html=html+'<div class="card cardopen card'+card[user.index][0]['card']+' card'+indexuser+'1 sangong6-index1" ></div> '
                html=html+'<div class="card cardopen card'+card[user.index][1]['card']+' card'+indexuser+'2 sangong6-index2" ></div> '
                html=html+'<div class="card cardopen card'+card[user.index][2]['card']+' card'+indexuser+'3 sangong6-index3" ></div></div> '
            }
            else{
                html=html+'<div class="cardss cards card'+indexuser+'" style="display: none;" data="'+indexuser+'">'
                html=html+'<div class="card card'+indexuser+'1 sangong6-index1" ></div> '
                html=html+'<div class="card card'+indexuser+'2 sangong6-index2" ></div> '
                html=html+'<div class="card card'+indexuser+'3 sangong6-index3" ></div></div> '
            }
            $('#userfp').append(html);
        }
        $('#userfp .cards').show();
        setTimeout(function(){
        $('#userfp .sangong6-index1').show();
        fapaizt=0;
        },1000);
        setTimeout(function(){
        $('#userfp .sangong6-index2').show();
        },800);
        setTimeout(function(){
        $('#userfp .sangong6-index3').show();
        },600);
        $('.myCards').eq(0).show();
        if(data.card && !data.allcard){
            for(var i=0;i<data.card.length;i++){
                var card=data['card'][i];
                $('.card'+i+'  .back').removeClass('cardundefined').addClass('card'+card.card);
                setTimeout('showmycard('+i+')',1500);
            }
        }
        if(data.allcard){
            for(var i=0;i<data['allcard'][index].length;i++){
                var card=data['allcard'][index][i];
                $('.card'+i+'  .back').removeClass('cardundefined').addClass('card'+card.card);
                setTimeout('showmycard('+i+')',1500);
            }
        }
}
var allcardxx;
function fapaistart(data){
    allcardxx=data;
    var fp=0;
    for(i=1;i<4;i++){
            var xx={};
            xx.id=i;
            xx.card=data['card'][index][i-1];
           if(i<3){
                fapxx(xx);
           }
           $('.cardDeal .cardss .card1'+i).attr('onclick','fapxx('+JSON.stringify(xx)+')');
           if($('.cardDeal .cardss .card1'+i).is(':hidden')){
             fp=fp+1;
           }
    }
    if(fp>=3){
        operationButton(7);
    }
}

function fapxx(data){
    $('.myCards .card'+(data.id-1)+'  .back').removeClass('cardundefined').addClass('card'+data.card.card);
    $('.cardDeal .card1'+data.id).hide();
    $('.myCards .card'+(data.id-1)).show();
    $('.myCards .card'+(data.id-1)).addClass('card-flipped');
    var fp=0;
    for(j=1;j<4;j++){
        if($('.cardDeal .cardss .card1'+i).is(':hidden')){
            fp=fp+1;
        }
    }
    if(fp>=3){
        operationButton(7);
    }
}
function tanpaime(){
    var time=Math.ceil(new Date()/1000)-timewc;
    send('tanpai',{time:time});
    showtanpai();
}
function showtanpai(){
    var mp3xx='';
    operationButton(-1);
    tanpaixx({card:allcardxx['card'][index]})

    var msgxx={};
    msgxx.index=index;
    msgxx.img='/img/tdk/tdk/'+allcardxx['niu'][index]+'.png';
    showmemberBull(msgxx);
    mp3xx='point'+allcardxx['niu'][index];
    mp3play(mp3xx);
}
function showothertanpai(data){
    if(data==index){
        showtanpai();
    }
    else{
        mp3xx='point'+allcardxx['niu'][data];

        var msgxx={};
        msgxx.index=data;
        msgxx.img='/img/tdk/tdk/'+allcardxx['niu'][data]+'.png';
        showmemberBull(msgxx);

        var msgxx={};
        msgxx.user={};
        msgxx.user.index=data;
        msgxx.card=allcardxx['card'][data];
        tanpaixxother(msgxx);

        mp3play(mp3xx);
    }
}



function wanfas(){
    $('#wanfa').show()
}
function wanfass(){
	$('#wanfa').hide()
}




function tanpaixx(data){

    for(var i=0;i<data.card.length;i++){
        console.log(1111)
        console.log(data.card.length)
        var card=data['card'][i];
        $('.card0'+i+'  .back').removeClass('cardundefined').addClass('card'+card.card);
    }
   



    $('.cardDeal .card1').hide();
    $('.myCards').eq(0).hide();
    $('.myCards').eq(1).show();
    var left=['37','50','64'];
    for(var i=0;i<data.card.length;i++){
        $('.myCards  .card0'+i).animate({
                    left: left[i]+'%',
              },500)
    }
}

function tanpaixx2(data){
    for(var i=0;i<data.card.length;i++){
        var card=data['card'][i];
        $('.card0'+i+'  .back').removeClass('cardundefined').addClass('card'+card.card);
    }
    $('.cardDeal .card1').hide();
    $('.myCards').eq(0).hide();
    $('.myCards').eq(2).show();

    var left=['37','50','64'];
    for(var i=0;i<data.card.length;i++){
        $('.myCards .card0'+i).animate({
                    left: left[i]+'%',
              },500)
    }
}


function tanpaixxother(data){
    var indexuser=data.user.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    var html='<div>';
    var hz=0;
   
    for(var i=0;i<data.card.length;i++){
        var card=data['card'][2-i];
        var card2=data['card'][i];
        console.log(card)
        console.log(data)
        console.log(4-i)
        console.log(card2)
        if(i<3){
            hz=hz-(0-card2.val);
        }
        html=html+'<div class="cards card'+indexuser+' card'+indexuser+(i-(-1))+'1 sangong6-index'+(4-i)+' card-flipped"><div class="face front"></div> <div class="face back card'+indexuser+' card'+card.card+' card-flipped"></div></div>';
    }
    html=html+'</div>';
    console.log(html)
    $('.cardOver').append(html);
    $('.cardDeal .card'+indexuser).hide();
    $('.cardOver .card'+indexuser).show();
    if(hz%10==0){
        var left=['18','11','4'];
        var left1=['55','48','41'];
        var right=['0','6','12'];
    }
    else{
        var left=['18','11','4'];
        var left1=['55','48','41'];
        var right=['0','6','12'];
    }
    for(var i=0;i<data.card.length;i++){
     
        if(indexuser >4){
            $(' .cardOver .card'+indexuser+'.card'+indexuser+(i-(-1))+'1').animate({
                 left: left[i]+'%',
                
                   
              },500)
        }
       else if(indexuser ==4){
            $(' .cardOver .card'+indexuser+'.card'+indexuser+(i-(-1))+'1').animate({
                     left: left1[i]+'%',
              },500)  
        }
        else{
            $(' .cardOver .card'+indexuser+'.card'+indexuser+(i-(-1))+'1').animate({
                     right: right[i]+'%',
              },500)  
        }


     }

}
function showmycard(id){
    $('.cardDeal .card1'+(id-(-1))).hide();
    $('.myCards .card'+id).show();
    $('.myCards .card'+id).addClass('card-flipped');
}
function roomxx(data){

}
function adduser(data){
    var indexuser=data.user.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    if($('.member'+indexuser+' .quitBack').length>0){
        $('.member'+indexuser+' .quitBack').hide();
    }
    else{
        if(data.user.online=='-1'){
            var onlinezt='display:block';
        }
        else{
            var onlinezt='display:none';
        }

    if(indexuser==1){
        var actxx='onclick="send(\'zhunbei\',{})"';
    }
    else{
        var actxx='style="display:none"';
    }

    var html='<div style="z-index:82;"class="member member'+indexuser+'"  id="user'+data.user.id+'">'
     html+='<div class="zmmyctime"></div>'
         html+='<div style="background: url(\'/app/img/bull10/game-leave.png\') no-repeat center top rgba(0,0,0,0.2);z-index: 8888;background-size: 90%;position: absolute;width:100%;height:100%;'+onlinezt+'" class="onlinezt" ></div> '

     html+='<img src="/css/img/zlbjt2.png" class="background" id="user'+data.user.id+'"> '
     html+='<img src="/app/img/sangong/playerWin.png" class="background" style="display: none;"> '
     html+='<img class="avatar" style="z-index:999;margin-top:15px;"src="'+data.user.img+'"> '
     html+='<div class="title"style="z-index:999;margin-top:-1px;font-size:12px;">'+decode64(data.user.nickname)+'</div> '
     html+='<div class="score"style="font-size:16px;color:#cbd68c;background:#2c231e">'+data.user.dqjf+'</div> '
     html+='<img id="banker0 " src="/app/img/sangong/bull_banker_bg.png" class="background sangong6-banker0"> '
     html+='<img src="/app/img/sangong/bull_banker_icon.png" class="background sangong6-background"> '
     html+='<img id="bankerAnimate'+indexuser+'" class="sangong6-bankerAnimate1" src="/app/img/bull/bull_banker_animate.png"> '
     html+='<img id="bankerAnimate1'+indexuser+'" class="sangong6-bankerAnimate1" src="/app/img/bull/bull_banker_animate.png"> '
       html+='<div class="isReady">'
     html+='<img src="/css/img/zb.png" class="unready" '+actxx+'>' 
     html+='<div class="ready"  style="display:none;color:#eedc56;font-size:26px;font-weight:bold;width:60px;">准备</div></div></div>'
    
     $('#member').append(html);
     if(data.user.zt==1){
        $('.member'+indexuser+' .ready').show();
     }
    }
}
function zbuser(data){
     var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    $('.member'+indexuser+' .unready').hide();
    $('.member'+indexuser+' .ready').show();
}
function removeuser(data){
    var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    $('.member'+indexuser+' .quitBack').show();
    $('.member'+indexuser+' .ready').hide();
}

function removeuser2(data){
    var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    $('#member .member'+indexuser).remove();
}
function showmemberTimesText(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    var html='<div class="memberTimesText'+indexuser+'" style="display: block;" ><img src="'+data.img+'" style="position: absolute; width: 100%;" /></div>';
    $('#memberTimesText').append(html);
}
function showmemberTimesText2(data){
       var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    
    if(indexuser<=6){
     
    var html='<div class="memberTimesText'+indexuser+'" style="display: block;" ><img src="'+data.img+'" style="position: absolute; width: 100%;" /></div>';
}
  $('#memberTimesText2').append(html);
}

function showmemberRobText(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    var html='<div class="memberRobText'+indexuser+'" style="display: block;" ><img src="'+data.img+'" style="position: absolute; top: 0px; left: 0px; width: 30px; height: 16px;"></div>';
    $('#memberRobText').append(html);
}
function showmemberRobText2(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    var html='<div class="memberFreeRobText'+indexuser+'" style="display: block;" ><img src="'+data.img+'" style="position: absolute; width: 100%;"></div>';
    $('#memberFreeRobText').append(html);
}

function showmemberBull(data){
     var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
    var html='<div class="memberBull'+indexuser+'" style="display: block;"><img src="'+data.img+'" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"/></div>';
    $('#memberBull').append(html);
}
function clearmemberBull(){
    $('#memberBull').html('');
}
function clearmemberTimesText(){
    $('#memberTimesText').html('');
}
function clearmemberRobText(){
    $('#memberRobText').html('');
}
function clearmemberRobText2(){
    $('#memberFreeRobText').html('');
}
function qzcard(data){
    var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }

    if(data.bd){
        $('#userfp .qzcard').removeClass('qzcard');
    }
    $('#userfp .card'+indexuser).addClass('qzcard');
}
function showqz(data){
    // if($('#userfp .qzcard').length==0){
    //     $('#userfp .cardss').addClass('qzcard');
    // }
    var userindex=data['user'][data.index]-index-(-1);
    if(userindex<=0){
        userindex=userindex-(-6);
    }
  $('.sangong6-banker0').hide();
  $('.member'+userindex+' .sangong6-banker0').show();

  data.index=data.index-(-1);
  if(data.index>=data.user.length){
    data.index=0;
  }
  ji=setTimeout('showqz('+JSON.stringify(data)+')',4000/(data.user.length*4));
}

// 抢庄结束动画
function sss(data){
    var indexuser=data-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }

    clearTimeout(ji);
  $('.sangong6-banker0').hide();

 $("#bankerAnimate"+indexuser).show(),
            $("#bankerAnimate"+indexuser).show(),
            $("#bankerAnimate1"+indexuser).animate({
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%"
            },
            400,
            function() {
                $("#bankerAnimate1"+indexuser).animate({
                    top: "10%",
                    left: "10%",
                    width: "80%",
                    height: "80%"
                },
                400,
                function() {
                  $('.member'+indexuser+' .sangong6-background').hide();
                  $('.member'+indexuser+' .sangong6-background').show();
                    
                })
            }),
            $("#bankerAnimate"+indexuser).animate({
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%"
            },400),
                $("#bankerAnimate"+indexuser).animate({
                    top: "10%",
                    left: "10%",
                    width: "80%",
                    height: "80%"
              },400)

        }


      
 function jibi(data){
            if(data.win.index!=data.bank.index && data.zt!=1){
                if(data.fx==1){
                    var kstime=1000;
                }
                else{
                    var kstime=1000+200*8+1000;
                }
                data.zt=1;
                setTimeout('jibi('+JSON.stringify(data)+')',kstime);
                return false;
            }
            if(data.win.index==data.bank.index && data.zt!=1){
                var kstime=1000;
                data.zt=1;
                setTimeout('jibi('+JSON.stringify(data)+')',kstime);
                return false;
            }
            mp3play('mp3gold');
            var win=data.win.index-index-(-1);
        var lose=data.lose.index-index-(-1);
        if(win<=0){
            win=win-(-6);
        }
        if(lose<=0){
            lose=lose-(-6);
        }   
  if (window.innerHeight)
winHeight = window.innerHeight,
winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientHeight))
winHeight = document.body.clientHeight,
winWidth = document.body.clientWidth;

// 金币宽
var jinbiWidth = 7.5,
    loseTop = parseInt($('.member'+lose).offset().top),
    loseHg  = parseInt($('.member'+lose).css('height'))/2,
    loseRg  = parseInt($('.member'+lose).css('right')),
    loseLf  = parseInt($('.member'+lose).offset().left),
    loseWt  = parseInt($('.member'+lose).width()),
    loseMl  = parseInt($('.member'+lose).css('margin-left')),
    winTop = parseInt($('.member'+win).offset().top),
    winHg  = parseInt($('.member'+win).css('height'))/2,
    winRg  = parseInt($('.member'+win).css('right')),
    winLf  = parseInt($('.member'+win).offset().left),
    winWt  = parseInt($('.member'+win).width()),
    winMl  = parseInt($('.member'+win).css('margin-left'))

  var top  =loseTop-jinbiWidth+loseHg+'px';
  if(lose<=5 && lose>1){
    var right =loseRg+jinbiWidth-loseWt/2;
    var left=parseInt(winWidth)-right-loseWt+'px';
  }
  else if(lose==1 || lose==4){
    var left =loseLf-jinbiWidth+loseMl+loseWt/2+'px';
  }
  else{
    var left =loseLf-jinbiWidth+loseWt/2+'px';
  }
  if(win==1){
    var ytop  =winTop-jinbiWidth+winHg+'px';
  }
  else{
    var ytop  =winTop-jinbiWidth+winHg+'px';
  }
  if(win<=3 && win>1){
    var yright =winRg+jinbiWidth-winWt/2;
    var yleft=parseInt(winWidth)-yright-winWt+'px';
  }
  else if(win==1 || win==4){
    //var yleft =winLf-jinbiWidth+winMl+winWt/2+'px';
      var yleft =winLf-jinbiWidth+winWt/2+'px';
  }
  else{
    var yleft =winLf-jinbiWidth+winWt/2+'px';
  }


  for(var i=0;i<8;i++){
     var html='<div class="memberCoin member'+win+lose+'"  ><img src="/app/img/bull9/bull_coin.png" class="liurenniuniu-memberCoin" /></div>'
     $('#jinbi').append(html);
     $('.member'+win+lose).eq(i).css('top',top);
     $('.member'+win+lose).eq(i).css('left',left);
     $('.member'+win+lose).eq(i).animate({
       top:ytop,
       left:yleft
    },0+i*250); 
}
   setTimeout('jibiover('+win+lose+')',2500);
}





function jibiover(data){
    $('#jinbi .member'+data).remove();
    clearmemberBull();
}


function jibichange(data){
    for(var i=0;i<data.length;i++){
        var jifenxx=data[i];
        var userindex=jifenxx.index-index-(-1);
        if(userindex<=0){
            userindex=userindex-(-6);
        }
        var html='<div class="memberScoreText'+userindex+'" data-dqjf="'+jifenxx.dqjf+'" data-index="'+userindex+'"></div>';
        $('#memberScoreText1').append(html);   
    }
    setTimeout('jibiover2()',3000);
}
function jibiover2(){
    clearmemberBull();
    clearmemberTimesText();
    $('#memberScoreText1 div').each(function(){
        var userindex=$(this).attr('data-index');
        var dqjf=parseInt($(this).attr('data-dqjf'));
        var lsjf=parseInt($('#member .member'+userindex+' .score').html());
        $('#member .member'+userindex+' .score').html(dqjf);
        if(dqjf-lsjf>0){
            $(this).html('<label class="sangong6-memberScoreText2"  style="display: block;">+'+(dqjf-lsjf)+'</label>');
        }
        else{
            $(this).html('<label class="sangong6-memberScoreText1"  style="display: block;">'+(dqjf-lsjf)+'</label>');
        }
    })
    $('.cardDeal').html('');
    $('.cardOver').html('');
    $('.myCards').hide();
    $('.myCards').eq(0).html(' <div class="cards3D"><div class="cards card0" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card1" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card2" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> </div>')
    $('.myCards').eq(1).html('<div class="cards card00" style="left: 34%;" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card01" style="left: 40%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card02" style="left: 46%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div>');
    $('.myCards').eq(2).html('<div class="cards card00" style="left: 33%;" ><div class="face back  cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card01" style="left: 42%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card02" style="left: 51%;"><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div>');
    $('#memberScoreText1').show();
}



function initroom(){
    $('.sangong6-background').hide()
    $('.cardDeal').html('');
    $('.cardOver').html('');
    $('#bankerAnimate1').hide();
    $('#bankerAnimate2').hide();
    $('#bankerAnimate3').hide();
    $('#bankerAnimate4').hide();
    $('#bankerAnimate5').hide();
    $('#bankerAnimate6').hide();
    $('.myCards').hide();
    $('.myCards').eq(0).html(' <div class="cards3D"><div class="cards card0" style="display: none; transition: left 1s;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card1" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> <div class="cards card2" style="display: none;"><div class="face front"></div> <div class="face back cardundefined"></div></div> </div>')
    $('.myCards').eq(1).html('<div class="cards card00" ><div class="face back  cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card01" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card02" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div>');
    $('.myCards').eq(2).html('<div class="cards card00"  ><div class="face back  cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card01" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div> <div class="cards card02" ><div class="face back cardundefined" style="transform:rotateY(0deg);-ms-transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-o-transform:rotateY(0deg);"></div></div>');
    
    
    $('#memberScoreText1').html('');
    $('#memberScoreText1').hide();
    $('.liurenniuniu-background').hide();
    $('.liurenniuniu-banker0').hide();
    $('.liurenniuniu-bankerAnimate1').hide();
    clearmemberBull();
    clearmemberTimesText();
    clearmemberRobText();
    $('.isReady').show();
    $('.ready').hide();
    $('.member1 .unready').show();


     var script=document.createElement("script");  
    script.type="text/javascript";  
    script.src="/app/js/robat.js";  
    document.getElementsByTagName('head')[0].appendChild(script);
}
function xianxz(zt){
    var time=Math.ceil(new Date()/1000)-timewc;
    send('xianxz',{bs:zt,time:time});
    showxian({index:index,zt:zt});
    operationButton('-1');
}
function showxian(data){
    var msgxx={};
    var mp3xx='';
    if(data.index==index){
        operationButton('-1');
    }
    msgxx.index=data.index;
    msgxx.img='/img/tdk/tdk/X-'+data.zt+'.png';
    showmemberTimesText(msgxx);
    mp3xx='xia'+data.zt;
    mp3play(mp3xx);
}
function qbank(zt,type){
    if(fapaizt==1){
        return false;
    }
    var time=Math.ceil(new Date()/1000)-timewc;
    send('qbank',{zt:zt,time:time,type:type});
    qbankshow({zt:zt,type:type})
}
function qbankshow(data){
    var html='';
    var bankwz='';
    var mp3xx='';
    if(data.type==1){
        bankwz='go';
    }
    else{
        bankwz='rob';
    }
    if(data.zt){
        if(data.type==4){
            html+='<div id="jiurenniuniu-qiangzhuangs" class="jiurenniuniu-qiangzhuangs" style="display: block">'
            html+='<img class="jiurenniuniu-qiangzhuangs-img" src="/img/tdk/tdk/bull_text_'+bankwz+'.png">'
            html+='</div><div id="jiurenniuniu-qiangzhuangs" class="jiurenniuniu-qiangzhuangs" style="display: block;width: 22px;left: 65px;height: 22px;top: 24px;">'
            html+='<img class="jiurenniuniu-qiangzhuangs-img" src="/img/tdk/tdk/X-'+data.zt+'.png"></div>'
        }
        else{
            html+='<div id="jiurenniuniu-qiangzhuangs" class="jiurenniuniu-qiangzhuangs" style="display: block;">'
            html+='<img class="jiurenniuniu-qiangzhuangs-img" src="/img/tdk/tdk/bull_text_'+bankwz+'.png"></div>'
        }
        mp3xx='qiangzhuang';
    }
    else{
        html+='<div id="jiurenniuniu-qiangzhuangs" class="jiurenniuniu-qiangzhuangs" style="display: block;">';
        html+='<img class="jiurenniuniu-qiangzhuangs-img" src="/img/tdk/tdk/bull_text_not'+bankwz+'.png"></div>';
        mp3xx='buqiang';
    }
     $('#operationButton').html(html);
     mp3play(mp3xx);
}
function qbankshowother(data){
    var msgxx={};
    var bankwz='';
    var mp3xx='';
    msgxx.index=data.index;
    if(data.type==1){
        bankwz='go';
    }
    else{
        bankwz='rob';
    }
    if(data.zt){
        if(data.type==4){
            msgxx.img='/img/tdk/tdk/X-'+data.zt+'.png';
            showmemberTimesText2(msgxx);
            msgxx.img='/img/tdk/tdk/bull_text_'+bankwz+'.png';
            showmemberRobText2(msgxx);
        }
        else{
            msgxx.img='/img/tdk/tdk/bull_text_'+bankwz+'.png';
            showmemberRobText(msgxx);
        }
        mp3xx='qiangzhuang';
    }
    else{
        msgxx.img='/img/tdk/tdk/bull_text_not'+bankwz+'.png';
        showmemberRobText(msgxx);
        mp3xx='buqiang';
    }
    mp3play(mp3xx);
}



function overroom(data){


    overzt=0;
    $('#table').hide();
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img=new Image()
    var img1=new Image()
    var img2=new Image()
    img.src="/app/img/bull10/ranking_4_bg.jpg";
    img1.src="/app/dyj.png";
    //img2.src="bg.png";
    var sj=data;

    $("body").html("");
    var div = document.createElement('div');
    div.className = 'search-number-box';
    document.body.appendChild(div);
    var detailedBtn = '<a class="search-number-box-btn" href="/index.php/portal/home/xiangqing/room/'+window.roomID+'" style="position: absolute;z-index: 9999999;display: block;"></a>';
    $(detailedBtn).appendTo($(div));
    createRanking(data, function(src) {
        var img = new Image();
        img.src = src;
        if (parseInt(data.user.length) > 6) {
            img.className = 'room-gameover-ten';
        } else {
            img.className = 'room-gameover';
        }
        img.onload = function() {
            document.body.appendChild(img);
            $(function () {
                $("#loadings").remove();
            });
            if (document.getElementsByClassName('body')[0]) {
                document.body.removeChild(document.getElementsByClassName('body')[0]);
            }
            document.body.style.backgroundColor = '#000000';
            document.body.style.minHeight = 'initial';
            if (typeof(jQuery) != 'undefined') $(document.body).off('touchmove');
            setTimeout(getRankingSix, 200);
        };
        $(document.body).off('touchmove');
    });
}

function createRanking(data, func) {
    var users = data.user;
    var game_id = 4;
    var room_number = data.id;
    var num = data.zjs;
    var sum = data.zjs;
    var datetime = data.time;
    var width = 750;
    var height = 1216;
   var pics = ['/css/img/tdkjsbj.jpg', '/app/img/bull10/people_bg.png', '/app/img/bull10/ranking_icon.png'];
    if (users.length > 6) {
        pics.push('/app/img/bull10/people_bg2.jpg');
        pics.push('/app/img/bull10/people_bg4.jpg');
        height += 102 * (users.length - 6);
    }
    var count = 0,
        imgs = [];
    for (var i in users) {
        // 图片本地化
        if(users[i].img.search("\/index\.php") < 0) {
            users[i].img = "/index.php/Portal/thumb/index?url="+encodeURIComponent(users[i].img);
        }
        pics.push(users[i].img);
    }
    window.userimg = window.userimg ? window.userimg : {};
    for (var i in pics) {
        if(!window.userimg[pics[i]]) {
            var img = document.createElement("img");
            img.onload = function () {
                count++;
                if (count >= pics.length) draw();
            };
            img.onerror = function () {
                this.src = "/app/img/bull10/default_head.png";
            };
            img.src = pics[i];
        } else {
            var img = window.userimg[pics[i]];
        }
        imgs[i] = img;
    }
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    function draw() {
        context.drawImage(imgs[0], 0, 0, width, width / 750 * 1216);
        var text = '房间号：' + room_number + '                     ' + datetime + '   ' + num + '/' + sum + '局';
        context.font = "19px 微软雅黑";
        context.textAlign = 'center';
        context.fillStyle = "#a28080";
        context.fillText(text, 375, 412);
        for (var i in users) {
            if (i >= 6) context.drawImage(imgs[3], 0, 430 + i * 102, 750, 102);
            var n = parseInt(i) + parseInt(users.length > 6 ? 5 : 3);
            context.drawImage(imgs[n], 170, 446 + i * 102, 59, 59);
            context.drawImage(imgs[1], 129, 430 + i * 102, 490, 90);
            var textwidth = 250;
            context.font = "24px 微软雅黑";
            context.textAlign = 'start';
            context.fillStyle = "#666666";
            var arr = decode64(users[i].nickname).split('');
            var txt = '',
                row = [];
            for (var j in arr) {
                if (context.measureText(txt).width >= textwidth) {
                    row.push(txt);
                    txt = '';
                }
                txt += arr[j];
            }
            if (txt != '') row.push(txt);
            if (row.length == 1) {
                context.fillText(row[0], 240, 482 + 102 * i);
            } else {
                context.fillText(row[0], 240, 470 + 102 * i);
                context.fillText(row[1], 240, 498 + 102 * i);
            }
            context.font = "36px 微软雅黑";
            context.textAlign = 'center';
            if (users[i]['dqjf'] > 0) {
                context.fillStyle = "#cd5908";
                context.fillText('+' + users[i]['dqjf'], 560, 490 + 102 * i);
            } else if (users[i]['dqjf'] < 0) {
                context.fillStyle = "#32b16c";
                context.fillText(users[i]['dqjf'], 560, 490 + 102 * i);
            } else {
                context.fillStyle = "#989898";
                context.fillText('0', 560, 490 + 102 * i);
            }
            if (users[i]['dqjf'] == users[0]['dqjf']) {
                context.drawImage(imgs[2], 108, 430 + i * 102, 51, 84);
            }
        }
        if (i >= 6) context.drawImage(imgs[4], 0, 430 + (++i) * 102, 750, 175);
        if (typeof(func) == 'function') func(canvas.toDataURL("image/png"));
    }
}

function msgshow(data){
      var indexuser=data.index-index-(-1);
    if(indexuser<=0){
        indexuser=indexuser-(-6);
    }
       var html='<div class="messageSay messageSay'+indexuser+'" ><div>'+data.msg+'</div> <div class="triangle"></div></div>'
      $('#messageSay').append(html);
      mp3play(data.mp3);
      setTimeout(function(){
            console.log(indexuser);
            $('.messageSay'+indexuser).remove();
      },1500);
}

function operationButton(data){
    var html='';
    if(data=='1'){
        html+='<div class="operationButton-3-zt" id="jiurenqz" style="display: inline-block; margin: 0 2%;" onclick="qbank(1,1)">'
        html+='                        <img class="operationButton-3" src="/app/img/bull9/bull_button_orange.png">'
        html+='                        <div class="operationButton-3-ts" >'
        html+='上庄'
        html+='                        </div>'
        html+='                       </div>'
        html+='                       <div class="operationButton-4-zt" id="jiurenbqz" style="display: inline-block; margin: 0 2%;" onclick="qbank(0,1)">'
        html+='                        <img class="operationButton-gg" src="/app/img/bull9/bull_button_blue.png"> '
        html+='                        <div class="operationButton-3-ts" >'
        html+='不上'
        html+='                        </div>'
        html+='                       </div>'
    }
    if(data=='2'){
        html+='<div class="divCoin divCoin1" style="display: inline-block;margin: 0 2%;'
        html+='            z-index: 200;" onclick="qbank(1,4)">'
        html+='             <img src="/app/img/bull9/bull_times_bg1.png"  class="operationButton-gg"  /> '
        html+='              <div class="operationButton-gg3">'
        html+='               1倍'
        html+='             </div>'
        html+='             </div> '
        html+='             <div class="divCoin divCoin2" style="display: inline-block;margin: 0 2%;'
        html+='            z-index: 200;" onclick="qbank(2,4)">'
        html+='              <img src="/app/img/bull9/bull_times_bg1.png"  class="operationButton-gg"  /> '
        html+='              <div  class="operationButton-gg3"  >'
        html+='               2倍'
        html+='              </div>'
        html+='             </div> '
        html+='             <div class="divCoin divCoin3" style="display: inline-block;margin: 0 2%;'
        html+='           z-index: 200;" onclick="qbank(4,4)">'
        html+='              <img src="/app/img/bull9/bull_times_bg1.png"  class="operationButton-gg"  /> '
        html+='              <div  class="operationButton-gg3"  >'
        html+='               4倍'
        html+='              </div>'
        html+='             </div> '
        html+='             <div class="divCoin divCoin4" style="display: inline-block;margin: 0 2%;'
        html+='            z-index: 200;" onclick="qbank(0,4)">'
        html+='              <img src="/app/img/bull9/bull_times_bg_blue.png"  class="operationButton-gg"  /> '
        html+='              <div  class="operationButton-gg3"  >'
        html+='               不抢'
        html+='              </div>'
        html+='             </div> '
    }
    if(data=='3'){
        html+='<div class="operationButton-3-zt" id="jiurenqz" style="display: inline-block;margin: 0 2%;margin-top:172px;" onclick="qbank(1,2)">'
        html+='                      <img class="operationButton-3" style="width:85px; height:45px;"src="/img/tdk/tdk/tdkxgz01.png">'
        html+='                      <div class="operationButton-3-ts" >'
        html+='                       <!--抢庄-->'
        html+='                      </div>'
        html+='                     </div>'
        html+='                     <div class="operationButton-4-zt" id="jiurenbqz" style="display: inline-block;margin: 0 2%;margin-top:172px;" onclick="qbank(0,2)">'
        html+='                      <img class="operationButton-gg" style="width:85px; height:45px;"src="/img/tdk/tdk/tdkxkp01.png">' 
        html+='                      <div class="operationButton-gg1" >'
        html+='                       <!--不抢-->'
        html+='                      </div>'
        html+='                     </div>';
    }
 if(data=='4'){
        html+='<div class="divCoin divCoin1" style="display: inline-block;margin: 3 1%;'
        html+='            z-index: 200;margin-top:172px;" onclick="xianxz(1);">'
        html+='              <img src="/img/tdk/tdk/tdkxzz.png"  class="operationButton-gg"  /> '
        html+='              <div class="operationButton-gg3" style="line-height:40px;" >'
        html+='               1倍'
        html+='              </div>'
        html+='             </div> '
        html+='             <div class="divCoin divCoin2" style="display: inline-block;margin: 0 1%;'
        html+='            z-index: 200;margin-top:172px;" onclick="xianxz(2);">'
        html+='              <img src="/img/tdk/tdk/tdkxzz.png"  class="operationButton-gg"  /> '
        html+='              <div  class="operationButton-gg3"style="line-height:40px;" >'
        html+='               2倍'
        html+='              </div>'
        html+='             </div> '
        html+='             <div class="divCoin divCoin3" style="display: inline-block;margin: 0 1%;'
        html+='            z-index: 200;margin-top:172px;" onclick="xianxz(4);">'
        html+='              <img src="/img/tdk/tdk/tdkxzz.png"  class="operationButton-gg"  /> '
        html+='              <div  class="operationButton-gg3" style="line-height:40px;" >'
        html+='               4倍'
        html+='              </div>'
        html+='             </div>' 
        html+='             <div class="divCoin divCoin4" style="display: inline-block;margin: 0 1%;'
        html+='            z-index: 200;margin-top:172px;" onclick="xianxz(5);">'
        html+='              <img src="/img/tdk/tdk/tdkxzz.png"  class="operationButton-gg"  /> '
        html+='              <div  class="operationButton-gg3" style="line-height:40px;" >'
        html+='               5倍'
        html+='              </div>'
        html+='             </div>';
    }
    if(data=='5'){
        html+='<div class="gongg" style="display: block;">等待闲家下注</div>';
    }
    if(data=='6'){
        html+='<div class="gongg" style="display: block;">点击牌面翻牌</div>';
    }
    if(data=='7'){
        html+='<div class="operationButton-1-zt" id="jiurenbqz" style="display: inline-block;" onclick="tanpaime();">';
        html+='<div   class="operationButton-gg1"  style="background:url(/img/tdk/tdk/tpbj02.png)no-repeat;background-size:100% 100%;height:45px;width:110px;color:#fff;font-size:16px; line-height:45px;margin-top:92px; ">';
        html+='点击牌面翻牌';
        html+='</div>';
        html+='</div>';
    }

    $('#operationButton').html(html);
}
function divRobBankerText(data){
    var html='';
    if(data=='0'){
        html+='<p class="liurenniuniu-ziti">准备开始</p>';
    }
    if(data=='1'){
        html+='<p class="liurenniuniu-ziti">上庄</p>';
    }
    if(data=='2'){
        html+='<p class="liurenniuniu-ziti">抢庄</p>';
    }
    if(data=='3'){
        html+='<p class="liurenniuniu-ziti">闲家下注</p>';
    }
    if(data=='4'){
        html+='<p class="liurenniuniu-ziti">等待摊牌</p>';
    }
    if(data=='5'){
        html+='<p class="liurenniuniu-ziti">等待结束</p>';
    }
    $('#divRobBankerText').html(html);
}