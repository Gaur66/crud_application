import React, { useState, useEffect } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";

const SideNav = () => {
  const Menus = [
    { title: "Contact", src: "Chart_fill", route: "/" },
    { title: "Charts and Maps", src: "User", gap: true, route: "/dashboard" },
  ];
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => {
    setOpen(!open);
  };

  const location = useLocation();

  return (
    <div className="h-screen relative z-30">
      {isMobile && (
        <button
          onClick={toggleNav}
          className="p-2 text-white absolute top-2 left-2 z-10"
        >
          {open ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </button>
      )}

      <div
        className={`${
          (open || !isMobile) && "w-72"
        } bg-dark-purple p-5 pt-8 absolute top-0 left-0 bottom-0 transition-width duration-300`}
      >
        <ul className={`pt-2 w-62 ${isMobile ? "text-center" : ""}`}>
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`${
                index === 0 && "mt-2"
              } ${Menu.gap ? "mt-2" : ""}`}
            >
              <NavLink
                to={Menu.route}
                className={`flex items-center p-2 cursor-pointer hover:bg-light-white ${
                  location.pathname === Menu.route ||
                  (location.pathname === "/createcontact" && Menu.title === "Contact") || // Updated condition for "Create Contact"
                  (location.pathname.includes("/edit") && Menu.title === "Contact") // Updated condition for "Edit Contact"
                    ? "bg-light-white text-white"
                    : "text-gray-300"
                } ${
                  !open &&
                  (location.pathname === Menu.route ||
                    (location.pathname === "/create" && Menu.title === "Contact") || // Updated condition for "Create Contact"
                    (location.pathname.includes("/edit") && Menu.title === "Contact")) // Updated condition for "Edit Contact"
                    ? "origin-left duration-200"
                    : ""
                }`}
              >
                <img
                  src={require(`../assets/${Menu.src}.png`)}
                  alt={Menu.title}
                  className="w-4 h-4"
                />
                <span className={`ml-2`}>{Menu.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
