export interface DniRespose {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: string;
  numeroDocumento: string;
  digitoVerificador: string;
  message?: string;
}
