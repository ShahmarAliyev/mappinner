import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPinId } from "./redux/pinSlice";

import axios from "axios";
import "./App.css";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as timeago from "timeago.js";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  const currentUser = "Shahmar";
  const pinId = useSelector((state) => state.pin.pinId);
  const dispatch = useDispatch();
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 9,
  });
  const handleIconClick = (_pinId, lat, long) => {
    dispatch(setPinId(_pinId));
    setViewState({
      ...viewState,
      latitude: lat,
      longitude: long,
    });
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/pins");
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);
  const handleAddClick = (e) => {
    console.log(e);
    const { lat, lng } = e.lngLat;
    setNewPlace({
      lat,
      lng,
    });
    console.log(newPlace);
  };

  return (
    <div className="App">
      <Map
        {...viewState}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={mapboxToken}
        onDblClick={handleAddClick}
      >
        {pins.map((pin) => {
          return (
            <React.Fragment key={pin._id}>
              <Marker longitude={pin.long} latitude={pin.lat} anchor="bottom">
                <LocationOnIcon
                  style={{ fontSize: viewState.zoom * 7, cursor: "pointer" }}
                  sx={{ color: pin.username === currentUser ? "red" : "blue" }}
                  onClick={() => handleIconClick(pin._id, pin.lat, pin.long)}
                />
              </Marker>
              {pinId === pin._id && (
                <Popup
                  longitude={pin.long}
                  latitude={pin.lat}
                  anchor="bottom"
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => {
                    dispatch(setPinId(null));
                    // setNewPlace(null);
                  }}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{pin.title}</h4>
                    <label>Review</label>
                    <p>{pin.desc}</p>
                    <label>Rating</label>
                    <div className="starts">
                      <StarIcon className="star" />
                      <StarIcon className="star" />
                      <StarIcon className="star" />
                      <StarIcon className="star" />
                      <StarIcon className="star" />
                    </div>
                    <label>Information</label>
                    <span className="username">
                      Created by <b>{pin.username}</b>
                    </span>
                    <span className="date">
                      {timeago.format(pin.createdAt)}
                    </span>
                  </div>
                </Popup>
              )}
              )
            </React.Fragment>
          );
        })}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            anchor="bottom"
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              dispatch(setPinId(null));
              setNewPlace(null);
            }}
          >
            <div className="card">
              <form>
                <label>Title</label>
                <input placeholder="Where is it?" />
                <label>Review</label>
                <textarea placeholder="What was memorable?" />

                <label>Rating</label>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        newPlace
      </Map>
    </div>
  );
}

export default App;
