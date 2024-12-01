import React, { useState } from 'react'
import './App.css'
import Board from './Components/Board_Game.js'
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from './features/languages/languageToggle'

function MainPage (){
  const language = useSelector((state)=>state.language.value);
  const setLanguage = useDispatch();

  let [isHover, setOnHover] = useState(false);
  let [darkMode, setDarkMode] = useState(false);
  let [scrollPass, setScrollPass] = useState(false);
  let [you, charChange] = useState(false);

  const headerDiff = {background: 'linear-gradient(180deg, blue, #090012)'};
  const bg = {backgroundColor: '#090012'};
  const sectionBg = {background: 'linear-gradient(180deg, #0000FF, #090012 45%)'};
  const sectionBgLast = {background: 'linear-gradient(180deg, #0000FF, #090012 45%, black 80%)'};
  const flag = {backgroundColor: 'pink'};
  const text = {color: 'white'};
  const link = {color: 'yellow'};
  const setting = {backgroundColor: 'white', borderRadius: '50%'};
  const toggleBtn = {borderLeft: '1px double white'};
  const sider = {backgroundColor: 'yellow'};
  
  let t; 
  const en = {
    nav1: 'INTRODUCTION',
    nav2: 'EDUCATION',
    nav3: 'EXPERIENCE',
    nav4: 'CONTACTS',
    pName: 'Name: Attarinchai Rungmanee',
    pAge: 'Age: 26(reverse rounded)',
    pMilitary: 'Military Status: Conscripted',
    pMarital: 'Marital Status: Single',
    pWC1: 'Burger: Beef and Beef',
    pWC2: 'Pizza: Cheese',
    pWC3: 'FriedChicken: how chilli sauce a thing',
    pWC4: 'OG: CrispyPork with Basil',
    pWC5: 'Noodle: Vermicelli Tomyam',
    pWC6: 'Pet: Psychopath Cat',
    pWC7: 'Vacation: not this moment',
    pWC8: 'Time: too Late Night',
    pWC9: 'Movie: anything Oscar nominee',
    pWC10: 'Hobbies: breathing .... with technics',
    pText: `guess you already know my name, yet again 'Attarinchai' my first-name, 'Rungmanee' my sure-name, 
            unfortunately we got no middle-name and the nickname's 'Orm'. I was graduated from Chiang Mai University as Mechanical Engineering. 
            I know that sound irrelevant frfr. After graduated i decided to work with my home instead being the Engineer since internship didn't satisfied. 
            And that's it one day on freetime myself get log in to freeCodeCamp.com, i found it interesting that you can build the page with yourself even will be Mobile App or create a Game. 
            Sum up to get in coding. By the way you might wonder how old am i, has to say i'm getting in 27 now but it's fine i could be junior we learn something new everyday. `,
    eduHead: 'PRE-EDUCATION',
    eduSubHead1: 'Middle/High School',
    eduBuilding1: 'ChongFah Xinsheng Wanishbamrung School',
    eduBuilding1Text: 'this is the most recent building, exactly they always do something when we left',
    eduSubHead2: 'University',
    eduBuilding2: 'Mechanical Engineering ChiangMai University',
    eduBuilding2Text: 'almost decade since then, ngl traffic jam was horrible',
    blockquote1: "Fun Fact: It's long enough of studying chinese but neither listening nor reading are capable now 💀",
    codeArcHead: 'CODING ARC',
    codeArcSubHead: 'i took 3 consecutive courses from freeCodeCamp',
    certificate1: 'Responsive Web Design',
    certificate2: 'Legacy Javascript Algorithms and Data Structures',
    certificate3: 'Front End Development Libraries Certification',
    codeArcSpan: '* for more infomation, please click on the pictures',
    blockquote2: ' some works were not included, its the same project but different styles, visit me at ',
    expHead: 'EXPERIENCE',
    expH3: 'TECHNICAL DIFFICULTIES',
    expH4: 'no content found',
    expP: 'you might wanna play game',
    expH6: 'warning! the bot drunk',
    footP: 'I do appreciate to visit my page, I planned to learning more on the others courses. Hopefully a few of friends who been working on these field suggest to stop study and get into the real one, that will made you learning faster and more effective through the experience. You may keep the continuation of the journey ... PEACE!!',
    footHead: 'CONTACTS',
    facebook: 'Attarinchai Rungmané',
    outlook: 'attarinchai_ru@outlook.co.th',
    number: '096 697 9108'
  };
  const th = {
    nav1: 'ปฐมบทแบบรวบรัด',
    nav2: 'การศึกษา',
    nav3: 'ประสบการณ์',
    nav4: 'ช่องทางการติดต่อ',
    pName: 'ชื่อ: นายอัฑฒริญชัย รุ่งมณี',
    pAge: 'อายุ: 26 ปี',
    pMilitary: 'สถาณภาพทางการทหาร: ผ่านการเรียน รด.',
    pMarital: 'สภาณภาพการแต่งงาน: โสด',
    pWC1: '',
    pWC2: '',
    pWC3: '',
    pWC4: '',
    pWC5: '',
    pWC6: '',
    pWC7: '',
    pWC8: '',
    pWC9: '',
    pWC10: '',
    pText: `แนะนำตัวอย่างเป็นทางการอีกครั้ง ผมนายอัฑฒริญชัย รุ่งมณี จบการศึกษาจากคณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่ 
    หลังจากเรียนจบก็กลับไปทำงานที่บ้าน ไม่ได้เลือกทำงานสายวิศวกรรมแต่อย่างใด กระทั่งช่วงปี สองปีที่ผ่านมา 
    ได้เรียนการเขียนภาษา html css javaScript จากเว็ปไซต์ freeCodeCamp อยู่ช่วงนึง แต่เรียนทิ้งไว้และไม่ได้สานต่อ 
    จนวันนึงได้พูดคุยกับเพื่อนๆที่ทำงานสายนี้ จึงหันมาสนใจมากขึ้น และเริ่มเขียนลองเขียนเว็ปเป็นงานอดิเรก ในท้ายที่สุดก็ตัดสินใจเลือกจะทำงานด้านโปรแกรมมิ่ง
    และนี่ก็เป็นเรื่องราวสั้นๆของผม`,
    eduHead: 'การศึกษา',
    eduSubHead1: 'ประถม-มัธยมศึกษา',
    eduBuilding1: 'โรงเรียนช่องฟ้าซินเซิงวาณิชบำรุง',
    eduBuilding1Text: 'ตึกสร้างใหม่',
    eduSubHead2: 'มหาวิทยาลัย',
    eduBuilding2: 'คณะวิศวกรรมศาตร์ มหาวิทยาลัยเชียงใหม่',
    eduBuilding2Text: 'สะพานเชื่อมตึกหลัก',
    blockquote1: 'ถึงจะอยู่โรงเรียนจีน แต่ตอนนี้ได้แค่คำว่ากินข้าวหรือยัง',
    codeArcHead: 'คอร์สเขียนโปรแกรม',
    codeArcSubHead: '3 คอร์สหลัก',
    certificate1: 'Responsive Web Design',
    certificate2: 'Legacy Javascript Algorithms and Data Structures',
    certificate3: 'Front End Development Libraries Certification',
    codeArcSpan: '* โปรดคลิกที่รูปภาพ เพื่อดูข้อมูลทั้งหมดของแต่ละหัวข้อ',
    blockquote2: ' หากบางโปรเจคท์เกิดข้อผิดพลาด สามารถไปที่หน้า codepen ของผมได้',
    expHead: 'ประสบการณ์',
    expH3: '420 ERROR',
    expH4: 'no content found',
    expP: 'you might wanna play game',
    expH6: 'warning! the bot drunk',
    footP: 'หากต้องการข้อมูลเพิ่มเติม สามารถส่งรายละเอียดมาทางอีเมล หรือติดต่อทางเบอร์โทรศัพท์ อย่างไรก็ตาม ข้อมูลเฟซบุ๊คขาดการอัพเดทในช่วงหลายปีที่ผ่านมา แต่ยังสามารถติดต่อทางเมสเซนเจอร์ได้',
    footHead: 'ช่องทางการติดต่อ',
    facebook: 'Attarinchai Rungmané',
    outlook: 'attarinchai_ru@outlook.co.th',
    number: '096 697 9108'
  };
  
  language ? t = en : t = th ;

  window.addEventListener('scroll', ()=>{  //without useeffect
    let scroll = window.scrollY;
    if (scroll > 140){
      setScrollPass(true);
    }
    else {
      setScrollPass(false);
    }
  });

  return (
    <div id='main-page' style={darkMode ? bg : null}>
      <main>
        <div className='setting'  onMouseOver={()=>setOnHover(true)}
                onMouseLeave={()=>setOnHover(false)}>
          <div className={isHover ? 'setting-icons rotating' : 'setting-icons rev-rotate'} style={darkMode ? setting : null}></div>
          <div className={isHover ? 'reveal' : 'invisible'} style={darkMode ? toggleBtn : null} >
            <button className={language ? 'en' : 'th'} onClick={()=>setLanguage(toggle())}>
              { language ? 
              <svg width='100%' height='100%'>
                <rect width='6' height='100%' x='0' y='0' fill="black"></rect>
                <rect width='4.5' height='100%' x='15' y='0' fill="red"></rect>
              </svg> :
              <svg width='100%' height='100%'>
                <rect width='10' height='90%' x='21' y='0' fill="white"></rect>
                <rect width='6' height='100%' x='21.5' y='0'  fill="black"></rect>
              </svg>
              }
            </button>
            <button className={darkMode ? 'dark-mode' : 'light-mode'} onClick={()=>setDarkMode(!darkMode)}>
              { darkMode ? 
              <svg width='100%' height='100%'>
                <circle cx='17' cy='8' r='7' fill='yellow' />
                <circle cx='12' cy='8' r='7' fill='black' />
                <rect width='6' height='100%' x='0' y='0' fill="silver"></rect>
              </svg> :
              <svg width='100%' height='100%'>
                <circle cx='9' cy='8' r='8' fill='yellow' />
                <circle cx='9' cy='8' r='5' fill='#FA0' />
                <rect width='8' height='100%' x='20' y='0' rx='2' fill="black"></rect>
              </svg>
              }
            </button>
          </div>
        </div>
        <div className='btn-jump-top' style={scrollPass ? {display: 'block'} : {display: 'none'}}>
          <a href="#header"><div style={darkMode ? sider : null}></div></a>
        </div>
        <aside className='additional-nav-sidebar' style={scrollPass ? darkMode ? sider : {display: 'block'} : {display: 'none'}}>
            <ul>
              <li><a href="#brief"><i class="fa-solid fa-user"></i></a></li>
              <li><a href="#education-nav"><i class="fa-solid fa-book"></i></a></li>
              <li><a href="#experience-nav"><i class="fa-solid fa-briefcase"></i></a></li>
              <li><a href="#contacts"><i class="fa-solid fa-id-card"></i></a></li>
            </ul>
        </aside>
        <header id="header" style={darkMode ? headerDiff : null }>
          <h1 style={darkMode ? text : null}>RÉSUMÉ</h1> {/*alt+0201*/}
          <nav>
            <ul style={darkMode ? text : null}>
              <li>
                <a href="#brief" className='a-first-child'
                   onMouseOver={darkMode ? (e)=>{e.target.style.color = 'pink'} : null} 
                   onMouseOut={darkMode ? (e)=>{e.target.style.color = ''} : null}>
                   {t.nav1}
                </a>
              </li>
              <li>
                <a href="#education-nav"
                   onMouseOver={darkMode ? (e)=>{e.target.style.color = 'pink'} : null} 
                   onMouseOut={darkMode ? (e)=>{e.target.style.color = ''} : null}>
                  {t.nav2}</a>
              </li>
              <li>
                <a href="#experience-nav"
                   onMouseOver={darkMode ? (e)=>{e.target.style.color = 'pink'} : null} 
                   onMouseOut={darkMode ? (e)=>{e.target.style.color = ''} : null}>
                {t.nav3}</a></li>
              <li>
                <a href="#contacts"
                   onMouseOver={darkMode ? (e)=>{e.target.style.color = 'pink'} : null} 
                   onMouseOut={darkMode ? (e)=>{e.target.style.color = ''} : null}>
                {t.nav4}</a></li>
            </ul>
          </nav>
        </header>
        <section id="brief" className="brief" style={darkMode ? bg : null}>
          <article>
            <div style={{width: "250px", height: '300px', backgroundColor: 'transparent', borderRadius: '10%', overflow: 'hidden'}}>
              <img width="100%" src={you ? require('./pictures/IMG20241130193503.jpg') : require('./pictures/me.png')} />
            </div>
            <button
              onClick={()=>{charChange(!you)}} 
              style={{position: 'absolute', marginTop: '-35px', marginLeft: '10px', backgroundColor: '#DDD', padding: '0',border: '1px solid gray', borderRadius: '30%'}}
            >
              <i className="fa-solid fa-user" style={{fontSize: '16px', margin: '5px'}}></i>
            </button>
            <p style={darkMode ? text : null}>{t.pName}</p>
            <p style={darkMode ? text : null}>{t.pAge}</p>
            <p style={darkMode ? text : null}>{t.pMilitary}</p>
            <p style={darkMode ? text : null}>{t.pMarital}</p>
            <p style={darkMode ? text : null}>{t.pWC1}</p>
            <p style={darkMode ? text : null}>{t.pWC2}</p>
            <p style={darkMode ? text : null}>{t.pWC3}</p>
            <p style={darkMode ? text : null}>{t.pWC4}</p>
            <p style={darkMode ? text : null}>{t.pWC5}</p>
            <p style={darkMode ? text : null}>{t.pWC6}</p>
            <p style={darkMode ? text : null}>{t.pWC7}</p>
            <p style={darkMode ? text : null}>{t.pWC8}</p>
            <p style={darkMode ? text : null}>{t.pWC9}</p>
            <p style={darkMode ? text : null}>{t.pWC10}</p>
          </article>
          <p className='text' style={darkMode ? text : null}>{t.pText}</p>
        </section>
        <label id="education-nav" for="education" style={darkMode ? text : null}><h2>{t.eduHead}</h2></label>
        <section id="education" className='education' style={darkMode ? sectionBg : null}>
          <article style={darkMode ? text : null}>
            <h4>{t.eduSubHead1}</h4>
            <p>{t.eduBuilding1}</p>
            <figure>
              <img src= {require('./pictures/middleHighSchool.jpg')}  
                     alt="Secondary School"
              />
              <figcaption>{t.eduBuilding1Text}</figcaption>
            </figure>
          </article>
          <article style={darkMode ? text : null}>
            <h4>{t.eduSubHead2}</h4>
            <p>{t.eduBuilding2}</p>
            <figure>
              <img src="https://www.cmu.ac.th/content/organization/7ae5726e-0c18-45f8-ae3c-cdd52e2afd94/3baedb35-438f-4e0f-8d1d-2b9724d36951.jpg"
                    alt="Skywalk to the main Building"
                    loading='lazy'
              />
              <figcaption>{t.eduBuilding2Text}</figcaption>
            </figure>
          </article>
        </section>
        <blockquote style={darkMode ? text : null}>
          <div>?</div> {t.blockquote1}
        </blockquote>
        <label for="education-coding-arc" style={darkMode ? text : null}><h2>{t.codeArcHead}</h2></label>
        <section id="education-coding-arc" style={darkMode ? sectionBg : null}>
          <p className='italic' style={darkMode ? text : null}>{t.codeArcSubHead}</p>
          <div className='certification-wrap' style={darkMode ? text : null}>
            <figure>
              <figcaption>{t.certificate1}</figcaption>
              <a href="https://www.freecodecamp.org/certification/fcc2c296ebb-625b-4768-b2e2-89053cf55932/responsive-web-design" target='_blank'>
                <img className='certification' src={require('./pictures/responsive-web-design.jpg')} alt="responsive web design certification" />
              </a>
            </figure>
            <figure>
              <figcaption>{t.certificate2}</figcaption>
              <a href="https://www.freecodecamp.org/certification/fcc2c296ebb-625b-4768-b2e2-89053cf55932/javascript-algorithms-and-data-structures" target="_blank">
                <img className='certification' src={require('./pictures/javaScript.jpg')} alt="javaScript certification" />
              </a>
            </figure>
            <figure>
              <figcaption>{t.certificate3}</figcaption>
              <a href="https://www.freecodecamp.org/certification/fcc2c296ebb-625b-4768-b2e2-89053cf55932/front-end-development-libraries" target='_blank'>
                <img className='certification' src={require('./pictures/front-end-development-libraries.jpg')} alt="front-end libraries certification" />
              </a>
            </figure>
          </div>
          <p className="right" style={darkMode ? text : null}>{t.codeArcSpan}</p>
        </section>
        <blockquote style={darkMode ? text : null}>
          <div>?</div> {t.blockquote2} <a href='https://codepen.io/attarinchai' target='_blank' style={darkMode ? link : null}>codepen/attarinchai</a>
        </blockquote>
        <label id="experience-nav" for="experience" style={darkMode ? text : null}><h2>{t.expHead}</h2></label>
        <section id="experience" className="experience" style={darkMode ? sectionBgLast : null}>
          <div className='rotate' style={darkMode ? flag : null}>
            <h3>{t.expH3}</h3>
            <h4>{t.expH4}</h4>
            <p>{t.expP}</p>
            <h6>{t.expH6}</h6>
          </div>
          <div>
            <Board backgroundColor={darkMode ? '#FFEFEF' : 'white'} />
          </div>
        </section>
        <footer id="contacts" className='contacts'>
          <p>{t.footP}</p>
          <div>
            <h1>{t.footHead}</h1>
            <p><span className='vertical-align'><a href="https://www.facebook.com/attarinchai" target='_blank' style={{color: 'inherit', textDecoration: 'none'}}>{t.facebook}</a></span><i class="fa-brands fa-square-facebook"></i></p>
            <p><span className='vertical-align'><a href="https://attarinchai_ru@outlook.co.th" target='_blank' style={{color: 'inherit', textDecoration: 'none'}}>{t.outlook}</a></span><i class="fa-solid fa-envelope"></i></p>
            <p><span className='vertical-align'>{t.number}</span><i class="fa-solid fa-phone"></i></p>
          </div>
        </footer>
      </main>
    </div>
  );
} 

export default MainPage;