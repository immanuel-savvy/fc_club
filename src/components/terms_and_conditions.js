import React from "react";

class Terms_and_condition extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { toggle } = this.props;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Terms and Conditions</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => toggle && toggle()}
            >
              <span aria-hidden="true">
                <i class="fas fa-times-circle"></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="login-form">
              <p>
                <b>1.</b> Payment Policy:
              </p>
              <p>
                The club fee and associated costs are non-refundable. Payment is
                required upon registration to secure a spot in the club.
              </p>

              <p>
                <b>2.</b> Payment Authorization:
              </p>
              <p>
                By providing your payment information, you authorize us to
                charge your account for the subscription fee and any other
                applicable fees.
              </p>

              <p>
                <b>3.</b> Commitment and Attendance:
              </p>
              <p>
                I understand that regular attendance at training sessions and
                matches is expected to fully participate and benefit from the
                club's program. I commit to attending training at least once or
                twice a week as directed by the club.
              </p>

              <p>
                <b>4.</b> Termination:
              </p>
              <p>
                First Touch Academy reserves the right to terminate your
                membership without notice if you engage in any behaviour
              </p>

              <p>
                <b>5.</b> Release of Liability:
              </p>
              <p>
                By signing up for FC First Touch, you acknowledge that there are
                inherent risks associated with athletic activities and training
                sessions. You agree to release FC First Touch, its employees,
                and affiliates from any liability for any injuries or damages
                that may occur during training sessions, events, or other
                activities.
              </p>

              <p>
                <b>6.</b> Contact with the Academy:
              </p>
              <p>
                All communication between the customer and First Touch Academy
                shall occur via email or phone call only. No WhatsApp messages
                or other forms of communication will be accepted or replied to.
                All purchases made by the customer, including registrations and
                bookings, must be made directly through the Academy.
              </p>

              <p>
                <b>7.</b> Code of Conduct:
              </p>
              <p>
                I agree to adhere to the club's code of conduct, which includes
                exhibiting good sportsmanship, respecting coaches, and
                maintaining a positive attitude towards teammates, opponents,
                and officials.
              </p>

              <p>
                <b>8.</b> Parental Involvement:
              </p>
              <p>
                I understand that parents are expected to allow the coaches to
                coach players during training and matches, refraining from
                shouting out instructions from the sidelines.
              </p>

              <p>
                <b>9.</b> Safety and Well-being:
              </p>
              <p>
                I understand that FC First Touch prioritizes the safety and
                well-being of all players. I will promptly inform the coaches of
                any medical conditions, allergies, or injuries that may affect
                participation.
              </p>

              <p>
                <b>10.</b> Photography and Media Consent:
              </p>
              <p>
                I give consent for FC First Touch to use photographs or videos
                of the player for promotional and media purposes, unless
                otherwise specified in writing.
              </p>

              <hr />
              <p>
                Thank you for choosing FC First Touch. We look forward to a
                rewarding and successful year together.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Terms_and_condition;
