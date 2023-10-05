import { Container } from 'react-bootstrap';

import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/homepage';

function App() {
    return (
        <div>
            <Header/>
            <main className='py-3'>
                <Container>
                    <HomePage />
                </Container>
            </main>
            <Footer/>
        </div>
  );
}

export default App;
