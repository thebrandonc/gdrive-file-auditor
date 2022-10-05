class FileAuditor {
  constructor() {
    this.data = this.getFileData();
  };

  getFileData() {
    try {
      const driveFiles = DriveApp.getFiles();
      const files = [];

      while(driveFiles.hasNext()) {
        const file = driveFiles.next();
        const parent = this.getParentFolder(file)
        const fileData = {
          created: file.getDateCreated(),
          modified: file.getLastUpdated(),
          name: formatLink(file.getName(), file.getUrl()),
          type: formatMimeType(file.getMimeType()),
          permissions: formatPermissions(file.getSharingAccess().name()),
          owner: file.getOwner().getName(),
          parent: formatLink(parent.name, parent.url),
          viewers: this.getUserEmails(file.getViewers()),
          editors: this.getUserEmails(file.getEditors()),
        };

        files.push(fileData);
      };
      return files;

    } catch(err) {
      const msg = `Error gathering Drive files. ${err}`;
      new Notification().send('error', msg);
    };
  };

  getParentFolder(file) {
    try {
      const parents = file.getParents();
      if (parents.hasNext()) {
        const parent = parents.next();
        return {
          name: parent.getName(), 
          url: parent.getUrl()
        };
      } else {
        return {
          name: 'Shared Folder',
          url: null
        };
      };
    } catch(err) {
      const msg = `Error getting parent folder. ${err}`;
      new Notification().send('error', msg);
    };
  };

  getUserEmails(users) {
    try {
      let userEmails = "";
      
      if (users) users.forEach(user => {
        if (userEmails.length > 0) userEmails += String.fromCharCode(10);
        userEmails += `${user.getEmail()}`;
      });
      return userEmails;

    } catch(err) {
      const msg = `Error getting user emails. ${err}`;
      new Notification().send('error', msg);
    };
  };
};
