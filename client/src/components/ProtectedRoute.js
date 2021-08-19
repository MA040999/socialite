import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { component: Component, path, isAuthenticated, ...rest } = props;

  return (
    <div>
      <Route
        {...rest}
        path={path}
        render={() => {
          if (isAuthenticated === true) {
            return <Component />;
          } else if (isAuthenticated === false) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location },
                }}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default ProtectedRoute;
