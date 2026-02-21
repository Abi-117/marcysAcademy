"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";

interface SectionProps {
  title: string;
  data: any[];
  api: string;
  refresh: () => void;
  apiUrl: string;
  navigate: any;
  createPath: string;
}

const Section = ({
  title,
  data,
  api,
  refresh,
  apiUrl,
  navigate,
  createPath,
}: SectionProps) => {

  const remove = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/${api}/${id}`);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <Button
          onClick={() => navigate(createPath)}
          className="bg-blue-500 text-white"
        >
          Add {title.slice(0, -1)}
        </Button>
      </div>

      {data.length === 0 && (
        <p className="text-gray-400">No data found.</p>
      )}

      {data.map((item: any) => (
        <div
          key={item._id}
          className="border rounded-lg p-4 mb-4 flex justify-between items-start gap-4 bg-white shadow-sm"
        >
          {/* LEFT SIDE */}
          <div className="flex-1">
            {/* RESULT TITLE */}
            <p className="font-bold text-lg break-words">
              {item.title || "No Title"}
            </p>

            {/* RESULT DESCRIPTION */}
            {item.description && (
              <p className="text-gray-600 text-sm mt-2 break-words whitespace-pre-wrap">
                {item.description}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/${api}/edit/${item._id}`)}
              className="text-blue-500"
            >
              Edit
            </Button>

            <Button
              variant="outline"
              onClick={() => remove(item._id)}
              className="text-red-500"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section;
