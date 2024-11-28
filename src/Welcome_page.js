import './welcome_page.css';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from './features/languages/languageToggle';

function WelcomePage(){
  const navigate = useNavigate();
  const mainPage = () => {navigate('/main');};
  const language = useSelector((state)=>state.language.value);
  const setLang = useDispatch();

  const obj = {
               th: {name: "อัฑฒริญชัย รุ่งมณี",
                    h1: 'สวัสดี', 
                    p: 'เรียนท่านผู้มีเกียรติ สุภาพบุรุษ และสุภาพสตรีทุกท่าน', 
                    p2: 'กระผมนาย', 
                    p3: 'มีความประสงค์ที่จะเข้ารับหน้าที่ปฎิบัติการ เป็นผู้พัฒนาฟรอนเอนท์ อนึ่งนั้น ข้าพเจ้าได้ผ่านกระบวนการอบรมภาษา html css และ React', 
                    p4: 'หากท่านมีความประสงค์ต้องการผู้พัฒนาในขณะนี้ สามารถรับทราบข้อมูลเพิ่มเติมได้ด้วยการกดที่ช่องทางด้านล่าง', 
                    p5:"จึงเรียนมาเพื่อทราบ",
                    btn: 'เข้าสู่เวปไซต์'}, 
               en: {name: "Attarinchai Rungmanee", 
                    h1: 'WELCOME TO MY PAGE', 
                    p: "First of all, thank you for visit my site and let me introduce myself. ", 
                    p2: "that's my exact authentic name, I do interest in being the front-end developer recently. I've been through HTML, CSS, javaScript and React from free online website. Anyway, if you're looking for the Front-End developer please click the link down below for more information",    
                    btn: 'MAIN PAGE'}
              };
  let text;
  let thElement;
  let enElement;
  let date = new Date();
  
  function dailyGreeting(){
    let num = date.getDay();
    switch(num) {
      case 0: 
        return obj.th.day = 'วันอาทิตย์';
      case 1: 
        return obj.th.day = 'วันจันทร์';
      case 2: 
        return obj.th.day = 'วันอังคาร';
      case 3: 
        return obj.th.day = 'วันพุธ';
      case 4: 
        return obj.th.day = 'วันพฤหัสบดี';
      case 5: 
        return obj.th.day = 'วันศุกร์';
      case 6: 
        return obj.th.day = 'วันเสาร์';
    }
  }

  useEffect(()=>{
    thElement = document.querySelector('#th');
    enElement = document.querySelector('#en');
  },[language]);

  function flash(){
    thElement.classList.toggle('white-color');
    enElement.classList.toggle('white-color');
  }
  
  function nxtPgbtn(e){
    e.target.classList.toggle('clicking');
  }

  function footerAnimate(receivedID){
    let id = document.getElementById(receivedID);
    id.textContent == '❌' ? id.innerText = '✅': id.innerText = '❌';
  }

  useEffect(()=>{
    const loops = setInterval(() => footerAnimate('emote'), 1000);

    return ()=> {clearInterval(loops)};
  },[]);

  let hideText = () => {
    thElement.classList.toggle('lang-current');
    if (thElement.textContent){
      thElement.innerText = '';
    }
    else {
      thElement.innerText = 'ไทย';
    }
  }

  dailyGreeting();
  language ? text = obj.en : text = obj.th ;

  return (
    <div className='welcome-page'>
      <div className='image'>adding image soon</div>
      <div id="lang-btn" className="lang-btn" style={{color: language? '#00BAFF': '#FF00AA'}} onClick={()=>{setLang(toggle()); hideText();}} onMouseDown={()=>{flash()}} onMouseUp={()=>{flash()}}>
        <div id="th" className='lang-current'>ไทย</div>
        <div className='lang-block'></div>
        <div id="en" className='lang-current'>EN</div>
      </div>
      <article className="introduction">
        <h1>{text.h1}{language ? null : text.day}</h1>
        <h1>{text.h1}{language ? null : text.day}</h1>
        <h1>{text.h1}{language ? null : text.day}</h1>
        <p className={language ? null : 'th-first-p'}>{text.p}</p>
        {language ? <p className='en-second-p'><span className='name'>{text.name}</span>{text.p2}</p> : <p class="th-p2">{text.p2}<span className="name"> {text.name}</span></p>}
        {language ? null : 
          <p className='th-p'>
            <p>{text.p3}</p>
            <p className="th-p4">{text.p4}</p>
            <p className='th-p5'>{text.p5}</p>
          </p>
        }
      </article>
      <div className='btn'>
        <button className='next-page-btn' onClick={()=>mainPage()} onMouseDown={nxtPgbtn} onMouseUp={nxtPgbtn}>{text.btn}</button>
      </div>
      <footer className='japanese'>ラープの作り方 それは謎です。<span id="emote"></span></footer>
    </div>
  )
}

export default WelcomePage;
