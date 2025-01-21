import logoImge from "../../assets/logo.svg";
import style from "./header.module.css";

const Header = () => {
  return (
    <div className={style.header}>
      <img src={logoImge} alt="Logo" />
    </div>
  );
};

export default Header;
