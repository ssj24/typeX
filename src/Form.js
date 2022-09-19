import React, {useState, useEffect} from 'react';
import Info from './Info';
import File from './File';
import Confirm from './Confirm';
import Tabs from './Tabs';
import won from './assets/won.png';

const Form = (props) => {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    email: "",
    checkStatus: false,
    checks: Array(8).fill(false)
  });
  const [file, setFile] = useState([]);
  const [total, setTotal] = useState(0);
  const [verified, setVerified] = useState({0: true, 1: false, 2: false, 3: false});
  const buttonClicked = () => {
    setStep(1);
    props.dispHandler(!props.disp);
  };
  useEffect(() => {
    console.log(file);
    if (file.length) setVerified({...verified, 2: true})
    else setVerified({...verified, 2: false})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const stepList = [
    <Tabs verified={verified} step={step} />,
    <Info verified={verified} info={info} stepHandler={setStep} infoHandler={setInfo} verifiedHandler={setVerified} />,
    <File verified={verified} file={file} total={total} stepHandler={setStep} totalHandler={setTotal} fileHandler={setFile} />,
    <Confirm verified={verified} info={info} file={file} stepHandler={setStep} verifiedHandler={setVerified} />
  ];

  return (
    <div className="wrapper formWrapper">
      
      {step ? stepList[0] : ""}
      {step ? stepList[step] :
        <div className="formBody">
          <h1>서비스 신청</h1>
          <p className="desc">typeX의 합리적인 요금을 경험해보세요.</p>
          <h2><img src={won} alt="won" />증거용 녹취록 요금</h2>
          <section className="services">
            <section className="container leftSection">
              <p className="serviceSort">녹취공증 (24시간 완성)</p>
              <h3>₩25,000</h3>
              <p className="serviceSortDesc">/ 5분 이하 기본 요금 (5분 초과 시 1분당 5,000원 추가)</p>
              <div className="serviceDesc">
                <p>증거제출용 녹취록</p>
                <table>
                  <tbody>
                    <tr>
                        <td className="subTitle">화자 구분</td>
                        <td>○</td>
                    </tr>
                    <tr>
                        <td className="subTitle">완료 시간</td>
                        <td>결제완료 후 24시간 이내 초안전달</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="btn apply"
                      onClick={() => buttonClicked()}
              >신청하기</button>
            </section>
            <section className="container rightSection">
              <p className="serviceSort">녹취공증 익스프레스 (3시간 완성)</p>
              <h3>₩40,000</h3>
              <p className="serviceSortDesc">/ 5분 이하 기본 요금 (5분 초과 시 1분당 8,000원 추가)</p>
              <div className="serviceDesc">
                <p>증거제출용 녹취록</p>
                <table>
                  <tbody>
                    <tr>
                        <td className="subTitle">화자 구분</td>
                        <td>○</td>
                    </tr>
                    <tr>
                        <td className="subTitle">완료 시간</td>
                        <td>결제완료 후 3시간 이내 초안전달</td>
                    </tr>
                    <tr>
                        <td className="subTitle">접수가능시간</td>
                        <td>오후 18:00~오후 14:00</td>
                    </tr>
                  </tbody>
                </table>
                <p className="secP">※ 금요일 오후 14시 이후 ~ 일요일 오후 18시 이전 신청 불가</p>
              </div>
              <button disabled className="btn apply disabled">신청하기</button>
            </section>
          </section>
        </div>
      }
    </div>
  );
};

export default Form;