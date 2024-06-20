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
  public class LoginController : Controller
  {
    private readonly ILogin _login;
    public LoginController(ILogin login)
    {
      _login = login;
    }

    [HttpPost("FazerLogin")]
    public DTO_Resposta FazerLogin(DTO_Login Credencias)
    {
      DTO_Resposta resposta = _login.FazerLogin(Credencias);
      return resposta;
    }
  }
}