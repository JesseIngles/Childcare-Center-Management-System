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
  public class AtividadeController : Controller
  {
    private readonly IAtividade _atividade;
    public AtividadeController(IAtividade ativdade)
    {
      _atividade = ativdade;
    } 
    [HttpPost("CriarAtividade")]
    public async Task<DTO_Resposta> CriarAtividade(DTO_Atividade atividade)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _atividade.CriarAtividade(atividade);
      return resposta;
    }

    [HttpGet("TurmaAtividades")]
    public DTO_Resposta TurmaAtividades(int turmaId)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta =  _atividade.Atividades(turmaId);
      return resposta;
    }
    [HttpGet("Atividades")]
    public DTO_Resposta Atividades()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta =  _atividade.TodasAtividades();
      return resposta;
    }
  }
}