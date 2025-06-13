## How to execute:
npm i
npx ts-node src/index.ts


## Notes
From my understanding, an API wasn’t strictly required for this task.

If it was, I would have implemented the following endpoints (and probably a few others, like getting workflow status):

POST /workflows — create a new workflow

POST /workflows/:id/start — start workflow execution

If I had more time, I would also add:

Unit tests

Logs

Retry logic for failed steps

Persistence for workflows and steps

Validations

