using webapi.DTO.Inbound;
using webapi.DTO.Outbound;

namespace webapi.DAL.IRepository
{
  public interface IAluno
  {
    Task<DTO_Resposta> CadastrarAluno(DTO_Aluno aluno);
    Task<DTO_Resposta> AtualizarAluno(int id, DTO_Aluno aluno);
    Task<DTO_Resposta> TodosAlunos();
    Task<DTO_Resposta> VerAluno(int id);
        Task<DTO_Resposta> ApagarAluno(int id);
    }
}