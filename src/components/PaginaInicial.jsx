import  { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import '../components/carrossel.css';
import Procuraakisection from './Procuraakisection';
import '../components/cards.css';

const PaginaInicial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // const goToCadastrarLoja = () => navigate('/Login');
  // const goToLogin = () => navigate('/CadastrarLoja');

  return (
    <Container id="home" className="mt-4">
      <Carousel activeIndex={currentIndex} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="img/primadlucasnocell.jpg"
            alt="Imagem 1"
          />
          <Carousel.Caption style={carouselCaptionStyles}>
            <p>O ProcureAki é uma plataforma que facilita a busca por suas necessidades sem burocracia. Conectamos clientes e vendedores de forma direta.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="img/clientesconversando.jpg"
            alt="Imagem 2"
          />
          <Carousel.Caption style={carouselCaptionStyles}>
            <p>O ProcureAki é fácil de usar, é prático e o mais importante: Te conectamos a quem e o que, de fato, você precisa.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Procuraakisection />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4" style={{ cursor: 'pointer' }}>
            {/* <h5 className="card-title">Você é cliente?</h5> */}
            <div className="card text-center">
              <img src="img/nocelular.png" className="card-img-top" alt="Cliente" />
              <div className="card-body">
                <p className="card-text">
                  Se conecte ao <strong>ProcureAki</strong> e ache o que precisa!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4" style={{ cursor: 'pointer' }}>
            {/* <h5 className="card-title">Você é dono de uma loja?</h5> */}
            <div className="card text-center">
              <img src="img/lojacard.jpeg" className="card-img-top" alt="Dono de Loja" />
              <div className="card-body">
                <p className="card-text">
                  Se conecte ao <strong>ProcureAki</strong> e dê um up nas suas vendas!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaginaInicial;

const carouselCaptionStyles = {
  backgroundColor: '#B6CCFE80',
  color: 'white',
  fontSize: '31px',
  padding: '15px',
  borderRadius: '8px',
};
