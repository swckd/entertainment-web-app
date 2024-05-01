import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

// Components

import Aside from "./components/Aside/Aside";
import SearchBar from "./components/SearchBar/SearchBar";

// Contexts
import AuthProvider from "./contexts/AuthContext";
import WatchlistProvider from "./contexts/WatchlistContext";

// Routes
import AppRoutes from "./router/AppRoutes";


function App() {
  return (
    <AuthProvider>
      <div className="App container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-1 Aside">
            <Aside></Aside>
          </div>
          <div className="col-xs-12 col-md-11 px-5 Main">
            <WatchlistProvider>
              <SearchBar></SearchBar>
              <AppRoutes />
            </WatchlistProvider>
          </div>
        </div>
      </div>
    </AuthProvider >
  );
}

export default App;