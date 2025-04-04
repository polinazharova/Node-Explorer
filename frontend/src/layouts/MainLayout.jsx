import Header from "./header/Header";
import Footer from './footer/Footer'

const MainLayout = ({children}) => {
  return (
    <>
        <Header />
        <main id="main">
            {children}
        </main>
        <Footer />
    </>
  )
}

export default MainLayout;