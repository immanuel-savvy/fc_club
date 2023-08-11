import React from "react";
import { academy } from "../assets/js/utils/constants";

class Page_not_found extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    window.location.assign(
      `${academy}${window.location.pathname + window.location.search}`
    );
  };

  render() {
    return <div className="main-wrapper"></div>;
  }
}

export default Page_not_found;
