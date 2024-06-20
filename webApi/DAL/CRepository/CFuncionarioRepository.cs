using webapi.DAL.Database.Entities;
using webapi.DAL.IRepository;
using webapi.DTO.Inbound;
using webapi.DTO.Outbound;
using webapi.Services;
using webapi.webapi.DAL.Database;

namespace webapi.DAL.CRepository
{
  public class CFuncionarioRepository : IFuncionario
  {
    private readonly CrecheDbContext _db;
    private readonly Authentication _auth;
    public CFuncionarioRepository(CrecheDbContext db, Authentication auth)
    {
      _db = db;
      _auth = auth;
    }

    public DTO_Resposta ApagarFuncionario(int id)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbFuncionario? tbFuncionario = _db.TbFuncionarios.FirstOrDefault(b => b.Id == id);
        if (tbFuncionario != null)
        {
          _db.TbFuncionarios.Remove(tbFuncionario);
          _db.SaveChanges();
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

    public async Task<DTO_Resposta> CadastrarFuncionario(DTO_Funcionario funcionario)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        bool funcionarioExistente = _db.TbFuncionarios.Any(x => x.Email == funcionario.Email);
        if (!funcionarioExistente)
        {
          var tbFuncionario = new TbFuncionario
          {
            Nif = funcionario.Nif,
            DataCadastro = DateTime.Now,
            DataNascimento = funcionario.DataNascimento,
            Email = funcionario.Email,
            Senha = funcionario.Senha,
            Nome = funcionario.Nome,
            Admin = _db.TbFuncionarios.ToList().Count == 0 ? true : false,
            Telefone = funcionario.Telefone
          };
          _db.TbFuncionarios.Add(tbFuncionario);
          await _db.SaveChangesAsync();
          resposta.mensagem = "Sucesso";
          return resposta;
        }
        resposta.mensagem = "Este email já foi usado";
      }
      catch (Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }

    public DTO_Resposta LogarFuncionario(DTO_Login credenciais)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbFuncionario tbFuncionario = _db.TbFuncionarios.FirstOrDefault(x => x.Email == credenciais.Email && x.Senha == credenciais.Password);
        if (tbFuncionario != null)
        {
          resposta.resposta = _auth.GenerateTokenFuncionario(tbFuncionario);
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

    public DTO_Resposta TodosFuncionarios()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        resposta.resposta = from b in _db.TbFuncionarios
                            select new
                            {
                              b.Id,
                              b.Nome,
                              b.Nif,
                              b.DataNascimento,
                              b.Email
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
