using Microsoft.EntityFrameworkCore;
using webapi.DAL.Database.Entities;
using webapi.DAL.IRepository;
using webapi.DTO.Inbound;
using webapi.DTO.Outbound;
using webapi.webapi.DAL.Database;

namespace webapi.DAL.CRepository
{
  public class CAlunoRepository : IAluno
  {
    private readonly CrecheDbContext _db;
    public CAlunoRepository(CrecheDbContext db)
    {
      _db = db;
    }

    public async Task<DTO_Resposta> ApagarAluno(int id)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbAluno? tbAluno = _db.TbAlunos.FirstOrDefault(b => b.Id == id);
        if (tbAluno != null)
        {
          _db.TbAlunos.Remove(tbAluno);
          await _db.SaveChangesAsync();
          resposta.mensagem = "Sucesso";
        }
        else
        {
          resposta.mensagem = "Não foi encontrado";
        }
      }
      catch (Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public async Task<DTO_Resposta> AtualizarAluno(int id, DTO_Aluno aluno)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbAluno AlunoExistente = _db.TbAlunos.FirstOrDefault(a => a.Id == id);
        if (AlunoExistente != null)
        {
          List<TbTurma> minhasTurmas = new List<TbTurma>();
          minhasTurmas.Add(
            _db.TbTurmas.FirstOrDefault(x => x.Id == aluno.TurmaId)
          );
          List<TbEncarregado> meusEncarregados = new List<TbEncarregado>();
          foreach (var encarregadoId in aluno.EncarregadosId)
          {
            meusEncarregados.Add(_db.TbEncarregados.FirstOrDefault(x => x.Id == encarregadoId));
          }
          AlunoExistente.Nome = aluno.Nome;
          AlunoExistente.DataNascimento = aluno.DataNascimento;
          AlunoExistente.NecessidadesEspeciais = aluno.NecessidadesEspeciais;
          AlunoExistente.BI = aluno.BI;
          AlunoExistente.Encarregados = meusEncarregados;
          AlunoExistente.Turmas = minhasTurmas;
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

    public async Task<DTO_Resposta> CadastrarAluno(DTO_Aluno aluno)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        bool AlunoExistente = _db.TbAlunos.Any(a => a.Nome == aluno.Nome);
        if (!AlunoExistente)
        {
          List<TbTurma> minhasTurmas = new List<TbTurma>();
          minhasTurmas.Add(
            _db.TbTurmas.FirstOrDefault(x => x.Id == aluno.TurmaId)
          );
          List<TbEncarregado> meusEncarregados = new List<TbEncarregado>();
          foreach (var encarregadoId in aluno.EncarregadosId)
          {
            meusEncarregados.Add(_db.TbEncarregados.FirstOrDefault(x => x.Id == encarregadoId));
          }

          var tbAluno = new TbAluno
          {
            Nome = aluno.Nome,
            BI = aluno.BI,
            DataNascimento = aluno.DataNascimento,
            NecessidadesEspeciais = aluno.NecessidadesEspeciais,
            Turmas = minhasTurmas,
            Encarregados = meusEncarregados
          };
          _db.TbAlunos.Add(tbAluno);
          await _db.SaveChangesAsync();
          resposta.mensagem = "Sucesso";
          return resposta;

        }
        resposta.mensagem = "Esse nome já foi usado";
      }
      catch (Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public async Task<DTO_Resposta> TodosAlunos()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        resposta.resposta = from b in _db.TbAlunos
                            select new
                            {
                              Id = b.Id,
                              Nome = b.Nome,
                              Identificacao = b.BI,
                              Data_de_Nascimento = b.DataNascimento,
                              Encarregados = b.Encarregados.Select(x => x.Nome),
                              NecessidadesEspeciais = b.NecessidadesEspeciais
                            };

        resposta.mensagem = "Sucesso";
      }
      catch (System.Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public async Task<DTO_Resposta> VerAluno(int id)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        bool tbAlunoExiste = _db.TbAlunos.Any(x => x.Id == id);
        if (tbAlunoExiste)
        {
          resposta.resposta = from a in _db.TbAlunos
                              where a.Id == id
                              select new
                              {
                                a.Nome,
                                a.DataNascimento,
                                a.Encarregados,
                                a.NecessidadesEspeciais,
                              };
          resposta.mensagem = "Sucesso";
          return resposta;
        }
        resposta.mensagem = "Não foi encontrado";
      }
      catch (System.Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }
  }
}