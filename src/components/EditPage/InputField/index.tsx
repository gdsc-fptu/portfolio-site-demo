// @ts-ignore
import style from "./style.module.scss";
import { AppStrings } from "../../../utils/strings";

type InputFieldProps = {
  desc?: string;
  example?: string;
  children?: React.ReactNode | React.ReactNode[];
  expandedIndex?: number;
};
export default function InputField({
  desc,
  example,
  children,
  expandedIndex = 0,
}: InputFieldProps) {
  return (
    <div className={style.field}>
      <div className={style.multiField}>
        {children instanceof Array ? (
          children.map((child, idx) => (
            <div
              key={idx}
              className={style.thisField}
              style={{
                flex: expandedIndex === idx ? 1 : 0,
              }}
            >
              {child}
            </div>
          ))
        ) : (
          <div className={style.thisField}>{children}</div>
        )}
      </div>
      <div className={style.fieldDesc}>
        {desc}{" "}
        {example ? (
          <i>
            {AppStrings.language.editPage.example}
            {example}
          </i>
        ) : null}
      </div>
    </div>
  );
}
