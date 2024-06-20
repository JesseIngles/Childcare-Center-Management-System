namespace webapi.DAL.Database.Entities
{
  public class TbDisciplina
  {
    public int Id { get; set; }
    public string Nome { get; set; } = null!;
    public virtual ICollection<TbTurma> Turmas { get; set; } = new List<TbTurma>();
  }
}