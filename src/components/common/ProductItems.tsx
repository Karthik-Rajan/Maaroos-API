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
          subTitle={product.type}
          imageAlt="Product"
          image={product.image}
          imageClass="img-fluid item-img"
          linkUrl="detail"
          offerText="65% off | Use Coupon OSAHAN50"
          time={product.duration}
          price={product.price}
          showPromoted={true}
          promotedVariant="dark"
          favIcoIconColor="text-danger"
          rating={product.rating + "(" + product.rated_count + "+)"}
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
