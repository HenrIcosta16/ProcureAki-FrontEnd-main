import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import HeaderProdutos from '../components/HeaderProdutos';
import HeaderLoja from '../components/HeaderLoja';  
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
// import FooterLimpo from '../components/FooterLimpo';

const Layout = () => {
  const location = useLocation();

  console.log('path:', location.pathname);  

  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const isCadastrarProdutosPage = location.pathname === '/cadastroproduto';
  const isCadastroClientePage = location.pathname === '/cadastrocliente';
  const isCadastroLojaPage = location.pathname === '/cadastrarloja';
  const isLojascadastradasPage = location.pathname === '/lojacategoria';
  const isLoginPage = location.pathname === '/login';
  


  return (
    <>
      {isHomePage && <Header />}
      {isCadastrarProdutosPage && <HeaderProdutos />} 
      {isCadastroClientePage && <HeaderProdutos />} 
      {isCadastroLojaPage && <HeaderLoja />}
      {isLojascadastradasPage && <HeaderLoja/>}
      {isLoginPage && <HeaderLoja />}
      
      <Container>
        <main>
          <Outlet />  
        </main>
      </Container>

      {isHomePage && <Footer />}
      {isCadastrarProdutosPage && <Footer />}
      {/* {isCadastroClientePage && <Footer />} */}
      {/* {isCadastroLojaPage && <Footer />} */}
      
       
    </>
  );
};

export default Layout;  





// import { Outlet, useLocation } from 'react-router-dom';
// import Header from '../components/Header';
// import HeaderProdutos from '../components/HeaderProdutos';
// import HeaderLoja from '../components/HeaderLoja';
// import Footer from '../components/Footer';

// const Layout = () => {
//   const location = useLocation();

//   // Define qual header renderizar com base na rota
//   const getHeader = () => {
//     if (location.pathname === '/cadastroproduto' || location.pathname === '/cadastrocliente') {
//       return <HeaderProdutos />;
//     }
//     if (location.pathname === '/cadastrarloja') {
//       return <HeaderLoja />;
//     }
//     return <Header />; // Header padrão
//   };

//   return (
//     <>
//       {getHeader()} {/* Renderiza o header com base na rota */}
//       <main>
//         <Outlet /> {/* Renderiza o conteúdo da rota */}
//       </main>
//       <Footer /> {/* Footer comum a todas as páginas */}
//     </>
//   );
// };

// export default Layout;