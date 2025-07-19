import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import ProductForm from '../components/ProductForm';
import ProductCatolog from '../components/ProductCatolog';

const ProductListados = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://procureaki.onrender.com/produtos');
      const data = await response.json();
      setProducts(data.produtos || data);
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
    }
  };

  const handleProductAdded = () => {
    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://procureaki.onrender.com/produtos/${productToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchProducts(); 
      } else {
        console.error('Erro ao excluir produto');
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container style={styles.container}>
      <Row>
        <Col>
          <Button
            style={styles.button}
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
          >
            Cadastrar Produto
          </Button>
        </Col>
      </Row>

      {products.length === 0 ? (
        <ProductCatolog />
      ) : (
        <>
          <Row>
            <Col>
              <div style={styles.icon}>
                <p style={styles.produtext}>Produtos</p>
                <div style={styles.divlowHeader}></div>
              </div>
            </Col>
          </Row>

          <Row>
            {products.map((product, index) => (
              <Col key={index} md={4}>
                <div style={styles.productItem}>
                  <img
                    src={product.imagem_url}
                    alt={product.name}
                    style={styles.productImage}
                  />
                  <div>
                    <h5>{product.nome}</h5>
                    <p>Preço: R$ {product.preco}</p>
                    <p>Quantidade: {product.quantidade}</p>
                    <p>{product.descricao}</p>
                    <div style={styles.buttonGroup}>
                      <Button 
                        variant="warning" 
                        style={styles.editButton}
                        onClick={() => handleEditProduct(product)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="danger" 
                        style={styles.deleteButton}
                        onClick={() => handleDeleteClick(product)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}

      <ProductForm
        show={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
        onProductAdded={handleProductAdded}
        productToEdit={editingProduct}
      />

     
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o produto <strong>{productToDelete?.nome}?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete} style={styles.delete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductListados;


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    width: '258px',
    height: '57px',
    top: '55px',
    position:"relative",
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#006D77',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  icon: {
    fontSize: '40px',
    color: '#007bff',
    marginTop: '30px',
  },
  produtext: {
    width: '111px',
    Height: '664px',
    left: '-1px',
    color: '#02040F',
    Top: '1166px',
    fontWeight: 400,
    fontSize: '26px',
    lineHeight: '100%',
    letterSpacing: '0',
    position: 'relative',
    top: '16px',
  },

  divlowHeader: {
    backgroundColor: '#006D77',
    width: '100%',
    height: '5px',
    marginTop: '10px',
  },

  productItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '15px',
    border: '1px solid #ddd',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },

  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '10px',
  },

  editButton: {
    marginRight:'10px',
    backgroundColor: '#006D77', 
},
};