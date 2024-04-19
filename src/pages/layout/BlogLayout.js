import React, {useState} from "react";

// context
import { useLayoutState } from "../../context/LayoutContext";
import { useUserLoginPop } from "../../context/UserContext";
import { open, close } from "../../context/ModalContext";

// styles
import useStyles from "./styles";
//Data
import {blogMenu} from "../../contraints";

import Header from "../../components/Header/Header";
import Sb from "../../components/Sidebar/Sb";
import LoginPop from "../login/LoginPop";
import Modals from "../../components/Modal/Modals"

export default function BlogLayout({props}) {
  var classes = useStyles();
  var { isSidebarOpened } = useLayoutState();
  var isLoginPop = useUserLoginPop();
  return (
    <div className={classes.contents}>
      <Header history={props.history} />
      <Sb menuList={blogMenu}/>
      <div className={isSidebarOpened ? classes.contentsArea : classes.contentsAreaLeftSide}>
        {props}
      </div>
      <LoginPop isOpen={isLoginPop} />
      <Modals />
    </div>
  );
}


