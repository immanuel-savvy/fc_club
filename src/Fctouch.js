import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styles.css";
import "./assets/css/custom.css";
import { Loggeduser, Logged_admin, Nav_context } from "./Contexts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Emitter from "semitter";
// Pages
import Home from "./pages/Home";
import Page_not_found from "./pages/404";
import {
  academy,
  client_domain,
  shop_domain,
} from "./assets/js/utils/constants";
import { get_request, post_request } from "./assets/js/utils/services";
import { get_session, save_to_session } from "./sections/footer";
import Testimonials from "./pages/Testimonials";
import Sponsors from "./pages/Sponsors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgot_password from "./pages/Forgot_password";
import Verify_email from "./pages/Verify_email";
import Volunteers from "./pages/Volunteers";
import Membership from "./pages/Membership";
import Gallery from "./pages/Gallery";

const emitter = new Emitter();

class Seminar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submenus: new Object({}),
      subnavs: new Object(),
      navs: new Array(
        {
          title: "search",
          path: "/search_result",
        },
        {
          title: "home",
          path: academy,
        },
        {
          title: "club",
          path: client_domain,
          submenu: new Array(
            {
              title: `membership - ${new Date().getFullYear()}/${
                new Date().getFullYear() + 1
              } `,
              path: `/membership`,
            },
            {
              title: "sponsors",
              path: `/sponsors`,
            },
            {
              title: "volunteers",
              path: "/volunteers",
            },
            {
              title: "gallery",
              path: "/gallery",
            }
          ),
        },
        {
          title: "shop",
          path: shop_domain,
          submenu: new Array({
            title: "cart",
            path: `${academy}/cart`,
          }),
        },
        {
          title: "about",
          path: "/about",
        },
        {
          title: "reviews",
          path: "/testimonials",
        },
        {
          title: "blog",
          path: "/blog",
        },
        {
          title: "get_started",
          path: "/signup?p=club",
        }
      ),
    };
  }

  componentDidMount = async () => {
    let loggeduser = get_session("loggeduser");
    loggeduser && this.setState({ loggeduser });

    emitter.single_listener("is_logged_in", this.is_logged_in);

    this.edit_seminar = (seminar) =>
      this.setState({ seminar_in_edit: seminar }, () => {
        save_to_session("seminar_in_edit", seminar);

        window.location.assign(`${client_domain}/edit_seminar`);
      });

    emitter.listen("edit_seminar", this.edit_seminar);

    let entry = await get_request("entry");
    this.setState({ entry });
  };

  componentWillUnmount = () => {};

  set_subnav = async (nav) => {
    let { subnavs } = this.state;
    if (subnavs[nav._id]) return;

    let navs = await post_request("get_courses", { courses: nav.submenu });
    subnavs[nav._id] = navs.map((nav) => ({
      ...nav,
      path: "/course",
      on_click: () => this.handle_course(nav),
    }));
    this.setState({ subnavs });
  };

  load_subnavs = async (current_subnav) => {
    let { submenus } = this.state;

    let courses = await post_request("get_courses", {
      courses: current_subnav.submenu,
    });
    submenus[current_subnav._id] = courses;

    this.setState({
      submenus,
    });
  };

  logout = () =>
    this.setState({ loggeduser: null }, () => {
      window.sessionStorage.removeItem("loggeduser");
      window.location.assign(client_domain);

      delete this.log_timestamp;
    });

  restore_loggeduser = (loggeduser, cb) =>
    this.setState({ loggeduser }, () => {
      window.sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser));
      cb && cb();
    });

  login = (user, no_redirect) =>
    this.setState({ loggeduser: user }, () => {
      window.sessionStorage.setItem("loggeduser", JSON.stringify(user));

      if (!this.log_timestamp) this.log_timestamp = Date.now();

      if (no_redirect) return;

      let red = window.sessionStorage.getItem("redirect");

      window.sessionStorage.removeItem("redirect");
      window.location.assign(red || client_domain);
    });

  log_admin = (admin) =>
    this.setState({ admin_logged: admin }, () => {
      window.sessionStorage.setItem("logged_admin", JSON.stringify(admin));
    });

  render = () => {
    let { loggeduser, entry, navs, subnavs, submenus, admin_logged } =
      this.state;

    return (
      <Loggeduser.Provider
        value={{
          loggeduser,
          logout: this.logout,
          set_loggeduser: this.restore_loggeduser,
          login: this.login,
          is_logged_in: this.is_logged_in,
        }}
      >
        <Logged_admin.Provider
          value={{ admin_logged, log_admin: this.log_admin }}
        >
          <Nav_context.Provider
            value={{
              navs,
              subnavs,
              set_subnav: this.set_subnav,
              load_subnavs: this.load_subnavs,
              submenus,
              logo: entry?.logo,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route index element={<Home entry={entry} />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="sponsors" element={<Sponsors />} />
                <Route path="membership" element={<Membership />} />
                <Route path="volunteers" element={<Volunteers />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verify_email" element={<Verify_email />} />
                <Route path="forgot_password" element={<Forgot_password />} />
                <Route path="*" element={<Page_not_found />} />
              </Routes>
            </BrowserRouter>
          </Nav_context.Provider>
        </Logged_admin.Provider>
      </Loggeduser.Provider>
    );
  };
}

export default Seminar;
export { emitter };
