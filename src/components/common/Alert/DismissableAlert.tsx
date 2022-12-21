import React, { useState } from "react";
import { Alert } from "./Alert";

interface Props {
  type: string;
  message: string;
}

export const DismissableAlert: React.FC<Props> = (props) => {
  const [show, setShow] = useState(true);

  if (show) {
    return <Alert onClose={() => setShow(false)} {...props} />;
  }
  return <div></div>;
};
