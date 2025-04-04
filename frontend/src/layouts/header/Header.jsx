import './Header.styles.scss'
import gazpromLogo from '../../assets/images/gazprom-logo.png'

const Header = () => {
  return (
    <header id="header">
      <img className="header__logo" src={gazpromLogo} alt="Gazprom Logo" onClick={() => {location.href='/'}}/>
      <span className="header__text">Тестовое задание</span>
    </header>
  )
}

export default Header;