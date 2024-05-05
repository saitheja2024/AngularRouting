import { HttpParams } from "@angular/common/http";

export function toFormData(data: any): any {
  const formData: any = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value || "");
  }
  return formData;
}
