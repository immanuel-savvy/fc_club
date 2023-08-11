import React from "react";
import ReactMarkdown from "react-markdown";
import { organisation_name } from "../assets/js/utils/constants";
import { get_request, post_request } from "../assets/js/utils/services";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";
import { A_tag, H1_tag, Img_tag, Li_tag } from "./Sponsors";
import Modal from "../components/modal";
import Terms_and_condition from "../components/terms_and_conditions";
import Login from "../components/login";
import Stretch_button from "../components/stretch_button";
import { Loggeduser } from "../Contexts";
import Annual_sub from "../sections/annual_sub";
import { parse_query, to_title } from "../assets/js/utils/functions";
import Handle_file_upload from "../components/handle_file_upload";
import File_input from "../components/file_input";
import Checkbox from "../components/checkbox";

class Membership extends Handle_file_upload {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Membership | ${organisation_name}`;
    scroll_to_top();

    let membership = await get_request("memberships_page");
    this.setState({ membership });

    if (!this.loggeduser) {
      let { u } = parse_query();
      if (u?.startsWith("users")) u = await get_request(`user/${u}`);
      u && this.set_loggeduser(u);
    }
  };

  toggle_terms = (e) => {
    e?.preventDefault();
    this.terms?.toggle();
  };

  toggle_login = () => this.login?.toggle();

  proceed = async () => {
    if (!this.loggeduser) return this.toggle_login();

    this.setState({ loading: true });

    let {
      contact_number,
      dob,
      fullname,
      age,
      birth_certificate,
      passport,
      parent_name,
      address,
      emergency_contact_number,
    } = this.state;

    let data = {
      contact_number,
      dob,
      fullname,
      age,
      parent_name,
      birth_certificate,
      passport,
      address,
      user: this.loggeduser?._id,
      emergency_contact_number,
    };

    let res = await post_request("membership_application", data);

    if (res?.url) {
      window.location.assign(res.url);
    } else
      this.setState({
        loading: false,
        message: res?.message || "Something went wrong.",
      });
  };

  logo_maxsize = 5 * 1024 ** 2;

  render() {
    let {
      membership,
      message,
      loading,
      contact_number,
      dob,
      fullname,
      agreed,
      passport_filename,
      birth_certificate_filename,
      age,
      parent_name,
      birth_certificate,
      passport,
      address,
      emergency_contact_number,
    } = this.state;
    let { sections, image, title, price_breakdown, image_file_hash } =
      membership || new Object();
    if (!sections) sections = new Array();

    return (
      <Loggeduser.Consumer>
        {({ loggeduser, set_loggeduser }) => {
          this.loggeduser = loggeduser;
          this.set_loggeduser = set_loggeduser;

          return (
            <div>
              <Custom_nav page="speakers" />
              <Padder />

              <Breadcrumb_banner
                title={title || "Membership"}
                page="Membership"
              />

              {membership ? (
                <section>
                  <div className="container">
                    <Section_header
                      title="FC FirstTouch "
                      color_title="Registration"
                    />

                    <div className="row">
                      <div className="container">
                        <div className="row align-items-center justify-content-between">
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <div className="lmp_caption">
                              {sections[0]?.text?.split("\n").map((s, i) => (
                                <ReactMarkdown
                                  key={i}
                                  children={s}
                                  components={{
                                    a: A_tag,
                                    h1: H1_tag,
                                    img: Img_tag,
                                    li: Li_tag,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                            <div className="lmp_thumb">
                              <Preview_image
                                class_name="rounded"
                                style={{ width: "100%" }}
                                image_hash={image_file_hash}
                                image={image}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                  <br />

                  {sections.slice(1).map((section, i) => {
                    return (
                      <section className={i % 2 ? "" : "gray"}>
                        <div className="container">
                          {section.text.split("\n").map((s, i) => (
                            <ReactMarkdown
                              key={i}
                              children={s}
                              components={{
                                a: A_tag,
                                h1: H1_tag,
                                img: Img_tag,
                                li: Li_tag,
                              }}
                            />
                          ))}
                        </div>
                      </section>
                    );
                  })}

                  {this.loggeduser?.annual_sub > Date.now() ? (
                    <Annual_sub user={this.loggeduser} />
                  ) : (
                    <section>
                      <div className="container">
                        <div className="row">
                          <div class="edu_wraper">
                            <h4 class="edu_title">
                              Annual Registration Fee {new Date().getFullYear()}
                              /{new Date().getFullYear() + 1} - &pound;400
                            </h4>
                            <ul class="lists-3 row">
                              {price_breakdown.map((wah, index) => (
                                <li
                                  key={index}
                                  class="col-xl-4 col-lg-6 col-md-6 m-0 text-dark"
                                >
                                  {wah.service_name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
                            <form className="p-4">
                              <div className=" p-4">
                                <div className="">
                                  <div className="rcs_log_124">
                                    <div className="Lpo09">
                                      <h4>
                                        Join us at First Touch FC and become
                                        part of a team dedicated to excellence!
                                      </h4>
                                    </div>

                                    <span>
                                      <b>Player Information:</b>
                                    </span>
                                    <br />
                                    <div className="form-group">
                                      <label>Full Name</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your fullname"
                                        value={fullname}
                                        onChange={({ target }) =>
                                          this.setState({
                                            fullname: target.value,
                                            message: "",
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="row">
                                      <div className="form-group col-sm-12 col-6">
                                        <label>Age</label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          placeholder="Age"
                                          value={age}
                                          onChange={({ target }) =>
                                            this.setState({
                                              age: target.value,
                                              message: "",
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="form-group col-sm-12 col-6">
                                        <label>Date of Birth</label>
                                        <input
                                          type="date"
                                          className="form-control"
                                          placeholder="you@mail.com"
                                          value={dob}
                                          onChange={({ target }) =>
                                            this.setState({
                                              dob: target.value,
                                              message: "",
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <label>Address</label>
                                      <textarea
                                        type="date"
                                        className="form-control"
                                        placeholder="Address"
                                        value={address}
                                        onChange={({ target }) =>
                                          this.setState({
                                            address: target.value,
                                            message: "",
                                          })
                                        }
                                      ></textarea>
                                    </div>
                                    <div className="form-group">
                                      <label>Emergency Contact Number</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={emergency_contact_number}
                                        onChange={({ target }) =>
                                          this.setState({
                                            emergency_contact_number:
                                              target.value,
                                            message: "",
                                          })
                                        }
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label>Parent / Guardian Name</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Parent / Guardian fullname"
                                        value={parent_name}
                                        onChange={({ target }) =>
                                          this.setState({
                                            parent_name: target.value,
                                            message: "",
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>Contact Number</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Contact Number"
                                        value={contact_number}
                                        onChange={({ target }) =>
                                          this.setState({
                                            contact_number: target.value,
                                            message: "",
                                          })
                                        }
                                      />
                                    </div>

                                    <>
                                      <h6>
                                        please attach the following documents
                                      </h6>

                                      <div className="row">
                                        <File_input
                                          title="Birth Certificate *"
                                          action={(e) =>
                                            this.handle_file(
                                              e,
                                              "birth_certificate",
                                              this.logo_maxsize
                                            )
                                          }
                                          filename={birth_certificate_filename}
                                          accept="image/*"
                                          info="Type: Image, Maxsize: 5MB"
                                        />

                                        <File_input
                                          title="Passport Photograph *"
                                          action={(e) =>
                                            this.handle_file(
                                              e,
                                              "passport",
                                              this.logo_maxsize
                                            )
                                          }
                                          filename={passport_filename}
                                          accept="image/*"
                                          info="Type: Image, Maxsize: 5MB"
                                        />
                                      </div>
                                    </>

                                    <div
                                      style={{
                                        flexDirection: "row",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Checkbox
                                        title="Agree to Terms and Policy"
                                        _id={"agreed"}
                                        checked={agreed}
                                        action={() =>
                                          this.setState({
                                            agreed: !this.state.agreed,
                                          })
                                        }
                                        name="agreed"
                                      />
                                      &nbsp; &nbsp;
                                      <span className="musrt">
                                        <a
                                          href="#"
                                          onClick={this.toggle_terms}
                                          className="theme-cl"
                                        >
                                          - Read Here
                                        </a>
                                      </span>
                                    </div>

                                    {message ? (
                                      <p className="text-danger">{message}</p>
                                    ) : null}
                                    <div className="form-group">
                                      <Stretch_button
                                        loading={loading}
                                        disabled={
                                          !address ||
                                          !fullname ||
                                          !agreed ||
                                          !parent_name ||
                                          !birth_certificate ||
                                          !passport ||
                                          !contact_number ||
                                          !emergency_contact_number ||
                                          !dob ||
                                          !age
                                        }
                                        title="Proceed"
                                        action={this.proceed}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </section>
              ) : (
                <Loadindicator />
              )}

              <Contact_us />
              <Footer />

              <Modal ref={(login) => (this.login = login)}>
                <Login
                  no_redirect
                  action={this.proceed}
                  toggle={this.toggle_login}
                />
              </Modal>
              <Modal ref={(terms) => (this.terms = terms)}>
                <Terms_and_condition toggle={this.toggle_terms} />
              </Modal>
            </div>
          );
        }}
      </Loggeduser.Consumer>
    );
  }
}

export default Membership;
