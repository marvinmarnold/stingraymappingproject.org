import React from 'react';
import ServiceCallsMap from '../components/service-calls-map.jsx';

export default class NOPDServiceCallsPage extends React.Component {
  render() {
    return (
      <div>
        <h1>NOPD response time</h1>
        <ServiceCallsMap />
        <p>
          Source
          &nbsp;<a href="https://data.nola.gov/Public-Safety-and-Preparedness/Calls-for-Service-2016/wgrp-d3ma">
            https://data.nola.gov/Public-Safety-and-Preparedness/Calls-for-Service-2016/wgrp-d3ma
          </a> and US Census 2010
        </p>
      </div>
    )
  }
}
