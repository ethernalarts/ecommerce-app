import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { twj } from 'tw-to-css';

import Header from './components/header';
import Footer from './components/footer';

import HomeScreen from './pages/homeScreen';
import ProductDetailScreen from './pages/productDetailScreen';
import CartScreen from './pages/CartScreen';


function App() {
    return (
        <Router style={twj("font-sans")}>

            {/* header component */}
            <Header />

            {/* body component */}
            <main className='py-3 bg-gray-100'>
                <Container>
                    <Routes>
                        <Route path='/' Component={ HomeScreen } exact />
                        <Route path='/product/:id' element={ <ProductDetailScreen /> } />
                        <Route path='/cart/:id?' Component={ CartScreen } />
                    </Routes>
                </Container>
            </main>
            
            {/* footer component */}
            <Footer />
        </Router>
  );
}

export default App;
