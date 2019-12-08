# flush-microtasks

Return a thenable that resolves when the microtask queue is empty.

Taken from [enqueueTask.js](https://github.com/facebook/react/blob/b43eec7eaad14747d24ef24a06b27cb2a5653bbc/packages/shared/enqueueTask.js) in React.

```ts
import { flushMicroTasks } from 'flush-microtasks'

await flushMicroTasks()
```
