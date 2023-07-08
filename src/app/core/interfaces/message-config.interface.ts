import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";

export interface MessageConfig {
  readonly message: string;
  readonly title: string;
  readonly config?: Partial<NbToastrConfig>;
}

export class UnexpectedErrorMessage implements MessageConfig {

  readonly message: string;
  readonly title: string;
  readonly config?: Partial<NbToastrConfig>;

  constructor(message: string) {
    this.message = message;
    this.title = 'Unexpected Error';
    this.config = {
      preventDuplicates: true,
      status: 'warning',
      duration: 5000
    };
  }
}
