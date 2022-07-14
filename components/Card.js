function Card({heading, value}) {
  return (
    <div className="bg-white p-6 m-3 rounded-2xl border-2 border-gray-200 col-span-3">
      <div className="flex flex-col">
        <div className="flex flex-row space-x-4 items-center text-left">
          <div id="temp">
            <h4 className="text-4xl">
              {value}
            </h4>
            <p className="text-xs text-gray-500">{heading}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
