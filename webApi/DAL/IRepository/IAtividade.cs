using webapi.DTO.Inbound;
using webapi.DTO.Outbound;

namespace webapi.DAL.IRepository
{
    public interface IAtividade
    {
        Task<DTO_Resposta> CriarAtividade(DTO_Atividade atividade);
        Task<DTO_Resposta> AtualizarAtividade(int id, DTO_Atividade atividade);
        DTO_Resposta Atividades(int turmaId);
        DTO_Resposta TodasAtividades();
    }
}