function isOperator(element) {
  orepators = ['*', '/', '+', '-'];
  return orepators.includes(element);
}

function performArithmeticOperation(operand1, operand2, operator) {
  switch (operator) {
    case '*':
      return Number(operand1) * Number(operand2);
    case '/':
      return Number(operand1) / Number(operand2);
    case '+':
      return Number(operand1) + Number(operand2);
    case '-':
      return Number(operand1) - Number(operand2);
  }
}

function parseExpression(expression) {
  const templates = [/\/+/g, /\++/g, /\*+/g, /\-+/g, /\s+/g, /,/g, /\)/g, /\(/g];
  const insertedСhars = ['/', '+', '*', '-', ' ', '.', ' ', ' '];
  for (let index = 0; index < templates.length; index++) {
    expression = expression.replace(templates[index], insertedСhars[index]);
  }
  expression = expression.trim();
  return expression;
}

function isElementsExpressionCorrect(elements) {
  const numberOfNumbers = elements.filter(x => !isNaN(x)).length;
  const numberOfOperators = elements.filter(x => isOperator(x)).length;
  let isError = (numberOfNumbers - 1) !== numberOfOperators;
  isError = isError || (numberOfNumbers + numberOfOperators !== elements.length);
  isError = isError || (isNaN(elements[elements.length - 1]) || isNaN(elements[elements.length - 2]));
  isError = isError || (!isOperator(elements[0]));
  return !isError;
}

function calc(input) {
  input = String(input);
  const expression = parseExpression(input);
  const elements = expression.split(/\s+/g);

  console.log('Выражение: ' + expression);
  if (isElementsExpressionCorrect(elements)) {
    let stack = [];
    let element;
    while (elements.length !== 0) {
      element = elements.pop();
      if (isOperator(element)) {
        result = performArithmeticOperation(stack.pop(), stack.pop(), element);
        stack.push(result);
      } else {
        stack.push(element);
      }
    }
    console.log('Ответ: ' + stack.pop());
  } else {
    console.log('Введите корректное выражение');
  }
}
