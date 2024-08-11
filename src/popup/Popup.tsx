import React, { useState, useEffect, FormEvent } from 'react';
import { saveSettings, loadSettings } from '../storage';
import './Popup.css';

export function Popup() {
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0 });
  const [settings, setSettings] = useState({
    evilMode: false,
    darkMode: false,
    cheaterMode: false,
    startTime: '',
    endTime: '',
    useDeviceDarkModeSettings: false,
    idNumber: '',
    ptpIntegration: false,
    ptpDocumentLink: '',
    mlsOnAnimosys: false,
    compactMode: false,
    notifyErrorOnLogin: false,
    customMessage: '',
    maxItemsToShow: 0,
  });

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'REQUEST_REMAINING_TIME' });

    const messageListener = (message: { type: string; timeObject: { hours: number; minutes: number } }, sender: any, sendResponse: any) => {
      if (message.type === 'REMAINING_TIME_RESPONSE') {
        setRemainingTime(message.timeObject);
        console.log("Received time object and successfully set.");
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    loadSettings().then(savedSettings => {
      if (savedSettings) {
        setSettings(savedSettings);
      }
    });

    return () => chrome.runtime.onMessage.removeListener(messageListener);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await saveSettings(settings);
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <main className="w-[500px] bg-gray-100 text-gray-900 font-sans">
      <div className="mx-auto bg-white rounded-lg overflow-hidden shadow-md p-5">
        <h1 className="text-2xl font-bold mb-4">Animo Help</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="evilMode"
                checked={settings.evilMode}
                onChange={handleInputChange}
                className="mr-2"
              />
              Evil Mode
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleInputChange}
                className="mr-2"
              />
              Dark Mode
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="cheaterMode"
                checked={settings.cheaterMode}
                onChange={handleInputChange}
                className="mr-2"
              />
              Cheater Mode
            </label>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              Start time
              <input
                type="time"
                name="startTime"
                value={settings.startTime}
                onChange={handleInputChange}
                className="mt-1"
              />
            </label>
            <label className="flex flex-col">
              End time
              <input
                type="time"
                name="endTime"
                value={settings.endTime}
                onChange={handleInputChange}
                className="mt-1"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="useDeviceDarkModeSettings"
                checked={settings.useDeviceDarkModeSettings}
                onChange={handleInputChange}
                className="mr-2"
              />
              Use device dark mode settings
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              ID Number:
              <input
                type="text"
                name="idNumber"
                value={settings.idNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                name="ptpIntegration"
                checked={settings.ptpIntegration}
                onChange={handleInputChange}
                className="mr-2"
              />
              PTP Integration
            </label>
            <input
              type="text"
              placeholder="Enter PTP document link..."
              name="ptpDocumentLink"
              value={settings.ptpDocumentLink}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="mlsOnAnimosys"
                checked={settings.mlsOnAnimosys}
                onChange={handleInputChange}
                className="mr-2"
              />
              MLS on AnimoSys
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="compactMode"
                checked={settings.compactMode}
                onChange={handleInputChange}
                className="mr-2"
              />
              Compact Mode
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifyErrorOnLogin"
                checked={settings.notifyErrorOnLogin}
                onChange={handleInputChange}
                className="mr-2"
              />
              Notify Error on Login
            </label>
            <input
              type="text"
              placeholder="Enter custom message"
              name="customMessage"
              value={settings.customMessage}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="flex flex-col mt-2">
              Max items to show:
              <input
                type="number"
                name="maxItemsToShow"
                value={settings.maxItemsToShow}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
          </div>
          <div className="mb-4 flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
        <div className="font-mono">
          <h1 className="text-xl">Time Left</h1>
          <p>
            {remainingTime.hours} hours and {remainingTime.minutes} left in queue.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Popup;
