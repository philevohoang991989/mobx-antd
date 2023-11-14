import React from 'react';
import './App.css';
import {I18nextProvider} from 'react-i18next';
import i18n from './locales/i18n';
import RoutesApp from './routers';

function App() {
  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <RoutesApp />
      </I18nextProvider>
    </div>
  );
}

export default App;
