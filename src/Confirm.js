import React from 'react';

const Confirm = (props) => {
  const files = props.file.map((f) => {
    let h = parseInt(f.duration / 3600, 10);
    let m = parseInt(f.duration % 3600 / 60, 10);
    let s = parseInt(f.duration % 3600 % 60 , 10);
    return (
      <div key={f.link}>
        <p>{f.name}</p>
        <p>{f.unit}</p>
        <p>{f.link}</p>
        <p>{h<10 ? '0'+h : h}:{m<10 ? '0'+m : m}:{s<10 ? '0'+s : s}</p>
      </div>
    )
  });
  return (
    <div className="wrapper confirmWrapper">
      <h1>5. 작성내역 확인</h1>
      <div className="fileContainer">
        {files}
      </div>
      
      {props.info.name} / 
      {props.info.phone} / 
      {props.info.email}
      <div className="buttons">
      <button onClick={(e) => {
                e.preventDefault();
                props.stepHandler(2);
              }} className="btn prev">
        이전으로
      </button>
      <button onClick={() => {}}
              className="btn next"
              disabled={props.verified[3] ? "" : true}>
        완료
      </button>
    </div>;

    </div>
  );
};

export default Confirm;