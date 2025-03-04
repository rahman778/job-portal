import { Link, useNavigate } from "react-router-dom";

import ThemeButton from "../Buttons/ThemeButton";
import Avatar from "../Core/Avatar";
import { ROLES } from "../../constants";

const DesktopNav = (props) => {
  const { routes, setIsOpen, isSignedIn, onLogout, profileData } = props;

  const navigate = useNavigate();

  const toggleMobileDrawer = () => {
    setIsOpen(true);
  };

  return (
    <nav className="sticky bg-white dark:bg-darkGrey shadow-sm dark:shadow-gray-800 z-10">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex justify-between h-16">
          <div className="flex items-center truncate w-full justify-between">
            <Link to="/" className="flex items-center flex-shrink-0 mt-[3px]">
              Career101
            </Link>
            <div className="hidden lg:mr-8 lg:block lg:space-x-8">
              {routes.map((route) => (
                <Link
                  key={route.id}
                  to={route.path}
                  className="inline-flex items-center text-md font-medium capitalize text-gray-700 dark:text-gray-100 hover:text-primary dark:hover:text-primary px-0.5 pt-1.5 pb-1 whitespace-nowrap menu-link"
                >
                  {route.label}
                </Link>
              ))}
              {profileData?.user?.role === ROLES.Recruiter && (
                <Link
                  to={"/company"}
                  className="inline-flex items-center text-md font-medium capitalize text-gray-700 dark:text-gray-100 hover:text-primary dark:hover:text-primary px-0.5 pt-1.5 pb-1 whitespace-nowrap menu-link"
                >
                  Company
                </Link>
              )}
              {profileData?.user?.role === ROLES.Admin && (
                <Link
                  to={"/all-companies"}
                  className="inline-flex items-center text-md font-medium capitalize text-gray-700 dark:text-gray-100 hover:text-primary dark:hover:text-primary px-0.5 pt-1.5 pb-1 whitespace-nowrap menu-link"
                >
                  All Companies
                </Link>
              )}
               {profileData?.user?.role === ROLES.Admin && (
                <Link
                  to={"/dashboard"}
                  className="inline-flex items-center text-md font-medium capitalize text-gray-700 dark:text-gray-100 hover:text-primary dark:hover:text-primary px-0.5 pt-1.5 pb-1 whitespace-nowrap menu-link"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center ">
            <ThemeButton />
            <div className="hidden lg:ml-2 lg:flex lg:items-center">
              {isSignedIn  ?  (
                <Avatar
                  top={"top-[60px]"}
                  right={"right-[30px]"}
                  profileData={profileData}
                >
                  <ul className="py-3  text-md min-w-28">
                  
                      <li
                        onClick={() =>
                          navigate(
                            profileData?.user?.role === ROLES.Candidate
                              ? "/profile"
                              : "/company/profile"
                          )
                        }
                        className="hover:bg-primary/20 dark:hover:bg-primary/20 px-4 py-1 cursor-pointer"
                      >
                        Profile
                      </li>

                    <li
                      onClick={onLogout}
                      className="button transparent-btn px-4 py-1 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </Avatar>
              ) : (
                <div className="flex items-center space-x-3 ">
                  <Link to="/login" className="button transparent-btn">
                    Login
                  </Link>
                  <Link to="/signup" className="button primary-btn">
                    Signup
                  </Link>
                </div>
              )}
            </div>
            {/* Mobile button */}
            <div className="flex items-center px-2 ml-2 lg:hidden">
              <button
                onClick={toggleMobileDrawer}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
