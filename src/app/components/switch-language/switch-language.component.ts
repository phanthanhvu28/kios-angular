import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-switch-language',
  templateUrl: './switch-language.component.html',
  styleUrls: ['./switch-language.component.less']
})
export class SwitchLanguageComponent {
  @Input() supportedLanguages: { value: string; label: string }[] = [];
  @Input() selectedLanguage: string;
  @Output() languageChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private translateService: TranslateService,
    private i18n: NzI18nService
  ) {
   
    const lang = localStorage.getItem('lang') || 'en';
    this.setLanguage(lang);
  }

  onLanguageChange(language: string): void {
    this.setLanguage(language);
    this.languageChanged.emit(language);
  }

  setLanguage(language: string): void {
    console.log("language",language)
    if (language === 'vi') {
      this.i18n.setLocale(vi_VN);
      this.translateService.use('vi');
    } else {
      this.i18n.setLocale(en_US);
      this.translateService.use('en');
    }

    localStorage.setItem('lang', language);
  }
}
