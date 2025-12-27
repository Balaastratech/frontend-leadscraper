import React, { useRef, useState, useCallback } from "react";
import { Listbox, Portal } from "@headlessui/react";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import Button from "../../ui/Form/Button";

export default React.memo(function MultiSelect({
  value,
  onChange,
  options,
  placeholder,
}) {
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);

  // prevent onChange firing BEFORE dropdown fully opens
  const safeOnChange = useCallback(
    (val) => {
      if (!open) return; // ignore accidental onChange on trigger click
      onChange(val);
    },
    [open, onChange]
  );

  return (
    <Listbox value={value} onChange={safeOnChange} multiple>
      <div className="relative w-full">
        <Listbox.Button
          as={React.Fragment}
          onClick={() => setOpen((o) => !o)}
        >
          <Button
            ref={triggerRef}
            variant="outline"
            size="sm"
            className="w-full justify-between"
          >
            {value.length === 0 ? placeholder : value.join(", ")}
            <FiChevronDown size={14} />
          </Button>
        </Listbox.Button>

        {open && (
          <Portal>
            <Listbox.Options
              className="fixed bg-surface border border-muted rounded shadow-lg
                         max-h-60 overflow-y-auto z-[9999]"
              style={{
                width: triggerRef.current?.offsetWidth ?? 0,
                top:
                  (triggerRef.current?.getBoundingClientRect().bottom ?? 0) + 4,
                left: triggerRef.current?.getBoundingClientRect().left ?? 0,
              }}
            >
              {options.map((opt) => (
                <Listbox.Option
                  key={opt}
                  value={opt}
                  className="cursor-pointer select-none px-3 py-2 flex items-center gap-2 text-sm hover:bg-subtle"
                >
                  {value.includes(opt) ? (
                    <FiCheck size={14} />
                  ) : (
                    <span className="w-[14px]" />
                  )}
                  <span>{opt}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Portal>
        )}
      </div>
    </Listbox>
  );
});
