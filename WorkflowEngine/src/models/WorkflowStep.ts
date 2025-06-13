import { v4 as uuidv4 } from 'uuid';
import { StepType, StepStatus } from '../enums';


export class WorkflowStep {
  id: string;
  type: StepType;
  dependsOn : string[];
  status: StepStatus;
  action: () => Promise<void>;

  constructor(
    type: StepType,
    dependsOn: string[],
    action: () => Promise<void>
  ) {
    this.id = uuidv4();
    this.type = type;
    this.dependsOn = dependsOn;
    this.status = StepStatus.PENDING;
    this.action = action;
  }
}
