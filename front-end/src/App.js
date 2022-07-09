import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import Register from "./components/Register";
import Login from "./components/Login";
import { useSelector, useDispatch } from "react-redux";
import { setPinId } from "./redux/pinSlice";

import * as timeago from "timeago.js";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const pinId = useSelector((state) => state.pin.pinId);
  const dispatch = useDispatch();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
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
              <Marker
                longitude={pin.long}
                latitude={pin.lat}
                anchor="bottom"
                offsetLeft={-3.5 * viewState.zoom}
                offsetTop={-7 * viewState.zoom}
              >
                <LocationOnIcon
                  style={{ fontSize: viewState.zoom * 7, cursor: "pointer" }}
                  sx={{
                    color: pin.username === currentUsername ? "red" : "blue",
                  }}
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
                      {Array(pin.rating).fill(<StarIcon className="star" />)}
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
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Where is it?"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label>Review</label>
                <textarea
                  placeholder="What was memorable?"
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />

                <label>Rating</label>
                <select
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                >
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
        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <div className="buttons">
            <button
              className="button login"
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
              }}
            >
              Login
            </button>
            <button
              className="button register"
              onClick={() => {
                setShowRegister(true);
                setShowLogin(false);
              }}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUsername={setCurrentUsername}
          />
        )}
      </Map>
    </div>
  );
}

export default App;
