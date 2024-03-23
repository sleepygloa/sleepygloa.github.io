import React, { useState,useRef } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ExpandMore, ChevronRight, Inbox as InboxIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Dot from "../Dot";

export default function SidebarLink({
  link,
  icon,
  label,
  children,
  location,
  isSidebarOpened,
  nested,
  type,
}) {
  var classes = useStyles();
  var myRef = useRef({})

  // local
  var [isOpen, setIsOpen] = useState(false);
  var isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1);

  if (type === "title")
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider className={classes.divider} />;
  // if (link && link.includes('http')) {
  //   return (
  //     <ListItem
  //       button
  //       className={classes.link}
  //       classes={{
  //         root: classnames(classes.linkRoot, {
  //           [classes.linkActive]: isLinkActive && !nested,
  //           [classes.linkNested]: nested,
  //         }),
  //       }}
  //       disableRipple
  //     >
  //       <a className={classes.externalLink} href={link}>
  //       <ListItemIcon
  //         className={classnames(classes.linkIcon, {
  //           [classes.linkIconActive]: isLinkActive,
  //         })}
  //       >
  //         {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
  //       </ListItemIcon>
  //       <ListItemText
  //         classes={{
  //           primary: classnames(classes.linkText, {
  //             [classes.linkTextActive]: isLinkActive,
  //             [classes.linkTextHidden]: !isSidebarOpened,
  //           }),
  //         }}
  //         primary={label}
  //       />
  //       </a>
  //     </ListItem>
  //   )
  // }
  // if (!children)
  //   return (
  //     <ListItem
  //       button
  //       component={link && Link}
  //       to={link}
  //       // onClick={callTabs}
  //       className={classes.link}
  //       classes={{
  //         root: classnames(classes.linkRoot, {
  //           [classes.linkActive]: isLinkActive && !nested,
  //           [classes.linkNested]: nested,
  //         }),
  //       }}
  //       disableRipple
  //     >
  //       <ListItemIcon
  //         className={classnames(classes.linkIcon, {
  //           [classes.linkIconActive]: isLinkActive,
  //         })}
  //       >
  //         {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
  //       </ListItemIcon>
  //       <ListItemText
  //         classes={{
  //           primary: classnames(classes.linkText, {
  //             [classes.linkTextActive]: isLinkActive,
  //             [classes.linkTextHidden]: !isSidebarOpened,
  //           }),
  //         }}
  //         primary={label}
  //       />
  //     </ListItem>
  //   );

  // //메뉴 클릭시 하위자식 탭메뉴관리 프로세스호출
  // function callTabs(props){
  //   console.log('test',props);
  //   // myRef.current.tabManager(props);
  // }

  return (
    <>
    <li>
      <div className={classnames(classes.linkIcon, {
          [classes.linkIconActive]: isLinkActive,
        })}>

      </div>
      {/* <ListItemIcon
        className={classnames(classes.linkIcon, {
          [classes.linkIconActive]: isLinkActive,
        })}
      >
        {icon ? icon : (isOpen ? <ExpandMore /> : <ChevronRight />) } 
      </ListItemIcon> */}
      <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
    </li>
    {children && (
        <ul
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <li component="div" disablePadding>
            {children.map(childrenLink => (
              <ListItemText
                classes={{
                  primary: classnames(classes.linkText, {
                    [classes.linkTextActive]: isLinkActive,
                    [classes.linkTextHidden]: !isSidebarOpened,
                  }),
                }}
                primary={childrenLink.label}
              />
              // <SidebarLink
              //   key={childrenLink && childrenLink.link}
              //   location={location}
              //   isSidebarOpened={isSidebarOpened}
              //   classes={classes}
              //   nested
              //   {...childrenLink}
              // />
            ))}
          </li>
        </ul>
      )}    
{/*       
      <ListItem
        button
        component={link && Link}
        onClick={toggleCollapse}
        className={classes.link}
        to={link}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon ? icon : (isOpen ? <ExpandMore /> : <ChevronRight />) } 
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
      {children && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {children.map(childrenLink => (
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={location}
                isSidebarOpened={isSidebarOpened}
                classes={classes}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
       */}
    </>
  );

  // ###########################################################

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
}
