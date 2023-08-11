import React from "react";
import Listempty from "../components/listempty";
import Loadindicator from "../components/loadindicator";
import Media from "../components/media";
import Contact_us_today from "../components/contact_us_today";
import Footer, { scroll_to_top } from "../sections/footer";
import Explore_more_btn from "../components/explore_more";
import { post_request } from "../assets/js/utils/services";
import Breadcrumb_banner from "../sections/breadcrumb_banner";
import Custom_nav from "../sections/nav";
import Padder from "../components/padder";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page_size: 12,
      page: 0,
    };
  }

  fetch_gallery = async (page = this.state.page) => {
    let { page_size, loading_more, gallery } = this.state;
    if (loading_more) return;

    gallery && this.setState({ loading_more: true });
    let { gallery: gallery_, total_media } = await post_request("fetch_media", {
      skip: page_size * page,
      limit: page_size,
      total_media: true,
    });

    if (!gallery) gallery = new Array();
    gallery = new Array(...(gallery || []), ...(gallery_ || []));

    this.setState({
      gallery,
      total_media,
      no_more: gallery_?.length < page_size,
      loading_more: false,
      page,
    });
  };

  componentDidMount = async () => {
    scroll_to_top();

    this.setState({ hide_nav: true }, () => this.setState({ hide_nav: false }));
    await this.fetch_gallery();
  };

  load_more = async (e) => {
    e && e.preventDefault();

    let { page } = this.state;

    await this.fetch_gallery(page + 1);
  };

  render() {
    let { gallery, hide_nav, no_more, loading_more } = this.state;

    return (
      <div id="main-wrapper">
        {hide_nav ? null : <Custom_nav page="gallery" />}
        <Padder />

        <Breadcrumb_banner title="Gallery" page="Gallery" />
        <section className="min">
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {gallery ? (
                gallery.length ? (
                  gallery.map((media) => (
                    <Media media={media} key={media._id} />
                  ))
                ) : (
                  <Listempty text="No media in gallery yet" />
                )
              ) : (
                <Loadindicator contained />
              )}
            </div>
          </div>

          {loading_more ? (
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Loadindicator contained />
            </div>
          ) : !gallery || no_more ? null : (
            <Explore_more_btn action={this.load_more} text="Load more" />
          )}
        </section>
        <Contact_us_today />
        <Footer />
      </div>
    );
  }
}

export default Gallery;
