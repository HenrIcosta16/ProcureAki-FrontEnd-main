
import { Row, Col } from "react-bootstrap";

import { FaMapMarkerAlt } from "react-icons/fa"; 

const ProcuraAkiSection = () => {
  return (
    <Row className="mt-4">
      <Col md={3} className="d-flex align-items-center justify-content-start">
        <div style={{ position: 'relative', top: '320px', left: '550px' }}>
          <img
            src="/img/casa.jpg"
            alt="Ícone Loja"
            style={{
              width: "106px",
              height: "106px",
              position: "absolute",
              top: "-353px",
              left: "-492px"
            }}
          />
          <FaMapMarkerAlt
            style={{
              fontSize: "70px",
              height: "70px",
              position: "absolute",
              top: "-392px",
              left: "-427px"
            }}
          />
        </div>
      </Col>
      <Col md={9}>
        <h2 style={{ ...headerStyles.sectionTitle, color:"#001F2D" }}>
          Quem procura, acha! Ache no <span style={headerStyles.procureAkiText}>ProcureAki</span>
          <div style={headerStyles.divBelowHeader}></div>
        </h2>
        <ul style={headerStyles.listStyle}>
          <li style={headerStyles.listItem}>
             <img src="/img/localizaçãoicon.png" alt="casaicon" className="img-fluid" style={headerStyles.iconLocation}  />
            O ProcureAki te conecta às lojas e vendedores próximos da sua localização.
          </li>
          <li style={headerStyles.listItemtwo}>
            <img src="/img/imgicon.png" alt="casaicon" className="img-fluid" style={headerStyles.iconChat} />
            Você, cliente, pode dar um upProcura para impulsionar a recomendação de uma loja.
          </li>
          <li style={headerStyles.listItemthree}>
            <img src="/img/iconcasa.png" alt="casaicon" className="img-fluid" style={headerStyles.iconPredio} />
            Você, empresa, pode alavancar suas vendas através do ProcureAki.
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default ProcuraAkiSection;

const headerStyles = {
  sectionTitle: {
    width: "2760px",
    height: "21px",
    top: "-385px",
    left: "-337px",
    fontFamily: 'Ubuntu',
    fontWeight: '400',
    fontSize: '22px',
    lineHeight: "100%",
    letterSpacing: '0%',
    marginBottom: "10px",
  },
  procureAkiText: {
    fontFamily: 'Ubuntu',
    fontWeight: '400', 
    fontSize: '22px', 
    lineHeight: "100%", 
    letterSpacing: '0%', 
    color: '#001F2D'
  },
  listStyle: {
    listStyleType: "none",
    paddingLeft: 0,
  },
  listItem: {
    width: "2760px",
    height: "32px",
    top: "-356px",
    left: "-315px",
    fontFamily: 'Ubuntu',
    fontWeight: '400',
    fontSize: '22px',
    lineHeight: '100%',
    letterSpacing: '0%',
    color:  '#006D77',
    display: "flex",
    alignItems: "center",
},

  listItemtwo: {
    width: "2760px",
    height: "32px",
    top: "-31px",
    left: "-314px",
    fontFamily: 'Ubuntu',
    fontWeight: '400',
    fontSize: "22px",
    lineHeight: '100%',
    letterSpacing: '0%',
    color:  '#006D77',
    display: "flex",
    alignItems: "center",
  },
  listItemthree: {
    width: "2760px",
    fontSize: "22px",
    height: "32px",
    top: "-31px",
    left: "-314px",
    fontWeight: '400',
    fontFamily: 'Ubuntu',
    lineHeight: '100%',
    letterSpacing: '0%',
    color:  '#006D77',
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  },
  iconLocation: {
    Top: "-358px",
    Left: "-342px",
    marginRight: "15px",
    fontSize: "26px",
    Height: "26px",
    color: "Black",

  },
  iconChat: {
    Top: "-316px",
    Left: "-342px",
    marginRight: "15px",
    fontSize: "26px",
    Height: "26px",
    color: "Black",

  },
  iconPredio: {
    Top: "-316px",
    Left: "-342px",
    marginRight: "15px",
    fontSize: "26px",
    Height: "26px",
    color: "Black",

  },
  divBelowHeader: {
    backgroundColor: '#006D77',
    width: '450px',
    height: '5px',
    marginTop: '10',
  }
};
