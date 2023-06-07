import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";

export interface MessageConfig {
  readonly message: string;
  readonly title: string;
  readonly config?: Partial<NbToastrConfig>;
}

export class UnexpectedServerError implements MessageConfig {

  readonly message: string;
  readonly title: string;
  readonly config?: Partial<NbToastrConfig>;

  constructor(message: string) {
    this.message = message;
    this.title = 'Unexpected Server Error';
    this.config = {
      preventDuplicates: true,
      status: 'danger'
    };
  }
}
