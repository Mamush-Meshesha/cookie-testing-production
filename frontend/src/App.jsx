import { Provider } from "react-redux";
import store from "../store/store";
import Login from "../components/Login";
import User from "../components/User";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Login />
        <User />
      </div>
    </Provider>
  );
}

export default App;
