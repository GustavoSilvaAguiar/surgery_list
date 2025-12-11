export default interface IFilter {
  medico?: string
  paciente?: string
  nomeMedicoPaciente?: string
  dataNascimento?: Date
  dataCriacaoInicio?: Date
  dataCriacaoFim?: Date
  page?: number
  limit?: number
  sortBy?: Array<{
    key: string
    order: 'asc' | 'desc'
  }>
}
