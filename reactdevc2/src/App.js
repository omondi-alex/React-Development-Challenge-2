import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

// IMPORT PAGES
import Login from "./pages/login/Login";
import VisualizationPage from "./pages/visualization/VisualizationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Login />} path="/login" />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route element={<VisualizationPage />} path="/" />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
