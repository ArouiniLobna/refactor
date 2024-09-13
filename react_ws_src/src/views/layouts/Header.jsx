import React, { memo } from "react";
import { Link } from "react-router";
import MessageBar from "./MessageBar.jsx";

const Header = ({}) => {
  const { ws_conf } = app.settings;
  const { header, main_menu } = ws_conf;
  return (
    <header id="main_header">
      <div id="brand">
        <div className="container">
          <Link to={header.head_l_logo.u} className="logo-tl">
            <img src={header.head_l_logo.i} />
          </Link>

          <Link to={header.site_title.u} className="main-site-name">
            {header.site_title.txt}
          </Link>

          <nav>
            <ul>
              {main_menu.pages.p.map(function (p, i) {
                return (
                  <li key={i}>
                    <Link to={p.u}>
                      <i className={"fa fa-2x " + p.ico} aria-hidden="true"></i>
                      {p.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <MessageBar />
    </header>
  );
};

export default memo(Header);
