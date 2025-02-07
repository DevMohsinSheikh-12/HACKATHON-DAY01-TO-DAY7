import Image from "next/image";

function CatogGrid() {
  return (
    <div className="flex justify-center items-center py-10 mb-12 h-full dark:bg-gray-900">
      {/* Outer Container */}
      <div className="dark:bg-gray-800 bg-[#F0F0F0] rounded-2xl shadow-lg border border-gray-700 p-10 w-[90%] max-w-6xl">
        {/* Title */}
        <h2 className="text-center text-4xl font-extrabold mb-8 ">BROWSE BY DRESS STYLE</h2>

        {/* Grid Container */}
        <div className="grid grid-rows-2 gap-4">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4">
            {/* Casual */}
            <div className="col-span-1 relative rounded-lg overflow-hidden h-56">
              <Image
                src="/images/image 11.svg"
                alt="Casual"
                fill
                className="rounded-lg"
              />
              <p className="absolute md:text-xl top-7 left-2 md:top-2 md:left-2 text-sm   bg-black border border-gray-400 bg-opacity-90 text-white px-2 py-1 rounded-sm font-semibold">
                Casual
              </p>
            </div>

            {/* Formal */}
            <div className="col-span-2 relative rounded-lg overflow-hidden shadow-md h-56">
              <Image
                src="/images/image 13 (1).svg"
                alt="Formal"
                fill
                className="rounded-lg lg:bg-[#FCFCFC]"
              />
              <p className="absolute md:text-xl top-2 left-2 text-sm bg-black bg-opacity-90 border border-gray-400 text-white px-2 py-1 rounded-sm font-semibold ">
                Formal
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-4">
            {/* Party */}
            <div className="col-span-2 relative rounded-lg overflow-hidden shadow-md h-56">
              <Image
                src="/images/image 12.svg"
                alt="Party"
                fill
                className="rounded-lg lg:bg-[#FCFCFC]  "
              />
              <p className="absolute md:text-xl top-2 left-2 text-sm bg-black bg-opacity-90 border border-gray-400 text-white px-2 py-1 rounded-sm font-semibold ">
                Party
              </p>
            </div>

            {/* Gym */}
            <div className="col-span-1 relative rounded-lg overflow-hidden shadow-md h-56">
              <Image
                src="/images/image 14.svg"
                alt="Gym"
                fill
                className="rounded-lg lg:bg-[#FCFCFC]"
              />
              <p className="absolute md:text-xl  top-5 left-2 md:top-2 md:left-2 text-sm bg-black bg-opacity-90 border border-gray-400 text-white px-2 py-1 rounded-sm font-semibold">
                Gym
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatogGrid;
