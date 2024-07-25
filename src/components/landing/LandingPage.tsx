import './LandingPage.scss';

import HeaderLanding from './components/HeaderLanding';


const LandingPage = () => {

  return (
    <div className="landing-page">
      <div className="grid-container">
        <div className="grid-item item-combined">
          <HeaderLanding />
        </div>
   

      </div>
    </div>
  );
};

export default LandingPage;