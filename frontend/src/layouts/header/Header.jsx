import './Header.styles.scss'

const Header = () => {
  return (
    <header id="header">
      <h1 className="header__text" onClick={() => {location.href='/'}}>Газпром-НЕФТЬ - инфраструктура</h1>
    </header>
  )
}

export default Header;