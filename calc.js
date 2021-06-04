function isOperator(element) {
  orepators = ['*', '/', '+', '-'];
  return orepators.indexOf(element) !== -1;
}

function execute(operand1, operand2, operator) {
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

function preparation(expression) {
  const templates = [/\/+/g, /\++/g, /\*+/g, /\-+/g, /\s+/g, /,/g, /\)/g, /\(/g];
  const insertedСhars = ['/', '+', '*', '-', ' ', '.', ' ', ' '];
  for (let index = 0; index < templates.length; index++) {
    expression = expression.replace(templates[index], insertedСhars[index]);
  }
  expression = expression.trim();
  return expression;
}

function validation(elements) {
  const numbers = elements.filter(x => !isNaN(x)).length;
  const operators = elements.filter(x => isOperator(x)).length;
  let error = (numbers - 1) !== operators;
  error = error + (numbers + operators !== elements.length);
  error = error + (isNaN(elements[elements.length - 1]) && isNaN(elements[elements.length - 2]));
  error = error + (!isOperator(elements[0]));
  return error;
}

function calc(input) {
  input = String(input);
  const expression = preparation(input);
  const elements = expression.split(/\s+/g);
  const error = validation(elements);

  console.log('Выражение: ' + expression);

  if (!error) {
    let stack = [];
    let element;
    while (elements.length !== 0) {
      element = elements.pop();
      if (isOperator(element)) {
        result = execute(stack.pop(), stack.pop(), element);
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