import type { ReactNode } from "react";

type LoadableProps = {
  loading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
};

const Loadable = ({ loading, skeleton, children }: LoadableProps) =>
  loading ? <>{skeleton}</> : <>{children}</>;

export default Loadable;
