import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./layouts/Header.jsx";
import MainContent from "./layouts/MainContent.jsx";
import Footer from "./layouts/Footer.jsx";

export default class Main extends Component {
  render() {
    const { popup, mainContent } = this.props;
    return (
      <div style={fullHeight}>
        <Header />
        <MainContent>{mainContent}</MainContent>
        <Footer />
        {popup}
      </div>
    );
  }
}

// property validation
Main.propTypes = {
  mainContent: PropTypes.object,
  bottom: PropTypes.object,
  popup: PropTypes.object,
};

// full height
const fullHeight = {
  height: "100%",
};
