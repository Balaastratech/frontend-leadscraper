import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import  Stack  from "../../../../ui/Layout/Stack";
import  Row  from "../../../../ui/Layout/Row";
import  Text  from "../../../../ui/Typography/Text";
import  Title  from "../../../../ui/Typography/Title";
import  Input  from "../../../../ui/Form/Input";
import  Button  from "../../../../ui/Form/Button";
import  Card  from "../../../../ui/Surface/Card";
import { useToast } from "../../../../hooks/useToast";

/**
 * LeadOverviewTab - Editable lead overview with validation
 */

const LeadOverviewTab = React.memo(({ lead, onUpdate, isEditing, onEditChange }) => {
  const toast = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email || "",
    company: lead.company || "",
    status: lead.status || "new",
    score: lead.score || 0,
  });
  const [errors, setErrors] = useState({});

  // Sync form when lead changes
  useEffect(() => {
    setFormData({
      name: lead.name,
      email: lead.email || "",
      company: lead.company || "",
      status: lead.status || "new",
      score: lead.score || 0,
    });
  }, [lead]);

  // Validate form
  const validate = useCallback(() => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (formData.score < 0 || formData.score > 100) {
      newErrors.score = "Score must be between 0-100";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle input change
  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  // Handle save
  const handleSave = useCallback(async () => {
    if (!validate()) {
      toast.error("Please fix form errors");
      return;
    }

    try {
      await onUpdate(formData);
      onEditChange(false);
    } catch (err) {
      toast.error("Failed to update lead");
    }
  }, [formData, validate, onUpdate, onEditChange, toast]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    setFormData({
      name: lead.name,
      email: lead.email || "",
      company: lead.company || "",
      status: lead.status || "new",
      score: lead.score || 0,
    });
    setErrors({});
    onEditChange(false);
  }, [lead, onEditChange]);

  // View mode
  if (!isEditing) {
    return (
      <Card variant="default" padding="lg">
        <Stack gap="lg">
          <Row justify="between" align="center">
            <Title level={3} size="lg">Lead Information</Title>
            <Button variant="outline" size="sm" onClick={() => onEditChange(true)}>
              Edit
            </Button>
          </Row>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Stack gap="2"><Text size="xs" color="muted" uppercase>Name</Text><Title size="lg">{lead.name}</Title></Stack>
            <Stack gap="2"><Text size="xs" color="muted" uppercase>Email</Text><Text size="lg" className="font-mono">{lead.email || "—"}</Text></Stack>
            <Stack gap="2"><Text size="xs" color="muted" uppercase>Company</Text><Text size="lg">{lead.company || "—"}</Text></Stack>
            <Stack gap="2"><Text size="xs" color="muted" uppercase>Status</Text><Text size="lg" className="capitalize">{lead.status || "unknown"}</Text></Stack>
            <Stack gap="2"><Text size="xs" color="muted" uppercase>Score</Text><Title size="lg">{lead.score || 0}%</Title></Stack>
          </div>
        </Stack>
      </Card>
    );
  }

  // Edit mode
  return (
    <Card variant="surface" padding="lg">
      <Stack gap="lg">
        <Title level={3} size="lg">Edit Lead Information</Title>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack gap="md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Stack gap="2">
                <label htmlFor="lead-name" className="text-sm font-medium text-gray-700">Name *</label>
                <Input id="lead-name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} error={errors.name} aria-required="true" />
                {errors.name && <Text size="xs" color="error">{errors.name}</Text>}
              </Stack>
              <Stack gap="2">
                <label htmlFor="lead-email" className="text-sm font-medium text-gray-700">Email</label>
                <Input id="lead-email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} error={errors.email} />
                {errors.email && <Text size="xs" color="error">{errors.email}</Text>}
              </Stack>
              <Stack gap="2">
                <label htmlFor="lead-company" className="text-sm font-medium text-gray-700">Company</label>
                <Input id="lead-company" value={formData.company} onChange={(e) => handleChange('company', e.target.value)} />
              </Stack>
              <Stack gap="2">
                <label htmlFor="lead-status" className="text-sm font-medium text-gray-700">Status</label>
                <select id="lead-status" value={formData.status} onChange={(e) => handleChange('status', e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="lost">Lost</option>
                </select>
              </Stack>
              <Stack gap="2" className="md:col-span-2">
                <label htmlFor="lead-score" className="text-sm font-medium text-gray-700">Score (0-100)</label>
                <Input id="lead-score" type="number" min="0" max="100" value={formData.score} onChange={(e) => handleChange('score', parseInt(e.target.value, 10))} error={errors.score} />
                {errors.score && <Text size="xs" color="error">{errors.score}</Text>}
              </Stack>
            </div>
            <Row justify="end" gap="2">
              <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleSave}>Save Changes</Button>
            </Row>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
});

LeadOverviewTab.propTypes = {
  lead: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    company: PropTypes.string,
    status: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onEditChange: PropTypes.func.isRequired,
};

LeadOverviewTab.displayName = "LeadOverviewTab";

export default LeadOverviewTab;