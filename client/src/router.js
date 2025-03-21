import LandingLayout from "./layout/AppLayout";
import About from "./pages/about";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Globe from "./pages/globe";
import Search from "./pages/search";
import Home from "./pages/home";
import Term from "./pages/terms";
import Privacy from "./pages/privacy";
import Blog from "./pages/blog";
import Profile from "./pages/profile";
import Setting from "./pages/setting";
import FAQs from "./pages/faq";
import Contact from "./pages/contact";
import Verify from "./pages/verify";
import Forgot from "./pages/forgot";
import ResetPassword from "./pages/reset";
import BlogDetail from "./pages/blogdetail";
import How from "./pages/how";
import Chat from "./pages/chat";
const routes = [
  {
    id: "home",
    path: "/",
    element: (
      <LandingLayout>
        <Home />
      </LandingLayout>
    ),
  },
  {
    id: "profile",
    path: "/profile",
    isPrivate: true,
    element: (
      <LandingLayout>
        <Profile />
      </LandingLayout>
    ),
  },
  {
    id: "setting",
    path: "/setting",
    isPrivate: true,
    element: (
      <LandingLayout>
        <Setting />
      </LandingLayout>
    ),
  },
  {
    id: "term",
    path: "/term",
    element: (
      <LandingLayout>
        <Term />
      </LandingLayout>
    ),
  },
  {
    id: "privacy",
    path: "/privacy",
    element: (
      <LandingLayout>
        <Privacy />
      </LandingLayout>
    ),
  },
  {
    id: "blog",
    path: "/blog",
    element: (
      <LandingLayout>
        <Blog />
      </LandingLayout>
    ),
  },
  {
    id: "blogdetail",
    path: "/blog/:id",
    element: (
      <LandingLayout>
        <BlogDetail />
      </LandingLayout>
    ),
  },
  {
    id: "how",
    path: "/how",
    element: (
      <LandingLayout>
        <How />
      </LandingLayout>
    ),
  },
  {
    id: "contact",
    path: "/contact",
    element: (
      <LandingLayout>
        <Contact />
      </LandingLayout>
    ),
  },
  {
    id: "faq",
    path: "/faq",
    element: (
      <LandingLayout>
        <FAQs />
      </LandingLayout>
    ),
  },
  {
    id: "search",
    path: "/search/:query?",
    // isPrivate: true,
    element: (
      <LandingLayout>
        <Globe />
      </LandingLayout>
    ),
  },
  {
    id: "upload",
    path: "/upload/:query",
    // isPrivate: true,
    element: (
      <LandingLayout>
        <Search />
      </LandingLayout>
    ),
  },
  {
    id: "login",
    path: "/login",
    isAuth: true,
    element: (
      <LandingLayout>
        <Login />
      </LandingLayout>
    ),
  },
  {
    id: "register",
    path: "/register",
    isAuth: true,
    element: (
      <LandingLayout>
        <Register />
      </LandingLayout>
    ),
  },
  {
    id: "about",
    path: "/about",
    element: (
      <LandingLayout>
        <About />
      </LandingLayout>
    ),
  },
  {
    id: "forgot",
    path: "/forgot",
    isAuth: true,
    element: (
      <LandingLayout>
        <Forgot />
      </LandingLayout>
    ),
  },
  {
    id: "verify",
    path: "/verify/:token",
    element: (
      <LandingLayout>
        <Verify />
      </LandingLayout>
    ),
  },
  {
    id: "reset-password",
    isAuth: true,
    path: "/reset-password/:token",
    element: (
      <LandingLayout>
        <ResetPassword />
      </LandingLayout>
    ),
  },
  {
    id: "message",
    isPrivate: true,
    path: "/message",
    element: (
      <LandingLayout fdisable={true}>
        <Chat />
      </LandingLayout>
    ),
  },
];

export default routes;
