import initialPipeline from '../pipeline.json';

/**
 * In-Memory Pipeline Database
 * 
 * Design Principles:
 * - Single source of truth for pipeline stages
 * - Immutable (stages don't change in mock)
 * - Used ONLY by MSW handlers
 */

class PipelineDatabase {
  constructor() {
    // Deep clone to prevent mutations
    this.stages = JSON.parse(JSON.stringify(initialPipeline));
  }

  // GET /api/pipeline/stages
  list() {
    return {
      stages: this.stages,
      meta: {
        total: this.stages.length,
      },
    };
  }

  // GET /api/pipeline/stages/:id
  getById(id) {
    const stage = this.stages.find(s => s.id === id);
    
    if (!stage) {
      return {
        error: {
          message: `Stage with ID "${id}" not found`,
          code: 'NOT_FOUND',
        },
      };
    }
    
    return { stage };
  }

  // Utility: Find stage by name
  findByName(name) {
    return this.stages.find(
      s => s.name.toLowerCase() === name.toLowerCase()
    );
  }

  // Utility: Get stage ID by name
  getIdByName(name) {
    const stage = this.findByName(name);
    return stage?.id || null;
  }

  // Utility: Reset to initial state
  reset() {
    this.stages = JSON.parse(JSON.stringify(initialPipeline));
  }
}

// Singleton instance
export const pipelineDb = new PipelineDatabase();

// Export for testing
export default { pipelineDb };