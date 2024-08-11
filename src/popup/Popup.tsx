import { useState, useEffect } from 'react'

import './Popup.css'

export function Popup() {
  const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'REQUEST_REMAINING_TIME' });

    interface TimeObject {
      hours: number;
      minutes: number;
    }

    const messageListener = (message: { type: string, timeObject: TimeObject }, sender: any, sendResponse: any) => {
      if (message.type === 'REMAINING_TIME_RESPONSE') {
      setRemainingTime(message.timeObject);
      console.log("Received time object and successfully set.")
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => chrome.runtime.onMessage.removeListener(messageListener);
  }, []);
  return (
    <main className="w-[500px] bg-gray-100 text-gray-900 font-sans">
      <div className="mx-auto bg-white rounded-lg overflow-hidden shadow-md p-5">
        <h1 className="text-2xl font-bold mb-4">Animo Help</h1>
        <form action="#" method="post">
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" name="evil_mode" className="mr-2" />
              Evil Mode
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" name="dark_mode" className="mr-2" />
              Dark Mode
            </label>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              Start time
              <input type="time" name="start_time" className="mt-1" />
            </label>
            <label className="flex flex-col">
              End time
              <input type="time" name="end_time" className="mt-1" />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="use_device_dark_mode_settings"
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
                name="id_number"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center mb-2">
              <input type="checkbox" name="ptp_integration" className="mr-2" />
              PTP Integration
            </label>
            <input
              type="text"
              placeholder="Enter PTP document link..."
              name="ptp_document_link"
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" name="mls_on_animosys" className="mr-2" />
              MLS on AnimoSys
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" name="compact_mode" className="mr-2" />
              Compact Mode
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notify_error_on_login"
                className="mr-2"
              />
              Notify Error on Login
            </label>
            <input
              type="text"
              placeholder="Enter custom message"
              name="custom_message"
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">Cart Schedule</label>
            <div className="flex flex-col">
              <label className="flex items-center">
                <input type="checkbox" name="item_1" className="mr-2" />
                Item 1
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="item_2" className="mr-2" />
                Item 2
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="item_3" className="mr-2" />
                Item 3
              </label>
            </div>
            <label className="flex flex-col mt-2">
              Max items to show:
              <input
                type="number"
                name="max_items_to_show"
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
          <h1 className="text-xl">
            Time Left
          </h1>
          <p>{remainingTime.hours} hours and {remainingTime.minutes} left in queue.</p>
        </div>
      </div>
    </main>
  )
}

export default Popup
