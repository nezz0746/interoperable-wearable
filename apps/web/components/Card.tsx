import classNames from "classnames";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={classNames("border bg-slate-800", className)}>
      {children}
    </div>
  );
};

export default Card;
