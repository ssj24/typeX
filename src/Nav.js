import React from 'react';
import logo from './assets/logo.png';

const Nav = () => {
  const menuList = [
    '메인',
    '서비스 신청',
    '서비스 소개',
    '업무 프로세스',
    '자주 묻는 질문',
    '문의하기',
    '기업고객'
  ];
  const menuEl = menuList.map((menu, idx) => {
    return <li className={idx === 1 ? "menu active" : "menu disabled"}
      key={menu}>{menu}</li>
  });
  return (
    <div className="mainNav">
      <img className="logoImg" src={logo} alt="logo"></img>
      <ul>
        {menuEl}
      </ul>
    </div>
  );
};

export default Nav;