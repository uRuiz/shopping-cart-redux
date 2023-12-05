import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo-umpa-loompa.png";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div
        className="header-icon"
        onClick={() => navigate("/")}
        data-testid="header-icon"
      >
        <img src={logo} alt="Oompa Loompa's Crew" />
        <div className="header-title">Oompa Loompa&apos;s Crew</div>
      </div>
    </header>
  );
};
