HomeCanDo = React.createClass({
  render() {
    return (
      <div id='home-can-do' className='text-xs-center'>
        <div className="container p-a-3">
          <h4 className="m-t-2">
            Stingrays can capture information from <u>all cell phones</u> within range, including:
          </h4>
          <div className="row m-t-3 m-b-2">
            <div className ="col-xs-2">
              <h3><i className="fa fa-user-secret"></i>&nbsp;&nbsp;identity</h3>
            </div>
            <div className ="col-xs-2">
              <h3><i className="fa fa-location-arrow"></i>&nbsp;&nbsp;location</h3>

              </div>
            <div className ="col-xs-2">
              <h3><i className="fa fa-envelope-o"></i>&nbsp;&nbsp;SMS</h3>
            </div>

            <div className ="col-xs-3">
              <h3><i className="fa fa-calendar-o"></i>&nbsp;&nbsp;call logs</h3>
            </div>

            <div className ="col-xs-3">
              <h3><i className="fa fa-phone"></i>&nbsp;&nbsp;call content</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
