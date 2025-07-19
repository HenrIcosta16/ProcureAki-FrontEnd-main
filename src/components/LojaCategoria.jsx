import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LojaCategoria = () => {
  const { nomeCategoria } = useParams();
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLojasPorCategoria = async () => {
      try {
        if (!nomeCategoria) {
          throw new Error("Categoria não especificada");
        }

        const response = await fetch(`https://procureaki.onrender.com/lojas/${nomeCategoria}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.mensagem || "Erro ao buscar lojas");
        }

        const data = await response.json();
        setLojas(data);
      } catch (err) {
        setError(err.message || "Erro ao carregar lojas");
      } finally {
        setLoading(false);
      }
    };

    fetchLojasPorCategoria();
  }, [nomeCategoria]);

  if (loading) {
    return <div style={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }
  
  console.log(nomeCategoria);

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Lojas correspondentes à categoria: {nomeCategoria}</h2>

      {lojas.length > 0 ? (
        lojas.map((loja) => (
          <div style={styles.listGroupItem} key={loja.id}>
            <div style={styles.storeWrapper}>
              <div style={styles.listItemDiv}>
                <img
                  src="/img/imagemcasaveia.png"
                  alt={`Ícone ${loja.nome}`}
                  style={styles.listItemImage}
                />
                <h5 style={styles.nomeLoja}>{loja.nome}</h5>
              </div>
              <div style={styles.storeDetails}>
                <div style={styles.addressWrapper}>
                  <img
                    src="/img/locationwhite2.png"
                    alt="Ícone localização"
                    style={styles.locationIcon}
                  />
                  <p style={styles.endereco}>
                    {loja.endereco.logradouro}, {loja.endereco.bairro}, {loja.endereco.cidade}
                  </p>
                </div>
                <div style={styles.contactWrapper}>
                  <img
                    src="/img/tel.png"
                    alt="Ícone telefone"
                    style={styles.icontel}
                  />
                  <p style={styles.pnum}>{loja.telefone}</p>
                </div>
                <div style={styles.contactWrapper}>
                  <img
                    src="/img/relogio.png"
                    alt="Ícone horário"
                    style={styles.iconrelogio}
                  />
                  <p style={styles.ptempo}>{loja.horario_abertura} - {loja.horario_fechamento}</p>
                </div>
                <a href={loja.site || "#"} style={styles.storeLink}>
                  <img
                    src="/img/setadebarra.png"
                    alt="Ícone loja"
                    style={styles.iconloja}
                  />
                  <button style={styles.button}>Acessar Loja</button>
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div style={styles.noResults}>Nenhuma loja encontrada para esta categoria</div>
      )}
      
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh"
  },
  h2: {
    marginBottom: "30px",
    color: "#006D77",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "600"
  },
  listGroupItem: {
    backgroundColor: "#006D77",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
  },
  storeWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  listItemDiv: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  listItemImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover"
  },
  nomeLoja: {
    margin: "0",
    color: "white",
    fontSize: "22px",
    fontWeight: "bold",
    
  },
  storeDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  addressWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  contactWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  locationIcon: {
    width: "20px",
    height: "20px",
    color:"white"
  },
  endereco: {
    margin: "0",
    color: "white",
    fontSize: "20px"
  },
  icontel: {
    width: "20px",
    height: "20px"
  },
  pnum: {
    margin: "0",
    color: "white",
    fontSize: "22px"
  },
  iconrelogio: {
    width: "20px",
    height: "20px"
  },
  ptempo: {
    margin: "0",
    color: "white",
    fontSize: "22px"
  },
  storeLink: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    marginTop: "15px"
  },
  iconloja: {
    width: "20px",
    height: "20px"
  },
  button: {
    backgroundColor: "#006D77",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "22px"
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#006D77"
  },
  error: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#dc3545"
  },
  noResults: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#6c757d"
  }
};

export default LojaCategoria;
