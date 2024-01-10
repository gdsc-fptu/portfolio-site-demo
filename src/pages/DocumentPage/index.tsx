// @ts-ignore
import style from "./style.module.scss";
import GeneralLayout from "../../components/Shared/GeneralLayout";

export default function DocumentPage() {
  return (
    <GeneralLayout>
      <div className={style.container}>
        <h1 className={style.heading}>Cookie is disabled</h1>
        <p className={style.paragraph}>
          Enable the cookie permission in your browser to login
        </p>
      </div>
    </GeneralLayout>
  );
}
