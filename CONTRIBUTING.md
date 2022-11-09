# Style and Structure Guide

**Here’s a quick version control checklist to ensure you’re applying the right version control best practices.**

## Guidelines for Pull Requests

1. NEVER DIRECTLY PUSH TO THE MASTER BRANCH OR MERGE A PULL REQUEST WITHOUT A CODE REVIEW.

2. Branch Frequently, Commit Often

- Use smaller, short-lived branches.
- Do not commit a large number of changes in a single branch.

3. Make Small, Single-Purpose Commits

- Commit only small sections of code.
- Each commit should have a single purpose. For example, fixing a bug or adding a new feature.
- Commit all files that belong to a task in a single operation to keep the project consistent at all times.
- One best practice is to commit changes atomically (This means, commit as you work on a major code function).
- All files in a commit are either committed together or not at all. No other user should see partial or incomplete changes.
- A check-in is similar to a database transaction described by its ACID properties:
  - Atomic.
  - Consistent.
  - Isolated.
  - Durable.

4. Write Short, Detailed Commit Messages

- When writing a commit message, start with a short summary of your change.
- Write your summary in present tense.
- Limit the subject line to 50 characters
- Always leave the second line blank. This separates your subject line from the message to ensures only the subject line displays.
- Think of a commit like a wrapper around a set of changes.
- Everything inside the wrapper accomplishes one purpose.
- If you are fixing two separate bugs, there should be two separate commits.
- A good commit message also references the issue ID(s) or even the requirement ID(s) — that the commit addressed (if applicable).
- Keep in mind that your team members will need to be able to read this message and understand exactly what you have done. Make sure that you provide enough detail to answer:
  - What changed from the last version?
  - How did it resolve the issue?
  - Why did you make the change?
  - Some bad examples are:

**Examples of bad commit messages**

- _"Address work item xxxyyy"_.
- _"Fixed a bug"_.
- _"Refactored X and Y"_.
- _"Added files"_.
- _"Who broke this code?????"_

**Examples of good commit messages**
_"Add search for username in group view"_.
_"Fix dynamic field init method to show status"_.
_"Small changes to text editor to enhance user experience"_.

5. Test Code and Require Reviews

- If you’re hesitant about your commit passing a build or test, don’t do it.
- Bad commits make tracing bugs and resolving conflicts a nightmare.
- You should test your code often, and commit once.
- To help protect the quality of your codebase, your code will not only pass a build, but also be reviewed.
- Pick a code review tool that does not bottleneck development.
- When code is ready to be checked in, it should launch a code review.

6. Preserve History and Traceability

- When checking in a change, make sure all affected files and unit tests are included.
- This is especially important when working between branches.
- Providing related test cases and files with your commit ensures
- that others can use your check-in without breaking their builds.

## Language Style Guide

### HTML

[HTML Document Style Guide. Also applies to bootstrap, tailwind and any html/css utility frameworks](https://google.github.io/styleguide/htmlcssguide.html)

### CSS

[CSS Style Guide](https://github.com/airbnb/css)

### JavaScript

[JavaScript Style Guide](https://github.com/airbnb/javascript)

### TypeScript

[TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

### React

[React Guide](https://github.com/airbnb/javascript/tree/master/react)

## Acceptable Linters

1. **ReactJS** - _ESLint & Prettier_