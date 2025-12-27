// src/mock/db/leads.db.js

import initialLeads from '../leads.json';

/**
 * In-Memory Leads Database
 * 
 * Design Principles:
 * - Single source of truth for leads mock data
 * - Mutable state to support CRUD operations
 * - Returns stable response shapes matching real backend
 * - Used ONLY by MSW handlers
 */

class LeadsDatabase {
  constructor() {
    // Deep clone to avoid mutating the original JSON
    this.leads = JSON.parse(JSON.stringify(initialLeads));
  }

  // GET /api/leads
  list(query = {}) {
    const { search, status, minScore, maxScore, company, page = 1, limit = 10 } = query;
    
    let filtered = [...this.leads];
    
    // Apply filters
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.name?.toLowerCase().includes(term) ||
        lead.email?.toLowerCase().includes(term) ||
        lead.company?.toLowerCase().includes(term)
      );
    }
    
    if (status && Array.isArray(status) && status.length > 0) {
      filtered = filtered.filter(lead => status.includes(lead.status));
    }
    
    if (company) {
      const term = company.toLowerCase();
      filtered = filtered.filter(lead => lead.company?.toLowerCase().includes(term));
    }
    
    if (minScore !== undefined && minScore !== null) {
      filtered = filtered.filter(lead => lead.score >= Number(minScore));
    }
    
    if (maxScore !== undefined && maxScore !== null) {
      filtered = filtered.filter(lead => lead.score <= Number(maxScore));
    }
    
    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);
    
    return {
      leads: paginated,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  // GET /api/leads/:id
  getById(id) {
    const lead = this.leads.find(l => l.id === id);
    
    if (!lead) {
      return {
        error: {
          message: `Lead with ID "${id}" not found`,
          code: 'NOT_FOUND',
        },
      };
    }
    
    return { lead };
  }

  // POST /api/leads
  create(payload) {
    const newLead = {
      id: `lead-${Date.now()}`,
      ...payload,
      // Ensure required fields have defaults
      status: payload.status || 'new',
      score: payload.score || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.leads.push(newLead);
    
    return { lead: newLead };
  }

  // PATCH /api/leads/:id
  update(id, changes) {
    const index = this.leads.findIndex(l => l.id === id);
    
    if (index === -1) {
      return {
        error: {
          message: `Lead with ID "${id}" not found`,
          code: 'NOT_FOUND',
        },
      };
    }
    
    const updated = {
      ...this.leads[index],
      ...changes,
      id, // Prevent ID change
      updatedAt: new Date().toISOString(),
    };
    
    this.leads[index] = updated;
    
    return { lead: updated };
  }

  // PUT /api/leads/:id (full replace)
  replace(id, payload) {
    const index = this.leads.findIndex(l => l.id === id);
    
    if (index === -1) {
      return {
        error: {
          message: `Lead with ID "${id}" not found`,
          code: 'NOT_FOUND',
        },
      };
    }
    
    const replaced = {
      ...payload,
      id, // Prevent ID change
      createdAt: this.leads[index].createdAt, // Preserve original creation date
      updatedAt: new Date().toISOString(),
    };
    
    this.leads[index] = replaced;
    
    return { lead: replaced };
  }

  // DELETE /api/leads/:id
  delete(id) {
    const index = this.leads.findIndex(l => l.id === id);
    
    if (index === -1) {
      return {
        error: {
          message: `Lead with ID "${id}" not found`,
          code: 'NOT_FOUND',
        },
      };
    }
    
    const deleted = this.leads[index];
    this.leads.splice(index, 1);
    
    return {
      success: true,
      lead: deleted,
      message: `Lead "${deleted.name}" deleted successfully`,
    };
  }

  // POST /api/leads/bulk-import
  bulkImport(fileData) {
    // Simulate processing delay
    const importedCount = Math.floor(Math.random() * 20) + 5;
    const failed = Math.floor(Math.random() * 3);
    
    // Generate new leads from file data
    const newLeads = Array.from({ length: importedCount }, (_, i) => ({
      id: `lead-${Date.now()}-${i}`,
      name: `Imported Lead ${i + 1}`,
      email: `imported${i + 1}@example.com`,
      company: "Imported Company",
      status: "new",
      score: Math.floor(Math.random() * 100),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'csv-import',
    }));
    
    this.leads.push(...newLeads);
    
    return {
      status: "imported",
      importedCount,
      failed,
      leads: newLeads,
    };
  }

  // Utility: Reset to initial state
  reset() {
    this.leads = JSON.parse(JSON.stringify(initialLeads));
  }

  // Utility: Get all leads (for testing)
  getAll() {
    return [...this.leads];
  }

  // Utility: Seed specific data (for tests)
  seed(leads) {
    this.leads = [...leads];
  }
}

// Singleton instance
export const leadsDb = new LeadsDatabase();

// Export for testing
export default { leadsDb };