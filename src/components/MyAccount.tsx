import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { NavLink, Link, BrowserRouter, useNavigate } from "react-router-dom";
import { Row, Col, Container, Image } from "react-bootstrap";
import Offers from "./myaccount/Offers";
import Orders from "./myaccount/Orders";
import Favourites from "./myaccount/Favourites";
import Payments from "./myaccount/Payments";
import Addresses from "./myaccount/Addresses";
import EditProfileModal from "./modals/EditProfileModal";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import awsConfig from "./../awsConfig";
import TrackOrder from "./TrackOrder";

const MyAccount = () => {
  Amplify.configure(awsConfig);
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   Auth.currentUserInfo()
  //     .then((res) => setUser(res))
  //     .catch((err) => {
  //       navigate("/");
  //     });
  // });

  const [showEditProfile, setShowEditProfile] = useState(false);

  const hideEditProfile = () => setShowEditProfile(false);

  const [page, setPage] = useState("orders");

  return (
    <>
      <EditProfileModal
        show={showEditProfile}
        onHide={() => setShowEditProfile(false)}
      />
      <section className="section pt-4 pb-4 osahan-account-page">
        <Container>
          <Row>
            <Col md={3}>
              <div className="osahan-account-page-left shadow-sm bg-white h-100">
                <div className="border-bottom p-4">
                  <div className="osahan-user text-center">
                    <div className="osahan-user-media">
                      <Image
                        className="mb-3 rounded-pill shadow-sm mt-1"
                        src="/img/user/4.png"
                        alt="gurdeep singh osahan"
                      />
                      <div className="osahan-user-media-body">
                        <h6 className="mb-2">Gurdeep Singh</h6>
                        <p className="mb-1">+91 85680-79956</p>
                        <p>iamosahan@gmail.com</p>
                        <p className="mb-0 text-black font-weight-bold">
                          <Link
                            to="#"
                            onClick={() => setShowEditProfile(true)}
                            className="text-primary mr-3"
                          >
                            <i className="icofont-ui-edit"></i> EDIT
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="nav flex-column border-0 pt-4 pl-4 pb-4 noPadding">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to=""
                      onClick={() => setPage("orders")}
                    >
                      <i className="icofont-food-cart"></i> Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to=""
                      onClick={() => setPage("offers")}
                    >
                      <i className="icofont-sale-discount"></i> Offers
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to=""
                      onClick={() => setPage("favourites")}
                    >
                      <i className="icofont-heart"></i> Favourites
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to=""
                      onClick={() => setPage("payments")}
                    >
                      <i className="icofont-credit-card"></i> Payments
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to=""
                      onClick={() => setPage("addresses")}
                    >
                      <i className="icofont-location-pin"></i> Addresses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to=""
                      onClick={() => setPage("track-order")}
                    >
                      <i className="icofont-fast-delivery"></i> Track Order
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={9}>
              {/* <BrowserRouter>
                <Routes>
                  <Route path="/myaccount/orders" element={<Orders />} />
                  <Route path="/myaccount/offers" element={<Offers />} />
                  <Route
                    path="/myaccount/favourites"
                    element={<Favourites />}
                  />
                  <Route path="/myaccount/payments" element={<Payments />} />
                  <Route path="/myaccount/addresses" element={<Addresses />} />
                </Routes>
              </BrowserRouter> */}
              {page === "orders" ? <Orders /> : ""}
              {page === "offers" ? <Offers /> : ""}
              {page === "favourites" ? <Favourites /> : ""}
              {page === "payments" ? <Payments /> : ""}
              {page === "addresses" ? <Addresses /> : ""}
              {page === "track-order" ? <TrackOrder /> : ""}

              {/* <Switch>
                <Route path="/myaccount/orders" exact component={Orders} />
                <Route path="/myaccount/offers" exact component={Offers} />
                <Route
                  path="/myaccount/favourites"
                  exact
                  component={Favourites}
                />
                <Route path="/myaccount/payments" exact component={Payments} />
                <Route
                  path="/myaccount/addresses"
                  exact
                  component={Addresses}
                />
              </Switch> */}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MyAccount;