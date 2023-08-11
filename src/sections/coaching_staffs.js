import React from "react";
import { get_request } from "../assets/js/utils/services";
import Loadindicator from "../components/loadindicator";
import Section_header from "../components/section_headers";
import Staff_member from "../components/staff_member";

class Coaching_staffs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    let staff_members = await get_request("staff_members");

    this.setState({ staff_members });
  };

  render() {
    let { staff_members } = this.state;

    if (staff_members && !staff_members.length) return;

    return (
      <section class="min gray">
        <div class="container">
          <Section_header
            title="Meet our "
            color_title="Coaches"
            description="Our management teams consist of experienced professionals with a wealth of knowledge and expertise in their respective fields."
          />

          <div class="row justify-content-center">
            {staff_members ? (
              staff_members.map((member) => (
                <Staff_member member={member} key={member._id} />
              ))
            ) : (
              <Loadindicator />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Coaching_staffs;
