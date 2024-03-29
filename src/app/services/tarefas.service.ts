import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { ActionSheetController, AlertController } from '@ionic/angular'
import { UsuarioService } from './usuario.service'
import { UtilsService } from './utils.service'
import * as moment from 'moment'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TarefasService {
  private tarefa: any
  private usuario: any

  constructor(
    private apiCtrl: ApiService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private usuarioCtrl: UsuarioService,
    private utilsCtrl: UtilsService
  ) {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(item => {
      this.usuario = item
    })
  }

  public async getResumoCampanhas(options?: { capitulo }) {
    try {
      const campanhas = await this.apiCtrl.get(`campanhas?capitulo=${options.capitulo}`)

      return campanhas
    } catch ({ error }) {
      throw error
    }
  }

  public async getTarefas(options?: { nomeTarefa; idCapitulo }) {
    try {
      const tarefas = await this.apiCtrl.get(`campanhas/${options.nomeTarefa}?capitulo=${options.idCapitulo}`)

      return tarefas
    } catch ({ error }) {
      throw error
    }
  }

  public async actionSheetStatusTarefa(options: { tarefa; cargo? }) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer?',
      buttons: [
        {
          text: 'Mudar status da atividade',
          handler: async () => {
            this.tarefa = options.tarefa

            if (!this.podeAlterarAtividadeComoAdmin(this.usuario.role) && this.tarefa.statusCapitulo > 3) {
              return await this.utilsCtrl.mostrarToast('Você não pode mudar o status de atividades recusadas ou aprovadas')
            }

            const cargosPermitidosParaEditar: any[] = this.tarefa.cargo_tarefa

            if (cargosPermitidosParaEditar === options.cargo || this.podeAlterarAtividadeComoAdmin(this.usuario.role)) {
              const alertMudarStatus = await this.alertMudarStatus({
                tarefa: this.tarefa,
              })

              await alertMudarStatus.present()

              const { data } = await alertMudarStatus.onDidDismiss()

              if (data) {
                options.tarefa.status = data.value

                await this.mudarStatus(options)

                await actionSheet.dismiss({
                  statusSlug: data.value,
                  statusNome: data.label,
                  statusCapitulo: data.statusCapitulo,
                })
              }
            } else {
              return await this.utilsCtrl.mostrarToast('Você não tem permissão de alterar o status desta atividade!')
            }
          },
        },
        {
          text: 'Pedir ajuda sobre atividade',
          handler: () => {
            window.open('https://api.whatsapp.com/send?phone=' + environment.phone)
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    })
    return actionSheet
  }

  private podeAlterarAtividadeComoAdmin(role: string) {
    return ['admin', 'regional'].includes(role)
  }

  public async alertMudarStatus(options: { tarefa: any }) {
    const disabled = !this.podeAlterarAtividadeComoAdmin(this.usuario.role)

    const alertMudarStatus = await this.alertCtrl.create({
      header: 'Mudar status da atividade',
      subHeader: 'O campo marcado, mostra o status da atividade atualmente',
      message: 'Somente admins poderão mudar o status da atividade para devolvida, recusada ou aprovada',
      inputs: [
        {
          type: 'radio',
          label: 'Atividade não formulada',
          value: 'atividade-nao-formulada',
          checked: this.tarefa.statusCapitulo === 0,
          async handler(data) {
            return await alertMudarStatus.dismiss({
              ...data,
              statusCapitulo: 0,
            })
          },
        },
        {
          type: 'radio',
          label: 'Atividade realizada',
          value: 'atividade-realizada',
          checked: this.tarefa.statusCapitulo === 1,
          async handler(data) {
            return await alertMudarStatus.dismiss({
              ...data,
              statusCapitulo: 1,
            })
          },
        },
        {
          type: 'radio',
          label: 'Atividade enviada',
          value: 'atividade-enviada',
          checked: this.tarefa.statusCapitulo === 2,
          async handler(data) {
            return await alertMudarStatus.dismiss({
              ...data,
              statusCapitulo: 2,
            })
          },
        },
        {
          type: 'radio',
          label: 'Atividade devolvida',
          value: 'atividade-devolvida',
          checked: this.tarefa.statusCapitulo === 3,
          disabled,
          async handler(data) {
            return await alertMudarStatus.dismiss({
              ...data,
              statusCapitulo: 3,
            })
          },
        },
        {
          type: 'radio',
          label: 'Atividade recusada',
          value: 'atividade-recusada',
          checked: this.tarefa.statusCapitulo === 4,
          disabled,
          async handler(data) {
            return await alertMudarStatus.dismiss({
              ...data,
              statusCapitulo: 4,
            })
          },
        },
        {
          type: 'radio',
          label: 'Atividade aprovada',
          value: 'atividade-aprovada',
          checked: this.tarefa.statusCapitulo === 5,
          disabled,
          async handler(data) {
            return await alertMudarStatus.dismiss({
              ...data,
              statusCapitulo: 5,
            })
          },
        },
      ],
    })

    return alertMudarStatus
  }

  public async mudarStatus(options: { tarefa }) {
    try {
      if (!options.tarefa.id) {
        await this.enviarTarefa({
          slugCampanha: options.tarefa.slug,
          tipoCampanha: options.tarefa.tipo,
          status: options.tarefa.status,
          idCapitulo: options.tarefa.idCapitulo,
          cargo: options.tarefa.cargo_tarefa,
        })

        await this.utilsCtrl.mostrarToast('Atividade enviada com sucesso')
      } else {
        await this.apiCtrl.post(`tarefas/editar`, {
          idTarefa: options.tarefa.id,
          status: options.tarefa.status,
        })

        await this.utilsCtrl.mostrarToast('Atividade atualizada com sucesso')
      }

      return options.tarefa.status
    } catch (error) {
      const [mensagem, dica]: any[] = error && error.mensagem
      if (mensagem) {
        await this.utilsCtrl.mostrarAlert(mensagem, dica)
      } else {
        await this.utilsCtrl.mostrarAlert('Houve um erro ao mudar status da atividade', 'Tente novamente mais tarde')
      }

      throw error
    }
  }

  public async enviarTarefa(options: { slugCampanha; tipoCampanha; status?; idCapitulo; cargo }) {
    try {
      const criaTarefa = await this.apiCtrl.post('tarefas', options)

      return criaTarefa
    } catch ({ error }) {
      throw error
    }
  }

  public async getCampanhasAdmin(options: { offset; termoBusca }) {
    try {
      const url = `admin/campanhas?offset=${options.offset}&termoBusca${options.termoBusca}`
      const campanhas = await this.apiCtrl.get(url)

      for (const key in campanhas) {
        campanhas[key].isAdmin = true
      }

      return campanhas
    } catch ({ error }) {
      throw error
    }
  }

  public async editarCriarTarefa(options: { nome; tipo; cargo_tarefa; data_entrega; data_final_semestre; status }) {
    try {
      options.data_entrega = moment(options.data_entrega).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      options.data_final_semestre = moment(options.data_final_semestre).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      const editarCriarTarefa = await this.apiCtrl.post('admin/campanhas', options)

      return editarCriarTarefa
    } catch ({ error }) {
      throw error
    }
  }

  async getCampanhasTipo() {
    try {
      const url = `campanhas/tipos`
      const tiposCampanha = await this.apiCtrl.get(url)

      return tiposCampanha
    } catch ({ error }) {
      throw error
    }
  }
}
