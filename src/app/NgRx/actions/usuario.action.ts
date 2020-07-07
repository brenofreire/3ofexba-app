import { Action } from '@ngrx/store'

export enum ActionTypes {
  UsuarioLogado = 'Altera o estado do usuário logado',
}

export class UsuarioLogado implements Action {
  readonly type = ActionTypes.UsuarioLogado

  constructor(public payload: any) {}
}

export type ActionsUnion = UsuarioLogado
