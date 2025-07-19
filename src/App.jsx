import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './templates/Layout.jsx';
import Home from './views/Home.jsx';
import CadastrarProduto from './views/CadastrarProduto'; 
import CadastrarLoja from './views/CadastrarLoja.jsx';  

import LojaCategoria from './components/LojaCategoria.jsx';

import NoPage from './views/NoPage.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NoPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'cadastroproduto',
          element: <CadastrarProduto />,
        },
       
        {
          path: 'cadastrarLoja',
          element: <CadastrarLoja />,
        },
       
        {
          path: 'lojacategoria/:nomeCategoria',  
          element: <LojaCategoria />,
        },
        {
          path: 'lojacategoria', 
          element: <LojaCategoria />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;