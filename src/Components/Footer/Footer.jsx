import React from "react";

import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      MADE WITH{" "}
      <span role="img" aria-label="emoji">
        🧡
      </span>{" "}
      by{"  "}
      <a
        href="https://github.com/ceosss"
        rel="noopener noreferrer"
        target="_blank"
      >
        ceo.sss
      </a>
    </div>
  );
};

export default Footer;
