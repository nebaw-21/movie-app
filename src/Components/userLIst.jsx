import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/solid";

export default function UserList() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Emily Johnson" },
    { id: 4, name: "Michael Brown" },
    { id: 5, name: "Adugna Benti" },
    { id: 6, name: "Sabona Misgana" },

  ];

  const handleOpen = (user = null) => {
    setSelectedUser(user);
    setOpen(!open);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <UserIcon className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-medium">{user.name}</span>
            </div>
            <Button
              variant="gradient"
              onClick={() => handleOpen(user)}
              className="text-sm"
            >
              Details
            </Button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <Dialog open={open} handler={() => handleOpen(null)}>
          <DialogHeader>User Details</DialogHeader>
          <DialogBody>
            <p className="text-gray-700">
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p className="text-gray-700 mt-2">
              This is a placeholder for additional user details.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => handleOpen(null)}
              className="mr-1"
            >
              <span>Close</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}
