import React, {useState} from "react";

// context
import { useLayoutState } from "../../../context/LayoutContext";
import { useUserLoginPop } from "../../../context/UserContext";

// styles
import classNames from "classnames";
import useStyles from "./styles";
//Data
import {blogMenu} from "../../../contraints";

import Header from "../../../components/Header/Header";
import Sb from "../../../components/Sidebar/Sb";
import LoginPop from "../../login/LoginPop";

export default function BlogLayout({props}) {
  var classes = useStyles();
  var { isSidebarOpened } = useLayoutState();
  var isLoginPop = useUserLoginPop();
  console.log('isLoginPop',isLoginPop)
  return (
    <div className={classes.contents}>
      <Header history={props.history} />
      <Sb menuList={blogMenu}/>
      <div className={isSidebarOpened ? classes.contentsArea : classes.contentsAreaLeftSide}>
        {props}
      </div>
      <LoginPop isOpen={isLoginPop} //close={false}
       />
    </div>
  );
}


