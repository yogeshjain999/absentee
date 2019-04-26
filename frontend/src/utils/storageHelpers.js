/* eslint-disable no-undef */

const storageHelpers = {
  setItem: (field, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(field, serializedState);
    } catch (error) {
      // Ignoring this error
    }
  },

  removeItem: (field) => {
    try {
      localStorage.removeItem(field);
    } catch (error) {
      // Ignoring this error
    }
  },

  getItem: (field) => {
    try {
      const serializedState = localStorage.getItem(field);
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  },
};

export default storageHelpers;
