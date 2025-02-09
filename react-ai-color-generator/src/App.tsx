import { TFModel } from "./components/TFModel";
function App() {

  return (
    <>
      <div className="wrapper">
        <header className="header">
          <div className="header__container container">
            <a className="header__logo" href="/">
              <img src="/logo.webp" alt="Logo" />
              <span>AIColor</span>
              <span>Generator</span>
            </a>
          </div>
        </header>
        <main className="main margin__general">
          <section className="hero">
            <div className="hero__container margin__general container">
              <h3 className="hero__text text__normal">
              AIColorGenerator - This is a small web application that creates 4 colors that harmoniously match each other. You can use these colors for any purpose - web sites, applications, games, etc. The generation is done using a simple neural network on 7 neurons, 1 hidden layer. The network is trained on more than 100 data samples. Let's generate! ❤️
              </h3>
            </div>
          </section>
          <section className="scratch">
            <div className="scratch__container container">
              <h2 className="scratch__title text__title">
                General from Scratch
              </h2>
              <TFModel/>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="footer__container container">
            <a className="footer__logo" href="/">
              <img src="/logo.webp" alt="Logo" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
