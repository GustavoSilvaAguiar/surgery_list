import { ref } from 'vue'
import apiCore from '../api'
import type IFilter from '@/interfaces/filterInterface'
import type ISurgeryListItem from '@/interfaces/surgeryListItemInterface'

class SurgeryService {
  protected baseUrl = ref<string>('')
  constructor() {
    this.baseUrl.value = '/data'
  }

  public getSurgeryList = async (filters: IFilter = {} as IFilter) => {
    try {
      const response = await apiCore.get<ISurgeryListItem[]>(this.baseUrl.value, {
        params: {
          ...(filters.nomeMedicoPaciente && { q: filters.nomeMedicoPaciente }),
          ...(filters.medico && { 'medico.nome_like': filters.medico }),
          ...(filters.paciente && { 'paciente.nome_like': filters.paciente }),
          ...(filters.dataNascimento && { 'paciente.dataNascimento': filters.dataNascimento }),

          ...(filters.dataCriacaoInicio && { dataCriacao_gte: filters.dataCriacaoInicio }),
          ...(filters.dataCriacaoFim && { dataCriacao_lte: filters.dataCriacaoFim }),

          _page: filters.page,
          _limit: filters.limit,
        },
      })

      return {
        items: response.data,
        total: Number(response.headers['x-total-count']) || 0
      }
    } catch (error) {
      throw error
    }
  }
}

export default new SurgeryService()
