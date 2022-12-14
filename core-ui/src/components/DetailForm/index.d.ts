import { ReactElement } from "react";

export interface DetailProps {
  keys: {
    [key: string]: {
      type:
        | "STRING"
        | "BOOLEAN"
        | "INTERGER"
        | "REAL"
        | "DECIMAL"
        | "DATES"
        | "BLOBS"
        | "ENUM";
      defaultValue?: string | number;
      values?: Array<string | number>;
      placeholder?: string | number;
      label?: string;
      allowNull?: boolean;
      unique?: boolean | string;
    };
  };
  values?: object;
  onChange?: (newObject: object) => void;
  header: string | ReactElement | null;
}
declare function DetailForm(DetailProps: DetailProps): ReactElement;

export default DetailForm;
