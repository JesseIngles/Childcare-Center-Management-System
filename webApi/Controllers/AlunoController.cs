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
  public class AlunoController : Controller
  {
    private readonly IAluno _aluno;
    public AlunoController(IAluno aluno)
    {
      _aluno = aluno;
    } 
    [HttpPost("CadastrarAluno")]
    public async Task<DTO_Resposta> CadastrarAluno(DTO_Aluno aluno)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _aluno.CadastrarAluno(aluno);
      return resposta;
    }

    [HttpPut("AtualizarAluno")]
    public async Task<DTO_Resposta> AtualizarAluno([FromQuery] int id, DTO_Aluno aluno)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _aluno.AtualizarAluno(id, aluno);
      return resposta;
    }
    
    [HttpGet("VerAluno")]
    public async Task<DTO_Resposta> VerAluno(int id)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _aluno.VerAluno(id);
      return resposta;
    }
    [HttpGet("TodosAlunos")]
    public async Task<DTO_Resposta> TodosAlunos()
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _aluno.TodosAlunos();
      return resposta;
    }

    [HttpDelete("ApagarAluno")]
    public async Task<DTO_Resposta> ApagarAluno(int id)
    {
      DTO_Resposta resposta = new DTO_Resposta();
      resposta = await _aluno.ApagarAluno(id);
      return resposta;
    }
  }

}