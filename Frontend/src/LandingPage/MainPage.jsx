import React from 'react'
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import CoreOfferings from './sections/CoreOfferings';
import WhyCodeLoom from './sections/WhyCodeLoom';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';

const MainPage = () => {
  return (
    
         <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
       <GlobalStyles />
       <Navbar />
       <Hero />
       <CoreOfferings />
       <WhyCodeLoom />
       <Testimonials />
       <FAQ />
       <Footer />
     </div>
    
  )
}

export default MainPage
