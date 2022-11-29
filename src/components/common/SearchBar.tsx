import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select2 from "react-select2-wrapper";
import { Form } from "react-bootstrap";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import { usePlacesWidget } from "react-google-autocomplete";
import Geocode from "react-geocode";
import { useNavigate } from "react-router-dom";

const SearchBar = (props: any) => {
  Geocode.setLanguage("en");

  Geocode.setApiKey("AIzaSyBhVIXKdp4FXoHLxNqKoPHpjZQk7sc0-pI");

  Geocode.setLocationType("ROOFTOP");

  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({});

  const { ref } = usePlacesWidget({
    apiKey: `AIzaSyBhVIXKdp4FXoHLxNqKoPHpjZQk7sc0-pI`,
    onPlaceSelected: (place) => {
      fetchAddress(place);
    },
    options: {
      // types: ["(cities)"], //REGIONS
      componentRestrictions: { country: "in" },
    },
  });

  const fetchAddress = (response: any) => {
    let city, state, locality, country;
    for (let i = 0; i < response.results[0].address_components.length; i++) {
      for (
        let j = 0;
        j < response.results[0].address_components[i].types.length;
        j++
      ) {
        switch (response.results[0].address_components[i].types[j]) {
          case "sublocality_level_1":
            locality = response.results[0].address_components[i].long_name;
            break;
          case "locality":
            city = response.results[0].address_components[i].long_name;
            break;
          case "administrative_area_level_1":
            state = response.results[0].address_components[i].long_name;
            break;
          case "country":
            country = response.results[0].address_components[i].long_name;
            break;
        }
      }
    }
    setLocation(locality + ", " + city + ", " + state + ", " + country);
    setCoordinates(response.results[0].geometry.location);
  };

  const onLocateHandler = async () => {
    await navigator.geolocation.getCurrentPosition(
      function (position) {
        Geocode.fromLatLng(
          position.coords.latitude.toString(),
          position.coords.longitude.toString()
        ).then(
          (response: any) => {
            fetchAddress(response);
          },
          (error: any) => {
            console.error(error);
          }
        );
      },
      function (error) {
        alert("Error Code = " + error.code + " - " + error.message);
      }
    );
  };

  const onSearch = () => {
    const state = { location: { coordinates, name: location } };
    props.dispatch({ type: "LOCATION", payload: state });
    console.log("OnSearch", state);
    navigate("/listing");
  };

  return (
    <div className="homepage-search-form">
      <Form className="form-noborder">
        <div className="form-row">
          <Form.Group className="col-lg-3 col-md-3 col-sm-12">
            <div className="location-dropdown">
              <Icofont icon="location-arrow" />
              <Select2
                className="custom-select"
                data={[
                  { text: "Breakfast", id: 1 },
                  { text: "Lunch", id: 2 },
                  { text: "Dinner", id: 3 },
                  { text: "Cafés", id: 4 },
                  { text: "Delivery", id: 5 },
                ]}
                options={{
                  placeholder: "Quick Searches",
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="col-lg-7 col-md-7 col-sm-12">
            <Form.Control
              type="text"
              placeholder="Enter your delivery location"
              size="lg"
              ref={ref}
              value={location}
              onChange={(event: any) => {
                setLocation(event.target.value);
              }}
            />
            <Link className="locate-me" to="#" onClick={onLocateHandler}>
              <Icofont icon="ui-pointer" /> Locate Me
            </Link>
          </Form.Group>
          <Form.Group className="col-lg-2 col-md-2 col-sm-12">
            <Link
              to="listing"
              className="btn btn-primary btn-block btn-lg btn-gradient"
              onClick={onSearch}
            >
              Search
            </Link>
          </Form.Group>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log("Maps", state);
  return {
    location: { ...state },
  };
};
export default connect(mapStateToProps)(SearchBar);
