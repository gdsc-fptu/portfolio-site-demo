// @ts-ignore
import logo from "../../assets/brands/logo_only.png";
// @ts-ignore
import style from "./style.module.scss";
import Background from "../../components/Shared/Background";

export default function NotFoundPage() {
  return (
    <div className={style.container}>
      <img src={logo} alt="logo" className={style.logo} />
      <h1>404. This page not found</h1>
      <Background />
    </div>
  );
}
