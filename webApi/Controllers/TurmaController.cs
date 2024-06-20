using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using webapi.DAL.IRepository;
using webapi.DTO.Inbound;
using webapi.DTO.Outbound;

namespace webapi.Controllers
{
  [EnableCors("BackOffice")]
  [ApiController]
  [Route("[controller]/v1")]
  public class TurmaController : Controller
  {
    private readonly ITurma _turma;
    public TurmaController(ITurma Turma)
    {
      _turma = Turma;
    }
    [HttpPost("CadastrarTurma")]
    public async Task<DTO_Resposta> CadastrarTurma(DTO_Turma turma)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _turma.CadastrarTurma(turma);
      return resposta;
    }

    [HttpPut("AtualizarTurma")]
    public async Task<DTO_Resposta> AtualizarTurma(int id, DTO_Turma turma)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _turma.AtualizarTurma(id, turma);
      return resposta;
    }

    [HttpGet("TodasTurmas")]
    public DTO_Resposta TodasTurmas()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = _turma.TodasTurmas();
      return resposta;
    }

    
  }

}