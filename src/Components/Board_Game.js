import { useEffect } from "react";

function Board(props){
  const parentStyle = {width: '300px', height: '300px', backgroundColor: props.backgroundColor, display: 'flex', flexWrap: 'wrap'};
  let childStyle = {width: '33%', height: '33%', border: '1px solid black', margin: '0 auto'};
  const btnStyle = {width: '100%'};
  const btnStyle2 = {width: '100%', fontSize: '1.5em'};
  const h1Style = {position: 'relative', zIndex: '2', top: '-75%', fontSize: '4em', fontStyle: 'italic', margin: 'auto', opacity: '0.5'};
  const theX = "<svg width='100px' height='100px'><text x='50' y='60' font-size='45' text-anchor='middle' fill='red'>X</text></svg>"
  const theO = "<svg width='100px' height='100px'><text x='50' y='60' font-size='45' text-anchor='middle' fill='blue'>O</text></svg>"
  let userStyle=theX;
  let comsStyle=theO;
  let endID;

  let btn_symbol = false;
  let start_over = true;
  let on_playing = false;
  let end_stop = false;

  let timed;
  let leftSpot = ['00','01','02','10','11','12','20','21','22'];
  let userMember = [];
  let comsMember = [];

  useEffect(()=>{
    let btn1 = document.getElementById('btn1');
    btn1.addEventListener('click', x_or_o);
    let btn2 = document.getElementById('btn2');
    btn2.addEventListener('click', coin_pick);
    let btn3 = document.getElementById('btn3');
    btn3.addEventListener('click', start_reset);    
    endID = document.getElementById('end');
    },[]
  );

  function comsRun(id){
    let elem = document.getElementById(id);
    comsMember = [...comsMember, id];
    timed = setTimeout(()=>{elem.innerHTML = comsStyle}, 500);
    elem.removeEventListener('click', onclick);
    leftSpot = leftSpot.filter(xy => {
      return comsMember.some(id => {return xy == id }) == false; 
    });
  }
  function onclick(e){
    userMember = [...userMember, e.target.id];
    e.target.innerHTML = userStyle;
    leftSpot = leftSpot.filter(xy => {
      return userMember.some(id => {return xy == id}) == false; 
    });
    placement_possibility(e.target.id);
    document.getElementById(e.target.id).removeEventListener('click', onclick);
  }
  //coms run first
  function user_goes_second(){
    let length = leftSpot.length;
    let random_pick = Math.round(Math.random()*length);
    comsRun(leftSpot[random_pick]);
  }
  //main function
  function placement_possibility(co_xy){
    const x = parseInt(co_xy[0]);
    const y = parseInt(co_xy[1]);
    let current;
    let addVar;
    let arrX = [];
    let arrY = [];
    let arrZ = [];
    let arrZ_2 = [];

    //possible x
    current = x;
    while (current>0){
      current--;
      arrX = [[current,y], ...arrX];
    }
    current = x;
    while (current<2){
      current++;
      arrX = [...arrX, [current,y]];
    }
    //possible y
    current = y;
    while (current>0){
      current--;
      arrY = [[x,current], ...arrY];
    }
    current = y;
    while (current<2){
      current++;
      arrY = [...arrY, [x,current]];
    }
    //possible z
    current = x;
    addVar = y;
    while (current>0 && addVar>0){
      current--;
      addVar--;
      arrZ = [[current,addVar], ...arrZ];
    }
    current = x;
    addVar = y;
    while (current>0 && addVar<2){
      current--;
      addVar++;
      arrZ_2 = [[current,addVar], ...arrZ_2];
    }
    current = x;
    addVar = y;
    while (current<2 && addVar>0){
      current++;
      addVar--;
      arrZ_2 = [...arrZ_2, [current,addVar]];
    }
    current = x;
    addVar = y;
    while (current<2 && addVar<2){
      current++;
      addVar++;
      arrZ = [...arrZ, [current,addVar]];
    }

    //-------------INITIALIZE-------------------------------------
    let different = leftSpot.length;

    if (comsMember.length == 0){
      meanXY();
    }    
    else if (leftSpot.length == 1){
      comsRun(leftSpot[0]);
    }
    else {
      consecutive_fills();
      if (different == leftSpot.length){
        consecutive_block();
        if (different == leftSpot.length){
          avg_fill();
        }
      }
    }
    
    if (end_stop == false){
      game_end(userMember);
      if (end_stop == false){
        game_end(comsMember);
        if (leftSpot.length == 0 && end_stop == false){
          endID.innerHTML = 'DRAW';
          document.querySelectorAll('.xo').forEach(id=>{
            id.style.border = '1px solid whitesmoke';
          });
        }   
      }
    }

    //------------FUNCTION---------------------------------------
    //mean x,y
    function meanXY(){
    let meanX = 0;
    let meanY = 0;
    let length = 0;
    [arrX,arrY,arrZ,arrZ_2].forEach(items => {
      items.forEach(co => {
        meanX += co[0];
        meanY += co[1]; 
        length += 1
      });
    });
    meanX /= length;
    meanY /= length;  //all calcs around (1,1) not much matter
    meanX = (Math.round(meanX)).toString();
    meanY = (Math.round(meanY)).toString();
    if (leftSpot.some(xy=>{return xy == (meanX+meanY)})){
      comsRun(meanX+meanY);
    }
    else {
      avg_fill();
    }
    }
    
    //consecutive check
    function consecutive_block(){
    let conArr = [];
    let user = false;
    let coms = false;
    let forEachSomeHowCannotBreakTheLoops = false;
    [arrX,arrY,arrZ,arrZ_2].forEach(arr => {
      arr.forEach(co_or => {
        userMember.forEach(mem => {
          if(parseInt(mem[0]) == co_or[0] && parseInt(mem[1]) == co_or[1]){
            conArr.push('user');
            user = true;
          }
        });
        comsMember.forEach(mem => {
          if(parseInt(mem[0]) == co_or[0] && parseInt(mem[1]) == co_or[1]){
            conArr.push('coms');
            coms = true;
          }
        });
        if (user == false && coms == false){
          conArr.push('available');
          conArr.push(co_or);
        }
        user = false;
        coms = false;
      });
      if (conArr.some(item => { return item == 'user'}) && conArr.some(item => { return item == 'available'})){
        //co_or displayed
        let filter = conArr.filter(item => {return typeof item != 'string' && item.length > 0})
        let getID = (filter[0][0].toString()) + (filter[0][1].toString());
        if (forEachSomeHowCannotBreakTheLoops == false){
          comsRun(getID);
          forEachSomeHowCannotBreakTheLoops = true;
        }
        conArr = [];
      }
      conArr = [];    
    });
    }

    //average filling
    function avg_fill(){
    let userAvg = 0;
    let comsAvg = 0;
    let comsArr = [];

    userMember.map(arr=>{userAvg += (parseInt(arr[0]) + parseInt(arr[1]));});
    userAvg /= userMember.length;

    comsMember.map(arr=>{comsAvg += (parseInt(arr[0]) + parseInt(arr[1]));});
    leftSpot.map(str=>{
      comsArr = [...comsArr, [(comsAvg + parseInt(str[0]) + parseInt(str[1]))/(comsMember.length+1), str]];
    });
    comsArr.map(arr=>{
      arr[0] -= userAvg;
      arr[0] = Math.abs(arr[0]);
    });
    comsArr.filter(arr=>{
      return comsArr.every(arr2=>{return arr2[0] > arr;});
    });

    let length = comsArr.length -1;
    if (leftSpot.length > 1){
      comsRun(comsArr[(Math.round(Math.random()*length))][1]); 
    }
    }
    
    //consecutive fills
    function consecutive_fills(){
      let lastComs = comsMember[comsMember.length-1];
      let xC = parseInt(lastComs[0]);
      let yC = parseInt(lastComs[1]);
      let c;
      let arrX_C = [];
      let arrY_C = [];
      let arrZ_C = [];
      let arrZ_2_C = [];
      let rsv;
     //possible x
    c = xC;
    while (c>0){
      c--;
      arrX_C = [[c,yC], ...arrX_C];
    }
    c = xC;
    while (c<2){
      c++;
      arrX_C = [...arrX_C, [c,yC]];
    }
    //possible y
    c = yC;
    while (c>0){
      c--;
      arrY_C = [[xC,c], ...arrY_C];
    }
    c = yC;
    while (c<2){
      c++;
      arrY_C = [...arrY_C, [xC,c]];
    }
    //possible z
    c = xC;
    rsv = yC;
    while (c>0 && rsv>0){
      c--;
      rsv--;
      arrZ_C = [[c,rsv], ...arrZ_C];
    }
    c = xC;
    rsv = yC;
    while (c>0 && rsv<2){
      c--;
      rsv++;
      arrZ_2_C = [[c,rsv], ...arrZ_2_C];
    }
    c = xC;
    rsv = yC;
    while (c<2 && rsv>0){
      c++;
      rsv--;
      arrZ_2_C = [...arrZ_2_C, [c,rsv]];
    }
    c = xC;
    rsv = yC;
    while (c<2 && rsv<2){
      c++;
      rsv++;
      arrZ_C = [...arrZ_C, [c,rsv]];
    } 

    for (let arr of [arrX_C,arrY_C,arrZ_C,arrZ_2_C]){
      let conArrC = [];
      for (let xy of arr){
        let user = false;
        let coms = false;
        let str = xy[0].toString() + xy[1].toString();
        if (comsMember.some(e=>{return e==str})){
          conArrC.push('coms');
          coms = true;
        }
        else if (userMember.some(e=>{return e==str})){
          conArrC.push('user');
          user = true;
        }
        else if (user == false && coms == false){
          conArrC.push('available');
          conArrC.push(str);
        }
      }
      let check_coms = conArrC.some(e=>{return e=='coms'});
      let check_space = conArrC.some(e=>{return e=='available'});
      if (check_coms && check_space){
        conArrC = conArrC.filter(e=>{return e.length<=2});
        return comsRun(conArrC[0]);  
      }
    };
    }

    //winning conditions
    function game_end(player){
      //match error : null 
      let gameEndStyle = (id) => {
        document.getElementById(id).style.border = '1px solid gold';
        player == userMember ? endID.innerHTML='EZ' : endID.innerHTML='BROOO' ;
      }
      const freeze = () => {
        end_stop = true;
        document.querySelectorAll('.xo').forEach(elem=>{
          elem.removeEventListener('click',onclick);
        });
      };

      if (/00/.test(player) && /10/.test(player) && /20/.test(player)){
        freeze();
        gameEndStyle('00');
        gameEndStyle('10');
        gameEndStyle('20');
      }
      else if (/01/.test(player) && /11/.test(player) && /21/.test(player)){
        freeze();
        gameEndStyle('01');
        gameEndStyle('11');
        gameEndStyle('21');  
      }
      else if (/02/.test(player) && /12/.test(player) && /22/.test(player)){
        freeze();
        gameEndStyle('02');
        gameEndStyle('12');
        gameEndStyle('22');
      }
      else if (/00/.test(player) && /01/.test(player) && /02/.test(player)){
        freeze();
        gameEndStyle('00');
        gameEndStyle('01');
        gameEndStyle('02');
      }
      else if (/10/.test(player) && /11/.test(player) && /12/.test(player)){
        freeze();
        gameEndStyle('10');
        gameEndStyle('11');
        gameEndStyle('12');
      }
      else if (/20/.test(player) && /21/.test(player) && /22/.test(player)){
        freeze();
        gameEndStyle('20');
        gameEndStyle('21');
        gameEndStyle('22');
      }
      else if (/00/.test(player) && /11/.test(player) && /22/.test(player)){
        freeze();
        gameEndStyle('00');
        gameEndStyle('11');
        gameEndStyle('22');
      }
      else if (/02/.test(player) && /11/.test(player) && /20/.test(player)){
        freeze();
        gameEndStyle('02');
        gameEndStyle('11');
        gameEndStyle('20');
      }
    }
  }

  function x_or_o(e){
    btn_symbol = !btn_symbol;
    btn_symbol ? userStyle=theO : userStyle=theX; 
    btn_symbol ? comsStyle=theX : comsStyle=theO;
    btn_symbol ? e.target.innerHTML = 'O' : e.target.innerHTML = 'X';
  }
  function coin_pick(e){
    start_over = !start_over;
    start_over ? e.target.innerHTML = 'Goes First' : e.target.innerHTML = 'Goes Second';
  }
  function start_reset(e){
    on_playing = !on_playing;
    
    let btn1 = document.getElementById('btn1');
    let btn2 = document.getElementById('btn2');
    let units = document.querySelectorAll('.xo');
    if (on_playing){
      e.target.innerHTML = 'RESET';
      btn1.removeEventListener('click', x_or_o);
      btn2.removeEventListener('click', coin_pick);
      units.forEach(element => { 
        element.addEventListener('click', onclick);
      });
      if (start_over == false){
        user_goes_second();
      }
    }
    else {
      leftSpot = ['00','01','02','10','11','12','20','21','22'];
      userMember = [];
      comsMember = [];
      end_stop = false;
      e.target.innerHTML = 'START';
      endID.innerHTML = '';
      btn1.addEventListener('click', x_or_o);
      btn2.addEventListener('click', coin_pick);
      units.forEach(element => { 
        if (element.onclick){
          element.removeEventListener('click', onclick);
        }
        if (element.innerHTML){
          element.innerHTML = '';
        }
        if (element.style.border = '1px solid gold'){
          element.style.border = '1px solid black';
        }
      });
    }
  }

  return (
    <div style={parentStyle}>
      <div id='00' className="xo" style={childStyle}></div>
      <div id='10' className="xo" style={childStyle}></div>
      <div id='20' className="xo" style={childStyle}></div>
      <div id='01' className="xo" style={childStyle}></div>
      <div id='11' className="xo" style={childStyle}></div>
      <div id='21' className="xo" style={childStyle}></div>
      <div id='02' className="xo" style={childStyle}></div>
      <div id='12' className="xo" style={childStyle}></div>
      <div id='22' className="xo" style={childStyle}></div>
      <button id='btn1' style={btnStyle}>X</button>
      <button id='btn2' style={btnStyle}>Goes First</button>
      <button id='btn3' style={btnStyle2}>START</button>
      <h1 id="end" style={h1Style}></h1>
    </div>
  );
}

export default Board;