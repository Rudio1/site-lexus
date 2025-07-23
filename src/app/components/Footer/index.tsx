"use client";
import styles from './Footer.module.scss';
import { useSiteContext } from '@/app/context/SiteContext';
import { sites } from '@/config/sites';

const Footer = () => {
  const { id_sub_brand } = useSiteContext();
  
  const domainMapping: { [key: number]: string } = {
    9: 'lexusvitoria.com.br',
    10: 'lexusbh.com.br',
    11: 'lexusbrasilia.com.br'
  };
  
  const currentDomain = domainMapping[id_sub_brand || 9] || 'lexusvitoria.com.br';
  const siteConfig = sites[currentDomain] || sites['lexusvitoria.com.br'];
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandSection}>
          <div className={styles.brandHeader}>
            <img 
              src="/image/aguia-branca.webp" 
              alt="Águia Branca" 
              className={styles.aguiaLogo}
            />
          </div>
          
          <div className={styles.lexusSection}>
            <img 
              src={siteConfig.logo_footer}
              alt={siteConfig.name} 
              className={styles.lexusLogo}
            />
          </div>
          
          <div className={styles.badgesContainer}>
            <div className={styles.badge}>
              <img 
                src="/image/selo-lexus.webp" 
                alt="Selo Lexus" 
                className={styles.badgeImage}
              />
            </div>
            <div className={styles.badge}>
              <img 
                src="/image/ibama.webp" 
                alt="IBAMA PROCONVE" 
                className={styles.badgeImage}
              />
            </div>
          </div>
          
          <p className={styles.slogan}>Desacelere. Seu bem maior é a vida.</p>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>LEXUS VITORIA</h3>
          <div className={styles.linkList}>
            <a href="#" className={styles.link}>Como chegar</a>
            <a href="#" className={styles.link}>Falar com consultor</a>
            <a href="#" className={styles.link}>Portal de privacidade</a>
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>NAVEGAÇÃO</h3>
          <div className={styles.linkList}>
            <a href="#" className={styles.link}>UX SUV COMPACTO</a>
            <a href="#" className={styles.link}>NX SUV MÉDIO</a>
            <a href="#" className={styles.link}>RX SUV GRANDE</a>
            <a href="#" className={styles.link}>ES SEDAN</a>
          </div>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>NOS SIGA NAS REDES SOCIAIS</h3>
          <div className={styles.socialLinks}>
            <div className={styles.socialItem}>
              <div className={styles.socialIcon}>
                <img src="/image/facebook.png" alt="Facebook" />
              </div>
              <a href="#" className={styles.socialText}>Facebook</a>
            </div>
            <div className={styles.socialItem}>
              <div className={styles.socialIcon}>
                <img src="/image/instagram.png" alt="Instagram" />
              </div>
              <a href="#" className={styles.socialText}>Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 