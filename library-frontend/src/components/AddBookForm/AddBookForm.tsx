import { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useCreateBookMutation } from "@/hooks/useCreateBookMutation";
import { Button } from "../ui/button";

export type AddBookFormProps = {
  onSuccess?: () => void;
};

export const AddBookForm = ({ onSuccess }: AddBookFormProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [owner, setOwner] = useState("");

  const { createBook, isError, isPending } = useCreateBookMutation({
    onSuccess,
  });

  const handleSubmit = () => {
    createBook({ title, author, owner });
  };

  return (
    <form action={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title*</FieldLabel>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="author">Author*</FieldLabel>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="owner">Owner*</FieldLabel>
          <Input
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </Field>
        {isError && (
          <p className="text-sm text-red-600">
            Failed to add book. Please try again.
          </p>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding" : "Add"}
        </Button>
      </FieldGroup>
    </form>
  );
};
