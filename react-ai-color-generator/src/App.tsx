import { useState } from "react"
function App() {
  const [scratchLoading, setScratchLoading] = useState(false)

  const handleScratchGenerate = () => {
    setScratchLoading(!scratchLoading)
  }

  return (
    <>
      <div className="wrapper">
        <header className="header">
          <div className="header__container container">
            <a className="header__logo" href="/">
              <img src="" alt="Logo" />
              <span>Color</span>
              <span>Generator</span>
            </a>
          </div>
        </header>
        <main className="main">
          <section className="hero">
            <div className="hero__container margin__general container">
              <h3 className="hero__text text__normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit accusantium libero incidunt hic corrupti. Qui corrupti maiores vitae, ea velit harum accusantium sed minus soluta quas consequuntur non laudantium quo.</h3>
            </div>
          </section>
          <section className="scratch">
            <div className="scratch__container container">
              <h2 className="scratch__title text__title">General from Scratch</h2>
              <div className="scratch__loadingbox">
              {scratchLoading ? <span className="scratch__loading">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span> : <span className="scratch__decoration">&#8595;</span>}
              </div>
              <div className="scratch__colors">
              <ul className="scratch__colorslist">
                <li className="scratch__color">
                  <div></div>
                  <p className="text__normal">#534234</p>
                </li>
                {/* <li className="scratch__color">
                  <div></div>
                  <p className="text__normal">#534234</p>
                </li>
                <li className="scratch__color">
                  <div></div>
                  <p className="text__normal">#534234</p>
                </li>
                <li className="scratch__color">
                  <div></div>
                  <p className="text__normal">#534234</p>
                </li> */}
                <li className="scratch__addcolor">
                  <button>+</button>
                  <p className="text__normal">Add Color</p>
                </li>
              </ul>
            </div>
            <button className="scratch__button button__general" onClick={handleScratchGenerate}>Generate</button>
            </div>
          </section>
        </main>
        <footer className="footer">
          <div className="footer__container container"></div>
        </footer>
      </div>
    </>
  )
}

export default App
