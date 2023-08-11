import React from "react";
import Stretch_button from "./stretch_button";
import { email_regex } from "../assets/js/utils/functions";
import { get_session } from "../sections/footer";
import { post_request } from "../assets/js/utils/services";
import Alert_box from "./alert_box";

class Make_a_donation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.loggeduser = get_session("loggeduser");

    this.loggeduser?.email && this.setState({ email: this.loggeduser.email });
  };

  proceed = async () => {
    let { email, amount, loading } = this.state;
    if (loading) return;

    this.setState({ loading: true });

    let data = { email, amount: Number(amount), user: this.loggeduser?._id };
    let res = await post_request("make_donation", data);

    if (res?.url) window.location.assign(res.url);
    else
      this.setState({
        loading: false,
        message: res.message || "Couldn't initiate payment.",
      });
  };

  render() {
    let { toggle } = this.props;
    let { email, amount, loading, message } = this.state;

    return (
      <div>
        <div class="modal-content overli" id="loginmodal">
          <div class="modal-header">
            <h5 class="modal-title">Make a Donation</h5>
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
              <p className="lead text-center mx-5">
                Fill out your the info to us your donation
              </p>

              <hr />

              <form>
                <div class="form-group">
                  <label>Email</label>
                  <div class="input-with-icon">
                    <input
                      type="text"
                      class="form-control"
                      value={email}
                      onChange={({ target }) =>
                        this.setState({
                          email: target.value,
                          message: "",
                        })
                      }
                      placeholder="Email"
                    />
                    <i class="ti-user"></i>
                  </div>
                </div>
                <div class="form-group">
                  <label>Amount (&pound;)</label>
                  <div class="input-with-icon">
                    <input
                      type="number"
                      class="form-control"
                      value={amount}
                      onChange={({ target }) =>
                        this.setState({
                          amount: target.value,
                          message: "",
                        })
                      }
                      placeholder="0.00"
                    />
                    <i class="ti-money"></i>
                  </div>
                </div>
                {message ? <Alert_box message={message} /> : null}

                <Stretch_button
                  action={this.proceed}
                  title="Proceed"
                  disabled={
                    loading ||
                    !Number(amount) ||
                    Number(amount) < 0 ||
                    !email_regex.test(email)
                  }
                />
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Make_a_donation;
