import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function MovieCard({ id, lang, title, year, description, img }) {
  return (
    <Link to={`/detail/${id}`}>  {/* Use id to generate a unique link */}
      <Card className="group w-72 h-[445px] hover:cursor-pointer hover:scale-105 duration-300 hover:opacity-90 relative">
        <CardHeader shadow={true} floated={false} className="h-96 relative">
          <img src={img} alt="card-image" className="h-full w-full object-cover" />
          <span className="bg-white text-xs roboto-bold absolute top-0 right-0 m-2 px-2 py-1 rounded">
            HD
          </span>

          {/* Play button, only visible on hover */}
          <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 hover:scale-105 hover:cursor-pointer bg-white rounded-full"
              viewBox="0 0 16 16"
              id="Play"
            >
              <path
                fill="#009ad6"
                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6 12V4l6 4-6 4z"
              ></path>
            </svg>
          </div>
        </CardHeader>

        <CardBody className="">
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="roboto-bold">
              {title}
            </Typography>
            <div className="flex gap-4">
              <Typography color="blue-gray" className="roboto-bold text-sm">
                {year}
              </Typography>
              <Typography color="blue-gray" className="roboto-black text-sm">
                {lang}
              </Typography>
            </div>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="roboto-thin-italic opacity-75"
          >
            {description}...
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
}
