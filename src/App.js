import { Route, Routes } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
