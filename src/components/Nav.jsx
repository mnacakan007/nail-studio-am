export default function Nav({ scrolled }) {
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="wrap">
        <a href="#home" className="logo">
          Nail <span>Studio</span>
        </a>
        <ul className="nav-links">
          <li><a href="#advantages">Преимущества</a></li>
          <li><a href="#experience">Опыт</a></li>
          <li><a href="#contact">Запись</a></li>
        </ul>
      </div>
    </nav>
  );
}
