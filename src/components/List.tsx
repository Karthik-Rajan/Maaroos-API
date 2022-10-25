import React, { useState } from "react";
import _ from "lodash";
import { Row, Col, Container } from "react-bootstrap";
import CategoriesCarousel from "./common/CategoriesCarousel";
import ProductItems from "./common/ProductItems";
import SideBarTitle from "./common/SideBarTitle";
import SideBarFilter from "./common/SideBarFilter";
import SearchBar from "./common/SearchBar";
import { useLocation } from "react-router-dom";

function List() {
  const { state } = useLocation();

  console.log(state);

  const vendorList: any = [
    {
      id: "l1",
      name: "Bite me Sand wiches",
      location: "Madipakkam",
      distance: 1,
      rating: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS613-zWfTF6jiUFkzh4_mQza3b7x2FsbG4I2dNJtrl&s",
      type: "VEG",
      isFavourite: true,
      rated_count: 10,
      duration: "10 - 15 min",
    },
    {
      id: "l2",
      name: "Megalai Foods",
      location: "Madipakkam",
      distance: 2.5,
      rating: 3,
      image:
        "https://media.istockphoto.com/photos/clean-white-bath-towels-on-the-neatly-clean-bedroom-coziness-and-picture-id1303630250?b=1&k=20&m=1303630250&s=170667a&w=0&h=zzWNuiaNn6hv1MxXQMSHAl4tKY2Me8Yg03htMMsaxhI=",
      type: "ALL",
      isFavourite: true,
      rated_count: 10,
      duration: "10 - 15 min",
    },
    {
      id: "l3",
      name: "Mega Food Store",
      location: "Madipakkam",
      distance: 6,
      rating: 2,
      image: "",
      type: "ALL",
      isFavourite: true,
      rated_count: 10,
      duration: "10 - 15 min",
    },
  ];

  let [list, setList] = useState(vendorList);

  type FilterObject = { distance: number; type: string; rating: number };

  const filterList = (filterObj: FilterObject) => {
    list = vendorList;

    const updatedList = _.filter(list, (each) => {
      return (
        //Type Condition
        (filterObj.type === "VEG" ? filterObj.type === each.type : true) &&
        //Distance Condition
        filterObj.distance >= each.distance &&
        //Rating Condition
        (filterObj.rating ? filterObj.rating <= each.rating : true)
      );
    });
    setList(updatedList);
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
              <SideBarFilter filterList={filterList} />
            </Col>
            <Col md={9}>
              <CategoriesCarousel />
              <ProductItems products={vendorList} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default List;
