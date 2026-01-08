import { ElectronAPI, ElectronWindow } from './types'

export const getElectronApi = (): ElectronAPI => (window as unknown as ElectronWindow).electronAPI
