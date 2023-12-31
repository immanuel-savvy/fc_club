import React from "react";
import { Link } from "react-router-dom";
import {
  academy,
  organisation_name,
  shop_domain,
} from "../assets/js/utils/constants";
import Toaster from "../components/toast";
import { emitter } from "../Fctouch";
import { Nav_context } from "../Contexts";
import Socials from "../components/socials";

let navs = new Array("academy", "shop");

const rewards = new Object({
  create_voucher: 100,
  ticket_sales: 5,
  offer_voucher_sales: 5,
  subscription_fee: 15000,
});

const scroll_to_top = () => window.scrollTo({ top: 0, behavior: "smooth" });

const save_to_session = (key, value) =>
  window.sessionStorage.setItem(
    key,
    typeof value === "string" ? value : JSON.stringify(value)
  );

const get_session = (key) => {
  let value = window.sessionStorage.getItem(key);

  try {
    value = JSON.parse(value);
  } catch (e) {}

  return value;
};

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.toggle_toast = ({ message, title }) => {
      clearTimeout(this.clear_toast);
      this.setState({ message, title }, () => {
        this.clear_toast = setTimeout(
          () => this.setState({ title: "", message: "" }),
          3000
        );
      });
    };

    emitter.listen("toggle_toast", this.toggle_toast);
  };

  componentWillUnmount = () => {
    emitter.remove_listener("toggle_toast", this.toggle_toast);
  };

  render() {
    let { message, title } = this.state;

    return (
      <Nav_context.Consumer>
        {({ logo }) => {
          return (
            <footer
              className="dark-footer skin-dark-footer style-2"
              style={{ backgroundColor: "#000" }}
            >
              <div className="footer-middle">
                <Socials />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-md-5">
                      <div className="footer_widget">
                        <Link to="/">
                          <img
                            src={
                              logo?.logo_light
                                ? `${domain}/images/${logo.logo_light}`
                                : require(`../assets/img/logo_light.png`)
                            }
                            className="img-footer small mb-2"
                            alt=""
                          />
                        </Link>

                        <h6 className="extream text-light mb-3">UK</h6>
                        <p className="text-light">
                          Unleash Your Passion for Football!
                        </p>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-7 ml-auto">
                      <div className="row">
                        <div className="col-lg-4 col-md-4">
                          <div className="footer_widget">
                            <h4 className="widget_title">Useful Links</h4>
                            <ul className="footer-menu">
                              {navs.map((nav) => (
                                <li
                                  className={`text-light`}
                                  key={nav}
                                  onClick={scroll_to_top}
                                >
                                  {nav === "shop" ? (
                                    <a href={shop_domain}>Shop</a>
                                  ) : nav === "academy" ? (
                                    <a href={academy}>Academy</a>
                                  ) : (
                                    <Link to={"/"}>{nav || "home"}</Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                          <div className="footer_widget">
                            <h4 className="widget_title">Company</h4>
                            <ul className="footer-menu">
                              <li>
                                <Link to={`/about`}>About</Link>
                              </li>
                              <li>
                                <Link to={`/blog`}>Blog</Link>
                              </li>
                              <li>
                                <Link to={`/testimonials`}>Testimonials</Link>
                              </li>
                              <li>
                                <Link to={`/contact`}>Contact</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="footer-bottom"
                style={{ backgroundColor: "#000" }}
              >
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-12 col-md-12 text-center">
                      <p className="mb-0">
                        © 2018-{new Date().getFullYear()} {organisation_name}.
                        All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {message && title ? (
                <Toaster message={message} title={title} />
              ) : null}
            </footer>
          );
        }}
      </Nav_context.Consumer>
    );
  }
}

export default Footer;
export { scroll_to_top, save_to_session, get_session, rewards };
