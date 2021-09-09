import * as buefy from 'buefy'
import { BLoadingComponent } from 'buefy/types/components'

/**
 * Programmatic services by Buefy
 */
export default class BuefyService {
  private static loadingComponent: BLoadingComponent
  private static toastComponent = buefy.ToastProgrammatic
  private static readonly duration = 2500
  private static readonly position = 'is-bottom-right'
  private static readonly queue = false

  public static successToast(message: string) {
    this.toastComponent.open({
      duration: this.duration,
      message: message !== null ? message : 'Success',
      type: 'is-success ',
      position: this.position,
      queue: this.queue
    })
  }

  public static warningToast(message: string) {
    this.toastComponent.open({
      duration: this.duration,
      message: message !== null ? message : 'Warning',
      type: 'is-warning',
      position: this.position,
      queue: this.queue
    })
  }

  public static dangerToast(error: string) {
    this.toastComponent.open({
      duration: this.duration,
      message: error !== null ? error : 'Error',
      type: 'is-danger',
      position: this.position,
      queue: this.queue
    })
  }

  public static infoToast(message: string) {
    this.toastComponent.open({
      duration: this.duration,
      message: message !== null ? message : 'Warning',
      type: 'is-info',
      position: this.position,
      queue: this.queue
    })
  }

  public static startLoading() {
    this.loadingComponent = buefy.LoadingProgrammatic.open({
      container: null
    })
  }

  public static stopLoading() {
    this.loadingComponent.close()
  }
}
