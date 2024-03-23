import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import BlogLayout from "../pages/blogLayout";
import ExcelFileToJson from "../pages/excelfiletojson";
import ExcelDataToJson from "../pages/exceldatatojson";
import StrArrChangeStr from "../pages/strarrchangestr";

// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
console.log('isAuthenticated',isAuthenticated);
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={()=><BlogLayout props={<Dashboard />}></BlogLayout>} />
        <Route exact path="/blog/excel/excelfiletojson" render={()=><BlogLayout props={<ExcelFileToJson />}></BlogLayout>} />
        <Route exact path="/blog/excel/exceldatatojson" render={()=><BlogLayout props={<ExcelDataToJson />}></BlogLayout>} />
        <Route exact path="/blog/excel/strarrchangestr" render={()=><BlogLayout props={<StrArrChangeStr />}></BlogLayout>} />

        {/* <Route
          exact
          path="/"
          component={(isAuthenticated ? Layout : Login)}
          render={() => (isAuthenticated ? <Redirect to="/app/dashboard" />: <Redirect to="/login" />)}
        />
        <PublicRoute path="/" component={Login}
          render={() => <Redirect to="/login" /> } />
        <PrivateRoute path="/" component={Layout} />
        <PrivateRoute
          path="/"
          component={Layout}
          render={() => <Redirect to="/app/dashboard" />} />

         <Route exact path="/" render={() => <Redirect to="/" />} />
         <Route
           exact
           path="/app"
           render={() => <Redirect to="/app/dashboard" />}
         /> */}
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    console.log('private route', isAuthenticated)
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    console.log('public route', isAuthenticated)
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
