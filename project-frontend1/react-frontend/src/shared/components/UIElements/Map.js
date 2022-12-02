import React, { useRef,useEffect } from "react";

import "./Map.css";

const Map = (props) => {
    const mapRef = useRef();
    const { center, zoom } = props;
    useEffect(() => {
        // const map = (map = new window.google.maps.Map(
        //   document.getElementById("map_canvas"),
        //   myOptions
        // ));
        // new window.google.maps.Marker({ position: center, map: map });
        var map;
        	 var geocoder = new window.google.maps.Geocoder();
          var latlng = new window.google.maps.LatLng(40.77627, -73.910965);
          var myOptions = {
            zoom: 2,
            center: latlng,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          };
          map = new window.google.maps.Map(
            document.getElementById("map_canvas"),
            myOptions
          );
       
        
    }, [center, zoom]);
 
  return (
    <div id="map_canvas" 
      ref={mapRef}
      className={` map ${props.className}`}
      style={{'width':'40%','border' : '2px solid red'
    }}
    ></div>
  );
};

export default Map;
