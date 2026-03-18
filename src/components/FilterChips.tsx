interface FilterChipsProps<T extends string> {
  options: { value: T; label: string; count?: number }[];
  selected: T;
  onChange: (value: T) => void;
}

function FilterChips<T extends string>({ options, selected, onChange }: FilterChipsProps<T>) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
            selected === opt.value
              ? "filter-chip-active"
              : "filter-chip bg-card text-muted-foreground"
          }`}
        >
          {opt.label}
          {opt.count !== undefined && (
            <span className={`ml-1.5 ${selected === opt.value ? "text-primary" : "text-muted-foreground/60"}`}>
              {opt.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default FilterChips;
