import React, { useState } from "react";
import Row from "../../../../ui/Layout/Row";
import Text from "../../../../ui/Typography/Text";
import Button from "../../../../ui/Form/Button";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const LeadsTablePagination = ({
  page,
  pageSize,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  onPageSizeChange,
}) => {
  const [inputValue, setInputValue] = useState(pageSize);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-surface rounded-xl border border-muted shadow-sm">
      
      {/* Page size input + buttons */}
      <Row align="center" gap="2">
        <Text size="sm" color="muted">Rows:</Text>

        <input
          type="number"
          min="1"
          className="w-20 px-2 py-1 border border-muted rounded-lg text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            const size = parseInt(inputValue, 10);
            if (size > 0) onPageSizeChange(size);
          }}
        >
          Set
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => onPageSizeChange("all")}
        >
          Show All
        </Button>
      </Row>

      {/* Range info */}
      <Text size="sm" color="muted">
        Showing{" "}
        <Text as="span" weight="semibold" className="text-primary">
          {startIndex + 1}
        </Text>
        -
        <Text as="span" weight="semibold" className="text-primary">
          {endIndex}
        </Text>{" "}
        of{" "}
        <Text as="span" weight="semibold" className="text-primary">
          {totalItems}
        </Text>
      </Text>

      {/* Navigation */}
      <Row gap="1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        >
          <FiChevronsLeft size={14} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        >
          <FiChevronsRight size={14} />
        </Button>
      </Row>
    </div>
  );
};

export default React.memo(LeadsTablePagination);
