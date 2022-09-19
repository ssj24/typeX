import React from 'react';

const Tabs = (props) => {
  const formTabs = [
    '고객정보',
    '파일 업로드',
    '녹취내용',
    '추가정보',
    '작성내역 확인'
  ];
  const tabList = formTabs.map((tab, idx) => {
    if (idx === 2 || idx === 3) {
      return (
        <li key={tab} className="tabList disabled">
          <p className="idxP">{idx+1}</p>
          <p>{tab}</p>
        </li>);
    }
    let classList = "tabList";
    if (props.step === idx + 1) classList += " current";
    else if (props.step === 3 & idx === 4) classList +=" current";
    else if (props.verified[idx+1]) classList += " active";
    return (
      <li key={tab} className={classList}>
        <p className="idxP">{idx+1}</p>
        <p>{tab}</p>
      </li>);
  })
  return (
    <div className="tabWrapper">
      <ul>
        {tabList}
      </ul>
    </div>
  );
};

export default Tabs;