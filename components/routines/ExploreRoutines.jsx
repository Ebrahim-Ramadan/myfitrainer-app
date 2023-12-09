
import Image from "next/image"

export default function Component() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-xl shadow-md overflow-hidden">
        <div>
          <div>
            <Image
              alt="Gym program"
              className="h-full w-full object-cover"
              height="300"
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/300",
                objectFit: "cover",
              }}
              width="300"
            />
          </div>
          <div className="p-4 bg-white dark:bg-gray-800">
            <div className="uppercase tracking-wide text-sm font-semibold">Full Body Workout</div>
            <div className="mt-2 text-xs leading-tight font-medium text-black dark:text-white">
              A comprehensive full body workout program to build strength and endurance.
            </div>
            <div className="mt-4">
              <button variant="secondary">+ Add to routine</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

