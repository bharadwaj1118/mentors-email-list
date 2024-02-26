interface OnboardHeadingProps {
  step: number;
  title: string;
}
const OnboardHeading = ({ step, title }: OnboardHeadingProps) => {
  return (
    <div className="my-4">
      <p className="muted font-semibold">Step {step} of 4</p>
      <h2 className="h3">{title}</h2>
    </div>
  );
};

export default OnboardHeading;
