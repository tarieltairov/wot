import Header from "./components/Header/Header";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TanksContextProvider from "./context/TanksContext";
import Routing from "./Routing";
import CommentContextProvider from "./context/commentsContext";
import CartContextProvider from "./context/cartContext";
import FavouriteContextProvider from "./context/favouritesContext";
import LikesContextProvider from "./context/likesContext";

const App = () => {
  return (
    <div>
      <TanksContextProvider>
        <CommentContextProvider>
          <CartContextProvider>
            <FavouriteContextProvider>
              <LikesContextProvider>
                <BrowserRouter>
                  <Header />
                  <Routing />
                  <Footer />
                </BrowserRouter>
              </LikesContextProvider>
            </FavouriteContextProvider>
          </CartContextProvider>
        </CommentContextProvider>
      </TanksContextProvider>
    </div>
  );
};

export default App;
