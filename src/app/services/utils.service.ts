import { Injectable } from '@angular/core'
import { LoadingController, ToastController, AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private toastCtrl: ToastController, private loaderCtrl: LoadingController, private alertCtrl: AlertController) {}

  public async mostrarToast(message, position?: 'top' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: position || 'top',
    })

    return await toast.present()
  }

  public async mostrarLoader(message) {
    const loaderCtrl = await this.loaderCtrl.create({ message })

    return loaderCtrl
  }

  public async mostrarAlert(header, subHeader) {
    const alert = await this.alertCtrl.create({
      header,
      subHeader,
      buttons: ['Ok'],
    })

    return await alert.present()
  }

  public validateEmail(email) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  debounce(func, timeout = 500) {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func(args)
      }, timeout)
    }
  }
}
