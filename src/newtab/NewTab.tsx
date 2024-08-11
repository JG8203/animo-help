import React, { useEffect } from 'react'
import './NewTab.css'
import { loadSettings } from '../storage'

export const NewTab = () => {
  useEffect(() => {
    const fetchSettingsAndRedirect = async () => {
      try {
        const savedSettings = await loadSettings();
        let url = "https://enroll.dlsu.edu.ph/dlsu/view_course_offerings";

        if (savedSettings && savedSettings.idNumber) {
          url = `https://enroll.dlsu.edu.ph/dlsu/view_course_offerings?p_id_no=${savedSettings.idNumber}&p_button=Submit&p_routine=1&p_last_name=`;
        }

        window.location.href = url;
      } catch (error) {
        console.error("Error loading settings:", error);
        window.location.href = "https://enroll.dlsu.edu.ph/dlsu/view_course_offerings";
      }
    };

    fetchSettingsAndRedirect();
  }, []);

  return <div>Loading...</div>;
}

export default NewTab
