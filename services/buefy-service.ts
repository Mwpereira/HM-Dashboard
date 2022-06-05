import * as buefy from 'buefy';
import { BLoadingComponent } from 'buefy/types/components';

/**
 * Programmatic services by Buefy
 */
export default class BuefyService {
  private static loadingComponent: BLoadingComponent
  private static toastComponent = buefy.ToastProgrammatic
  private static readonly duration = 3000
  private static readonly position = 'is-bottom-right'
  private static readonly queue = true

  public static successToast(message: string) {
  	this.toastComponent.open({
  		duration: this.duration,
  		message: message !== null ? message : 'Success',
  		position: this.position,
  		queue: this.queue,
  		type: 'is-success ',
  	});
  }

  public static warningToast(message: string) {
  	this.toastComponent.open({
  		duration: this.duration,
  		message: message !== null ? message : 'Warning',
  		position: this.position,
  		queue: this.queue,
  		type: 'is-warning',
  	});
  }

  public static dangerToast(error: string) {
  	this.toastComponent.open({
  		duration: this.duration,
  		message: error !== null ? error : 'Error',
  		position: this.position,
  		queue: this.queue,
  		type: 'is-danger',
  	});
  }

  public static infoToast(message: string) {
  	this.toastComponent.open({
  		duration: this.duration,
  		message: message !== null ? message : 'Warning',
  		position: this.position,
  		queue: this.queue,
  		type: 'is-info',
  	});
  }

  public static startLoading() {
  	this.loadingComponent = buefy.LoadingProgrammatic.open({
  		container: null
  	});
  }

  public static stopLoading() {
  	this.loadingComponent.close();
  }
}
