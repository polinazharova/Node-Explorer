import Header from "../layouts/header/Header";
import BadConnection from "../layouts/bad-connection/BadConnection";
import NodeExplorer from "../features/node-explorer/ui/NodeExplorer";
import Footer from "../layouts/footer/Footer";

const MainPage = () => {
  return (
    <>
      <Header />
      <main id="main">
        <BadConnection />
        <NodeExplorer />
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
