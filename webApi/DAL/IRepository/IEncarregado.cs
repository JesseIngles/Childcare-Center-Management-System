using webapi.DTO.Inbound;
using webapi.DTO.Outbound;

namespace webapi.DAL.IRepository
{
  public interface IEncarregado
  {
    Task<DTO_Resposta> CadastrarEncarregado(DTO_Encarregado encarregado);
    Task<DTO_Resposta> AtualizarEncarregado(int id, DTO_Encarregado encarregado);
    DTO_Resposta LogarEncarregado(DTO_Login credenciais);
    DTO_Resposta VerEncarregado(int id);
    Task<DTO_Resposta> TodosEncarregados();
  }
}