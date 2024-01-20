import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Console from "../pages/Console";
import Docs from "../pages/Docs";
import Form from "../pages/Form";
import Settings from "../pages/Settings";

import { useStore } from "../store/store";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Demo from "../pages/Demo";
import MainLayout from "../components/Layouts/MainLayout";
import UserLayout from "../components/Layouts/UserLayout";
import PasswordLess2 from "../pages/PasswordLess2";

import TwoFactorLogin from "../pages/TwoFactorLogin";
import Code from "../pages/Code";
import TwoFactor from "../pages/TwoFactor";
import LoginTest from "../pages/LoginTest";
import UserSettingsLayout from "../components/Layouts/UserSettingsLayout";
import { PasswordLessLoginSetup } from "../pages/PasswordLessLoginSetup";

const Router = () => {
  const { user } = useStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* main layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="docs" element={<Docs />}></Route>
          <Route
            path="forgotpassword/email"
            element={<ForgotPassword />}
          ></Route>
          <Route
            path="forgotpassword/change"
            element={<ResetPassword />}
          ></Route>
          <Route path="demo" element={<Demo />}></Route>
        </Route>

        {/* user layout */}
        <Route path="/console/:id/" element={<UserLayout />}>
          <Route path="settings" element={<Settings />}></Route>
          <Route index element={<Console />}></Route>
          <Route path="form/:formid" element={<Form />}></Route>
        </Route>

        {/* user settings layout */}
        <Route path="/console/:id/settings" element={<UserSettingsLayout />}>
          <Route path="code" element={<Code />}></Route>
          <Route path="twofactorauth" element={<TwoFactor />}></Route>
          <Route path="passwordless" element={<PasswordLessLoginSetup />}></Route>
        </Route>

        {/* auth layout */}
        <Route path="login" element={<Login />}></Route>
        <Route path="logintest" element={<LoginTest />}></Route>
        <Route path="login/2factor/:id" element={<TwoFactorLogin />}></Route>
        <Route path="passwordless/:id" element={<PasswordLess2 />}></Route>
        <Route path="signup" element={<Signup />}></Route>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
