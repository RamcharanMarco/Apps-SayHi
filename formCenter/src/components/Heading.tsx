import { FC } from "react";

interface data {
  heading: string;
}

interface AppProps {
  FormProps: data;
}

const Heading: FC<AppProps> = ({ FormProps }) => {
  return (
      <h1>{FormProps.heading}</h1>
  );
};

export default Heading;
