import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AppLayout from "../layouts/AppLayout";
import ClassScheduleTracker from "../pages/ClassScheduleTracker";
import BudgetTracker from "../pages/BudgetTracker";
import ExamGenerator from "../pages/ExamGenerator";
import StudyPlanner from "../pages/StudyPlanner";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Main,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "home",
        Component: Home,
      },
      {
        path: "class-schedule",
        Component: ClassScheduleTracker,
      },
      {
        path: "budget-tracker",
        Component: BudgetTracker,
      },
      {
        path: "exam-qa",
        Component: ExamGenerator,
      },
      {
        path: "study-planner",
        Component: StudyPlanner,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
