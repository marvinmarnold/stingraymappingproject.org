import React from 'react';

export default class HomePageEnd extends React.Component {
  render() {
    return (
      <div id='home-end' className='text-xs-center'>
        <div className='p-y-3 container'>
          <h1 className="m-y-2"><strong>Download StingWatch</strong> to know when you're at risk and to help us all see who's being targeted.</h1>
          <a href="https://play.google.com/apps/testing/org.stingraymappingproject.sting_watch" className='text-xs-center'>
            <img src='vendor/play-white.jpg' className='center-block img-primary' />
          </a>
        </div>
      </div>
    )
  }
}
