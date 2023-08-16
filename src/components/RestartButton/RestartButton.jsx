import React from "react";
import Button from "../Button";

import { OptionsSelectedContext } from "../OptionsSelectedProvider";

function RestartButton() {
  const { setHasSelected } = React.useContext(OptionsSelectedContext);

  return <Button action={() => setHasSelected(false)}>Restart</Button>;
}

export default RestartButton;
