import type {
    Reporter, FullConfig, Suite, TestCase, TestResult, FullResult, TestStep
  } from '@playwright/test/reporter';
  
  class MyReporter implements Reporter {
    constructor(options: { customOption?: string } = {}) {
      console.log(`Reporter setup with customOption: ${options.customOption}`);
    }
  
    onBegin(config: FullConfig, suite: Suite) {
      console.log(`Starting the run with ${suite.allTests().length} tests`);
    }
  
    onTestBegin(test: TestCase) {
      console.log(`Starting test: ${test.title}`);
    }
  
    // onStepBegin(test: TestCase, result: TestResult, step: TestStep) {

    //   this.isHookStep(step);
    //   if (this.isHookStep(step)) {
    //     console.log(`Starting step: ${step.title}`);
    //   }
    // }
  
    onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
      this.isHookStep(step);
      if (this.isHookStep(step)) {
        console.log(`Finished step: ${step.title} -> ${step.error ? 'failed' : 'passed'}`);
      }
    }
  
    onTestEnd(test: TestCase, result: TestResult) {
      console.log(`Finished test: ${test.title} -> ${result.status}`);
    }
  
    onEnd(result: FullResult) {
      console.log(`Finished the run: ${result.status}`);
    }
  
    private isHookStep(step: TestStep): boolean {
      const hookSteps = [
        'Before Hooks', 'After Hooks', 'fixture: ',
        'fixture.browser', 'fixture.context', 'fixture.page',
        'browserType.launch', 'browser.newContext', 'browserContext.newPage'
      ];
    
      // Updated regex to match methods with or without parentheses
      const regex = /\b(page|test|locator|expect)\s*\.\s*\w+/;
      
      const newLocal = hookSteps.some(hookStep => step.title.includes(hookStep));
      const isRegex = regex.test(step.title);

      // Fixing the condition
      // if (!newLocal && !isRegex) {
      //     console.log(`step.title ---> ${step.title}| isHookStep ---> ${newLocal} AND isRegex ---> ${isRegex}`);
      // }
      
      
      return (!newLocal && !isRegex);
    }
    
  }
  
  export default MyReporter;
  