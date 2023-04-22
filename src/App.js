import logo from './logo.svg';
import './App.css';
import ApplicationList from './components/ApplicationList.jsx';
import ResourceList from './components/ResourceList';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/application">Application</Link>
          </li>
          <li>
            <Link to="/resource">Resource</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ApplicationList />}></Route>
        <Route path="/application" element={<ApplicationList />}></Route>
        <Route path="/resource" element={<ResourceList />}></Route>
      </Routes>

      <Outlet />
    </div>
  );
}

export default App;
