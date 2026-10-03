
type SummaryRowProps = {
  label: string;
  value: string;
};

const SummaryRow = ({ label, value }: SummaryRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="uppercase text-gray-500">{label}</span>

      <span className="text-lg font-bold">{value}</span>
    </div>
  );
};

export default SummaryRow