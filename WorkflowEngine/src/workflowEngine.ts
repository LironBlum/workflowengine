import { Workflow } from './models/Workflow';
import { WorkflowStep } from './models/WorkflowStep';
import { StepStatus } from './enums';

export class WorkflowEngine {
  private workflow: Workflow;

  constructor(workflow: Workflow) {
    this.workflow = workflow;
  }

  async process(): Promise<void> {
    await this.runPendingSteps();
  }

  private async runPendingSteps(): Promise<void> {
    const pendingSteps = [...this.workflow.steps.values()].filter(
    (step) => step.status === StepStatus.PENDING && this.isReady(step)
    );

    if (pendingSteps.length === 0) {
      console.log('workflow done');
      return;
    }

    
    // run all steps that are ready with no dependencies
    await Promise.all(pendingSteps.map((step) => this.runStep(step)));

    await this.runPendingSteps();
  }

  private isReady(step: WorkflowStep): boolean {
    return step.dependsOn.every((dependencyId) => {
      const dependency = this.workflow.steps.get(dependencyId);
      return dependency && dependency.status === StepStatus.SUCCESS;
    });
  }

  private async runStep(step: WorkflowStep): Promise<void> {
    step.status = StepStatus.RUNNING;
    console.log(`running step ${step.id} (${step.type})`);

    try {
      await step.action();
      step.status = StepStatus.SUCCESS;
      console.log(`step ${step.id} done`);
    } catch (err) {
      step.status = StepStatus.FAILED;
      console.error(`step ${step.id} failed`, err);
    }
  }
}
