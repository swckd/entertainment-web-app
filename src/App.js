import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

// Components

import Aside from "./components/Aside/Aside";
import SearchBar from "./components/SearchBar/SearchBar";

// Authentication Context
import AuthProvider from "./contexts/AuthContext";

// Routes
import AppRoutes from "./router/AppRoutes";


function App() {
  return (
    <AuthProvider>
      <div className="App d-flex">
        <div className="Aside">
          <Aside></Aside>
        </div>
        <div className="Main ms-5">
          <SearchBar></SearchBar>
          <AppRoutes />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;