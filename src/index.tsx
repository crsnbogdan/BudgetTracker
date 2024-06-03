import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppProvider } from "./Context/ContextProvider";
import "./variables.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AppProvider>
      <App />
    </AppProvider>
  );
}
