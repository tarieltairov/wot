import React, { useContext, useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../image/logo-3.png";
import {
  StarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons/lib/icons";
import { Badge } from "antd";
import { cartContext } from "../../context/cartContext";
import { favouriteContext } from "../../context/favouritesContext";

const Header = () => {
  const location = useLocation();
  const [email] = useState();
  const { getCart, cartLength } = useContext(cartContext);
  const { getFavourite, favouriteLength } = useContext(favouriteContext);

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getFavourite();
  }, []);

  return (
    <Navbar
      variant="light"
      className="d-flex justify-content-between"
      style={{
        height: "70px",
        width: "100%",
        background: "rgba(0,0,0,0.4)",
        position: "fixed",
        zIndex: "5",
      }}
    >
      <Container>
        <Link to="/">
          <img className="logo" width="65px" src={Logo} alt="" />
        </Link>
        <div className="route">
          {email === "tarieltairov1@gmail.com" ? (
            <Link
              className={
                location.pathname === "/add"
                  ? "navbar__item-active"
                  : "navbar__item"
              }
              to="/add"
            >
              ADD
            </Link>
          ) : null}

          <Link
            className={
              location.pathname === "/tanks"
                ? "navbar__item-active"
                : "navbar__item"
            }
            to="/tanks"
          >
            TANKS
          </Link>
        </div>

        <div
          style={{ width: "250px" }}
          className="icons"
        >
          <Link to="/cart">
            <Badge className="shop-icon" count={+cartLength}>
              <ShoppingCartOutlined
                className="shop-icon"
                style={{ color: "white" }}
              />
            </Badge>
          </Link>

          <Link to="/favourites">
            <Badge className="shop-icon" count={+favouriteLength}>
              <StarOutlined className="shop-icon" style={{ color: "white" }} />
            </Badge>
          </Link>

          {email ? (
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <div
                className="div-reg  d-flex justify-content-center align-items-center"
              >
                <div className="reg">Выйти</div>
              </div>
            </Link>
          ) : null}

          {email ? null : (
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <div className="div-reg  d-flex justify-content-center align-items-center">
                <div className="reg">Войти</div>
              </div>
            </Link>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
