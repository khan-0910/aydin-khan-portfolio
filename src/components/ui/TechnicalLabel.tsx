type TechnicalLabelProps = {
  children: React.ReactNode;
  className?: string;
  ticks?: boolean;
};

export default function TechnicalLabel({ children, className = "", ticks = false }: TechnicalLabelProps) {
  // if the caller passes a text color, don't fight it with the faint default
  const hasColor = /(^|\s)text-/.test(className);
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] ${
        hasColor ? "" : "text-paper-faint"
      } ${className}`}
    >
      {ticks && <span className="h-2 w-px bg-line-2" aria-hidden />}
      {children}
      {ticks && <span className="h-2 w-px bg-line-2" aria-hidden />}
    </span>
  );
}
