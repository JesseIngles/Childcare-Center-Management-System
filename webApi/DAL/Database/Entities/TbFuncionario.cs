namespace webapi.DAL.Database.Entities
{
  public class TbFuncionario
  {
    public int Id { get; set; }
    public string Nome {get;set;}
    public string Nif {get;set;}
    public string Email {get;set;}
    public string Telefone {get;set;}
    public DateTime DataNascimento {get;set;}
    public DateTime DataCadastro {get;set;}
    public string Senha {get;set;}
    public bool Admin {get;set;} = false;
  }
}
