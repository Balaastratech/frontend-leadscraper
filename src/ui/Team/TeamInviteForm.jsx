import React, { useState } from "react";
import Input from "../Form/Input";
import Button from "../Form/Button";

export default function TeamInviteForm({ onSubmit }) {
  const [email, setEmail] = useState("");

  const submit = () => {
    if (!email.trim()) return;
    onSubmit(email.trim());
    setEmail("");
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="md"
      />

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSubmit(null)}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={submit}
        >
          Send Invite
        </Button>
      </div>
    </div>
  );
}
