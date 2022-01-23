import { Button } from "@ahaui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function UnAuthenticatedHeaderRight() {
  return (
    <>
      <Link to="/login">
        <Button size={"small"} variant="primary" className="u-marginRightSmall">
          <Button.Label>Login</Button.Label>
        </Button>
      </Link>

      <Link to="/register">
        <Button
          size={"small"}
          variant="primary_outline"
          className="u-marginRightSmall"
        >
          <Button.Label>Register</Button.Label>
        </Button>
      </Link>
    </>
  );
}
