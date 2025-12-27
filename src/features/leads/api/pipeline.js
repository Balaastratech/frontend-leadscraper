import httpClient from "../../../api/httpClient";
import { wait } from "../../../api/utils";

/**
 * Pipeline API
 * 
 * Stable API contracts for pipeline stage management
 */

/**
 * Get all pipeline stages
 * 
 * @returns {Promise<{stages: PipelineStage[], meta: {total: number}, error?: {message: string, code: string}}>}
 */
export async function getStages() {
  await wait(300);

  try {
    const response = await httpClient.get('/api/pipeline/stages');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pipeline stages:', error.message);
    return {
      stages: [],
      meta: { total: 0 },
      error: error.data?.error || { message: 'Failed to fetch pipeline stages', code: 'FETCH_ERROR' }
    };
  }
}

/**
 * Get a single pipeline stage by ID
 * 
 * @param {string} id - Stage ID
 * @returns {Promise<{stage: PipelineStage, error?: {message: string, code: string}}>}
 */
export async function getStage(id) {
  await wait(250);

  try {
    const response = await httpClient.get(`/api/pipeline/stages/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch pipeline stage ${id}:`, error.message);
    return {
      stage: null,
      error: error.data?.error || { message: 'Failed to fetch pipeline stage', code: 'FETCH_ERROR' }
    };
  }
}

export default {
  getStages,
  getStage,
};