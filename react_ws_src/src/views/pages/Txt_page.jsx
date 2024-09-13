import React from "react";
import DOMPurify from "dompurify";
import { Link } from "react-router";
import PropTypes from "prop-types";
import X2JS from "x2js";
import Button from "../../components/atoms/Button.jsx";

const Txt_page = ({ params }) => {
  const page = params.page || "home";
  const page_x = app.settings.ws_conf.pgs[page];
  const cleanHtmlContent = DOMPurify.sanitize(page_x.txt.__cdata);
  if (!page || !page_x) return null;

  return (
    <section>
      <h1>{page_x.pg_name}</h1>

      <div dangerouslySetInnerHTML={{ __html: cleanHtmlContent }} />

      <div className="btns">
        {new X2JS().asArray(page_x.btns.b).map((b, i) => (
          <Link to={b.u} key={i}>
            <Button text={b.txt} type="submit" isRightIcon />
          </Link>
        ))}
      </div>
    </section>
  );
};

Txt_page.propTypes = {
  params: PropTypes.shape({
    page: PropTypes.string,
  }),
  settings: PropTypes.object.isRequired,
};

export default Txt_page;
