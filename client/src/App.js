import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppWrapper, useAppContext } from "./context/AppContext";
import setAuthToken from "./configs/setAuthToken";
import api from "./configs/api";
import routes from "./router";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./pages/404-page";
import ScrollToTop from "./hooks/scrolltop";

import "react-lazy-load-image-component/src/effects/blur.css";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AppWrapper>
          <ToastContainer />

          <Main />
        </AppWrapper>
      </GoogleOAuthProvider>
    </div>
  );
}

const Main = () => {
  const [context, setContext] = useAppContext();
  useEffect(() => {
    const xToken = localStorage.getItem("x-token");
    if (xToken) {
      setAuthToken(xToken); // Set the token for API requests

      api
        .get("/auth") // Validate token and fetch user info
        .then(async (response) => {
          const user = response.data;

          // Set the token for future API requests
          setAuthToken(user.token);

          // Fetch the user's profile
          try {
            const profileResponse = await api.get("/users/profile", {
              params: { userId: user.user.id }, // Pass the userId to fetch profile
            });

            const profile = profileResponse.data;

            // Update the context with both auth and profile data
            window.dataLayer.push({ userId: user.user.id });
            setContext((prevContext) => ({
              ...prevContext,
              auth: {
                isAuthenticated: true,
                token: xToken,
                user: user.user,
              },
              profile: {
                ...profile,
                photo: profile.photo
                  ? process.env.REACT_APP_BACKEND_API + profile.photo
                  : "",
              }, // Add profile to context
              checkingStatus: false,
            }));
          } catch (profileError) {
            console.error("Error fetching user profile:", profileError);

            // Fallback: Set auth without profile if fetching profile fails
            window.dataLayer.push({ userId: user.user.id });
            setContext({
              ...context,
              auth: {
                isAuthenticated: true,
                token: xToken,
                user: user.user,
              },
              checkingStatus: false,
            });
          }
        })
        .catch((err) => {
          console.error("Error authenticating user:", err);
          window.dataLayer.push({ userId: null });

          // Reset context on authentication failure
          setContext({
            ...context,
            checkingStatus: false,
            auth: null,
          });
        });
    } else {
      // No token, mark status as checked
      setContext({ ...context, checkingStatus: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<></>}>
      <Router>
        <ScrollToTop>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <ProtectedRoute
                    isAuth={route.isAuth}
                    element={route.element}
                    isPrivate={route.isPrivate}
                  />
                }
              />
            ))}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </Suspense>
  );
};

export default App;
