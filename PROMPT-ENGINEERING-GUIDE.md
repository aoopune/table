# Prompt Engineering Guide

## What is Prompt Engineering?

Prompt engineering is the art and science of crafting effective instructions for AI models to get optimal results. It's about communication - telling the AI exactly what you want, how you want it, and providing the right context.

---

## Core Principles

### 1. **Be Specific and Clear**
❌ Bad: "Write code"
✅ Good: "Write a Python function that takes a list of numbers and returns only the even numbers, sorted in descending order"

### 2. **Provide Context**
❌ Bad: "Fix this bug"
✅ Good: "This React component crashes when users click the submit button without filling the email field. The error is 'Cannot read property email of undefined'. Fix this by adding validation."

### 3. **Define Output Format**
❌ Bad: "Analyze this data"
✅ Good: "Analyze this sales data and provide: 1) Top 3 products by revenue, 2) Monthly growth rate, 3) Recommendations in bullet points"

### 4. **Use Examples (Few-Shot Learning)**
```
Convert these sentences to past tense:
- "I walk to school" → "I walked to school"
- "She eats lunch" → "She ate lunch"

Now convert: "They swim in the pool"
```

### 5. **Give the AI a Role**
"You are an expert Python developer with 10 years of experience in data analysis. Review this code and suggest performance improvements."

### 6. **Break Complex Tasks into Steps**
❌ Bad: "Build a login system"
✅ Good: "Step 1: Create a user registration form with email and password validation. Step 2: Implement password hashing. Step 3: Create login endpoint with JWT authentication."

---

## Prompt Structure Template

```
[ROLE] You are a [specific role/expertise]

[CONTEXT] I'm working on [project/situation]

[TASK] I need you to [specific action]

[CONSTRAINTS]
- Requirement 1
- Requirement 2
- Requirement 3

[FORMAT] Provide output as [desired format]

[EXAMPLES] (if applicable)
Input: X → Output: Y
```

---

## Real-World Examples

### Example 1: Code Generation
```
You are a senior JavaScript developer.

I'm building a REST API for a blog application using Express.js.

Create a route handler for GET /api/posts that:
- Retrieves posts from MongoDB
- Supports pagination (page and limit query params)
- Filters by category if provided
- Returns posts sorted by creation date (newest first)
- Includes error handling

Format the response as:
{
  "success": true,
  "data": [...],
  "pagination": { "page": 1, "limit": 10, "total": 100 }
}
```

### Example 2: Code Review
```
You are a code review expert focusing on security and performance.

Context: This function processes user payments in a Node.js application.

Review this code and provide:
1. Security vulnerabilities (HIGH priority)
2. Performance issues
3. Code quality improvements
4. Suggested refactoring

[Insert code here]

Format each issue as:
**[SEVERITY]** Issue description
- Why it's a problem
- How to fix it
```

### Example 3: Debugging
```
I'm getting this error in my React app:
"TypeError: Cannot read property 'map' of undefined"

Context:
- Happens in UserList component when loading
- Data comes from API call using useEffect
- Works fine after refresh

The component code:
[Insert component code]

Help me:
1. Identify the root cause
2. Explain why it happens
3. Provide the corrected code
4. Suggest how to prevent this pattern in the future
```

### Example 4: Documentation
```
You are a technical writer creating developer documentation.

I have this API endpoint that needs documentation:

POST /api/v1/loans/calculate
- Calculates loan eligibility based on input criteria
- Parameters: amount, country, currency, term
- Returns matching banks and rates

Create API documentation following this format:
- Endpoint description
- Request parameters (with types and validation rules)
- Request example (JSON)
- Response example (JSON)
- Possible error codes
- Usage example in JavaScript
```

---

## Advanced Techniques

### Chain of Thought Prompting
"Let's solve this step by step:
1. First, identify what data we have
2. Then, determine what calculations are needed
3. Finally, format the output"

### Constraint-Based Prompting
"Generate a product description that:
- Is exactly 50-75 words
- Uses no jargon
- Includes 3 key benefits
- Ends with a call-to-action
- Has a conversational tone"

### Iterative Refinement
```
Prompt 1: "Write a function to validate email addresses"
→ Review output
Prompt 2: "Improve it to also check for disposable email domains"
→ Review output
Prompt 3: "Add TypeScript types and JSDoc comments"
```

### Negative Instructions
"Explain this concept WITHOUT using technical jargon, WITHOUT assuming prior knowledge, and WITHOUT making it longer than 3 paragraphs"

---

## Common Mistakes to Avoid

❌ **Too Vague**: "Make it better"
✅ **Specific**: "Optimize this function to handle 10,000 items in under 100ms"

❌ **No Context**: "Fix this"
✅ **With Context**: "This SQL query times out on large datasets (1M+ rows). Optimize it."

❌ **Assuming AI Knows**: "Update the usual fields"
✅ **Being Explicit**: "Update the firstName, lastName, and email fields"

❌ **One Shot Complex Task**: "Build a complete e-commerce site"
✅ **Broken Down**: "First, create the product listing component with filtering"

---

## Testing Your Prompts

### Prompt Quality Checklist
- [ ] Is my goal crystal clear?
- [ ] Have I provided all necessary context?
- [ ] Have I specified the output format?
- [ ] Have I mentioned constraints/requirements?
- [ ] Can someone unfamiliar with my project understand this?
- [ ] Have I included examples if the task is complex?

### A/B Test Your Prompts
Try different versions and compare results:
- Version A: Short and direct
- Version B: Detailed with examples
- Version C: With role and context

---

## Quick Reference Card

| Situation | Prompt Technique |
|-----------|-----------------|
| Complex task | Break into steps, use numbered list |
| Need specific format | Provide exact template or example |
| Code generation | Specify language, framework, requirements, constraints |
| Debugging | Include error message, context, what you've tried |
| Code review | Define focus areas (security, performance, style) |
| Learning/Explanation | Specify knowledge level, use analogies |
| Refactoring | State goals (readability, performance, maintainability) |
| Creative tasks | Set tone, style, length, audience |

---

## Practice Exercise Path

1. **Beginner**: Take a vague request you'd normally make and rewrite it with specifics
2. **Intermediate**: Add role, context, and output format to your prompts
3. **Advanced**: Use chain-of-thought and constraint-based prompting for complex tasks

---

## Resources for Deep Dive

- **Key Concept**: The better your prompt, the better the output
- **Rule of Thumb**: Spend 2 minutes crafting a prompt to save 10 minutes on revisions
- **Remember**: AI doesn't know what you know - make implicit knowledge explicit

---

**Next Steps**: Open [PROMPT-ENGINEERING-EXERCISES.md](PROMPT-ENGINEERING-EXERCISES.md) to practice with real examples!
