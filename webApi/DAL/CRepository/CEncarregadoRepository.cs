using Microsoft.EntityFrameworkCore;
using webapi.DAL.Database.Entities;
using webapi.DAL.IRepository;
using webapi.DTO.Inbound;
using webapi.DTO.Outbound;
using webapi.Services;
using webapi.webapi.DAL.Database;


namespace webapi.DAL.CRepository
{
  public class CEncarregadoRepository : IEncarregado
  {
    private readonly CrecheDbContext _db;
    private readonly Authentication _auth;
    public CEncarregadoRepository(CrecheDbContext db, Authentication auth)
    {
      _db = db;
      _auth = auth;
    }

    public async Task<DTO_Resposta> AtualizarEncarregado(int id, DTO_Encarregado encarregado)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbEncarregado encarregadoExistente = _db.TbEncarregados.FirstOrDefault(a => a.Id == id);
        if (encarregadoExistente != null)
        {
          encarregadoExistente.Nome = encarregado.Nome;
          encarregadoExistente.DataCadastro = encarregado.DataCadastro;
          encarregadoExistente.Email = encarregado.Email;
          encarregadoExistente.Senha = encarregado.Senha;
          encarregadoExistente.Endereco = encarregado.Endereco;
          await _db.SaveChangesAsync();
          resposta.mensagem = "Sucesso";
          return resposta;
        }
        resposta.mensagem = "ENão foi encontrado";
      }
      catch (Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public async Task<DTO_Resposta> CadastrarEncarregado(DTO_Encarregado encarregado)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        bool encarregadoExistente = _db.TbEncarregados.Any(a => a.Nome == encarregado.Nome);
        if (!encarregadoExistente)
        {

          var tbEncarregado = new TbEncarregado
          {
            Nome = encarregado.Nome,
            DataCadastro = encarregado.DataCadastro,
            Email = encarregado.Email,
            Senha = encarregado.Senha,
            Endereco = encarregado.Endereco,
            Nif = encarregado.Nif
          };
          _db.TbEncarregados.Add(tbEncarregado);
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

    public DTO_Resposta LogarEncarregado(DTO_Login credenciais)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbEncarregado tbEncarregado = _db.TbEncarregados.FirstOrDefault(x => x.Email == credenciais.Email && x.Senha == credenciais.Password);
        if (tbEncarregado != null)
        {
          resposta.resposta = _auth.GenerateTokenEncarregado(tbEncarregado);
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

    public async Task<DTO_Resposta> TodosEncarregados()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        resposta.resposta = from b in _db.TbEncarregados
                            select new 
                            {
                              Id = b.Id,
                              Nome = b.Nome,
                              Identificacao = b.Nif,
                              Endereco = b.Endereco,
                              Educandos = b.Educandos.Count
                            };
        resposta.mensagem = "Sucesso";
      }
      catch (System.Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public DTO_Resposta VerEncarregado(int id)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        bool tbEncarregadoExistente =  _db.TbAlunos.Any(x => x.Id == id);
        if(tbEncarregadoExistente)
        {
          resposta.resposta = from a in _db.TbEncarregados
                              where a.Id == id
                              select new 
                              {
                                a.Nome,
                                a.Email,
                                a.Endereco,
                                
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

