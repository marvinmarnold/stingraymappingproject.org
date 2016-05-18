import React from 'react';

export default class HomePageWhatIs extends React.Component {
  exp1() {
    return (
      <div className='strip strip-light'>
        <div className='container p-y-1 p-x-3'>
          <h3>
            Police Stingrays are mobile devices that <a href="https://www.aclu.org/issues/privacy-technology/surveillance-technologies/stingray-tracking-devices">simulate cell phone towers</a>
          </h3>
        </div>
      </div>
    )
  }

  exp2() {
    return (
      <div className='strip strip-dark'>
        <div className='container p-y-1 p-x-3'>
          <h3>
          Forcing <a href="http://www.usatoday.com/story/news/nation/2013/12/08/cellphone-data-spying-nsa-police/3902809/">nearby phones</a> to connect to them
          </h3>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="home-what-is" className='text-xs-center'>
        {this.exp1()}
        {this.exp2()}
      </div>
    )
  }
}
