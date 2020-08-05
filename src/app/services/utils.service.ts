import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private toastCtrl: ToastController,
    private loaderCtrl: LoadingController,
  ) { }
 
  public async mostrarToast(message, position?: 'top' | 'bottom') {
    const toast = await this.toastCtrl.create({ 
      message, 
      duration: 3000, 
      position: position || 'bottom' 
    })

    return toast.present()
  }

  public async mostrarLoader(message) {
    const loaderCtrl = await this.loaderCtrl.create({ message })

    return loaderCtrl
  }

  public validateEmail(email) {
      const re = /\S+@\S+\.\S+/
      return re.test(email)
  }
}
