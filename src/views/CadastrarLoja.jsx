import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaStore, FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const schema = Yup.object({
  nomeLoja: Yup.string().required("Nome da loja é obrigatório"),
  descricao: Yup.string().required("Descrição é obrigatória"),
  cnpj: Yup.string()
    .matches(/^\d{14}$/, "CNPJ deve ter 14 dígitos")
    .required("CNPJ é obrigatório"),
  horario_abertura: Yup.string().required("Horário de abertura é obrigatório"),
  horario_fechamento: Yup.string().required("Horário de fechamento é obrigatório"),
  cep: Yup.string()
    .matches(/^\d{8}$/, "CEP deve ter 8 dígitos")
    .required("CEP é obrigatório"),
  nomeRua: Yup.string().required("Nome da rua é obrigatório"),
  cidade: Yup.string().required("Cidade é obrigatória"),
  estado: Yup.string().required("Estado é obrigatório"),
  numero: Yup.string().required("Número é obrigatório"),
  telefone: Yup.string()
    .matches(/^\d{10,11}$/, "Telefone inválido")
    .required("Telefone é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref("senha"), null], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
  categoria: Yup.string().required("Categoria é obrigatória"),
  bairro: Yup.string().required('Bairro é obrigatório'),
  latitude: Yup.string().required('latitude é obrigatório'),
  longitude: Yup.string().required('longitude é obrigatório')
});

const CadastroLoja = () => {
  const [lojas, setLojas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedLoja, setSelectedLoja] = useState(null);
  const [editId, setEditId] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
    setEditId(null);
    formik.resetForm();
  };

  const handleShowInfoModal = (loja) => {
    setSelectedLoja(loja);
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  const fetchLojas = async () => {
    try {
      const res = await fetch("https://procureaki.onrender.com/lojas");
      const data = await res.json();
      setLojas(data);
    } catch (error) {
      console.error("Erro ao carregar lojas", error);
      toast.error("Erro ao carregar lojas.");
    }
  };

  useEffect(() => {
    fetchLojas();
  }, []);

  const handleSubmit = async (values) => {
    const endereco = {
      cep: values.cep,
      logradouro: values.nomeRua,
      cidade: values.cidade,
      estado: values.estado,
      numero: values.numero,
      bairro: values.bairro,
    };

    const categoria = {
      nome_categoria: values.categoria,
    };

    const localizacao = {
      latitude: values.latitude,
      longitude: values.longitude
    };

    const dadosParaEnviar = {
      nome: values.nomeLoja,
      descricao: values.descricao,
      cnpj: values.cnpj,
      horario_abertura: values.horario_abertura,
      horario_fechamento: values.horario_fechamento,
      telefone: values.telefone,
      email: values.email,
      senha: values.senha,
      endereco: endereco,
      categoria: categoria,
      localizacao: localizacao
    };

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `https://procureaki.onrender.com/lojas/${editId}`
      : "https://procureaki.onrender.com/lojas";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnviar),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Erro na API:", errorData);
        toast.error("Erro ao salvar loja. Verifique os dados.");
        return;
      }

      await fetchLojas();
      setShowForm(false);
      toast.success(editId ? "Loja atualizada com sucesso!" : "Loja cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao conectar com o servidor.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://procureaki.onrender.com/lojas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta da API:", errorText);
        throw new Error("Erro ao excluir a loja.");
      }

      toast.success("Loja excluída com sucesso!");
      await fetchLojas();
      setShowInfoModal(false);
    } catch (error) {
      console.error("Erro ao excluir loja:", error);
      toast.error("Erro ao excluir loja.");
    }
  };

  const formik = useFormik({
    initialValues: {
      nomeLoja: "", descricao: "", cnpj: "", horario_abertura: "", horario_fechamento: "",
      cep: "", nomeRua: "", cidade: "", estado: "", numero: "", telefone: "", email: "",
      senha: "", confirmarSenha: "", categoria: "", bairro: "", latitude: "", longitude: ""
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <div style={styles.container}>
      <Button 
        variant="primary" 
        onClick={handleShowForm} 
        style={styles.btnAdd}
      >
        Adicionar Loja
      </Button>

      
      <Modal show={showForm} onHide={handleShowForm}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Editar Loja" : "Cadastrar Loja"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            {Object.keys(formik.initialValues).map((field) => (
              <Form.Group className="mb-3" controlId={field} key={field}>
                <Form.Label>{field}</Form.Label>
                {field === "senha" || field === "confirmarSenha" ? (
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type={mostrarSenha ? "text" : "password"}
                      name={field}
                      onChange={formik.handleChange}
                      value={formik.values[field]}
                      placeholder={`Digite ${field}`}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={toggleMostrarSenha}
                      style={styles.mostrarBtn}
                    >
                      {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                ) : (
                  <Form.Control
                    type={
                      field === "email" ? "email" :
                      ["telefone", "cnpj", "cep"].includes(field) ? "tel" :
                      ["horario_abertura", "horario_fechamento"].includes(field) ? "time" : "text"
                    }
                    name={field}
                    onChange={formik.handleChange}
                    value={formik.values[field]}
                    placeholder={`Digite ${field}`}
                  />
                )}
                {formik.errors[field] && <div className="text-danger">{formik.errors[field]}</div>}
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShowForm}>Fechar</Button>
            <Button variant="primary" type="submit">{editId ? "Atualizar" : "Salvar"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

     
      <Modal show={showInfoModal} onHide={handleCloseInfoModal} size="lg">
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={styles.modalTitle}>
            <FaStore style={{ marginRight: '10px' }} />
            {selectedLoja?.nome}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          {selectedLoja && (
            <div style={styles.infoContainer}>
              
              <div style={styles.infoSection}>
                <h5 style={styles.sectionTitle}>Informações Básicas</h5>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Descrição:</span>
                    <span style={styles.infoValue}>{selectedLoja.descricao}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>CNPJ:</span>
                    <span style={styles.infoValue}>{selectedLoja.cnpj}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Categoria:</span>
                    <span style={styles.infoValue}>{selectedLoja.categoria.nome_categoria}</span>
                  </div>
                </div>
              </div>

            
              <div style={styles.infoSection}>
                <h5 style={styles.sectionTitle}>
                  <FaClock style={{ marginRight: '8px' }} />
                  Horário de Funcionamento
                </h5>
                <div style={styles.infoItem}>
                  <span style={styles.infoValue}>
                    {selectedLoja.horario_abertura} - {selectedLoja.horario_fechamento}
                  </span>
                </div>
              </div>

             
              <div style={styles.infoSection}>
                <h5 style={styles.sectionTitle}>
                  <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                  Endereço
                </h5>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Logradouro:</span>
                    <span style={styles.infoValue}>
                      {selectedLoja.endereco.logradouro}, {selectedLoja.endereco.numero}
                    </span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Bairro:</span>
                    <span style={styles.infoValue}>{selectedLoja.endereco.bairro}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Cidade/Estado:</span>
                    <span style={styles.infoValue}>
                      {selectedLoja.endereco.cidade}/{selectedLoja.endereco.estado}
                    </span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>CEP:</span>
                    <span style={styles.infoValue}>{selectedLoja.endereco.cep}</span>
                  </div>
                </div>
              </div>

             
              <div style={styles.infoSection}>
                <h5 style={styles.sectionTitle}>
                  <FaPhone style={{ marginRight: '8px' }} />
                  Contato
                </h5>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Telefone:</span>
                    <span style={styles.infoValue}>{selectedLoja.telefone}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>E-mail:</span>
                    <span style={styles.infoValue}>{selectedLoja.email}</span>
                  </div>
                </div>
              </div>

             
              <div style={styles.infoSection}>
                <h5 style={styles.sectionTitle}>
                  <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                  Localização Geográfica
                </h5>
                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Latitude:</span>
                    <span style={styles.infoValue}>{selectedLoja.localizacao?.latitude}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.infoLabel}>Longitude:</span>
                    <span style={styles.infoValue}>{selectedLoja.localizacao?.longitude}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={styles.modalFooter}>
          <Button variant="secondary" onClick={handleCloseInfoModal}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setEditId(selectedLoja.id);
              formik.setValues({
                nomeLoja: selectedLoja.nome,
                descricao: selectedLoja.descricao,
                cnpj: selectedLoja.cnpj,
                horario_abertura: selectedLoja.horario_abertura,
                horario_fechamento: selectedLoja.horario_fechamento,
                cep: selectedLoja.endereco.cep,
                nomeRua: selectedLoja.endereco.logradouro,
                cidade: selectedLoja.endereco.cidade,
                estado: selectedLoja.endereco.estado,
                numero: selectedLoja.endereco.numero,
                telefone: selectedLoja.telefone,
                email: selectedLoja.email,
                senha: selectedLoja.senha,
                confirmarSenha: "",
                categoria: selectedLoja.categoria.nome_categoria,
                bairro: selectedLoja.endereco.bairro,
                latitude: selectedLoja.localizacao?.latitude,
                longitude: selectedLoja.localizacao?.longitude
              });
              setShowInfoModal(false);
              setShowForm(true);
            }}
          >
            Editar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(selectedLoja.id)}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Lista de Lojas */}
      <div style={styles.lojasContainer}>
        {lojas.length > 0 ? (
          lojas.map((loja) => (
            <div 
              key={loja.id} 
              style={styles.lojaItem}
              onClick={() => handleShowInfoModal(loja)}
            >
              <div style={styles.lojaIcon}>
                <FaStore size={20} style={styles.storeIcon} />
              </div>
              <div style={styles.lojaContent}>
                <h3 style={styles.lojaNome}>{loja.nome}</h3>
                <div style={styles.lojaDetails}>
                  <span style={styles.lojaCategoria}>
                    {loja.categoria.nome_categoria}
                  </span>
                  <span style={styles.lojaHorario}>
                    <FaClock style={{ marginRight: '5px' }} />
                    {loja.horario_abertura} - {loja.horario_fechamento}
                  </span>
                </div>
                <div style={styles.lojaEndereco}>
                  <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                  {loja.endereco.logradouro}, {loja.endereco.numero} - {loja.endereco.bairro}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.semLojas}>
            Nenhuma loja cadastrada.
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    position:"relative",
    top:"20px"
  },
  btnAdd: {
    borderRadius: '8px',
    fontSize: '16px',
    position:"relative",
    left:"24rem",
    backgroundColor: '#006D77',
    border: 'none',
    padding: '10px',
    marginBottom: '10px',
    bottom:"18px",
    
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontWeight: '600',
    ':hover': {
      backgroundColor: '#005a63',
      transform: 'translateY(-1px)'
    }
  },
  mostrarBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#006D77',
    marginLeft: '10px'
  },
  
  
  modalHeader: {
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
    
  },
  modalTitle: {
    color: '#006D77',
    fontWeight: '600',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center'
  },
  modalBody: {
    padding: '25px'
  },
  modalFooter: {
    borderTop: '1px solid #dee2e6',
    padding: '15px 25px'
  },
  
  /* Estilos para as seções de informação */
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  infoSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    color: '#006D77',
    fontSize: '18px',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  infoLabel: {
    fontWeight: '600',
    color: '#495057',
    fontSize: '14px'
  },
  infoValue: {
    color: '#212529',
    fontSize: '15px',
    lineHeight: '1.5'
  },
  
  
  lojasContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '55px',
    marginTop: '50px',
    position:"relative"
  },
  lojaItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '20px',
    position:"relative",
    width:"550px",
    left:"220px",  
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      backgroundColor: '#f8f9fa'
    }
  },
  lojaIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#e6f7f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '20px',
    flexShrink: 0
  },
  storeIcon: {
    color: '#006D77',
    fontSize: '20px'
  },
  lojaContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  lojaNome: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    color: '#006D77'
  },
  lojaDetails: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  lojaCategoria: {
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#006D77',
    padding: '5px 15px',
    borderRadius: '20px',
    fontWeight: '500'
  },
  lojaHorario: {
    fontSize: '14px',
    color: '#495057',
    display: 'flex',
    alignItems: 'center'
  },
  lojaEndereco: {
    fontSize: '14px',
    color: '#6c757d',
    display: 'flex',
    alignItems: 'center'
  },
  semLojas: {
    textAlign: 'center',
    padding: '30px',
    color: '#6c757d',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    fontSize: '16px',
    marginTop: '20px'
  }
};

export default CadastroLoja;