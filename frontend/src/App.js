import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';

import HomePage from './pages/homepage';
import ProductPage from './pages/productdetailpage';

function App() {
    return (
        <Router>

            {/* header component */}
            <Header />

            {/* body component */}
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route path='/' Component={ HomePage } exact />
                        <Route path='/product/:id' element={ <ProductPage /> } />
                    </Routes>
                </Container>
            </main>
            
            {/* footer component */}
            <Footer />
        </Router>
  );
}

export default App;
