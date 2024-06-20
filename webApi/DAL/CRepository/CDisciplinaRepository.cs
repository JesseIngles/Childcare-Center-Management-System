using webapi.DAL.Database.Entities;
using webapi.DAL.IRepository;
using webapi.DTO.Inbound;
using webapi.DTO.Outbound;
using webapi.webapi.DAL.Database;

namespace webapi.DAL.CRepository
{
  public class CDisciplinaRepository : IDisciplina
  {
    private readonly CrecheDbContext _db;
    public CDisciplinaRepository(CrecheDbContext db)
    {
      _db = db;
    }

    public async Task<DTO_Resposta> CriarDisciplina(DTO_Disciplina disciplina)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        bool disciplinaExistente = _db.TbDisciplinas.Any(x => x.Nome == disciplina.Nome);
        if (disciplinaExistente)
        {
          resposta.mensagem = "Este título já foi usado";
        }
        TbDisciplina tbDisciplina = new TbDisciplina
        {
          Nome = disciplina.Nome
        };
        _db.TbDisciplinas.Add(tbDisciplina);
        await _db.SaveChangesAsync();
        resposta.mensagem = "Sucesso";
      }
      catch (Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }
  }
}