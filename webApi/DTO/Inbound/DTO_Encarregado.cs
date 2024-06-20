namespace webapi.DTO.Inbound
{
  public class DTO_Encarregado
  {
    public int Id { get; set;}
    public string Nome {get;set;}
    public string Nif { get; set; }
    public string Endereco {get;set;}
    public string Telefone {get;set;}
    public string Email {get;set;}
    public DateTime DataCadastro {get;set;}
    public string Senha {get;set;}
  }
}