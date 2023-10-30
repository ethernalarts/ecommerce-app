import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { twj } from 'tw-to-css';

import Header from './components/header';
import Footer from './components/footer';

import HomeScreen from './pages/homeScreen';
import ProductDetailScreen from './pages/productDetailScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/loginScreen';
import RegisterScreen from './pages/registerScreen';
import ProfileScreen from './pages/profileScreen';
import ShippingScreen from './pages/shippingScreen';
import PaymentScreen from './pages/paymentScreen';
import PlaceOrderScreen from './pages/placeOrderScreen';
import OrderScreen from './pages/orderScreen';



function App() {
    return (
        <Router>

            {/* header component */}
            <Header />

            {/* body component */}
            <main style={twj("font-sans bg-gray-200 py-3")}>
                <Container>
                    <Routes>
                        <Route path='/' Component={ HomeScreen } exact />
                        <Route path='/login' Component={ LoginScreen } />
                        <Route path='/register' Component={ RegisterScreen } />
                        <Route path='/profile' Component={ ProfileScreen } />
                        <Route path='/shipping' Component={ ShippingScreen } />
                        <Route path='/payment' Component={ PaymentScreen } />
                        <Route path='/placeorder' Component={ PlaceOrderScreen } />
                        <Route path='/order/:id' Component={ OrderScreen } />
                        
                        <Route path='/cart/:id?' Component={ CartScreen } />
                        <Route path='/product/:id' element={ <ProductDetailScreen /> } />
                    </Routes>
                </Container>
            </main>
            
            {/* footer component */}
            <Footer />
        </Router>
  );
}

export default App;
