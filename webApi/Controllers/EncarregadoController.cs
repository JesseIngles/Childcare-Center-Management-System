using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using webapi.DAL.Database.Entities;
using webapi.DAL.IRepository;
using webapi.DTO.Inbound;
using webapi.DTO.Outbound;

namespace webapi.Controllers
{
  [EnableCors("BackOffice")]
  [ApiController]
  [Route("[controller]/v1")]
  public class EncarregadoController : Controller
  {
    private readonly IEncarregado _encarregado;
    public EncarregadoController(IEncarregado encarregado)
    {
      _encarregado = encarregado;
    }
    [HttpPost("CadastrarEncarregado")]
    public async Task<DTO_Resposta> CadastrarEncarregado(DTO_Encarregado encarregado)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _encarregado.CadastrarEncarregado(encarregado);
      return resposta;
    }

    [HttpPut("AtualizarEncarregado")]
    public async Task<DTO_Resposta> AtualizarEncarregado(int id, DTO_Encarregado encarregado)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _encarregado.AtualizarEncarregado(id, encarregado);
      return resposta;
    }
    [HttpPost("LogarFuncionario")]
    public DTO_Resposta LogarEncarregado(DTO_Login credenciais)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = _encarregado.LogarEncarregado(credenciais);
      return resposta;
    }

    [HttpGet("VerEncarregado")]
    public DTO_Resposta VerEncarregado(int id)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = _encarregado.VerEncarregado(id);
      return resposta;
    }
    [HttpGet("TodosEncarregados")]
    public async Task<DTO_Resposta> TodosEncarregados()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _encarregado.TodosEncarregados();
      return resposta;
    }
  }

}