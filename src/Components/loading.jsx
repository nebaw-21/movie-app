import { Spinner } from "@material-tailwind/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
      <Spinner color="black" className="h-16 w-16 text-gray-900/50" />
    </div>
  );
}
