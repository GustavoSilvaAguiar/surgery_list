export default interface ISurgeryListItem {
  id: number
  medico: {
    nome: string
  }
  paciente: {
    nome: string
    dataNascimento: Date
  }
  dataCriacao: Date
}
