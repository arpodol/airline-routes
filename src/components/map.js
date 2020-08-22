import React from 'react';

function Map(props){
  return(
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>

        {props.routes.map(route => {
          const x1 = route.sourceLong;
          const y1 = route.sourceLat;
          const x2 = route.destinationLong;
          const y2 = route.destinationLat;

          return(
          <g key={`${route.source}to${route.destination}on${route.airline}`}>
          <circle className="source" cx={x1} cy={y1}>
            <title></title>
          </circle>
          <circle className="destination" cx={x2} cy={y2}>
            <title></title>
            </circle>
            <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
            </g>
          )
        })
        }

  </g>
</svg>
  )
}

export default Map;
