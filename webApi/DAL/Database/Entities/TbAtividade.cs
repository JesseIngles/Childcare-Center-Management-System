namespace webapi.DAL.Database.Entities
{
  public class TbAtividade 
  {
    public int Id { get; set;}
    public string Titulo {get;set;}
    public string Descricao { get; set; }
    public TbTurma Turma {get;set;}
  }
}