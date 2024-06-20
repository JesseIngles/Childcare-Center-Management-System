namespace webapi.DAL.Database.Entities
{
  public class TbTurma
  {
    public int Id { get; set;}
    public string Nome {get;set;}
    public virtual ICollection<TbDisciplina> Disciplinas { get; set; } = new List<TbDisciplina>();
    public virtual ICollection<TbAtividade> Atividades { get; set; } = new List<TbAtividade>();
    public virtual ICollection<TbAluno> Alunos { get; set;} = new List<TbAluno>();
  }
}