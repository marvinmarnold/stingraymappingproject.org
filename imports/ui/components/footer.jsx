import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div id="footer" className='text-xs-center p-a-3'>
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" src="vendor/cc.png" />
        </a>&nbsp;&nbsp;
        <small>
          <span>Stingray Mapping Project</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
        </small>
      </div>
    )
  }
}
