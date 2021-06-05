/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';

// Import npm
import DOMPurify from 'dompurify';

// all available config props
const config = {
  width: '400px',
  height: '500px',
  floating: true,
  background: '#f5f8fb',
  headerBgColor: '#0368a3',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#0368a3',
  botFontColor: '#fff',
  userBubbleColor: '#A8C1E2',
  userFontColor: '#fff',
};
function SimpleForm({ userType, establishment }) {
  establishment = DOMPurify.sanitize(establishment);
  return (
    <ThemeProvider theme={config}>
      <ChatBot
        headerTitle="Roger"
        steps={[
          {
            id: '1',
            message: `Bonjour ${establishment}, comment puis-je vous aider ?`,
            trigger: userType === 'hospital' ? '2' : '3',
          },
          {
            id: '2',
            options: [
              { value: 1, label: 'Contacter les responsables du site', trigger: '4' },
              { value: 2, label: 'Modifier mon profil', trigger: '5' },
            ],
          },
          {
            id: '3',
            options: [
              { value: 1, label: 'Ajouter un produit dans mon inventaire', trigger: '6' },
              { value: 2, label: 'Contacter les responsables du site', trigger: '4' },
              { value: 3, label: 'Modifier mon profil', trigger: '5' },
            ],
          },
          {
            id: '4',
            component: (
              <div>
                {' '}
                Bien sûr, rendez-vous sur cette page :
                <Link to="/teampage"> Qui se cache derrière O'Medocs ?</Link>{' '}
              </div>
            ),
            asMessage: true,
          },
          {
            id: '5',
            component: (
              <div>
                {' '}
                Bien sûr, rendez-vous sur cette page :<Link to="profil"> Mon profil</Link>{' '}
              </div>
            ),
            asMessage: true,
            end: true,
          },
          {
            id: '6',
            component: (
              <div>
                {' '}
                Bien sûr, rendez-vous sur cette page :<Link to="inventory">
                  {' '}
                  Mon inventaire
                </Link>{' '}
              </div>
            ),
            asMessage: true,
            end: true,
          },
          {
            id: '7',
            message: 'Autre chose ?',
            trigger: '8',
          },
          {
            id: '8',
            options: [
              { value: 1, label: 'Oui', trigger: userType === 'hospital' ? '2' : '3' },
              { value: 2, label: 'Non', trigger: '9' },
            ],
          },
          {
            id: '9',
            message: 'Très bien, bonne visite !',
            end: true,
          },
        ]}
        {...config}
      />
    </ThemeProvider>
  );
}

export default SimpleForm;
