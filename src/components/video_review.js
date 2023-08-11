import React from "react";
import { domain } from "../assets/js/utils/constants";
import Video from "./video";

class Video_review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { review, class_name } = this.props;
    let { url, thumbnail, thumbnail_hash } = review;

    return (
      <div className={class_name}>
        <Video
          url={`${domain}/videos/${url}`}
          thumbnail={thumbnail}
          thumbnail_hash={thumbnail_hash}
        />
      </div>
    );
  }
}

export default Video_review;
