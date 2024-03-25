import React from "react";

// context
import { useLayoutState } from "../../context/LayoutContext";

// styles
import classNames from "classnames";
import useStyles from "./styles";
//Data
import {blogMenu} from "../../contraints";

import Header from "../../components/Header/Header";
import Sb from "../../components/Sidebar/Sb";

export default function BlogLayout({props}) {
  var classes = useStyles();
  var { isSidebarOpened } = useLayoutState();
  
  return (
    <div className={classes.contents}>
      <Header history={props.history} />
      <Sb menuList={blogMenu}/>
      <div className={isSidebarOpened ? classes.contentsArea : classes.contentsAreaLeftSide}>
        {props}
      </div>
    </div>
  );
}


