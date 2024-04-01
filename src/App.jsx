import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/header";
import Tabel from "./components/tabel";
import LoginPanel from "./components/login";
import Add from "./components/add";
import Edit from "./components/edit";
import Profile from "./components/Profile";
import NotFound from "./components/not-found";
const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigate();
  const parms = window.location.href;
  // login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLogin(true);
      if (parms.includes("/login")) {
        return navigation("/");
      }
      return;
    } else {
      setIsLogin(false);
      return navigation("/login");
    }
  }, [isLogin, parms]);
  return (
    <>
      <Header login={isLogin} />
      <div>
        <Routes>
          <Route path="/" element={<Tabel />} />
          <Route path="/login" element={<LoginPanel login={setIsLogin} />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default Router;
