using Microsoft.AspNetCore.Mvc;

namespace webapi.DTO.Outbound
{
  public class DTO_Resposta 
  {
    public string mensagem  {get;set;}
    public object? resposta {get;set;}
  }
}