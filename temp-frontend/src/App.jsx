import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import TemplateEditorPage from "./Pages/TemplateEditorPage";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Editor from "./Pages/Editor";
import BuilderIOEditor from "./Pages/BuilderIOEditor";
import ReactPageEditor from "./Pages/ReactPageEditor";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <TemplateEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grapesjs"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/builderio"
            element={
              <ProtectedRoute>
                <BuilderIOEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reactpage"
            element={
              <ProtectedRoute>
                <ReactPageEditor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
