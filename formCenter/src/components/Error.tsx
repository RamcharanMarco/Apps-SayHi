import { FC } from "react";

interface data {
  error: string;
  errorStatus:boolean
}

interface AppProps {
  FormProps: data;
}

const Error: FC<AppProps> = ({ FormProps }) => {
  return (
    <div style={FormProps.errorStatus ? {visibility:"visible"} : {visibility:"hidden"}} className="error">
      <p>{FormProps.error}</p>
    </div>
  );
};

export default Error;
