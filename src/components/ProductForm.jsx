import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = Yup.object({
  nome: Yup.string().required("Nome do produto é obrigatório"),
  descricao: Yup.string().required("Descrição é obrigatória"),
  preco: Yup.number().required("Preço é obrigatório").min(0, "O preço não pode ser negativo"),
  quantidade: Yup.number().required("Quantidade é obrigatória").min(1, "Quantidade deve ser pelo menos 1"),
  imagem_url: Yup.string().url("Deve ser uma URL válida").required("URL da imagem é obrigatória"),
  loja_id: Yup.number().required("Loja_id é obrigatória"),
});

const CadastroProduto = ({ show, onClose, onProductAdded, productToEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setIsEditing(true);
      
      formik.setValues({
        nome: productToEdit.nome,
        descricao: productToEdit.descricao,
        preco: productToEdit.preco,
        quantidade: productToEdit.quantidade,
        imagem_url: productToEdit.imagem_url,
        loja_id: productToEdit.loja_id,
      });
    } else {
      setIsEditing(false);
      
      formik.resetForm();
    }
  }, [productToEdit]);

  const handleSubmit = async (values) => {
    const dadosParaEnviar = {
      nome: values.nome,
      preco: values.preco,
      quantidade: values.quantidade,
      imagem_url: values.imagem_url,
      descricao: values.descricao,
      loja_id: Number(values.loja_id),
    };

    try {
      const url = isEditing 
        ? `https://procureaki.onrender.com/produtos/${productToEdit.id}`
        : 'https://procureaki.onrender.com/produtos';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao salvar o produto');
      }

      toast.success(`Produto ${isEditing ? 'atualizado' : 'cadastrado'} com sucesso!`);
      onProductAdded(); 
    } catch (error) {
      toast.error(error.message || "Erro na API.");
    }
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      descricao: "",
      preco: "",
      loja_id: 0,
      quantidade: "",
      imagem_url: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Produto' : 'Cadastrar Produto'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            {Object.keys(formik.initialValues).map((field) => (
              <Form.Group className="mb-3" controlId={field} key={field}>
                <Form.Label>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
                </Form.Label>
                <Form.Control
                  type={field === "preco" || field === "quantidade" || field === "loja_id" ? "number" : "text"}
                  name={field}
                  onChange={formik.handleChange}
                  value={formik.values[field]}
                  placeholder={`Digite ${field.replace('_', ' ')}`}
                />
                {formik.errors[field] && (
                  <div className="text-danger">{formik.errors[field]}</div>
                )}
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Atualizar' : 'Salvar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CadastroProduto;