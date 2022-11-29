import React from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import CardItem from "./CardItem";
const ProductItems = (props: any) => {
  const products: any = [];
  props.products.forEach((product: any) => {
    products.push(
      <Col md={4} sm={6} key={product.id} className="mb-4 pb-2">
        <CardItem
          title={product.name}
          subTitle={product.is_veg === "YES" ? "VEG" : "ALL"}
          imageAlt="Product"
          image={product.logo_url || ""}
          imageClass="img-fluid item-img"
          linkUrl="124242/detail"
          offerText="65% off | Use Coupon OSAHAN50"
          time={"0.00"}
          price={"0.0"}
          showPromoted={product.is_promoted === "YES"}
          promotedVariant="dark"
          favIcoIconColor="text-danger"
          rating={product.rating_avg + " (" + product.rating_count + "+)"}
        />
      </Col>
    );
  });

  return (
    <Row>
      {products}
      <Col md={12} className="text-center load-more">
        <Button variant="primary" type="button" disabled="">
          <Spinner animation="grow" size="sm" className="mr-1" />
          Loading...
        </Button>
      </Col>
    </Row>
  );
};

export default ProductItems;
