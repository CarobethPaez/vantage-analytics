import { useFilters } from "@/store/filters";

const ranges = [
  { label: "Últimos 7 días",  days: 7  },
  { label: "Últimos 30 días", days: 30 },
  { label: "Últimos 90 días", days: 90 },
];

interface Props {
  title: string;
  description?: string;
}

export const Header = ({ title, description }: Props) => {
  const { setDateRange } = useFilters();

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const days = Number(e.target.value);
    setDateRange({
      from: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      to: new Date(),
    });
  };

  return (
    <header className="h-14 border-b border-gray-100 bg-white flex items-center px-6 gap-4 shrink-0">
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-gray-900 truncate">{title}</h1>
        {description && (
          <p className="text-xs text-gray-400 truncate">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <select
          onChange={handleRangeChange}
          defaultValue={30}
          className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {ranges.map((r) => (
            <option key={r.days} value={r.days}>
              {r.label}
            </option>
          ))}
        </select>
        <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition-colors">
          Exportar PDF
        </button>
      </div>
    </header>
  );
};