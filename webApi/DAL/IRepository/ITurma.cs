using webapi.DTO.Inbound;
using webapi.DTO.Outbound;

namespace webapi.DAL.IRepository
{
  public interface ITurma
  {
    Task<DTO_Resposta> AtualizarTurma(int id, DTO_Turma turma);
    Task<DTO_Resposta> CadastrarTurma(DTO_Turma turma);
    DTO_Resposta TodasTurmas();
  }
}