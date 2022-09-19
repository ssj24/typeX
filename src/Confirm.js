import React, {useState, useEffect} from 'react';
import left from './assets/left-arrow.png';

const Confirm = (props) => {
  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  const [term3, setTerm3] = useState(false);
  const files = props.file.map((f, idx) => {
    let h = parseInt(f.duration / 3600, 10);
    let m = parseInt(f.duration % 3600 / 60, 10);
    let s = parseInt(f.duration % 3600 % 60 , 10);
    return (
      <div key={f.link} className="fileList">
        <p><strong>{idx + 1}. </strong>{f.name}</p>
        <p><strong>부분녹취 </strong><span className="secP">(전체녹취)</span></p>
        <p><strong>총 녹취시간</strong> {h<10 ? '0'+h : h}:{m<10 ? '0'+m : m}:{s<10 ? '0'+s : s}</p>
      </div>
    )
  });
  useEffect(() => {
    if (term1 && term2 && term3) {
      props.verifiedHandler({...props.verified, 3: true});
    } else props.verifiedHandler({...props.verified, 3: false});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term1, term2, term3])
  return (
    <div className="wrapper confirmWrapper">
      <h1>5. 작성내역 확인</h1>
      <div className="container">
        <table>
          <tbody>
            <tr>
              <td className="subTitle">파일 목록</td>
              <td className="subValue">
                <div className="fileContainer">
                  {files}
                </div>
              </td>
            </tr>
            <tr>
              <td className="subTitle">고객 정보</td>
              <td>
                {props.info.name+" / "}
                {props.info.phone+" / "}
                {props.info.email}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="termsContainer">
          <span>
            <input id="term1" type="checkbox" name="term1"
                   checked={term1}
                   onChange={(e) => setTerm1(e.target.checked)} />
            <label htmlFor="term1">
              typeX의 <a href="/"><strong>이용 약관</strong></a> 및 <a href="/"><strong>개인정보처리방침</strong></a>에 동의합니다.
              <span className="priP">(필수체크)</span>
            </label>
          </span>
          <span>
            <input id="term2" type="checkbox" name="term2"
                   checked={term2}
                   onChange={(e) => setTerm2(e.target.checked)} />
            <label htmlFor="term2">
              typeX 서비스 신청 과정에서 필요한 <a href="/"><strong>개인정보 수집 및 이용</strong></a>에 동의합니다.
              <span className="priP">(필수체크)</span>
            </label>
          </span>
          <span>
            <input id="term3" type="checkbox" name="term3"
                   checked={term3}
                   onChange={(e) => setTerm3(e.target.checked)} />
            <label htmlFor="term3">
              서비스 제공을 위한 typeX의 <a href="/"><strong>개인 민감 정보의 수집 및 이용</strong></a>에 관한 사항에 동의합니다.
              <span className="priP">(필수체크)</span>
            </label>
          </span>
        </div>
        <p className="secP">* 영업시간은 주중 <strong>오전 10시 ~ 오후 5시</strong> 까지입니다.</p>
        <p className="secP">* 신청하신 작업은 <strong>입금 확인 후 영업일 기준 24시간 내</strong>에 완수됩니다.</p>
        <p className="secP">* 금요일 오후, 주말 접수건은 <strong>다음주 월요일 오전 10시 접수</strong>로 등록됩니다.</p>
        <p className="secP">* 방문접수, 방문수령은 불가합니다.</p>
        <p className="secP">* <strong>오후 4시 전까지 최종본 확정 시</strong> 등기 발송 가능합니다.</p>
        <div className="buttons">
          <button onClick={(e) => {
                    e.preventDefault();
                    props.stepHandler(2);
                  }} className="btn prev">
            <img className="left" src={left} alt="left" />
            이전으로
          </button>
          <button onClick={() => {}}
                  className="btn next"
                  disabled={props.verified[3] ? "" : true}>
            완료
          </button>
        </div>
      </div>

    </div>
  );
};

export default Confirm;