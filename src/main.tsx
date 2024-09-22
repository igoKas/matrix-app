import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './components/App/App.tsx'
import './index.css'
import AdjToReach from './components/AdjToReach/AdjToReach.tsx';
import GraphProperties from './components/GraphProperties/GraphProperties.tsx';
import AdjToIncidence from './components/AdjToIncidence/AdjToIncidence.tsx';
import IncidenceToAdj from './components/IncidenceToAdj/IncidenceToAdj.tsx';
import Isomorphic from './components/Isomorphic/Isomorphic.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "adj-to-reach",
    element: <AdjToReach />,
  },
  {
    path: "graph-properties",
    element: <GraphProperties />,
  },
  {
    path: "adj-to-incidence",
    element: <AdjToIncidence />,
  },
  {
    path: "incidence-to-adj",
    element: <IncidenceToAdj />,
  },
  {
    path: "isomorphic",
    element: <Isomorphic />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
