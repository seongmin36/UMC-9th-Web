import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
