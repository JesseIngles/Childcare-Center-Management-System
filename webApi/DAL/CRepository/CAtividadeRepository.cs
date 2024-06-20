using webapi.DAL.Database.Entities;
using webapi.DAL.IRepository;
using webapi.DTO.Inbound;
using webapi.DTO.Outbound;
using webapi.webapi.DAL.Database;


namespace webapi.DAL.CRepository
{
  public class CAtividadeRespository : IAtividade
  {
    private readonly CrecheDbContext _db;
    public CAtividadeRespository(CrecheDbContext db)
    {
      _db = db;
    }

    public DTO_Resposta Atividades(int turmaId)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbTurma? turmaExistente = _db.TbTurmas.FirstOrDefault(x => x.Id == turmaId);
        if (turmaExistente != null)
        {
          resposta.mensagem = "Sucesso";
          resposta.resposta = from b in _db.TbAtividades
                              where b.Turma.Id == turmaId
                              select new
                              {
                                b.Id,
                                b.Titulo,
                                b.Descricao
                              };
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

    public async Task<DTO_Resposta> AtualizarAtividade(int id, DTO_Atividade atividade)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbAtividade? tbAtividadeExistente = _db.TbAtividades.FirstOrDefault(x => x.Id == id);
        if (tbAtividadeExistente != null)
        {
          tbAtividadeExistente.Titulo = atividade.Titulo;
          tbAtividadeExistente.Descricao = atividade.Descricao;
          tbAtividadeExistente.Turma = _db.TbTurmas.FirstOrDefault(x => x.Id == atividade.TurmaId);
          resposta.mensagem = "Sucesso";
          await _db.SaveChangesAsync();
        }
        resposta.mensagem = "Dados não encontrados";
      }
      catch (Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public async Task<DTO_Resposta> CriarAtividade(DTO_Atividade atividade)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        bool atividadeExistente = _db.TbAtividades.Any(x => x.Titulo == atividade.Titulo);
        if (atividadeExistente)
        {
          resposta.mensagem = "Este título já foi usado";
        }
        TbAtividade tbAtividade = new TbAtividade
        {
          Titulo = atividade.Titulo,
          Descricao = atividade.Descricao,
          Turma = _db.TbTurmas.FirstOrDefault(x => x.Id == atividade.TurmaId)
        };
        _db.TbAtividades.Add(tbAtividade);
        await _db.SaveChangesAsync();
        resposta.mensagem = "Sucesso";
      }
      catch (Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public DTO_Resposta TodasAtividades()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        resposta.resposta = from b in _db.TbAtividades
                            select new 
                            {
                              b.Id,
                              b.Titulo,
                              b.Descricao,
                              b.Turma.Nome,
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