import React, { Component } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/home";
import Sukses from "./pages/sukses";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Sukses" element={<Sukses />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
