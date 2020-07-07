import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store'
import { environment } from '../../../environments/environment'

import * as fromUsuarioLogado from './usuario.reducer'

export interface State {
  usuarioLogado: object
}

export const reducers: ActionReducerMap<State> = {
  usuarioLogado: fromUsuarioLogado.reducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []

export const getUsuarioLogadoState = (state: State) => state.usuarioLogado
export const getUsuarioLogado = createSelector(getUsuarioLogadoState, fromUsuarioLogado.getUsuarioLogado)
