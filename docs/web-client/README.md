# Introduction Web-Client

Webclient.

Translation with: Virtaal:  https://sourceforge.net/projects/translate/files/

Create Translations:
D:\git\windows\GitHub\hybridmud-chat-poc\code\client\webclient (master)
λ ng xi18n --outputPath src/locale

D:\git\windows\GitHub\hybridmud-chat-poc\code\client\webclient (master)
λ ng serve --aot --i18nFile=src/locale/messages.de.xlf --i18nFormat=xlf --locale=de


Upgrade from Angular 5.0.0 to 5.1.0:

The Blog says it can use Typescript 2.5.3, but there is a bug that prevents it https://github.com/angular/angular-cli/issues/8768

Favicon von Wholesalechat: http://www.favicon.cc/?action=icon_list&user_id=214390

i18n: i18n: Able to use translation strings outside a template
https://github.com/angular/angular/issues/11405
https://dzone.com/articles/angular-localization-and-internationalization

Tricky Bugs:
- Edge cases like being in a direct message conversation with a user that logs out.

Tests: window.location could not be tested easily.

NGRX would have been nice: https://medium.com/@nomanbinhussein/getting-started-with-ngrx-5cec2788b25f
Not everything together, keep complexity low.