import { Button } from "@ahaui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "store/authSlice";
import { notifyPositive } from "utils/toast";

export default function AuthenticatedHeaderRight() {
  const dispatch = useDispatch();

  return (
    <>
      <Link to={"/manage"}>
        <Button size={"small"} variant="primary" className="u-marginRightSmall">
          <Button.Label>Manage posts</Button.Label>
        </Button>
      </Link>
      <Button
        onClick={() => {
          dispatch(logout());
          notifyPositive({ message: "Log out successfully." });
        }}
        size={"small"}
        variant="primary"
        className="u-marginRightSmall"
      >
        <Button.Label>Logout</Button.Label>
      </Button>
    </>
  );
}
