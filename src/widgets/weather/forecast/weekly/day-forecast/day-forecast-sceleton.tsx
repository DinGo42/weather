export const DayForecastSceleton = () => (
  <>
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <div
        key={item}
        className="animate-slow-pulse overflow-hidden w-full h-full bg-blue-500 rounded-3xl min-h-[140px] border-2 border-blue-450 grid grid-rows-2 pl-6 pr-6 pt-3 pb-3 relative"
      />
    ))}
  </>
);
