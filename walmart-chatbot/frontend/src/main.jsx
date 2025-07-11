import ReactDOM from 'react-dom/client';
import App from './App';
import { DataProvider } from './Components/dataprovider/DataProvider';
import { initialState, reducer } from './utility/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataProvider reducer={reducer} initialState={initialState}>
    <App />
  </DataProvider>
);
