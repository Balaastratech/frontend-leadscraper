import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Form/Button";

export default function QuickActions({ className = "" }) {
  const navigate = useNavigate();

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button onClick={() => navigate("/app/leads")} variant="default">+ Create Lead</Button>
      <Button onClick={() => navigate("/app/leads")} variant="default">Import CSV</Button>
      <Button onClick={() => navigate("/app/scraper")} variant="primary">Run Scraper</Button>
      <Button onClick={() => navigate("/app/ai-studio")} variant="default">AI Studio</Button>
    </div>
  );
}
