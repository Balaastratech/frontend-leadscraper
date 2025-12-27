import React, { useEffect } from "react";
import Modal from "../ui/Surface/Modal";
import Stack from "../ui/Layout/Stack";
import Row from "../ui/Layout/Row";
import Text from "../ui/Typography/Text";
import Button from "../ui/Form/Button";

import CSVUploadArea from "./components/CSVUploadArea";
import CSVSelectedFileCard from "./components/CSVSelectedFileCard";
import CSVImportProgress from "./components/CSVImportProgress";
import CSVImportResult from "./components/CSVImportResult";
import CSVErrorBlock from "./components/CSVErrorBlock";

import { useCsvImportLogic } from "./hooks/useCsvImportLogic";

export default function CSVImportModal({ open, onClose }) {
  const logic = useCsvImportLogic(onClose);

  useEffect(() => {
    if (!open) logic.reset();
  }, [open]);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title="Import CSV">
      <Stack gap="lg">
        <Text size="sm" color="muted">
          Upload a CSV with name, email, company, status, score.
        </Text>

        {/* Duplicate File Prompt */}
        {logic.duplicateFile && (
          <Modal
            open={true}
            onClose={logic.keepDuplicate}
            title="Duplicate File"
          >
            <Stack gap="md">
              <Text size="sm">
                File <strong>{logic.duplicateFile.newFile.name}</strong> already exists.
              </Text>

              <Row justify="end" gap="2">
                <Button variant="outline" onClick={logic.keepDuplicate}>
                  Keep Existing
                </Button>

                <Button variant="primary" onClick={logic.replaceDuplicate}>
                  Replace With New File
                </Button>
              </Row>
            </Stack>
          </Modal>
        )}

        {!logic.importing && (
          <CSVUploadArea
            dragging={logic.dragging}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              logic.setDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              logic.setDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              logic.setDragging(false);

              const files = Array.from(e.dataTransfer.files || []);
              if (files.length > 0) {
                logic.handleFileSelect(files);
              }
            }}
            onClick={() => logic.fileInputRef.current?.click()}
          />
        )}

        <input
          ref={logic.fileInputRef}
          type="file"
          accept=".csv"
          multiple
          className="hidden"
          onChange={(e) => {
            if (!e.target.files) return;
            logic.handleFileSelect(e.target.files);
            e.target.value = "";
          }}
        />

        {logic.selectedFiles.length > 0 &&
          !logic.importing &&
          !logic.results.length && (
            <Stack gap="sm">
              {logic.selectedFiles.map((file, idx) => (
                <CSVSelectedFileCard
                  key={idx}
                  file={file}
                  onRemove={() => logic.removeFile(idx)}
                />
              ))}
            </Stack>
          )}

        {logic.importing && <CSVImportProgress progress={logic.progress} />}

        {logic.error && !logic.importing && (
          <CSVErrorBlock message={logic.error} onRetry={logic.importCsv} />
        )}

        {logic.result && !logic.importing && (
          <CSVImportResult result={logic.results} />
        )}

        <Row justify="end" gap="2">
          <Button
            variant="outline"
            onClick={logic.cancelImport}
            disabled={!logic.importing}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={logic.importCsv}
            loading={logic.importing}
            disabled={logic.selectedFiles.length === 0 || logic.importing}
          >
            {logic.importing ? "Importing..." : "Import"}
          </Button>
        </Row>
      </Stack>
    </Modal>
  );
}
