import React from 'react';
import SectionsContentHeader from "../../components/SectionsContentHeader/SectionsContentHeader";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';

const faqItems = [
  {
    question: "Como faço para fazer um pedido?",
    answer: "Para fazer um pedido, basta acessar nosso site, selecionar a marmita desejada, adicionar ao carrinho, definir o horário de retirada e finalizar a compra seguindo as instruções na tela."
  },
  {
    question: "Quais são as opções de pagamento disponíveis?",
    answer: "Aceitamos pagamentos via Pix, cartão de crédito, PayPal e pagamento na hora da retirada."
  },
  {
    question: "Como posso cancelar ou alterar meu pedido?",
    answer: "Para cancelar ou alterar um pedido, acesse a página de pedidos no site, onde todos os seus pedidos serão listados. Haverá um botão para cancelar o pedido."
  },
  {
    question: "Qual é o valor mínimo para pedidos?",
    answer: "Não há valor mínimo para pedidos. Você pode pedir qualquer quantidade de marmitas."
  },
  {
    question: "Vocês oferecem opções de marmitas vegetarianas, veganas ou sem glúten?",
    answer: "Sim, oferecemos uma variedade de marmitas para atender diferentes preferências e necessidades alimentares, incluindo opções vegetarianas, veganas e sem glúten."
  },
  {
    question: "Como funciona a retirada do pedido?",
    answer: "Após finalizar seu pedido, você deverá selecionar um horário para a retirada. Basta comparecer à cantina no horário escolhido e retirar sua marmita."
  },
  {
    question: "O que faço se tiver problemas com meu pedido?",
    answer: "Se você tiver qualquer problema com seu pedido, por favor, entre em contato conosco pelo Email, Whatsapp ou telefone."
  },
  {
    question: "Como posso acompanhar o status do meu pedido?",
    answer: "Você pode acompanhar o status do seu pedido acessando a página de pedidos no site. Lá, você verá o status em tempo real do seu pedido."
  },
  {
    question: "Vocês oferecem promoções ou descontos?",
    answer: "Sim, periodicamente oferecemos promoções e descontos especiais. Fique de olho em nosso site e redes sociais para aproveitar as ofertas."
  },
  {
    question: "O que devo fazer se esquecer de retirar minha marmita?",
    answer: "Se você esquecer de retirar sua marmita no horário agendado, entre em contato conosco o mais rápido possível para que possamos resolver a situação."
  }
];

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Section = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
`;

const Help = () => {
  return (
    <>
      <SectionsContentHeader title="Ajuda" />
      <StyledContainer>
        <Section>
          {faqItems.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold">{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Section>
      </StyledContainer>
    </>
  );
};

export default Help;
