// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const pastes = [
  {
    id: 'gF3FA',
    code: "print 'Hello, World!'",
    created_at: "2016-03-07T09:00:00.000Z"
  },
  {
    id: 'aF3Bz',
    code: "print 'Hello, World!'",
    created_at: "2016-11-07T09:00:00.000Z"
  },
];

const generateId = () => {
  let length = 5;
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

class PasteApi {
  static getAllPastes() {
    return Object.assign([], pastes);
  }

  static getPaste(pasteId) {
    const existingPasteIndex = pastes.findIndex(a => a.id === pasteId);

    if(pastes[existingPasteIndex]) {
      return pastes[existingPasteIndex];
    } else {
      throw new Error("Paste not found");
    }
  }

  static savePaste(paste) {
    paste = Object.assign({}, paste); // to avoid manipulating object passed in.

    if(paste.id) {
      const existingPasteIndex = pastes.findIndex(a => a.id === paste.id);
      pastes.splice(existingPasteIndex, 1, paste);
    } else {
      paste.id = generateId(paste);
      pastes.push(paste);
    }

    return paste;
  }

  static deletePaste(pasteId) {
    const existingPasteIndex = pastes.findIndex(a => a.id === pasteId);

    if(pastes[existingPasteIndex]) {
      pastes.splice(existingPasteIndex, 1);
    } else {
      throw new Error("Paste not found");
    }
  }

}

export default PasteApi;
