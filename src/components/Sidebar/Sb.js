import React from "react";
import SbItem from './SbItem'
import {SbContainer} from './Sb.style'

// context
import {
  useLayoutState,
} from "../../context/LayoutContext";

import classNames from "classnames";
import useStyles from "./styles";

const Sb = ({menuList}) => {

  var { isSidebarOpened } = useLayoutState();
  //CSS
  var classes = useStyles();

  return (
    <SbContainer 
    className={classNames(classes.drawer, {
      [classes.drawerOpen]: isSidebarOpened,
      [classes.drawerClose]: !isSidebarOpened,
    })}
    classes={{
      paper: classNames({
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      }),
    }}
    >
      {menuList && menuList.map((item) =>
        (
          <SbItem item={item} key={item.menuCd} />
        )
      )}
    </SbContainer>
  )
}

export default Sb