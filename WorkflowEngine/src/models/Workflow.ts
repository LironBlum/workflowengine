import { v4 as uuidv4 } from 'uuid';
import { WorkflowStep } from './WorkflowStep';

export class Workflow {
  id: string;
  steps: Map<string, WorkflowStep>;

  constructor(steps: Map<string, WorkflowStep>) {
    this.id = uuidv4();
    this.steps = steps;
  }
}
