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
import { guestHeaders, methodProps } from "../constants/apis";

let input = {
  lat: 0,
  lng: 0,
};

function List(props: any) {
  let [list, setList] = useState([]);

  let [loading, setLoading] = useState(true);

  let lat = 0,
    lng = 0;

  props.vendor.then((res: any) => {
    lat = res.location.lat;
    lng = res.location.lng;
    setList(res.list);
    setLoading(false);
    input = res.search;
  });

  const onFilter = (params: any) => {
    callVendorList({ ...params });
  };

  const callVendorList = async (params: any = {}) => {
    setLoading(true);
    input = { ...input, ...params };

    props.dispatch({ type: "LOCATION", payload: input });
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
