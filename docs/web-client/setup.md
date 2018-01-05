# Setup

Setup web client.

# Build

i18n is prepared but does not run: You cannot switch languages in both, JIT and AOT reliably. To be honest, I wan't able to figure it out for Jit.

Second Problem: How to do routing in both, JJIT and AOT

AOT is its whole project


-> i18n is under development  --> https://github.com/angular/angular/issues/16477
https://medium.com/@intellix/production-ready-angular-cli-v1-0-0-with-i18n-and-localised-urls-1f3cf16cc204
https://medium.com/@feloy/deploying-an-i18n-angular-app-with-angular-cli-fc788f17e358
SystemJS vs Webpack

Problem: How to give language to server: Protocol or resource descriptor.

I decided, to wait for further developments in i18n in angular.

To buîld AOT:

  npm run build-i18n

To test locally:
  npm install -g http-server
  cd dist
  http-server

  Open Browser: 127.0.0.1:8080



   ng serve --aot --i18nFile=src/locale/messages.de.xlf --i18nFormat=xlf --locale=de ng serve --aot --i18nFile=src/locale/messages.de.xlf --i18nFormat=xlf --locale=de




   Tests with code-coverage
   ng test --code-coverage
   Open webclient/coverage/index.html in browser.