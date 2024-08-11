import { loadSettings } from "../../storage";

export async function applyDarkMode() {
  const settings = await loadSettings();
  if (settings.darkMode || (settings.useDeviceDarkModeSettings && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    const style = document.createElement('style');
    style.textContent = `
      body, table, td, th, p, div {
        background-color: #1a1a1a !important;
        color: #e0e0e0 !important;
      }
      a {
        color: #4da6ff !important;
      }
      .data[bgcolor="#D2EED3"], .data[bgcolor="#FFFFFF"] {
        background-color: #2a2a2a !important;
        color: #e0e0e0 !important;
      }
      .data[bgcolor="#338000"] {
        background-color: #1f4d00 !important;
        color: #ffffff !important;
      }
      #professor-table-container table {
        border-color: #444 !important;
      }
      #professor-table-container td {
        border-color: #444 !important;
        color: #e0e0e0 !important;
      }
      .templatenav {
        background-color: #333 !important;
      }
      .menu {
        background-color: #222 !important;
      }
      .menu a {
        color: #bbb !important;
      }
      input[type="text"], input[type="password"] {
        background-color: #333 !important;
        color: #e0e0e0 !important;
        border: 1px solid #555 !important;
      }
      input[type="submit"], input[type="reset"], .button {
        background-color: #444 !important;
        color: #e0e0e0 !important;
        border: 1px solid #666 !important;
      }
      .data font[color="#000000"], .data font[color="#006600"] {
        color: #e0e0e0 !important;
      }
      .data font[color="#0099CC"] {
        color: #66ccff !important;
      }
      .data font[color="#006600"] {
        color: #66ff66 !important;
      }
      tr[bgcolor="#D2EED3"], tr[bgcolor="#FFFFFF"] {
        background-color: #2a2a2a !important;
      }
      td[align="right"] {
        color: #e0e0e0 !important;
      }
    `;
    document.head.appendChild(style);

    
    document.querySelectorAll('.data font[color="#000000"]').forEach((el) => {
      (el as HTMLElement).style.color = '#e0e0e0';
    });

    document.querySelectorAll('td[align="right"]').forEach((el) => {
      (el as HTMLElement).style.color = '#e0e0e0';
    });
  }
}
