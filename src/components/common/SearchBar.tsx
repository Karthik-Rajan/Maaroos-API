import React, { useEffect, useState } from "react";
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

  let coordinates = {};

  useEffect(() => {}, []);

  const [location, setLocation] = useState("");

  const { ref } = usePlacesWidget({
    apiKey: `AIzaSyBhVIXKdp4FXoHLxNqKoPHpjZQk7sc0-pI`,
    onPlaceSelected: (place) => {
      let { name, coordinates } = fetchAddress(place);
      setLocation(name);
    },
    options: {
      // types: ["(cities)"], //REGIONS
      componentRestrictions: { country: "in" },
    },
  });

  const fetchAddress = (response: any) => {
    const address = response.results[0]?.formatted_address;
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

    return {
      name: locality + ", " + city + ", " + state + ", " + country,
      coordinates: response.results[0].geometry.location,
    };
  };

  const onLocateHandler = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        Geocode.fromLatLng(
          position.coords.latitude.toString(),
          position.coords.longitude.toString()
        ).then(
          (response: any) => {
            let { name, coordinates } = fetchAddress(response);
            setLocation(name);
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
    console.log(state);
    navigate("/listing", { state });
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
export default SearchBar;
