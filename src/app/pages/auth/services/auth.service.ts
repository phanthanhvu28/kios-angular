import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router) { }

  public logout = () => {
    localStorage.removeItem("t");
    const url = `/login`;
    this.router.navigate([url]);
  };

  public login = () => {
      const url = `../`;
      this.router.navigate([url]);
      localStorage.setItem("t","eyJhbGciOiJSUzI1NiIsImtpZCI6IkYxODNERjRCMTIxRDE1QzM2MDYyMTcxMjE2OTcwMUZGOTgzM0U2QzdSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IjhZUGZTeElkRmNOZ1loY1NGcGNCXzVnejVzYyJ9.eyJuYmYiOjE3MTg5NTI1NDcsImV4cCI6MTcxODk5NTc0NywiaXNzIjoiaHR0cHM6Ly9zc28tZGV2LWludGVncmF0ZS52ZWxhLmNvbS52biIsImF1ZCI6WyJtYXN0ZXItZGF0YS1hcGkiLCJjb3N0aW5nLWFwaSIsInRhcmlmZi1hcGkiLCJxdW90YXRpb24tYXBpIiwiY29udHJhY3RzZXJ2aWNlLWFwaSIsInBubC1hcGkiLCJjb250cmFjdHN1cHBsaWVyLWFwaSIsImJvb2tpbmctYXBpIiwicGFydG5lci1hcGkiLCJyZmktYXBpIiwiYmlsbGluZy1hcGkiLCJzaGlwbWVudC1hcGkiLCJzZXR0aW5nLW1hbmFnZW1lbnQtYXBpIl0sImNsaWVudF9pZCI6Im9wZXgtYW5ndWxhci1hcHAiLCJzdWIiOiIwNmUyMmIxOS0yYzA4LTQyY2QtOWFmZi1mNTNkZGQwODNmMDYiLCJhdXRoX3RpbWUiOjE3MTg5NTE5NDYsImlkcCI6ImxvY2FsIiwiZnVsbG5hbWUiOiJhZG1pbiBpdGwiLCJWZWxhX0NvcmVfQ29udHJhY3RTdXBwbGllcl9BcHByb3ZlIjoidHJ1ZSIsIlZlbGFfQ29yZV9Db250cmFjdFN1cHBsaWVyX0NyZWF0ZSI6InRydWUiLCJWZWxhX0NvcmVfUGFydG5lcl9BcHByb3ZlIjoidHJ1ZSIsInJvbGUiOlsiQ29udHJhY3RfQXBwcm92YWwiLCJQYXJ0bmVyX0N1c3RvbWVyX1ZpZXciLCJQYXJ0bmVyX1N1cHBsaWVyX0FwcHJvdmFsIiwiUGFydG5lcl9BZG1pbiIsIlZlbGFfQ29yZV9Db3N0aW5nIiwiVmVsYV9Db3JlX0Jvb2tpbmdfU3VwZXJ2aW9yIiwiVmVsYV9Db3JlX1JGSV9DdXN0b21lcl9CU0xlYWRlcl9ub19JbXBvcnQiLCJWZWxhX0NvcmVfQmlsbGluZ19BZG1pbmlzdHJhdG9yIiwiUGFydG5lcl9DdXN0b21lcl9BY3Rpb24iLCJWZWxhX0NvcmVfUG5sIiwiQ29udHJhY3RDdXN0b21lcl9BcHByb3ZhbCIsIlZlbGFfQ29yZV9TaGlwbWVudF9BZG1pbiIsIkFkbWluIiwiVmVsYV9Db3JlX01hc3RlckRhdGEiLCJDb250cmFjdEN1c3RvbWVyX1N1Ym1pdCIsIlBhcnRuZXJfQXBwcm92YWwiLCJQYXJ0bmVyX1N1cHBsaWVyX0FjdGlvbiIsIlBhcnRuZXJfQ3VzdG9tZXJfQXBwcm92YWwiLCJTa29ydWJhSWRlbnRpdHlBZG1pbkFkbWluaXN0cmF0b3IiLCJUYXJpZmZfQWRtaW4iLCJQYXJ0bmVyX1N1cHBsaWVyX1ZpZXciXSwiVmVsYV9Db3JlX0NvbnRyYWN0X0FwcHJvdmUiOiJ0cnVlIiwiVmVsYV9Db3JlX1BhcnRuZXJfQ3VzdG9tZXJfVmlldyI6InRydWUiLCJWZWxhX0NvcmVfUGFydG5lcl9TdXBwbGllcl9BcHByb3ZlIjoidHJ1ZSIsIlZlbGFfQ29yZV9QYXJ0bmVyX0FkbWluIjoidHJ1ZSIsIlZlbGFfQ29yZV9Db3N0aW5nX1dIX0ltcG9ydCI6InRydWUiLCJWZWxhX0NvcmVfQ29zdGluZ19XSF9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9Db3N0aW5nX0NDX0ltcG9ydCI6InRydWUiLCJWZWxhX0NvcmVfQ29zdGluZ19DQ19WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9Db3N0aW5nX0ZNX0ltcG9ydCI6InRydWUiLCJWZWxhX0NvcmVfQ29zdGluZ19GTV9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9Db3N0aW5nX0RUX0ltcG9ydCI6InRydWUiLCJWZWxhX0NvcmVfQ29zdGluZ19EVF9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9Cb29raW5nX0ZsYWciOiJ0cnVlIiwiVmVsYV9Db3JlX0Jvb2tpbmdfVmVyaWZpZWQiOiJ0cnVlIiwiVmVsYV9Db3JlX0Jvb2tpbmdfVmVyaWZ5aW5nIjoidHJ1ZSIsIlZlbGFfQ29yZV9Cb29raW5nX0FtZW5kaW5nIjoidHJ1ZSIsIlZlbGFfQ29yZV9Cb29raW5nX0Fzc2lnblRvTWUiOiJ0cnVlIiwiVmVsYV9Db3JlX0Jvb2tpbmdfQXNzaWduIjoidHJ1ZSIsIlZlbGFfQ29yZV9Cb29raW5nX0NhbmNlbCI6InRydWUiLCJWZWxhX0NvcmVfQm9va2luZ19WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9Cb29raW5nX0V4cG9ydCI6InRydWUiLCJWZWxhX0NvcmVfQm9va2luZ19TYXZlIjoidHJ1ZSIsIlZlbGFfQ29yZV9SRklfQ3VzdG9tZXJfTGlzdCI6InRydWUiLCJWZWxhX0NvcmVfUkZJX0N1c3RvbWVyX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfUkZJX0N1c3RvbWVyX0NvbmZpcm0iOiJ0cnVlIiwiVmVsYV9Db3JlX1JGSV9DdXN0b21lcl9EZXRhaWwiOiJ0cnVlIiwiVmVsYV9Db3JlX1JGSV9DdXN0b21lcl9SZWplY3QiOiJ0cnVlIiwiVmVsYV9Db3JlX1JGSV9DdXN0b21lcl9DYW5jZWwiOiJ0cnVlIiwiVmVsYV9Db3JlX1JGSV9DdXN0b21lcl9WZXJpZnlpbmdIaXN0b3J5UkZJIjoidHJ1ZSIsIlZlbGFfQ29yZV9SRklfQ3VzdG9tZXJfVXBkYXRlU2FsZW1hbiI6InRydWUiLCJWZWxhX0NvcmVfUkZJX0N1c3RvbWVyX0dldEFsbFNhbGVtYW4iOiJ0cnVlIiwiVmVsYV9Db3JlX1JGSV9DdXN0b21lcl9HZXRTYWxlbWFuIjoidHJ1ZSIsIlZlbGFfQ29yZV9SRklfQ3VzdG9tZXJfVXBsb2FkRmlsZSI6InRydWUiLCJWZWxhX0NvcmVfUkZJX0N1c3RvbWVyX0Rvd25sb2FkIjoidHJ1ZSIsIlZlbGFfQ29yZV9SRklfQ3VzdG9tZXJfR2V0RmlsZSI6InRydWUiLCJWZWxhX0NvcmVfRGViaXROb3RlX1NhdmUiOiJ0cnVlIiwiVmVsYV9Db3JlX0RlYml0Tm90ZV9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9EZWJpdE5vdGVfU2VuZCI6InRydWUiLCJWZWxhX0NvcmVfRGViaXROb3RlX0NhbmNlbCI6InRydWUiLCJWZWxhX0NvcmVfRGViaXROb3RlX0RlbGV0ZSI6InRydWUiLCJWZWxhX0NvcmVfRGViaXROb3RlX0Rvd25sb2FkIjoidHJ1ZSIsIlZlbGFfQ29yZV9TT0FfVmlldyI6InRydWUiLCJWZWxhX0NvcmVfU09BX1NhdmUiOiJ0cnVlIiwiVmVsYV9Db3JlX1NPQV9TZW5kIjoidHJ1ZSIsIlZlbGFfQ29yZV9TT0FfU3VibWl0QUNDIjoidHJ1ZSIsIlZlbGFfQ29yZV9TT0FfU2VuZEludm9pY2UiOiJ0cnVlIiwiVmVsYV9Db3JlX1NPQV9DYW5jZWwiOiJ0cnVlIiwiVmVsYV9Db3JlX1NPQV9EZWxldGUiOiJ0cnVlIiwiVmVsYV9Db3JlX1NPQV9Eb3dubG9hZCI6InRydWUiLCJWZWxhX0NvcmVfRGViaXROb3RlX0NvbmZpcm0iOiJ0cnVlIiwiVmVsYV9Db3JlX0RlYml0Tm90ZV9SZWplY3QiOiJ0cnVlIiwiVmVsYV9Db3JlX1NPQV9Db25maXJtIjoidHJ1ZSIsIlZlbGFfQ29yZV9TT0FfUmVqZWN0IjoidHJ1ZSIsIlZlbGFfQ29yZV9TT0FfRXN0aW1hdGVQTkwiOiJ0cnVlIiwiVmVsYV9Db3JlX0RlYml0Tm90ZV9Fc3RpbWF0ZVBOTCI6InRydWUiLCJWZWxhX0NvcmVfRGViaXROb3RlX1NlbmRJbnZvaWNlIjoidHJ1ZSIsIlZlbGFfQ29yZV9EZWJpdE5vdGVfU3VibWl0QUNDIjoidHJ1ZSIsIlNldHRpbmdNYW5hZ2VtZW50X0V4Y2hhbmdlUmF0ZV9WaWV3IjoidHJ1ZSIsIlNldHRpbmdNYW5hZ2VtZW50X0V4Y2hhbmdlUmF0ZV9DcmVhdGUiOiJ0cnVlIiwiU2V0dGluZ01hbmFnZW1lbnRfRXhjaGFuZ2VSYXRlX0VkaXQiOiJ0cnVlIiwiU2V0dGluZ01hbmFnZW1lbnRfQ2hhcmdlVkFUX1ZpZXciOiJ0cnVlIiwiU2V0dGluZ01hbmFnZW1lbnRfQ2hhcmdlVkFUX0VkaXQiOiJ0cnVlIiwiU2V0dGluZ01hbmFnZW1lbnRfQ2hhcmdlVkFUX1N5bmMiOiJ0cnVlIiwiU2V0dGluZ01hbmFnZW1lbnRfQmFua0FjY291bnRfVmlldyI6InRydWUiLCJRdW90YXRpb25fUXVvdGF0aW9uX1ZpZXciOiJ0cnVlIiwiUXVvdGF0aW9uX1F1b3RhdGlvbl9FZGl0IjoidHJ1ZSIsIlF1b3RhdGlvbl9RdW90YXRpb25fU3VibWl0IjoidHJ1ZSIsIlF1b3RhdGlvbl9RdW90YXRpb25fU2VuZEN1c3RvbWVyIjoidHJ1ZSIsIlF1b3RhdGlvbl9RdW90YXRpb25fUmVTZW5kQ3VzdG9tZXIiOiJ0cnVlIiwiUXVvdGF0aW9uX1F1b3RhdGlvbl9SZXF1ZXN0UE5MIjoidHJ1ZSIsIlF1b3RhdGlvbl9RdW90YXRpb25fU2hvd09ySGlkZVNlbGxpbmciOiJ0cnVlIiwiUXVvdGF0aW9uX1F1b3RhdGlvbl9QcmVmZXIiOiJ0cnVlIiwiUXVvdGF0aW9uX1F1b3RhdGlvbl9JbnRlcm5hbFJlbWFyayI6InRydWUiLCJWZWxhX0NvcmVfUGFydG5lcl9DdXN0b21lcl9BY3Rpb24iOiJ0cnVlIiwiVmVsYV9Db3JlX1BubF9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9QbmxfRWRpdCI6InRydWUiLCJWZWxhX0NvcmVfT3BlckV4Y2VsbF9Db25maWdNYW5hZ2VtZW50X1ZpZXciOiJ0cnVlIiwiVmVsYV9Db3JlX09wZXJFeGNlbGxfRG9jTWFuYWdlbWVudF9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9PcGVyRXhjZWxsX0V4Y2VwdE1hbmFnZW1lbnRfVmlldyI6InRydWUiLCJWZWxhX0NvcmVfT3BlckV4Y2VsbF9JbnZlbnRNYW5hZ2VtZW50X1ZpZXciOiJ0cnVlIiwiVmVsYV9Db3JlX1NoaXBtZW50X0ludGVncmF0ZWRfTGlzdCI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfSW50ZWdyYXRlZF9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9JbnRlZ3JhdGVkX0FkZCI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfSW50ZWdyYXRlZF9VcGRhdGUiOiJ0cnVlIiwiVmVsYV9Db3JlX1NoaXBtZW50X0ludGVncmF0ZWRfRGVsZXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9GTV9MaXN0IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9GTV9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9GTV9BZGQiOiJ0cnVlIiwiVmVsYV9Db3JlX1NoaXBtZW50X0ZNX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfRk1fRGVsZXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9EVF9MaXN0IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9EVF9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9EVF9BZGQiOiJ0cnVlIiwiVmVsYV9Db3JlX1NoaXBtZW50X0RUX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfRFRfRGVsZXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9DQ19MaXN0IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9DQ19WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9DQ19BZGQiOiJ0cnVlIiwiVmVsYV9Db3JlX1NoaXBtZW50X0NDX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfQ0NfRGVsZXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9XSF9MaXN0IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9XSF9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9XSF9BZGQiOiJ0cnVlIiwiVmVsYV9Db3JlX1NoaXBtZW50X1dIX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfV0hfRGVsZXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9Bc2lnbmVlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9GTV9Bc2lnbmVlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9EVF9Bc2lnbmVlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9DQ19Bc2lnbmVlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9XSF9Bc2lnbmVlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9CaWxsaW5nX1ZpZXciOiJ0cnVlIiwiVmVsYV9Db3JlX1NoaXBtZW50X0JpbGxpbmdfVXBkYXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9FeGNlcHRpb25fVXBkYXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9Db250YWluZXJfVXBkYXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9Db21tb2RpdHlfVXBkYXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9BdHRhY2htZW50X1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfRXhjZXB0aW9uQ2hhbmdlU3RhdHVzX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfVkFTQ2hhbmdlU3RhdHVzX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfVkFTX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfU2NoZWR1bGVfVXBkYXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9QYWNraW5nX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfUm91dGluZ19VcGRhdGUiOiJ0cnVlIiwiVmVsYV9Db3JlX1NoaXBtZW50X1BhcnR5X1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfUmVhZHlGb3JCaWxsaW5nIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9PbkJlaGFsZl9VcGRhdGUiOiJ0cnVlIiwiVmVsYV9Db3JlX1NoaXBtZW50X1ZBU19WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9DRFNfVXBkYXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9TaGlwbWVudF9Db25maWdfVmlldyI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfQ29uZmlnX1VwZGF0ZSI6InRydWUiLCJWZWxhX0NvcmVfU2hpcG1lbnRfQmlsbE9mTG9hZGluZ19VcGRhdGUiOiJ0cnVlIiwiVmVsYV9Db3JlX01hc3RlckRhdGFfU2VydmljZXNfSW1wb3J0IjoidHJ1ZSIsIlZlbGFfQ29yZV9NYXN0ZXJEYXRhX1NlcnZpY2VzX1ZpZXciOiJ0cnVlIiwiVmVsYV9Db3JlX01hc3RlckRhdGFfTmV0d29ya19JbXBvcnQiOiJ0cnVlIiwiVmVsYV9Db3JlX01hc3RlckRhdGFfTmV0d29ya19WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9Db250cmFjdF9DcmVhdGUiOiJ0cnVlIiwiVmVsYV9Db3JlX1BhcnRuZXJfU3VwcGxpZXJfQWN0aW9uIjoidHJ1ZSIsIlZlbGFfQ29yZV9QYXJ0bmVyX0N1c3RvbWVyX0FwcHJvdmUiOiJ0cnVlIiwiVmVsYV9Db3JlX1RhcmlmZl9WaWV3IjoidHJ1ZSIsIlZlbGFfQ29yZV9UYXJpZmZfQ3JlYXRlIjoidHJ1ZSIsIlZlbGFfQ29yZV9UYXJpZmZfQXBwcm92ZSI6InRydWUiLCJhYWEiOiJbYmIsY2NdIiwiVmVsYV9Db3JlX1BhcnRuZXJfU3VwcGxpZXJfVmlldyI6InRydWUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW4tbm9ucHJvZEB2ZWxhLmNvbS52biIsInNpZCI6IjFDRDdBMzYyQjk3MTlFMDg2NkZFREZDQzcwQjNEOEE0IiwiaWF0IjoxNzE4OTUyNTQ3LCJzY29wZSI6WyJvcGVuaWQiLCJyb2xlcyIsInByb2ZpbGUiLCJtYXN0ZXItZGF0YS1hcGkiLCJjb3N0aW5nLWFwaSIsInRhcmlmZi1hcGkiLCJyZmktYXBpIiwicG5sLWFwaSIsInF1b3RhdGlvbi1hcGkiLCJib29raW5nLWFwaSIsImNvbnRyYWN0c2VydmljZS1hcGkiLCJjb250cmFjdHN1cHBsaWVyLWFwaSIsInBhcnRuZXItYXBpIiwic2hpcG1lbnQtYXBpIiwiYmlsbGluZy1hcGkiLCJzZXR0aW5nLW1hbmFnZW1lbnQtYXBpIl0sImFtciI6WyJwd2QiXX0.lrR4IQvSmchEP9CI8vszFMkAAU7cH0z6MUH2cA8GxFDRDE4OiHmFPwA64o_gUczHRjtCnlt-ioFMA0YrXAwFtgQEkOEA2uoSvHlJ8EoxIGLfgDLxPG_XMo6b6W3SdG5yL199SJ_xHrRXzHIiF_g6ChtRxP_UGIHozbI9hhBNTztPt6-OyjLBfw3ls1Z-z065u13ysdoXL0IhmAzCmxT5OsxC_imW0e5XFcGLyI0EM0EhPXWnJ_p3PbE_qp31jZ7jr_wTYJAtdXe3Ox-7QMTGs3cP5qX5Z9FC5EqjcaWZHHI38-v5nZ-ewTWDyqXIKJlqpqVTnmXNF8OBt1OFuJqZyfwcujQv3-PT9lU6vbjmXT0Xb3jwdfKjcGAJhMUUULp70DBzOUvd17LtWf_ZVA_wz6uRmJiYMYQMSC5Ai070LWtUsZPU3gSOL2vD6WkyRx6zIK55QOZsSAfNcu5RIAOIySBhQ2FYPaqsSl2UMAHbNTYom2sDvLpuFmWckVQ8dOaV7isO2aMFwinFZ4p7a1dalau-BZoeJeVV1oRG6Ay0uTONKEt2slW8XPqgrT-z4ff7b772wSh8W287onJ4fptu8b2NwSqD2EV4Ksl6TmHzbzzreSZqkoyoqqYmIs0gMSDlcA-DSxMEoX-0RfxZlTTlQFYxFAfNIZtlNDXf87nzsnw");
  };

  public isAuthenticated(): boolean{
    return !!this.accessToken;
  };
  get accessToken(): string {
    return localStorage.getItem("t");
  }
}