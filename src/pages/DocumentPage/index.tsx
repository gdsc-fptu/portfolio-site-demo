// @ts-ignore
import style from "./style.module.scss";
import { useLocation } from "react-router-dom";
import GeneralLayout from "../../components/Shared/GeneralLayout";
import getDocumentByPath from "../../utils/documents/getDocumentByPath";

export default function DocumentPage() {
  const location = useLocation();
  // Get path from location
  const path = location.pathname;
  // Get document name from path
  const document = getDocumentByPath(path);

  return (
    <GeneralLayout>
      <div className={style.container}>
        <h1 className={style.heading}>{document?.heading}</h1>
        <p className={style.paragraph}>{document?.paragraph}</p>
      </div>
    </GeneralLayout>
  );
}
