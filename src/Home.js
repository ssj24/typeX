import React, {useState} from 'react';
import Form from './Form';
import Nav from './Nav';
import logo from './logo.png';

const Home = () => {
  const [disp, setDisp] = useState(true);
  return (
    <div className="wrapper homeWrapper">
      {disp ? <Nav /> : 
              <img src={logo} alt="logo" className="topLogo"
                   onClick={() => {window.location.reload()}} />}
      <Form disp={disp} dispHandler={setDisp} />
    </div>
  );
};

export default Home;