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

function List(props: any) {
  let [list, setList] = useState([]);
  // let [input, setInput] = useState(data);

  let [loading, setLoading] = useState(true);

  let { lat, lng } = props.location.coordinates;
  let locName = props.location.name;

  useEffect(() => {
    callVendorList({ lat, lng })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const onFilter = (params: any) => {
    // setInput({ ...input, ...params });
    callVendorList({ ...input, ...params })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const callVendorList = async (params: any = {}) => {
    setLoading(true);
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
              <SideBarFilter filterList={list} onFilter={onFilter} />
            </Col>
            <Col md={9}>
              <CategoriesCarousel />
              <ProductItems products={list} loading={loading} />
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
