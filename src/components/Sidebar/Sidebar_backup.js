import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@mui/material";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMore,
} from "@mui/icons-material";
import { useTheme } from "@mui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import axios from 'axios';
import {API_URL} from '../../contraints';

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";


function Sidebar({ location }) {

  //화면 로드시 1번만 실행
  useEffect(() => {
    //메뉴리스트 조회
    preload();
  }, []);

  //메뉴 데이터 변수
  const [structure, setStructure] = useState('');
  const templatesStructure = [
    { menuCd: 220, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
    {
      menuCd: 221,
      label: "Typography",
      link: "/app/typography",
      icon: <TypographyIcon />,
    },
    { menuCd: 222, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
    {
      menuCd: 223,
      label: "Notifications",
      link: "/app/notifications",
      icon: <NotificationsIcon />,
    },
    {
      menuCd: 224,
      label: "UI Elements",
      link: "/app/ui",
      icon: <UIElementsIcon />,
      children: [
        { label: "Icons", link: "/app/ui/icons" },
        { label: "Charts", link: "/app/ui/charts" },
        { label: "Maps", link: "/app/ui/maps" },
      ],
    },
    { menuCd: 225, type: "divider" },
    { menuCd: 226, type: "title", label: "HELP" },
    { menuCd: 227, label: "Library", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
    { menuCd: 228, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
    { menuCd: 229, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
    { menuCd: 2210, type: "divider" },
    { menuCd: 2211, type: "title", label: "PROJECTS" },
    {
      menuCd: 2212,
      label: "My recent",
      link: "",
      icon: <Dot size="small" color="warning" />,
    },
    {
      menuCd: 2213,
      label: "Starred",
      link: "",
      icon: <Dot size="small" color="primary" />,
    },
    {
      menuCd: 2214,
      label: "Background",
      link: "",
      icon: <Dot size="small" color="secondary" />,
    },
  ];

  //메뉴 리스트 불러오기
  const preload = async () => {
    axios.get(`${API_URL}/api/sys/menu`)
    .then(res => {
      var menuList = res.data;
      var menuConcat = menuList.concat(templatesStructure);
      setStructure(menuConcat);
    }).catch(error => { 
      console.log('error = '+error); 
    })
  };

  //CSS
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });



  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
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
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
      {/* {structure && structure.map((link) => {console.log(link.menuCd)})} */}
        {structure && structure.map(link => (
          
          <SidebarLink
            key={link.menuCd}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
            
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
