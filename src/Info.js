import React, {useState, useEffect} from 'react';
import right from './assets/right-arrow.png';

const Info = (props) => {
  const [name, setName] = useState(props.info.name);
  const [phone, setPhone] = useState(props.info.phone);
  const [email, setEmail] = useState(props.info.email);
  const [checks, setChecks] = useState(props.info.checks);
  const [checkStatus, setCheckStatus] = useState(props.info.checkStatus);

  useEffect(() => {
    if (name && phone && email && checkStatus) {
      props.verifiedHandler({...props.verified, 1: true});
      props.infoHandler({name: name, phone: phone, email: email, checks: checks, checkStatus: true});
    } else props.verifiedHandler({...props.verified, 1: false})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, phone, email, checks, checkStatus]);

  const verify = (e, idx) => {
    let target = e.target;
    let val = (idx === 3) ? target : target.value;
    if (idx === 0) setName(val);
    else if (idx === 1) {
      setPhone(val);
    } else if (idx === 2) setEmail(val);
  };
  const checkboxChanged = (e, idx) => {
    const newChecks = [...checks];
    if (idx === 7) newChecks[idx] = e.target.value;
    else if (idx === 8 && !e.target.checked) newChecks[7] = "";
    else newChecks[idx] = e.target.checked;
    setChecks(newChecks);
    for (let i=0; i<=7; i++) {
      if (newChecks[i]) return setCheckStatus(true);
      if (i === 7) return setCheckStatus(false);
    }
  }

  return (
    <div className="wrapper infoWrapper">
      <h1>1. 고객정보 입력<span>(필수입력)</span></h1>
      <form className="container">
        <table>
          <thead>
            <tr><th colSpan="2">안내 및 결과물을 전달드릴 연락처를 입력 부탁드립니다.</th></tr>
          </thead>
          <tbody>
            <tr>
              <td className="subTitle">
               <label htmlFor="name">이름</label>
              </td>
              <td>
                <input id="name" name="name" type="text"
                       onChange={(e) => verify(e, 0)}
                       value={name || ""} required/>
              </td>
            </tr>
            <tr>
              <td className="subTitle">
               <label htmlFor="phone">핸드폰</label>
              </td>
              <td>
                <input id="phone" name="phone" type="tel"
                       onChange={(e) => {
                         verify(e, 1)
                       }}
                       value={phone || ""} required/>
              </td>
            </tr>
            <tr>
              <td className="subTitle">
                 <label htmlFor="email">이메일</label>
              </td>
              <td>
                 <input id="email" name="email" type="email"
                        onChange={(e) => verify(e, 2)}
                        value={email || ""} required/>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="checkbox">
        <thead>
            <tr><th colSpan="4">typeX를 처음 접하신 경로가 어떻게 되시나요? <span className="secP">* 1개 이상 선택</span></th></tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input id="route1" name="route" type="checkbox" value="naver" 
                       onChange={(e) => checkboxChanged(e, 0)}
                       checked={checks[0]} />
                <label htmlFor="route1">네이버 검색</label>
              </td>
              <td>
                <input id="route2" name="route" type="checkbox" value="google" 
                       onChange={(e) => checkboxChanged(e, 1 )}
                       checked={checks[1]} />
                <label htmlFor="route2">구글 검색</label>
              </td>
              <td>
                <input id="route3" name="route" type="checkbox" value="blog" 
                       onChange={(e) => checkboxChanged(e, 2)}
                       checked={checks[2]} />
                <label htmlFor="route3">블로그 게시글</label>
              </td>
              <td>
                <input id="route4" name="route" type="checkbox" value="offline" 
                       onChange={(e) => checkboxChanged(e, 3)}
                       checked={checks[3]} />
                <label htmlFor="route4">오프라인 광고</label>
              </td>
            </tr>
            <tr>
              <td>
                <input id="route5" name="route" type="checkbox" value="person" 
                       onChange={(e) => checkboxChanged(e, 4)}
                       checked={checks[4]} />
                <label htmlFor="route5">지인 소개</label>
              </td>
              <td>
                <input id="route6" name="route" type="checkbox" value="revisit" 
                       onChange={(e) => checkboxChanged(e, 5)}
                       checked={checks[5]} />
                <label htmlFor="route6">재방문</label>
              </td>
              <td>
                <input id="route7" name="route" type="checkbox" value="ad" 
                       onChange={(e) => checkboxChanged(e, 6)}
                       checked={checks[6]} />
                <label htmlFor="route7">SNS 광고</label>
              </td>
              <td className="lastCheckbox">
                <label htmlFor="route8Input">
                  <input type="checkbox" id="route8" 
                         onClick={(e) => {
                          if(e.target.checked){ document.getElementById('route8Input').focus();
                         }}}
                         onChange={(e) => checkboxChanged(e, 8)}
                         checked={checks[7] ? true : ""} />
                </label>
                <input type="text" id="route8Input" name="route8Input"
                       onChange={(e) => checkboxChanged(e, 7)}
                       placeholder="기타"
                       value={checks[7] || ""} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="buttons">
          <div></div>
          <button onClick={(e) => {
                    e.preventDefault();
                    props.stepHandler(2);
                  }}
                  className="btn next"
                  type="submit"
                  value="submit"
                  disabled={props.verified[1] ? "" : true}>
            다음으로
            <img className="right" src={right} alt="right" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Info;