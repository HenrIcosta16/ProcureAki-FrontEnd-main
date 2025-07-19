function Footer() {
  return (
    <>
      <div style={FooterStyles.divBelowFooter}></div> 
      
      <footer style={FooterStyles.footer}>
        <div style={FooterStyles.content}>
          <p style={FooterStyles.text}>
            ProcureAki © {new Date().getFullYear()} - Todos os direitos reservados
          </p>
          <div style={FooterStyles.links}>
            <span style={FooterStyles.link}>Termos de uso</span>
            <span style={FooterStyles.link}>Política de privacidade</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

const FooterStyles = {
  footer: {
    backgroundColor: '#006D77',
    color: 'white',
    padding: '2rem 0',
    textAlign: 'center',
    width: '100%',
    position:"relative",
    
  },
  divBelowFooter: {
    backgroundColor: '#001F2D', 
    width: '100%', 
    height: '5px', 
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  text: {
    margin: 0,
    fontSize: '18px',
  },
  links: {
    marginTop: '1rem',
  },
  link: {
    margin: '0 1rem',
  },
};