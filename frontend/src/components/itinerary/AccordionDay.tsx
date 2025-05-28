// components/AccordionDay.tsx
type AccordionDayProps = {
  day: string;
  summary: string;
  places: string[];
  isOpen: boolean;
  onToggle: () => void;
};

export default function AccordionDay({
  day,
  summary,
  places,
  isOpen,
  onToggle,
}: AccordionDayProps) {
  return (
    <div className="border-b border-gray-300 mb-4">
      <button
        onClick={onToggle}
        className="w-full text-left py-4 text-xl font-semibold flex justify-between items-center"
      >
        {day}: {summary}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="pl-4 pb-4 text-gray-700 space-y-2">
          {places.map((place, i) => (
            <div key={i} className="border p-3 rounded bg-gray-50 shadow-sm">
              <h4 className="font-bold">{place}</h4>
              <p className="text-sm">A great spot to visit in the area...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
