interface StatsCompProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number | undefined;
  text?: string;
  color?: string;
  bgColor?: string;
  currency?: string;
}

export function StatsComp({
  icon: Icon,
  value,
  text,
  color = "text-current",
  bgColor = "bg-transparent",
  currency,
}: StatsCompProps) {
  return (
    <div className={`flex min-w-0 items-center gap-4 ${bgColor} p-2 space-y-3 rounded-2xl`}>
      <div className="flex min-w-0 flex-col ms-2">
        {/* Icon */}
        <Icon className={color} width={35} height={35} />

        {/* Title */}
        <h1 className={`break-words font-bold text-xl mt-2 sm:text-2xl ${color}`}>
          {value}
          {currency && <span className="text-sm">{currency}</span>}
        </h1>

        {/* Text */}
        <p className="break-words text-stats-text-textColor">{text}</p>
      </div>
    </div>
  );
}
