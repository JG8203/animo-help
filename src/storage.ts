interface Settings {
    evilMode: boolean;
    darkMode: boolean;
    cheaterMode: boolean;
    startTime: string;
    endTime: string;
    useDeviceDarkModeSettings: boolean;
    idNumber: string;
    ptpIntegration: boolean;
    ptpDocumentLink: string;
    mlsOnAnimosys: boolean;
    compactMode: boolean;
    notifyErrorOnLogin: boolean;
    customMessage: string;
    maxItemsToShow: number;
  }
  
  export const saveSettings = (settings: Settings): Promise<void> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ settings }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  };
  
  export const loadSettings = (): Promise<Settings> => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('settings', (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result.settings as Settings);
        }
      });
    });
  };
  