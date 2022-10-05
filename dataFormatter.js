function formatMimeType(fileType) {
  const mimeTypes = {
    'application/vnd.google-apps.document': 'Google Doc',
    'application/vnd.google-apps.drive-sdk': '3rd Party Shortcut',
    'application/vnd.google-apps.drawing': 'Google Drawing',
    'application/vnd.google-apps.file': 'Drive File',
    'application/vnd.google-apps.folder': 'Drive Folder',
    'application/vnd.google-apps.form': 'Google Form',
    'application/vnd.google-apps.fusiontable': 'Google Fusion Table',
    'application/vnd.google-apps.jam': 'Google Jamboard',
    'application/vnd.google-apps.map': 'Google Map',
    'application/vnd.google-apps.presentation': 'Google Slide',
    'application/vnd.google-apps.script': 'Apps Script',
    'application/vnd.google-apps.shortcut': 'Shortcut',
    'application/vnd.google-apps.site': 'Google Site',
    'application/vnd.google-apps.spreadsheet': 'Google Sheet',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Microsoft Word',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'Microsoft PPT',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Microsoft Excel'
  };

  if (fileType in mimeTypes) {
    return mimeTypes[fileType];
  } else {
    return `${fileType}`;
  };
};

function formatPermissions(permission) {
  const permissionTypes = {
    'ANYONE': 'Anyone',
    'ANYONE_WITH_LINK': 'Anyone with link',
    'DOMAIN': 'Domain Only',
    'DOMAIN_WITH_LINK': 'Domain with link',
    'PRIVATE': 'Private'
  };

  if (permission in permissionTypes) {
    return permissionTypes[permission];
  } else {
    return 'Unknown';
  };
};

function formatLink(name, url) {
  if (name && url) {
    return `=HYPERLINK("${url}", "${name}")`
  } else {
    return `="${name}"`;
  };
};
