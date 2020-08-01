using System.Collections.Generic;
using System.Threading.Tasks;

namespace Calculator.API.Logic
{
    public interface ICalculatorService
    {
         Task<string> evaluatePostfix(string infix);
    }
}