using webapi.DTO.Inbound;
using webapi.DTO.Outbound;

namespace webapi.DAL.IRepository
{
    public interface ILogin
    {
      DTO_Resposta FazerLogin(DTO_Login credencias);
    }
}