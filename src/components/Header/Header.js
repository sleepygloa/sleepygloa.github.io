import React, { useEffect, useState, useMemo } from "react";
import { AppBar, div, IconButton, InputBase, Menu, MenuItem, } from "@mui/material";
import { Menu as MenuIcon, Person as AccountIcon, Search as SearchIcon, ArrowBack as ArrowBackIcon,} from "@mui/icons-material";
import classNames from "classnames";
import qs from 'qs';

// styles
import useStyles from "./styles";

// components
import { Typography, 
} from "../Wrappers";
// import Notification from "../Notification/Notification";
// import UserAvatar from "../UserAvatar/UserAvatar";

// context
import {useLayoutState,useLayoutDispatch,toggleSidebar,} from "../../context/LayoutContext";
import { useUserDispatch, useUserState, signOut, useUserLoginPopAction } from "../../context/UserContext";
import axios from "axios";
import { API_URL, client } from "../../contraints";




export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();
  const loginPopAction = useUserLoginPopAction();

  // local
  // var [mailMenu, setMailMenu] = useState(null);
  // var [isMailsUnread, setIsMailsUnread] = useState(true);
  // var [notificationsMenu, setNotificationsMenu] = useState(null);
  // var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);


  //조회조건
  const [userInfo, setUserInfo] = useState({
    nickname: null,
    userId:null,
  });
  // const onChangeUserInfo = (event) => {
  //   setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
  // }

  useEffect(() => {
    
    //쿠기가 있을때 유저정보 가져오기 
    const ck = document.cookie;
    var at = '';
    ck.split(';').forEach(function(item) {
      var temp = item.split('=');
      var temp0 = temp[0].trim()
      if(temp0 === 'accessToken') {
        at = temp[1]
      }
    });
    console.log('at',at)
    if(at != ''){
        client.get(`${API_URL}/login/getUserInfo`)
        .then(res => {
            setUserInfo({...userInfo, nickname: res.data.nickname, userId: res.data.userId});
        }).catch(error => { 
        })
    }

  }, []); 


  return (
    <AppBar position="fixed" >
      <div className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {/* 사이드메뉴 열림/닫힘 토클 */}
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          ComD
        </Typography>
        <div className={classes.grow} />
        {/* 헤더 버튼 추가<Button component={Link} href="https://flatlogic.com/templates/react-material-admin-full" variant={"outlined"} color={"secondary"} className={classes.purchaseBtn}>Unlock full version</Button> */}
        <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
          </div>
        </div>
        {/* 프로필 버튼 */}
        {userInfo.nickname != null && userInfo.nickname != '' ? <p>{userInfo.nickname}</p> : <p></p>}
        {userInfo.nickname != null && userInfo.nickname != '' ? 

          <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={()=>{setProfileMenu(true)}}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton> 
        : 
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={loginPopAction.openPop}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        }
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {userInfo.nickname}
            </Typography>
          </div>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </div>
    </AppBar>
  );
}