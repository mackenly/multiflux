import { Header } from './components/Header';
import { Auth } from './components/auth/Auth';
import { Preview } from './components/preview/Preview';
import { Options } from './components/options/Options';
import { Chat } from './components/chat/Chat';
import { Updates } from './components/updates/Updates';
import { Footer } from './components/Footer';
import './App.css';
import './components/auth/Auth.css';
import './components/options/Options.css';
import './components/chat/Chat.css';
import './components/updates/Updates.css';
import './components/preview/Preview.css';

function App() {
  return (
    <div className="App">
      <Auth />
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
