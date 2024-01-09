// @ts-ignore
import style from "./style.module.scss";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { MdModeEdit } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { AppStrings } from "../../../utils/strings";
import { getMUIGlobalTheme, mobileAndTabletCheck } from "../../../utils/utils";
import { AccountUser } from "../../../utils/interface";
import useAppStore from "../../../context/store";
import processLogout from "../../../logic/logout";

type UserCircleProps = {
  user: AccountUser;
};
export default function UserCircle({ user }: UserCircleProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigator = useNavigate();
  const setUser = useAppStore((state) => state.setUser);

  function handleTogglePopOver(event: any) {
    const element = mobileAndTabletCheck() ? null : event.currentTarget;
    setAnchorEl(!open ? element : null);
    setOpen(!open);
  }

  function handleNavigateToEdit() {
    navigator("/edit");
  }

  function handleLogout() {
    setUser(null);
    processLogout();
  }

  return (
    <Fragment>
      <div className={style.container} onClick={handleTogglePopOver}>
        <img
          src={user.avatar as string}
          alt={user.name as string}
          className={style.userCircle}
        />
      </div>
      <ThemeProvider theme={createTheme(getMUIGlobalTheme())}>
        <Popover
          open={open}
          onClose={handleTogglePopOver}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div
            className={clsx(
              style.popoverContainer,
              mobileAndTabletCheck() ? style.mobile : null
            )}
          >
            <Button
              className={style.btn}
              color="primary"
              onClick={handleNavigateToEdit}
            >
              <MdModeEdit />
              {AppStrings.language.components.editPortfolio}
            </Button>
            <Button className={style.btn} color="error" onClick={handleLogout}>
              <IoLogOut />
              {AppStrings.language.components.logout}
            </Button>
          </div>
        </Popover>
      </ThemeProvider>
    </Fragment>
  );
}
