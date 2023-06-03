import { NbToastrConfig } from "@nebular/theme/components/toastr/toastr-config";

export interface MessageConfig {
  readonly message: string;
  readonly title: string;
  readonly config?: Partial<NbToastrConfig>;
}
