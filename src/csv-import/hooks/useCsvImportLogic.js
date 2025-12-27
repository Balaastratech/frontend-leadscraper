import { useState, useRef } from "react";
import { useToast } from "../../hooks/useToast";
import * as leadsApi from "../../features/leads/api/leads";
import { useCsvFileValidation } from "./useCsvFileValidation";

export function useCsvImportLogic(onClose) {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const { validateFile } = useCsvFileValidation();

  const abortRef = useRef(null);
  const progressTimerRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // NEW: duplicate handling
  const [duplicateFile, setDuplicateFile] = useState(null);

  const replaceDuplicate = () => {
    setSelectedFiles((prev) => {
      const arr = [...prev];
      arr[duplicateFile.oldIndex] = duplicateFile.newFile;
      return arr;
    });
    setDuplicateFile(null);
  };

  const keepDuplicate = () => {
    setDuplicateFile(null);
  };

  const reset = () => {
    setSelectedFiles([]);
    setImporting(false);
    setProgress(0);
    setResults([]);
    setError(null);
    setDuplicateFile(null);

    if (fileInputRef.current) fileInputRef.current.value = null;

    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }

    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };

  const cancelImport = () => reset();

  // Accept single / multiple / FileList
  const handleFileSelect = (filesOrFile) => {
    if (!filesOrFile) return;

    const files = Array.isArray(filesOrFile)
      ? filesOrFile
      : filesOrFile instanceof FileList
      ? Array.from(filesOrFile)
      : [filesOrFile];

    const validFiles = [];
    let validationError = null;

    for (const file of files) {
      const check = validateFile(file);
      if (!check.valid) {
        validationError = check.message;
        continue;
      }
      validFiles.push(file);
    }

    if (validationError && validFiles.length === 0) {
      setError(validationError);
      return;
    }

    setError(validationError || null);

    setSelectedFiles((prev) => {
      const arr = [...prev];

      validFiles.forEach((file) => {
        const duplicateIndex = arr.findIndex(
          (f) => f.name === file.name && f.size === file.size
        );

        if (duplicateIndex !== -1) {
          setDuplicateFile({
            newFile: file,
            oldIndex: duplicateIndex,
          });
          return;
        }

        arr.push(file);
      });

      return arr;
    });
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const simulateProgress = (signal) =>
    new Promise((resolve, reject) => {
      let p = 0;

      if (signal?.aborted) {
        const err = new Error("Aborted");
        err.name = "AbortError";
        return reject(err);
      }

      const onAbort = () => {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
        const err = new Error("Aborted");
        err.name = "AbortError";
        reject(err);
      };

      signal.addEventListener("abort", onAbort);

      progressTimerRef.current = setInterval(() => {
        p += Math.random() * 20 + 5;

        if (p >= 100) {
          p = 100;
          clearInterval(progressTimerRef.current);
          progressTimerRef.current = null;
          signal.removeEventListener("abort", onAbort);
          resolve();
          return;
        }

        setProgress(Math.floor(p));
      }, 200);
    });

  const importCsv = async () => {
    if (selectedFiles.length === 0) return setError("No files selected");

    setImporting(true);
    setError(null);
    setProgress(0);

    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    const combinedResults = [];

    try {
      for (let file of selectedFiles) {
        if (signal.aborted) {
          const err = new Error("Aborted");
          err.name = "AbortError";
          throw err;
        }

        await simulateProgress(signal);

        const response = await leadsApi.bulkImport(file, { signal });

        if (response.error) throw new Error(response.error.message);

        combinedResults.push({
          fileName: file.name,
          ...response,
        });

        toast.success(`Imported ${file.name}`);
      }

      setResults(combinedResults);

      setTimeout(() => onClose(), 2500);
    } catch (err) {
      if (err.name === "AbortError") return;

      setError(err.message);
      toast.error(err.message);
    } finally {
      setImporting(false);
    }
  };

  return {
    fileInputRef,
    selectedFiles,
    dragging,
    importing,
    progress,
    results,
    error,

    duplicateFile,
    replaceDuplicate,
    keepDuplicate,

    setDragging,
    handleFileSelect,
    removeFile,
    importCsv,
    cancelImport,
    reset,
  };
}
