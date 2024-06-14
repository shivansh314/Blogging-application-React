import React from "react";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import Container from "../Container";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector( (state) => state.auth.userData)
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Get Started",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "write",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Saved",
      slug: "/saved",
      active: authStatus,
    },
  ];

  return (
    <div className="w-screen h-16 border-b-[0.5px] border-b-gray-200 ">
      <Container>
        <nav className="relative w-screenmax-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {authStatus ? (
              <Link to="/">
                <Logo width="70px" />
              </Link>
            ) : (
              <Link to="/homeout">
                <Logo width="70px" />
              </Link>
            )}
          </div>
          <ul
            className="flex flex-col font-normal p-4 md:p-0 mt-4 border
          rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 "
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link to={item.slug}>
                    <button
                      // onClick={()=>{navigate(item.slug)}}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            {authStatus && (
              <li>
                <Link to = {`/profile/${userData.$id}`}>
                <img
                  src="https://community.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg"
                  className="w-10 h-10 rounded-3xl ml-2 object-cover"
                  alt=""
                />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </div>
  );
}

export default Header;
