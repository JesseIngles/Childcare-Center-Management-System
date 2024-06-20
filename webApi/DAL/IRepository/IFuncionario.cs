using webapi.DTO.Inbound;
using webapi.DTO.Outbound;

namespace webapi.DAL.IRepository
{
    public interface IFuncionario
    {
        DTO_Resposta ApagarFuncionario(int id);
        Task<DTO_Resposta> CadastrarFuncionario(DTO_Funcionario funcionario);
      DTO_Resposta LogarFuncionario(DTO_Login credenciais);
        DTO_Resposta TodosFuncionarios();
    }
}