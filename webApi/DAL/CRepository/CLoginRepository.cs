using webapi.DAL.Database.Entities;
using webapi.DAL.IRepository;
using webapi.DTO.Inbound;
using webapi.DTO.Outbound;
using webapi.Services;
using webapi.webapi.DAL.Database;

namespace webapi.DAL.CRepository
{
  public class CLoginRepository : ILogin
  {
    private readonly CrecheDbContext _db;
    private readonly Authentication _auth;
    public CLoginRepository(CrecheDbContext db, Authentication auth)
    {
      _db = db;
      _auth = auth;
    }

    public DTO_Resposta FazerLogin(DTO_Login credencias)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      try
      {
        TbEncarregado? tbEncarregado = _db.TbEncarregados.FirstOrDefault(x => x.Email == credencias.Email && x.Senha == credencias.Password);
        TbFuncionario? tbFuncionario = _db.TbFuncionarios.FirstOrDefault(x => x.Email == credencias.Email && x.Senha == credencias.Password);
        if(tbEncarregado!=null)
        {
          resposta.resposta = _auth.GenerateTokenEncarregado(tbEncarregado);
          resposta.mensagem = "Sucesso";
        }else if(tbFuncionario!=null)
        {
          resposta.resposta = _auth.GenerateTokenFuncionario(tbFuncionario);
          resposta.mensagem = "Sucesso";
        }else
        {
          resposta.mensagem = "Credencias inválidas";
        }
      }catch(Exception ex)
      {
        resposta.mensagem = ex.ToString();
      }
      return resposta;
    }
  }
}