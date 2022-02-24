import { Navigate, Route, Routes } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Create from "./components/Create/Create";
import { Provider } from "react-redux";
import store from "./store/index";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/create" element={<Create />} />
        <Route element={<PrivateRoute />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Provider>
  );
};

export default App;
