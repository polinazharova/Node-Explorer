import "./NotFoundPage.styles.scss";
import Header from "../layouts/header/Header";
import Footer from "../layouts/footer/Footer";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main id="main">
        <span className="main__not-found-page">Page doesn&apos;t exist!</span>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;
