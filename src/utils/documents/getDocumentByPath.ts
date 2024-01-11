import { cookieNotEnableDocument, errorDocument } from "./docs";

export default function getDocumentByPath(path: String) {
  const pathArray = path.split("/")[2];

  switch (pathArray) {
    case "cookie":
      return cookieNotEnableDocument;
    case "error":
      return errorDocument;
    default:
      return null;
  }
}
