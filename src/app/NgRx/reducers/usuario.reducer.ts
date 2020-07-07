import * as fromUsuarioLogado from '../actions/usuario.action'

export const initialState = null

export function reducer(state = initialState, action: fromUsuarioLogado.ActionsUnion) {
  switch (action.type) {
    case fromUsuarioLogado.ActionTypes.UsuarioLogado: {
      return action.payload
    }
    default:
      return state
  }
}

export const getUsuarioLogado = (state: any) => state
