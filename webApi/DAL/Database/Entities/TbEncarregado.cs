namespace webapi.DAL.Database.Entities
{
  public class TbEncarregado
  {
    public int Id { get; set;}
    public string Nif {get; set;}
    public string Nome {get;set;}
    public string Endereco {get;set;}
    public string Email {get;set;}
    public DateTime DataCadastro {get;set;}
    public string Senha {get;set;}
    public virtual ICollection<TbAluno> Educandos { get; set; } = new List<TbAluno>();
  }
}