export default interface IFilter {
  medico?: string
  paciente?: string
  nomeMedicoPaciente?: string
  dataNascimento?: Date
  dataCriacaoInicio?: Date
  dataCriacaoFim?: Date
  page?: number
  limit?: number
}
