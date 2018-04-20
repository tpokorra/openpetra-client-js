//
// DO NOT REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
//
// @Authors:
//         Timotheus Pokorra <tp@tbits.net>
//
// Copyright 2017-2018 by TBits.net
//
// This file is part of OpenPetra.
//
// OpenPetra is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// OpenPetra is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with OpenPetra.  If not, see <http://www.gnu.org/licenses/>.
//

i18next
  .use(i18nextXHRBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: ['common'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    }
  }, function(err, t) {
    // init set content
    updateContent();
  });

function translateElement(obj, form) {
   placeholder=$(obj).attr('placeholder');
   if (placeholder !== undefined && placeholder[0] == '{') {
     placeholder = placeholder.substring(1, placeholder.length-1);
     $(obj).attr('placeholder', i18next.t(form + '.' + placeholder) );
   }
   html = $(obj).html();
   if (html !== undefined && html[0] == '{') {
     html = html.substring(1, html.length-1);
     $(obj).html(i18next.t(form + '.' + html));
   }
}

function updateContent() {
  $('#login input, #login button, #login h4, #login p').each(function () { translateElement($(this), 'login'); });
  $('#topnavigation a').each(function () { translateElement($(this), 'navigation'); });
  $('#sidebar span, #sidebar a').each(function () { translateElement($(this), 'navigation'); });
}

function translate(html, form) {
  pos = -1;
  while ((pos = html.indexOf('{', pos+1)) > -1) {
    pos2 = html.indexOf('}', pos);
    key = html.substring(pos+1, pos2);
    if (key.indexOf('val_') == 0) {
      continue;
    }
    if (key.indexOf('.') > -1) {
      html = replaceAll(html, '{'+key+'}', i18next.t(key));
    } else {
      html = replaceAll(html, '{'+key+'}', i18next.t(form + "." + key));
    }
  }

  return html; 
}

function changeLng(lng) {
  i18next.changeLanguage(lng);
}

i18next.on('languageChanged', () => {
  updateContent();
});