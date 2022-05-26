import { Header } from './components/Header';
import { Preview } from './components/Preview';
import { Options } from './components/Options';
import { Chat } from './components/Chat';
import { Updates } from './components/Updates';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header className="App-header" />
      <main className="App-body">
        <Preview />
        <Options />
        <Chat />
        <Updates />
      </main>
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
