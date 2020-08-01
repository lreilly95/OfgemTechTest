using System.Threading.Tasks;

namespace Calculator.API.Data
{
    public interface IRequestRepository
    {
        void Add<T>(T entity) where T: class;
        Task<bool> SaveAll();
    }
}