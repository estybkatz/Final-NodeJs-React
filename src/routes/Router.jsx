import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import RegisterPage from "../pages/RegisterPage";
import FavCardsPage from "../pages/FavCardsPage";
import CreateCardPage from "../pages/CreateCardPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import MyCardsPage from "../pages/MyCardsPage";
import RP1 from "../pages/NestedRoutePage/tasksForAdmin";
import RP2 from "../pages/RP2";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import NestedRoutePage from "../pages/NestedRoutePage";
import NestedPage1 from "../pages/NestedRoutePage/NestedPage1";
import NestedPage2 from "../pages/NestedRoutePage/NestedPage2";
import { formGroupClasses } from "@mui/material";
import SandboxPage from "../pages/SandboxPage";
import MoreInformationPage from "../pages/MoreInformation";
import { useSelector } from "react-redux";
import EditProtectedRoute from "../components/EditProtectedRoute";
import TasksPage from "../pages/TasksPage";
import CostumerPrivtePage from "../pages/CustomerPrivtepage";
import WorkerPrivtePage from "../pages/workerTasksPrivate";
import MyTasksPage from "../pages/MyTasksPage";
import MyDoneTasksPage from "../pages/MyDoneTsksPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route
        path={ROUTES.MYTASKS}
        element={<ProtectedRoute isLoggedIn={true} element={<MyTasksPage />} />}
      />
      <Route
        path={ROUTES.MYDONETASK}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            isLoggedIn={true}
            element={<MyDoneTasksPage />}
          />
        }
      />
      <Route
        path={"/createTask/:id"}
        element={<ProtectedRoute isLoggedIn={true} element={<TasksPage />} />}
      />
      <Route
        path={"costumer/:id"}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            isLoggedIn={true}
            element={<CostumerPrivtePage />}
          />
        }
      />
      <Route
        path={"worker/:id"}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            isLoggedIn={true}
            element={<WorkerPrivtePage />}
          />
        }
      />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.FAV}
        element={
          <ProtectedRoute isLoggedIn={true} element={<FavCardsPage />} />
        }
      />
      <Route
        path={ROUTES.CREATE}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            isLoggedIn={true}
            element={<CreateCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            isLoggedIn={true}
            element={<MyCardsPage />}
          />
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<SandboxPage />}
          />
        }
      />

      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute isLoggedIn={true} element={<LogoutPage />} />}
      />
      <Route
        path="/edit/:id"
        element={
          <EditProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route path="/MInfo/:id" element={<MoreInformationPage />} />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isLoggedIn={false}
            element={<RegisterPage />}
          />
        }
      />
      <Route
        path="/managementInterface"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<SandboxPage />}
          />
        }
      >
        <Route path="workersList" element={<NestedPage1 />} />
        <Route path="customersList" element={<NestedPage2 />} />
        <Route path="tasks" element={<RP1 />} />
        {/* <Route path="worker/:id" element={<WorkerPrivtePage />} />
        <Route path="costumer/:id" element={<CostumerPrivtePage />} /> */}
        {/* <Route path="RP2" element={<RP2 />} />  */}
      </Route>

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
