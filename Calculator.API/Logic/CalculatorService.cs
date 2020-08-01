using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Calculator.API.Logic
{

    /*
        KNOWN ISSUES

        System.FormatException: Input string was not in a correct format: - line 60. Occurs when calculation begins with left parenthesis.



    */
    public class CalculatorService : ICalculatorService
    {
        public async Task<string> evaluatePostfix(string infix)
        {
            Stack<string> postfix = infixToPostfix(infix);
            Stack<float> answerStack = new Stack<float>();
            string[] operators = {"+", "-", "*", "÷"};
            string token;

            while(postfix.Count != 0)
            {             
                token = postfix.Pop();

                if(operators.Contains(token)) // If current token is an operator
                {
                    // Pop 2 tokens from stack, these are the operands.
                    float a = answerStack.Pop(); 
                    float b = answerStack.Pop();
                    // Perform pertinent operation, and push answer to stack.
                    switch (token)
                    {
                        case "+":
                        answerStack.Push(b + a);
                        break;

                        case "-":
                        answerStack.Push(b - a);
                        break;

                        case "÷":
                        answerStack.Push(b / a);
                        break;

                        case "*":
                        answerStack.Push(b * a);
                        break;

                        default:
                        break;
                    }
                }
                else // If token is not an operator, push to stack.
                {
                    answerStack.Push(float.Parse(token));
                } 
            }

            return await Task.FromResult(Math.Round(answerStack.Pop(),3).ToString());
        }

        private Stack<string> infixToPostfix(string infix)
        {
            string[] tokens = Regex.Split(infix, "(?<=[^\\.a-zA-Z\\d])|(?=[^\\.a-zA-Z\\d])"); //Splits infix when preceded or followed by a non-alphanumeric character.
            Stack<string> output = new Stack<string>();
            Stack<string> ops = new Stack<string>();
            string[] operators = {"+", "-", "*", "÷"};
            Dictionary<string,int> priority = new Dictionary<string, int>(); //Contains operator priorities
            priority.Add("+", 2);
            priority.Add("-", 2);
            priority.Add("*", 3);
            priority.Add("÷", 3);

            foreach (string token in tokens)
            {
                if (!operators.Contains(token) && token != "(" && token != ")") //If token is a number, push to output stack
                    output.Push(token);
                else if (operators.Contains(token)) //Else if token is an operator
                    {
                        if(ops.Count != 0){
                            //While there is an operator at top of operator stack with greater or equal priority than token, and not left parenthesis.
                            while ((operators.Contains(ops.Peek()) && priority[ops.Peek()] >= priority[token])) //&& ops.Peek() != "(")  
                            {
                                output.Push(ops.Pop()); //Pop operator stack, and push to output stack.
                                if (ops.Count == 0) //If operator stack is empty, break from while.
                                    break;
                            }
                        }
                        ops.Push(token); //Push token to operator stack
                    }
                else if (token == "(") //If token is left parenthesis, push to operator stack
                    ops.Push(token);
                else if (token == ")") //If token is right parentheis
                {
                    while(ops.Peek() != "(") //While token at top of operator stack is not left parenthesis
                    {
                        output.Push(ops.Pop()); //Pop operator stack, and push to output stack.
                    }
                    if(ops.Peek() == "(") //If top of operator stack is left parenthesis, pop and discard.
                        ops.Pop();
                }
            }

            while(ops.Count != 0)
            {
                output.Push(ops.Pop());
            }

            Stack<string> correctOrder = new Stack<string>();

            while(output.Count != 0)
            {
                correctOrder.Push(output.Pop());
            }

            return correctOrder;
        }

    }
}