import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Row, Col, Container } from "react-bootstrap";
import CategoriesCarousel from "./common/CategoriesCarousel";
import ProductItems from "./common/ProductItems";
import SideBarTitle from "./common/SideBarTitle";
import SideBarFilter from "./common/SideBarFilter";
import SearchBar from "./common/SearchBar";
import { BASE_URL, FETCH } from "../constants/vendor";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

let input = {
  lat: "28.6261",
  lng: "79.821602",
  is_veg: "NO",
  rating_avg: 0,
  distance: 5,
};

const callVendorList = async (params: any = {}) => {
  input = { ...input, ...params };

  return await fetch(BASE_URL + FETCH, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
};

function List(props: any) {
  const location = useLocation();

  let [list, setList] = useState([]);

  let { lat, lng } = props.location.coordinates;
  let locName = props.location.name;

  useEffect(() => {
    callVendorList({ lat, lng })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* <PageTitle
        title="Offers Near You"
        subTitle="Best deals at your favourite restaurants"
      /> */}
      <section className="section pt-5 searchBarSection">
        <Container>
          <SearchBar />
        </Container>
      </section>
      <section className="section pt-5 pb-5 products-listing">
        <Container>
          <SideBarTitle />
          <Row>
            <Col md={3}>
              <SideBarFilter filterList={list} />
            </Col>
            <Col md={9}>
              <CategoriesCarousel />
              <ProductItems products={list} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

function mapStateToProps(state: any) {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(List);
