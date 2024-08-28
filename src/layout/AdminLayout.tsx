import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { toast } from "sonner";
import DatePicker from "react-datepicker";

import Logo from "../components/Logo";
import { removeItem } from "../utils/helperfuntions";
import { ADMIN_TOKEN, LOGOUT_SUCCESS } from "../utils/constants";
import { useData } from "../contexts/DataContext";

const AdminPanel: React.FC = () => {
  const { startDate, endDate, handleEndDate, handleStartDate } = useData();
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = useMemo(() => {
    const path = location.pathname;
    return path.split("/admin/")[1];
  }, [location]);

  useEffect(() => {
    setActiveTab(activePath);
  }, [activePath]);

  const handleLogout = () => {
    removeItem(ADMIN_TOKEN);
    navigate("/admin-login");
    toast.success(LOGOUT_SUCCESS);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 min-w-64 bg-white shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:fixed md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col p-4 border-b">
          <Link to="/admin/dashboard" className="pb-8">
            <Logo />
          </Link>
          <NavLink
            to="/admin/dashboard"
            className={`${
              activeTab === "dashboard"
                ? "text-primary border-l-4 border-primary"
                : "text-gray-500"
            } focus:outline-none py-2 pl-4 text-left`}
            onClick={() => {
              setActiveTab("dashboard");
              setIsSidebarOpen(false); // Close sidebar on mobile after selection
            }}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={`${
              activeTab === "users"
                ? "text-primary border-l-4 border-primary"
                : "text-gray-500"
            } focus:outline-none py-2 pl-4 text-left`}
            onClick={() => {
              setActiveTab("users");
              setIsSidebarOpen(false); // Close sidebar on mobile after selection
            }}
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/articles"
            className={`${
              activeTab === "articles"
                ? "text-primary border-l-4 border-primary"
                : "text-gray-500"
            } focus:outline-none py-2 pl-4 text-left`}
            onClick={() => {
              setActiveTab("articles");
              setIsSidebarOpen(false); // Close sidebar on mobile after selection
            }}
          >
            Articles
          </NavLink>
        </div>
      </div>

      {/* Content */}
      <div className="md:ml-64">
        <div className="bg-white border border-b flex justify-between gap-11 p-4 md:justify-end">
          <button
            className="text-gray-500 md:hidden focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <div className="flex border border-sm px-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => handleStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="outline-none text-sm max-w-[75px]"
            />
            &nbsp;-&nbsp;
            <DatePicker
              selected={endDate}
              onChange={(date) => handleEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="outline-none text-sm max-w-[75px]"
            />
          </div>
          <LogOut
            width={20}
            className="text-gray-500 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
        <div className="m-5">
          <h1 className="capitalize mb-5">{activeTab}</h1>
          <div
            className={`${
              activeTab !== "dashboard" && "bg-white p-5 "
            } rounded-sm`}
          >
            <Outlet />
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminPanel;
