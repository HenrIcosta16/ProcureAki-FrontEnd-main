import { Navbar, Container, Nav } from 'react-bootstrap';

const HeaderProdutos = () => {
  return (
    <Navbar style={headerStyle} expand="lg">
      <Container  fluid>
        <Navbar.Brand href="/">
          <Nav.Link href="/" style={textoProcureAk}>ProcureAki<img src="/img/locationwhite2.png" alt="locationwhiteicon" className="img-fluid" style={Locationwhite}  /></Nav.Link>
          
        </Navbar.Brand>
        {/* <Nav className="ms-auto">
          <Nav.Link href="/" style={greetingStyle}>Olá, Mundo Bike<img src="/img/casaheader2.png" alt="casaheader2" className="img-fluid" style={CasaIcon}  /></Nav.Link> 
        </Nav> */}
      </Container>
    </Navbar>
  );
};

export default HeaderProdutos;

const headerStyle = {
    backgroundColor: '#006D77', 
    padding: '20px 40px', 
    
  };

  // const greetingStyle = {
  //   fontWeight: 500,
  //   fontSize: '30px', 
  //   lineHeight: '1.2',  
  //   letterSpacing: '0',  
  //   width: '186px',  
  //   height: '49px',  
  //   top: '882px',  
  //   left: '782px',  
  //   color: 'white',  
  //   position: 'center',  
  //   whiteSpace: 'nowrap',  
  //   marginRight: '10rem', 
    
  // };
  
  const textoProcureAk = {
    
    fontSize: '29px',  
    color: 'white',  
    margin: 0,  
    lineHeight: '50px',  
    textAlign: 'left',  
    width: '118px',
    height: '49px',
    Top: '882px',
    Left: '-15px',
    fontWeight: 500,
    letterSpacing: '0',  
    position: 'relative',
    
  };

  const Locationwhite = {
    width: '33px',
    height: '33px',
    Top: '882px',
    lineHeight: '50px', 
    position: 'relative',
    top: '-4px',
    left: '1px'
  };

  // const CasaIcon = {
  //   width: '47px',
  //   height: '45px',
  //   Top: '887px',
  //   Left: '734',
  //   lineHeight: '50px', 
  //   position: 'relative',
  //   top: '-5px',
  //   left: '-281px',
    
    
  // }