import React from "react";

class Socials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="fixed_on_page_box" id="fixed_socials">
        <div className="icon_whatsapp mb-3">
          <a
            style={{ color: "#fff" }}
            href="https://wa.me/+447538548318/?text=Hello,%20I%20like%20to%20inquire%20about%20First%20Touch%20Academy%20training?"
            target="_blank"
          >
            <img src="https://giit.com.ng/assets/images/icon_whatsapp.png?1666193786" />
          </a>
        </div>

        <div className="icon_facebook mb-3">
          <a
            style={{ color: "#fff" }}
            target="_blank"
            href="https://www.facebook.com/FIRSTTOUCHACADEMY1"
          >
            <img
              src="https://giit.com.ng/assets/images/icon_facebook.png?1666193786"
              className="img-fluid"
            />
          </a>
        </div>
        <div className="icon_facebook mb-3 ml-1">
          <a
            style={{ color: "#fff" }}
            target="_blank"
            href="https://instagram.com/firsttouchacademy_"
          >
            <img
              height={50}
              width={50}
              src={require(`../assets/img/ig_icon.webp`)}
              className="img-fluid"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Socials;
