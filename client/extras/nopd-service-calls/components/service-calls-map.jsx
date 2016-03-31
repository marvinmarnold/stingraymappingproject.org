import React from 'react';

let map
let tractsLayer
var priorityNum
var nopdType

export default class ServiceCallsMap extends React.Component {
  constructor(props) {
    super(props);

    priorityNum = new ReactiveVar(undefined)
    nopdType = new ReactiveVar(undefined)
  }

  componentDidMount() {
    let thiz = this
    Tracker.autorun(function(){
      if(Mapbox.loaded()) {
        console.log('done loading');
        if(!map) {
          L.mapbox.accessToken = Meteor.settings.public.MAPBOX_TOKEN;

          map = L.mapbox.map('map', 'mapbox.streets').setView([
            29.942355,
            -90.078635
          ], 12);

          tractsLayer = L.mapbox.featureLayer().addTo(map);
        }

        if(!!map) {
          tractsLayer.setGeoJSON([])

          var selector = {}

          if(priorityNum.get())
            selector.priorityNum = priorityNum.get()

          if(nopdType.get())
            selector.nopdType = nopdType.get()

          Meteor.call("tracts/avg-waits", selector, function(error, avgWaits) {
            console.log("got waits");

            _.each(avgWaits, tractWait => {
              console.log("await");

              L.polygon(tractWait.latlngs, {color: "#000"})
                .bindLabel(tractLabel(tractWait))
                .addTo(tractsLayer);
            })
          })
        }
      }
    });
  }

  filterPriority(n) {
    priorityNum.set(n)
  }

  filterType(_type) {
    nopdType.set(_type)
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className="row">
          <div id='map' className='col-xs-12 col-lg-8'>
          </div>
          <div className='col-xs-12 col-lg-4'>
            <h2>Filter by Priority</h2>
            <button onClick={() => this.filterPriority(undefined)}>All Priorities</button>
            <button onClick={() => this.filterPriority(1)}>Low Priority</button>
            <button onClick={() => this.filterPriority(2)}>High Priority</button>

            <h2>Filter by Type</h2>
            <button onClick={() => this.filterType(undefined)}><i className='fa fa-star'></i> All Types</button>
            {_.map(NOPD_TYPES, (desc, _type) => {
              return <button key={_type} onClick={() => this.filterType(_type)}><i className='fa fa-star'></i> {_type} - {desc}</button>
            })}
          </div>
        </div>

      </div>
    )
  }
}

ServiceCallsMap.propTypes = {
  loading: React.PropTypes.bool,
  tracts: React.PropTypes.array,
  map: React.PropTypes.object
};

var tractLabel = function(tractWait) {
  return "Wait time: " + (tractWait.avg_wait / 1000 / 60 )+ "min\n" +
    "Percent white: " + parseInt(tractWait.pctWhite) + "%\n"
}
