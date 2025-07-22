"use client";
import styles from './AlertModal.module.scss';

export default function AlertModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null;
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeX} onClick={onClose} aria-label="Fechar modal">
          ×
        </button>
        
        <h2 className={styles.modalTitle}>Alerta aos consumidores</h2>
        
        <div className={styles.modalBody}>
          <p className={styles.alertText}>
            O Grupo Águia Branca faz um alerta aos consumidores de veículos de sua marca para os golpes que vêm sendo aplicados em várias regiões do país, nos quais estelionatários anunciam por diversos meios de comunicação, especialmente nos ambientes digitais, a venda de veículos, peças e serviços diretamente de funcionários desta, por valor bem abaixo do valor de mercado e em condições de pagamento muito atraentes.
          </p>
          
          <p className={styles.alertText}>
            Quando o consumidor entra em contato, os estelionatários identificam-se como funcionários da empresa e induzem o consumidor a adquirir os produtos como sendo um negócio &ldquo;imperdível&rdquo;, bastando, para garantir a reserva, que seja realizado depósito ou transferência eletrônica uma parte do valor.
          </p>
          
          <p className={styles.alertText}>
            Além disso, na tentativa de conferirem maior veracidade ao golpe, os estelionatários emitem notas fiscais, recibos e contratos com a logomarca da montadora, como se o negócio fosse entabulado entre o consumidor e o funcionário com a anuência da concessionária.
          </p>
          
          <p className={styles.alertText}>
            Diante do aumento das tentativas de fraude e reclamações, divulgamos a seguir orientações fundamentais acerca da aquisição de produtos e serviços, na tentativa de alertar os seus consumidores, potenciais vítimas do golpe aplicado pelos estelionatários:
          </p>
          
          <ul className={styles.alertList}>
            <li>Compare o preço anunciado com o preço do mesmo veículo e modelo, com iguais características nos sites distribuidores autorizado, site oficial das montadoras e ou pelo Portal da fundação fipe.org.br;</li>
            <li>Desconfie de anúncios que oferecem grandes vantagens financeiras;</li>
            <li>Jamais efetue o pagamento de qualquer quantia referente à aquisição de um veículo, peças ou acessórios antes de pesquisar a idoneidade do anunciante (verificar dados da empresa e do anunciante, CNPJ, localização…);</li>
            <li>Jamais efetue o pagamento de qualquer quantia referente à compra do veículo sem examinar pessoalmente em uma concessionaria física;</li>
          </ul>
          
          <p className={styles.alertText}>
            Em caso de dúvida, contate o Serviço de Atendimento ao Consumidor no e-mail{' '}
            <a href="mailto:compliance.comercio@aguiabranca.com.br" className={styles.emailLink}>
              compliance.comercio@aguiabranca.com.br
            </a>
          </p>
        </div>
        
        <button className={styles.closeButton} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
} 