import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

// Components
import Aside from "./components/Aside/Aside";
import SearchBar from "./components/SearchBar/SearchBar";


// Routes
import AppRoutes from "./router/AppRoutes";


function App() {

  const basename = process.env.NODE_ENV === 'production' ? '/entertainment-web-app' : '/';

  return (



    <div className="container-xl mt-5">
      <div className="row flex-column flex-md-row">
        <div className="col-12 col-md-1 order-md-1 order-1 position-relative">
          <Aside />
        </div>
        <div className="col-12 col-md-11 order-md-2 order-2">
          <div className="container-fluid">
            <div className="row">
              <SearchBar />
            </div>
            <div className="row vh-100 overflow-auto no-scrollbar pb-3">
              <div className="p-0 ms-3" style={{ marginBottom: "8rem" }}>
                <AppRoutes basename={basename} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default App;
