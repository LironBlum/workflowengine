import { Workflow } from './models/Workflow';
import { WorkflowStep } from './models/WorkflowStep';
import { WorkflowEngine } from './workflowEngine';
import { StepType } from './enums';


// mock workflow
//two emails should be sent (in parallel) and only after they are both done, the grant of options should be updated.
function createWorkflow(): Workflow {
  const steps = new Map<string, WorkflowStep>();

  const email1 = new WorkflowStep(StepType.SEND_EMAIL, [], async () => {
    console.log('email 1# sent');
  });

  const email2 = new WorkflowStep(StepType.SEND_EMAIL, [], async () => {
    console.log('email 2# sent');
  });

  const grantUpdate = new WorkflowStep(StepType.UPDATE_GRANT_STATUS, [email1.id, email2.id], async () => {
    console.log('grant status updated');
  });

  steps.set(email1.id, email1);
  steps.set(email2.id, email2);
  steps.set(grantUpdate.id, grantUpdate);

  return new Workflow(steps);
}

async function runWorkflow() {
  const workflow = createWorkflow();
  const workflowEngine = new WorkflowEngine(workflow);
  await workflowEngine.process();
}

runWorkflow();
