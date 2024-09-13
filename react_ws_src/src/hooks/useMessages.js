import { useState, useEffect } from "react";

const useMessages = (eventEmitter) => {
  const [msgs, setMsgs] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleShowMessage = (h, m) => {
      setMsgs((prevMsgs) => [...prevMsgs, { h: unescape(h), m: unescape(m) }]);
      setVisible(true);
    };

    eventEmitter.on(eventEmitter.events.show_message, handleShowMessage);

    return () => {
      eventEmitter.off(eventEmitter.events.show_message, handleShowMessage);
    };
  }, [eventEmitter]);

  const closeWindow = () => {
    setMsgs([]);
    setVisible(false);
  };

  return { msgs, visible, closeWindow };
};

export default useMessages;
