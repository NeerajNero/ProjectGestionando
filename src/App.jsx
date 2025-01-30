import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import PrivateRoute from "./privateRoute/PrivateRoute"
import {Toaster} from 'react-hot-toast'
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import LandingPage from "./pages/LandingPage"
import Sidebar from "./components/sideBar/SidebarComponent"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Projects from "./pages/Projects"
import TaskPage from "./pages/taskPage"
import TeamsPage from "./pages/TeamsPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import AddTaskPage from "./pages/AddTaskPage"
import UpdateTaskPage from "./pages/UpdateTaskPage"

const MainLayout = () => (
  <>
      <Header />
      <main className="flex row mainContentPage" style={{ width: '100%' }}>
          <Sidebar />
          <Outlet />
      </main>
      <Footer />
  </>
);

const App = () => {
  return (
      <Router>
            <Routes>
              <Route element={<PrivateRoute />} >
              <Route element={<MainLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/homePage" element={<HomePage />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/tasks" element={<TaskPage />}/>
                  <Route path='/teams' element={<TeamsPage />} />
                  <Route path='/analytics' element={<AnalyticsPage />} />
                  <Route path="/addTask" element={<AddTaskPage/>} />
                  <Route path="/updateTask" element={<UpdateTaskPage />}/>
              </Route>
              </Route>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Toaster />
      </Router>
  );
};


export default App
