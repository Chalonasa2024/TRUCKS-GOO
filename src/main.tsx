
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create the root with a non-null assertion since we know the element exists
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element with id 'root' not found in the document");
}
