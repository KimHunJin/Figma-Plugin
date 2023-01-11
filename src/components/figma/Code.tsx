import React from "react";
import * as logo from "@/assets/react.svg";

export const Code = () => {
  const textbox = React.useRef<HTMLInputElement>();

  const countRef = React.useCallback((element: HTMLInputElement) => {
    if (element) element.value = "5";
    textbox.current = element;
  }, []);

  const onCreate = () => {
    if (textbox.current) {
      const count = parseInt(textbox.current.value, 10);
      parent.postMessage(
        { pluginMessage: { type: "create-rectangles", count } },
        "*"
      );
    }
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === "create-rectangles") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <img src={logo.default} />
      <h2>Rectangle Creator</h2>
      <p>
        Count: <input ref={countRef} />
      </p>
      <button id="create" onClick={onCreate}>
        Create
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
