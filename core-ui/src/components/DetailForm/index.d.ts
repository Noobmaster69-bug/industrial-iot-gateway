import { ReactElement } from "react";

export interface DetailProps {
  keys: Array<string>;
  values: {
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
      values: Array<string | number>;
      placeholder?: string | number;
      label?: string;
      allowNull?: boolean;
      unique: boolean | string;
    };
  };
}
declare function DetailForm(DetailProps: DetailProps): ReactElement;

export default DetailForm;
