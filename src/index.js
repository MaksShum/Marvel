import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './components/app/App';

import './style/style.scss';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);