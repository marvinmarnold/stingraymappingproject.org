import React from 'react';
import HomePageProblem from '../components/home-page/home-page-problem.jsx'
import HomePageSolution from '../components/home-page/home-page-solution.jsx'
import HomePageWhatIs from '../components/home-page/home-page-what-is.jsx'
import HomePageCanDo from '../components/home-page/home-page-can-do.jsx'
import HomePageNDAs from '../components/home-page/home-page-ndas.jsx'
import HomePageSpy from '../components/home-page/home-page-spy.jsx'
import HomePageFirstAmendment from '../components/home-page/home-page-first-amendment.jsx'
import HomePageWhosUsing from '../components/home-page/home-page-whos-using.jsx'
import HomePageFlags from '../components/home-page/home-page-flags.jsx'
import HomePageEnd from '../components/home-page/home-page-end.jsx'

export default class HomePage extends React.Component {
  render() {
    return (
      <div id="home">
        <HomePageProblem />
        <HomePageSolution />
        <HomePageWhatIs />
        <HomePageCanDo />
        <HomePageNDAs />
        <HomePageSpy />
        <HomePageFirstAmendment />
        <HomePageWhosUsing />
        <HomePageFlags />
        <HomePageEnd />
      </div>
    )
  }
}
