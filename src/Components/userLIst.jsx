import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

export default function UserList({ onClose }) {
  const [open, setOpen] = useState(true);

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Emily Johnson" },
    { id: 4, name: "Michael Brown" },
    { id: 5, name: "Adugna Benti" },
    { id: 6, name: "Sabona Misgana" },
  ];

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>User List</DialogHeader>
      <DialogBody>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <UserIcon className="h-6 w-6 text-blue-500" />
                <span>{user.name}</span>
              </div>
              <Button variant="gradient">Share</Button>
            </li>
          ))}
        </ul>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
