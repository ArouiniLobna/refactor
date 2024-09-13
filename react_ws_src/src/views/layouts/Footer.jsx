import React, { memo } from "react";
import { Link } from "react-router";

const Footer = () => {
  const { footer } = app.settings.ws_conf;

  return (
    <footer>
      <div className="container">
        <nav>
          <ul>
            {footer.items.i.map((item, index) => (
              <li key={index}>
                {item.tp === "ln" ? (
                  <Link to={item.u}>{item.txt}</Link>
                ) : (
                  item.txt
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot_message">{footer.foot_msg.txt}</div>

        <a
          className="foot-r-logo"
          href={footer.foot_r_logo.u}
          target={footer.foot_r_logo.t}
          rel="noopener noreferrer"
        >
          <img alt="footer logo" src={footer.foot_r_logo.i} />
        </a>
      </div>
    </footer>
  );
};

export default memo(Footer);
