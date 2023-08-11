import React from "react";
import Section_header from "../components/section_headers";
import Small_btn from "../components/small_btn";
import { client_domain } from "../assets/js/utils/constants";

class Annual_sub extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { user } = this.props;

    return (
      <Section_header
        title="Already a"
        color_title="Member"
        btn={
          <Small_btn
            title="View Membership"
            action={() =>
              window.location.assign(
                `${client_domain}/profile?u=${user._id}&tab=membership`
              )
            }
          />
        }
      />
    );
  }
}

export default Annual_sub;
