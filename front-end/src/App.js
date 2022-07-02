import { useState } from "react";
import "./App.css";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
function App() {
  const [viewState, setViewState] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  return (
    <div className="App">
      <Map
        {...viewState}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={mapboxToken}
      >
        <Marker longitude={-122.4376} latitude={37.7577} anchor="bottom">
          <LocationOnIcon
            style={{ fontSize: viewState.zoom * 7 }}
            sx={{ color: "red" }}
          />
        </Marker>
        <Popup
          longitude={-122.4376}
          latitude={37.7577}
          anchor="bottom"
          // onClose={() => setShowPopup(false)}
        >
          <div className="card">
            <label>Place</label>
            <h4 className="place">SanFransisco</h4>
            <label>Review</label>
            <p>Golden Gate is Amazing</p>
            <label>Rating</label>
            <div className="starts">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <label>Information</label>
            <span className="username">
              Created by <b>Shahmar</b>
            </span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup>
      </Map>
    </div>
  );
}

export default App;
