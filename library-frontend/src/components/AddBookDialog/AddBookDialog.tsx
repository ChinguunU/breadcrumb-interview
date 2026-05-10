import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AddBookForm } from "../AddBookForm";
import { Button } from "../ui/button";

export const AddBookDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Add Book</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <AddBookForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
