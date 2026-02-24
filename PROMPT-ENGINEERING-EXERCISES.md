# Prompt Engineering - Practical Exercises

Practice transforming weak prompts into powerful ones. Each exercise includes a before/after example and space for you to try.

---

## Exercise 1: Code Generation (Beginner)

### ❌ Weak Prompt
```
Write a function to sort an array
```

### ✅ Strong Prompt
```
Write a JavaScript function named 'sortUsersByAge' that:
- Takes an array of user objects (each with name, age, email properties)
- Returns a new array sorted by age in ascending order
- Handles edge cases (empty array, null values)
- Includes JSDoc comments
- Example input: [{name: "Alice", age: 30}, {name: "Bob", age: 25}]
- Example output: [{name: "Bob", age: 25}, {name: "Alice", age: 30}]
```

### 🎯 Your Turn
Transform this weak prompt:
```
Create a login form
```

Your improved version:
```
[Write your improved prompt here]









```

---

## Exercise 2: Debugging (Intermediate)

### ❌ Weak Prompt
```
My code doesn't work, fix it
```

### ✅ Strong Prompt
```
I'm getting a "Cannot read property 'length' of undefined" error in this function:

function calculateAverage(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}

Context:
- This function is called from an API response handler
- Sometimes the API returns null instead of an array
- Error happens intermittently in production
- Node.js 18, running in AWS Lambda

Please:
1. Identify why this error occurs
2. Fix the code to handle null/undefined inputs
3. Add input validation
4. Suggest how to prevent similar issues
```

### 🎯 Your Turn
Transform this weak prompt:
```
This isn't working right
```

Your improved version:
```
[Write your improved prompt here]









```

---

## Exercise 3: Code Review (Intermediate)

### ❌ Weak Prompt
```
Review this code
```

### ✅ Strong Prompt
```
You are a senior backend developer specializing in Node.js and security.

Review this Express.js route handler for security vulnerabilities and best practices:

app.post('/api/user', (req, res) => {
  const query = `INSERT INTO users VALUES ('${req.body.username}', '${req.body.password}')`;
  db.query(query);
  res.send('User created');
});

Focus on:
1. Security issues (SQL injection, authentication, etc.)
2. Error handling
3. Input validation
4. Response structure

For each issue found, provide:
- Severity level (Critical/High/Medium/Low)
- Explanation of the risk
- Fixed code example
```

### 🎯 Your Turn
Create a prompt for reviewing a React component for performance issues:
```
[Write your prompt here]









```

---

## Exercise 4: Documentation (Advanced)

### ❌ Weak Prompt
```
Document this function
```

### ✅ Strong Prompt
```
Create comprehensive JSDoc documentation for this function:

function calculateLoanEligibility(amount, country, term, currency) {
  // implementation here
}

Include:
- Function description (1-2 sentences)
- @param tags with types and descriptions for each parameter
- @returns tag explaining the return value structure
- @throws tag for any errors
- @example showing actual usage with realistic values
- Any important notes about business logic

Follow JSDoc 3 standard format.
```

### 🎯 Your Turn
Create a prompt for generating API documentation:
```
[Write your prompt here]









```

---

## Exercise 5: Refactoring (Advanced)

### ❌ Weak Prompt
```
Make this code better
```

### ✅ Strong Prompt
```
Refactor this code to improve readability and maintainability:

function processData(data) {
  let r = [];
  for(let i = 0; i < data.length; i++) {
    if(data[i].a > 100 && data[i].b === 'active' && data[i].c !== null) {
      r.push({x: data[i].a * 1.1, y: data[i].name, z: data[i].c.toUpperCase()});
    }
  }
  return r;
}

Requirements:
- Use descriptive variable names
- Break into smaller functions if appropriate
- Add comments explaining business logic
- Use modern JavaScript (ES6+)
- Make the filtering logic more maintainable
- Keep the same functionality

Also explain what the code does in plain English.
```

### 🎯 Your Turn
Create a prompt for refactoring a nested callback structure to async/await:
```
[Write your prompt here]









```

---

## Exercise 6: Architecture Design (Advanced)

### ❌ Weak Prompt
```
How should I structure my app?
```

### ✅ Strong Prompt
```
You are a software architect with expertise in Node.js and microservices.

I'm building a loan comparison platform with these requirements:
- Compare loans across multiple banks
- Handle 10,000+ requests per day
- Support multiple countries and currencies
- Need to integrate with 20+ bank APIs
- Some bank APIs are slow (2-5 second response time)
- Must return results in under 1 second
- Budget for AWS infrastructure: $500/month

Design a scalable architecture that addresses:
1. API integration strategy (parallel calls? caching?)
2. Database choice and schema design
3. Caching strategy
4. API rate limiting
5. Error handling for failed bank APIs
6. Deployment setup

For each component, explain:
- Technology choice and why
- How it scales
- Cost implications
- Trade-offs
```

### 🎯 Your Turn
Create an architecture design prompt for a real-time chat application:
```
[Write your prompt here]









```

---

## Exercise 7: Learning & Explanation (Beginner to Intermediate)

### ❌ Weak Prompt
```
Explain promises
```

### ✅ Strong Prompt
```
Explain JavaScript Promises to someone who:
- Knows JavaScript basics (variables, functions, loops)
- Has never used async programming before
- Learns best through visual analogies and real-world examples

Structure:
1. What problem do Promises solve? (Use a real-world analogy)
2. Basic syntax with a simple example
3. Common use case (API call example)
4. Common mistakes beginners make
5. One practice exercise

Keep it under 500 words, avoid jargon, use conversational tone.
```

### 🎯 Your Turn
Create a prompt to learn about database indexing:
```
[Write your prompt here]









```

---

## Exercise 8: Testing (Intermediate)

### ❌ Weak Prompt
```
Write tests for this
```

### ✅ Strong Prompt
```
Create Jest unit tests for this function:

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

Include tests for:
- Valid email addresses (standard format)
- Invalid cases: missing @, missing domain, empty string, null, undefined
- Edge cases: multiple @, spaces, special characters
- Boundary cases: very long emails, single character parts

Use describe/it blocks, clear test names, and arrange-act-assert pattern.
Aim for 100% code coverage.
```

### 🎯 Your Turn
Create a prompt for integration testing:
```
[Write your prompt here]









```

---

## Real-World Scenario Challenge

You're working on an e-commerce checkout flow that's causing cart abandonment. Write a comprehensive prompt to:
1. Analyze the current code
2. Identify UX/performance issues  
3. Suggest improvements
4. Implement the top 3 fixes

```
[Write your comprehensive prompt here - aim for 10-15 lines]













```

---

## Prompt Templates Library

Copy and customize these for your needs:

### Template 1: Feature Implementation
```
You are a [role/expertise].

I need to implement [feature description] in [technology stack].

Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Constraints:
- [Constraint 1]
- [Constraint 2]

Provide:
1. Implementation plan (step-by-step)
2. Code for [specific component]
3. Tests
4. Potential issues to watch for
```

### Template 2: Bug Investigation
```
I'm encountering [error message/unexpected behavior].

Environment:
- [Technology/version]
- [Platform/OS]
- [Relevant dependencies]

What I've tried:
- [Attempt 1]
- [Attempt 2]

Code context:
[Relevant code snippet]

Help me:
1. Understand root cause
2. Fix the issue
3. Prevent recurrence
```

### Template 3: Performance Optimization
```
This [component/function/query] is slow:
- Current performance: [metric]
- Target performance: [metric]
- Bottleneck: [if known]

Code:
[Relevant code]

Optimize for [memory/speed/both] while maintaining [specific requirements].

Provide:
1. Performance analysis
2. Optimized code
3. Benchmark comparison approach
4. Trade-offs made
```

---

## Self-Assessment

Rate your prompts using this scoring system:

| Criteria | Points |
|----------|--------|
| Clear goal stated | 2 |
| Context provided | 2 |
| Output format specified | 1 |
| Constraints listed | 1 |
| Examples included (if needed) | 1 |
| Role assigned (if helpful) | 1 |
| Edge cases mentioned | 2 |

**Score 7-10**: Excellent prompt
**Score 4-6**: Good, can be improved
**Score 0-3**: Needs significant work

---

## Next Actions

1. ✅ Try Exercise 1-3 right now
2. ✅ Pick one weak prompt from your recent work and rewrite it
3. ✅ Use the templates for your next AI interaction
4. ✅ Track your results: Did better prompts = better outputs?

---

**Remember**: Prompt engineering is a skill that improves with practice. Start simple, iterate, and refine based on results!
