import React, { useEffect, useRef } from "react";
import useMessage from "../../hooks/useMessages";
const MessageBar = () => {
  const msgBarRef = useRef(null);
  const { msgs, visible, closeWindow } = useMessage(app);
  useEffect(() => {
    if (visible) {
      msgBarRef.current.style.display = "block";
    } else {
      msgBarRef.current.style.display = "none";
    }
  }, [visible]);

  return (
    <div id="msg_bar" ref={msgBarRef}>
      <div className="container">
        <div>
          {msgs.map((msg, i) => (
            <p className="one_line" key={i}>
              <span className="exclaim">
                {msg.h.length > 1 ? `${msg.h} : ` : ""}
              </span>
              {msg.m}
              <br />
            </p>
          ))}
          <a
            className="close fa fa-close"
            onClick={closeWindow}
            style={{ cursor: "pointer" }}
          ></a>
        </div>
      </div>
    </div>
  );
};

export default MessageBar;
