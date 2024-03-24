import "./App.css";
import NavBar from "./components/NavBar";

import Main from "./pages/Main/Main";
import ExecutiveMember from "./pages/ExecutiveMember";
import { BrowserRouter, useNavigate, Route, Routes } from "react-router-dom";
import Gallery from "./pages/Gallery";
import GalleryIndividual from "./pages/GalleryIndividual";
import MembershipForm from "./pages/MembershipForm";
import AdminLogin from "./pages/Admin/Login";
import SignUpMembership from "./pages/SignUpMembership";
import Dashboard from "./pages/Admin/Dashboard";
import AllRecord from "./pages/Admin/AllRecord";
import ProtectedRoute from "./pages/Admin/ProtectedRoute";
import PublicRoute from "./pages/Admin/PublicRoute";
import ChangePassword from "./pages/Admin/ChangePassword";
import Logout from "./pages/Admin/Logout";
import ActAndRegulation from "./pages/ActAndRegulation";
import Information from "./pages/Information";
import Contact from "./pages/Contact";
import Objective from "./pages/Objective";
import Introduction from "./pages/Introduction";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Main />} />
            <Route path="act-regulation" element={<ActAndRegulation />} />
            <Route path="executive-member" element={<ExecutiveMember />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/:name" element={<GalleryIndividual />} />
            <Route path="membership-forms" element={<MembershipForm />} />
            <Route path="information" element={<Information />} />
            <Route path="contact" element={<Contact />} />
            <Route path="introduction" element={<Introduction />} />
            <Route path="objective" element={<Objective />} />

            <Route element={<PublicRoute />}>
              <Route path="admin-login" element={<AdminLogin />} />
            </Route>

            <Route path="admin-logout" element={<Logout />} />

            <Route
              path="sign-in-for-new-membership"
              element={<SignUpMembership />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={<Dashboard />}>
              <Route path="all-records" element={<AllRecord />} />
              <Route path="changepassword" element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
