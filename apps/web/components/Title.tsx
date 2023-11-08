type TitleProps = {
  text: string;
};

const Title = ({ text }: TitleProps) => {
  return (
    <p className="text-md sm:text-lg lg:text-xl font-main font-bold">{text}</p>
  );
};

export default Title;
