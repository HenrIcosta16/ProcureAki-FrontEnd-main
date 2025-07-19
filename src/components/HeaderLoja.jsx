import { Navbar, Container, Nav } from "react-bootstrap";

const HeaderLoja = () => {
  return (
    <Navbar style={headerStyle} expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={textoProcureAk}>
          ProcureAki
          <img
            src="/img/locationwhite2.png"
            alt="locationwhiteicon"
            className="img-fluid"
            style={Locationwhite}
          />
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link href="/" style={greetingStyle}>
            
            
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HeaderLoja;

const headerStyle = {
  backgroundColor: "#006D77",
  padding: "15px",
};

const greetingStyle = {
  fontWeight: 500,
  fontSize: "30px",
  color: "white",
  whiteSpace: "nowrap",
  marginRight: "14rem",
  display: "flex",
  alignItems: "center",
  gap: "1px", 
};

const textoProcureAk = {
  fontSize: "25px",
  color: "white",
  fontWeight: 500,
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "1px", 
};

const Locationwhite = {
  width: "33px",
  height: "33px",
};


