using webapi.DAL.Database.Entities;
using webapi.DAL.IRepository;
using webapi.DTO.Inbound;
using webapi.DTO.Outbound;
using webapi.webapi.DAL.Database;

namespace webapi.DAL.CRepository
{
  public class CTurmaRepository : ITurma
  {
    private readonly CrecheDbContext _db;
    public CTurmaRepository(CrecheDbContext db)
    {
      _db = db;
    }

    public async Task<DTO_Resposta> AtualizarTurma(int id, DTO_Turma turma)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbTurma turmaExistente = _db.TbTurmas.FirstOrDefault(t => t.Id == id);
        if (turmaExistente != null)
        {
          turmaExistente.Nome = turma.Nome;
          await _db.SaveChangesAsync();
          resposta.mensagem = "Sucesso";
          return resposta;
        }
        resposta.mensagem = "Não foi encontrado";
      }
      catch (Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public async Task<DTO_Resposta> CadastrarTurma(DTO_Turma turma)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        bool turmaExistente = _db.TbTurmas.Any(t => t.Nome == turma.Nome);
        if (!turmaExistente)
        {
          TbTurma tbTurma = new TbTurma
          {
            Nome = turma.Nome,
          };
          _db.TbTurmas.Add(tbTurma);
          await _db.SaveChangesAsync();
          resposta.mensagem = "Sucesso";
          return resposta;
        }
        resposta.mensagem = "Estes dados já existem";
      }
      catch (Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public DTO_Resposta TodasTurmas()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        resposta.resposta = from b in _db.TbTurmas
                            select new 
                            {
                              Id = b.Id,
                              Nome = b.Nome,
                              QuantidadeAlunos = b.Alunos.Count,
                              QuantidadeDisciplina = b.Disciplinas.Count,
                              QuantidadeAtividades = b.Atividades.Count
                            };
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

