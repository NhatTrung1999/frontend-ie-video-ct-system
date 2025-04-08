import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Main from "./components/Main";
import Test from "./components/Test";

const App = () => {
  return (
    <div className="h-screen bg-primary-600">
      <Header />
      <Main />
      <ToastContainer closeButton={false} />
    </div>
    // <div className="h-screen flex justify-center items-center bg-primary-500"><Test /></div>
  );
};

export default App;
