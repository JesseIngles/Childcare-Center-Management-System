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
  public class FuncionarioController : Controller
  {
    private readonly IFuncionario _funcionario;
    public FuncionarioController(IFuncionario funcionario)
    {
      _funcionario = funcionario;
    }


    [HttpPost("CadastrarFuncionario")]
    public async Task<DTO_Resposta> CadastrarFuncionario(DTO_Funcionario funcionario)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _funcionario.CadastrarFuncionario(funcionario);
      return resposta;
    }
    [HttpPost("LogarFuncionario")]
    public DTO_Resposta LogarFuncionario(DTO_Login credenciais)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = _funcionario.LogarFuncionario(credenciais);
      return resposta;
    }

    [HttpGet("TodosFuncionarios")]
    public DTO_Resposta TodosFuncionarios()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = _funcionario.TodosFuncionarios();
      return resposta;
    }

    [HttpDelete("ApagarFuncionario")]
    public DTO_Resposta ApagarFuncionario(int id)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = _funcionario.ApagarFuncionario(id);
      return resposta;
    }
  }
}
