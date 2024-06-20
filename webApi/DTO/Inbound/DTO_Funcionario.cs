namespace webapi.DTO.Inbound
{
  public class DTO_Funcionario
  {
    public string Nome { get; set; }
    public string Nif { get; set; }
    public string Email { get; set; }
    public string Telefone { get; set; }
    public DateTime DataNascimento { get; set; }
    public string Senha { get; set; }
  }
}