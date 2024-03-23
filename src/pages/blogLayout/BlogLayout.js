import React from "react";

// styles
import useStyles from "./styles";
//Data
import {blogMenu} from "../../contraints";

import Header from "../../components/Header/Header";
import Sb from "../../components/Sidebar/Sb";

export default function BlogLayout({props}) {
  var classes = useStyles();
  return (
    <div className={classes.contents}>
      <Header history={props.history} />
      <Sb menuList={blogMenu}/>
      <div className={classes.contentsArea}>
        {props}
      </div>
    </div>
  );
}


