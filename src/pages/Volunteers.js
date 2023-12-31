import React from "react";
import ReactMarkdown from "react-markdown";
import { organisation_name } from "../assets/js/utils/constants";
import { get_request } from "../assets/js/utils/services";
import Contact_us from "../components/contact_us_today";
import Loadindicator from "../components/loadindicator";
import Padder from "../components/padder";
import Preview_image from "../components/preview_image";
import Section_header from "../components/section_headers";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Footer, { scroll_to_top } from "../sections/footer";
import Custom_nav from "../sections/nav";
import { A_tag, H1_tag, Img_tag, Li_tag } from "./Sponsors";

class Volunteers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async () => {
    document.title = `Volunteers | ${organisation_name}`;
    scroll_to_top();

    let volunteers = await get_request("volunteer_page");
    this.setState({ volunteers });
  };

  render() {
    let { volunteers } = this.state;
    let { sections, image, title, image_file_hash } =
      volunteers || new Object();
    if (!sections) sections = new Array();

    return (
      <div>
        <Custom_nav page="speakers" />
        <Padder />

        <Breadcrumb_banner title={title || "Volunteers"} page="Volunteers" />

        {volunteers ? (
          <section>
            <div className="container">
              <Section_header
                title="Dear Prospective"
                color_title="Volunteer"
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
          </section>
        ) : (
          <Loadindicator />
        )}

        <Contact_us />
        <Footer />
      </div>
    );
  }
}

export default Volunteers;
