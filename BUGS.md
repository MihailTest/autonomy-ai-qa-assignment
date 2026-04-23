# BUGS

## 1. Repository prerequisites are not validated before task execution, causing sandbox setup failures

Severity: Major

Preconditions:
1. Account created
2. Project initialized
3. User does not set anything manually

Steps to Reproduce:
1. Go to new task page
2. Select "Plan" option for the Agent
3. Insert Prompt (e.g. "Create a simple reusable card component with a title, description and primary button")
4. Click "Generate"
5. Wait for the tast to finish

Expected:
Before starting the task, the system should validate whether the project has all required prerequisites configured.
If additional setup is needed, the user should see a clear message before execution starts, with guidance on what must be configured first.

Actual:
The system allows the user to create and start a task immediately after project creation, even when required setup is still missing. (missing secrets)
The agent starts working, runs for several minutes, and then fails.
The error is unclear and does not clearly explain, what failed and why, which prerequisite is missing or what the user needs to configure.

Impact:
Users can easily assume the project is ready because the UI allows task creation and execution immediately.
This leads to failed runs, wasted time, and confusion.
The issue is harder to diagnose because the actual cause is not clearly surfaced in the product and may only be understood by checking DevTools or internal request details.

## 2. "Re-run" action in Project Settings is ambiguous after fixing missing secrets following a failed task

Severity: Medium

Steps to Reproduce:
1. Create a project and start a task that depends on environment secrets.
2. Let the task fail because required secrets are missing or incomplete.
3. Open Project Settings and navigate to the Rendering Configuration, Environment Secrets section.
4. Add the missing secret.
5. Click the "Re-run" button shown in the settings area.

Expected:
The "Re-run" action should clearly indicate what will be re-executed before the user clicks it.
For example, it should make clear whether it will:
- re-run the previously failed task
- re-run validation/setup steps only
- re-run project configuration checks
- re-trigger some other project-level process

Actual:
After adding the missing secret, the "Re-run" button is visible but its scope is unclear.
It is not obvious whether the action applies to the failed task, the project setup flow, or another background process.

Impact:
This creates confusion at the recovery stage, when the user is trying to fix a failed run quickly.
Users may hesitate to click the button, click it with the wrong expectation, or repeat unnecessary actions.
It also makes troubleshooting harder because the product does not clearly communicate what exactly will happen after pressing "Re-run".

## 3. VS Code button behaves inconsistently: success toast, no tab, infinite loading, or 401 error

Severity: Major

Preconditions:
1. Account created
2. GitHub repositorie, connected to AutonomyAI and project created

Steps to Reproduce:
1. Open AutonomyAi, Project settings
2. Click the "VS Code" button once.
3. Observe that nothing happens.
4. Click the "VS Code" button several more times.
5. Observe that success messages appear, indicating that the IDE was opened in a new tab, while no new tab is actually opened at that moment.
6. Click the "VS Code" button again.
7. Observe that a new tab finally opens, but it loads a "401 Unauthorized" page.

Expected:
Clicking the "VS Code" button should produce one consistent outcome:
- open the IDE in a new tab immediately for authorized users
- or show a clear and accurate error if access cannot be completed

Actual:
The button behaves inconsistently.
Across different attempts, one of several outcomes may happen:
- it works instantly
- it shows a success message, but no new tab opens
- it opens a tab that never finishes loading
- it opens a tab that returns "401 Unauthorized"

Impact:
This makes the VS Code integration unreliable and hard to trust.
Users cannot predict whether the action actually worked.
The misleading success state is especially confusing because it suggests the IDE opened successfully when it did not.
The issue disrupts workflow and forces users to retry multiple times without clear feedback about the real state of the action.