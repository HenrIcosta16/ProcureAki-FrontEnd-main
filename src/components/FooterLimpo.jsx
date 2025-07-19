

function FooterLimpo() {
  return (
    <> 
      <footer style={FooterStyles.footer}>
        <div style={FooterStyles.content}>   
          
        </div>
      </footer>
    </>
  );
}

export default FooterLimpo;

const FooterStyles = {
  footer: {
    backgroundColor: '#006D77',
    color: 'white',
    padding: '2rem 0',
    textAlign: 'center',
    width: '100%',          
    height: '75px',         
    position: 'sticky',     
    bottom: '0',            
    left: '0',              
    zIndex: '1000',
    marginTop: '70px',         
  },

  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
};